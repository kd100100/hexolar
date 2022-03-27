import requests
from utils import *
import random
from irradiance_model import *
from tempreature_model import *
from days_months_calc import *
import datetime


def get_dashboard_battery(data, cur, conn, rtype):
    '''
    #print(data)
    {'chargeTill': '80%', 'dischargeTill': '20%', 'batteryType': 'Lithium Ion'}
    '''
    now = datetime.datetime.now()
    hour = now.hour - 9
    if(hour < 1):
        hour = 12 + hour

    hours = []
    for i in range(10):
        hours.append(str(hour)+":00")
        hour += 1

    if(rtype == "POST"):
        cur.execute(f"Update BATTERYDETAILS set charge_till='{data['chargeTill']}' \
        ,discharge_till='{data['dischargeTill']}',battery_type='{data['batteryType']}'\
        ,batter_voltage = '{data['batteryVoltage']}',battery_amp = '{data['batteryAmp']}' where user_id=16")
        conn.commit()

    new_data = cur.execute(
        f"select * from BATTERYDETAILS where user_id=16").fetchall()
    new_data = new_data[0]

    return {
        "chargeTill": new_data[1],
        "dischargeTill": new_data[2],
        "batteryType": new_data[3],
        "batteryVoltage": new_data[4],
        "batteryAmp": new_data[5],
        "chargeCycles": 0,
        "graph": {
            "xAxis": ["23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "08:00"],
            "yAxis": [65,65,65,65,65,65,65,57,45,50]
        }
    }


def get_dashboard_tilt(data, cur, conn, rtype):
    if(rtype == "POST"):
        cur.execute(
            f"Update panel_settings set automatic='{data['automatic']}' where user_id=16")
        conn.commit()
    automatic = cur.execute(
        "select automatic from Panel_settings where user_id=16").fetchall()[0]
    autofeas = cur.execute(
        "select auto_tilt from USERS where user_id=16").fetchall()[0]
    return {
        "automaticFeasible": autofeas,
        "automatic": automatic,
    }


def get_dashboard_grid(data, cur, conn, rtype):
    if(rtype == "POST"):
        cur.execute(
            f"Update panel_settings set gridType='{data['gridType']}' where user_id=16")
        conn.commit()
    gridType = cur.execute(
        "select gridtype from Panel_settings where user_id=16").fetchall()[0]
    return {
        'gridType': gridType[0],
    }


def get_dashboard_compare(cur):
    location = getlocation(cur)
    nasa_data = nasa_data_fetch(cur)
    # parameters = "ALLSKY_SFC_SW_DWN"
    # request = "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=" + parameters + "&community=RE&longitude=" + \
    #     location["lon"] + "&latitude=" + location["lat"] + \
    #     "&start=20000101&end=20201231&format=JSON"
    # response = requests.get(request).json()

    # get random values for comparison
    user_values = []
    for i in nasa_data['ten_days_values']:
        user_values.append(dec_by_8_13(i))

    fake_list = [9.50, 9.53, 8.66, 7.26, 7.57,
                 9.31, 10.33, 11.07, 11.06, 11.55]
    # efficiency calc
    nasa_sum = 0
    user_sum = 0
    for i in range(0, len(nasa_data['ten_days_values'])):
        nasa_sum += nasa_data['ten_days_values'][i]
        user_sum += fake_list[i]

    efficiency = (user_sum/nasa_sum)*100

    # print(efficiency)
    #print(round(100-efficiency, 2))

    b = str(efficiency).find('.') + 2
    vb = str(efficiency)[:b]

    #ef = str(100 - round)

    return {
        'graph': {
            'xAxis': nasa_data['ten_days_keys'],
            'NASA': nasa_data['ten_days_values'],
            # 'user': user_values
            'user': [9.50, 9.53, 8.66, 7.26, 7.57, 9.31, 10.33, 11.07, 11.06, 11.55]
        },
        'box': {
            'lastDay': str(round(7.46, 2)),
            'lastMonth': "-",
            'lastYear': "-",
            'efficiency': round(100-efficiency, 2)
        }
    }


def get_dashboard_futurepast(data, cur):

    location = getlocation(cur)
    loc = {
        "latitude": location["lat"],
        "longitude": location["lon"]
    }
    z = cur.execute("SELECT wattage from USERS where user_id=16").fetchall()[0]
    wattage = z[0]

    # daily
    # -----------------------------------------------------
    # print(wattage)

    if(data['comp'] == "future"):
        daily_irradiance_model = train_model_irradiance_daily(loc)
        daily_tempreature_model = train_model_tempreature_daily(loc)

        daily_date = []
        daily_values = []

        d_date, d_month, d_year = "27", "03", "2022"

        for i in range(10):

            key = d_date + "/" + d_month + "/" + d_year
            irradiance = daily_irradiance_model.predict(
                [[int(d_date), int(d_month), int(d_year)]])[0]
            temperature = daily_tempreature_model.predict(
                [[int(d_date), int(d_month), int(d_year)]])[0]
            power = calculate_total_power({
                "user_data": {
                    "type": "wattage",
                    "panel_wattage": wattage,
                },
                "pred_value": irradiance
            })

            power_temp = calculate_power_temp(power, temperature)

            daily_date.append(key)
            daily_values.append(round(power_temp, 2))

            d_date, d_month, d_year = get_next_date(d_date, d_month, d_year)

        # -----------------------------------------------------

        # monthly
        # -----------------------------------------------------
        monthly_irradiance_model = train_model_irradiance_monthly(loc)
        monthly_tempreature_model = train_model_tempreature_monthly(loc)

        monthly_date = []
        monthly_values = []

        m_month, m_year = "03", "2022"

        for i in range(10):
            key = m_month + "/" + m_year
            irradiance = monthly_irradiance_model.predict(
                [[int(m_month), int(m_year)]])[0]
            temperature = monthly_tempreature_model.predict(
                [[int(m_month), int(m_year)]])[0]
            power = calculate_total_power({
                "user_data": {
                    "type": "wattage",
                            "panel_wattage": wattage,
                },
                "pred_value": irradiance
            })

            power_temp = calculate_power_temp(
                power, temperature) * get_days(m_month, m_year)
            monthly_date.append(key)
            monthly_values.append(round(power_temp, 2))
            m_month, m_year = get_next_month(m_month, m_year)

        # -----------------------------------------------------
        y_year = '2022'
        sum = 0
        yearly_date = []
        yearly_values = []
        for j in range(10):
            sum = 0
            for i in range(12):
                irradiance = monthly_irradiance_model.predict(
                    [[i+1, int(y_year)]])[0]
                temperature = monthly_tempreature_model.predict(
                    [[i+1, int(y_year)]])[0]
                power = calculate_total_power({
                    "user_data": {
                        "type": "wattage",
                                "panel_wattage": wattage,
                    },
                    "pred_value": irradiance
                })
                sum += calculate_power_temp(power,
                                            temperature) * get_days(i+1, y_year)
                #print(y_year, "-->", i+1, "-->", sum)
            yearly_date.append(y_year)
            yearly_values.append(round(sum, 2))
            y_year = str(int(y_year) + 1)

        return{
            'daily': {
                'display': {
                    'date': [28, 29, 30],
                    'month': [3, 3, 3],
                    'year': [2022, 2022, 2022],
                    'values': [daily_values[1], daily_values[2], daily_values[3]]
                },
                'graph': {
                    'xAxis': daily_date,
                    'yAxis': daily_values
                }
            },
            'monthly': {
                'display': {
                    'month': [4, 5, 6],
                    'year': [2022, 2022, 2022],
                    'values': [monthly_values[1], monthly_values[2], monthly_values[3]]
                },
                'graph': {
                    'xAxis': monthly_date,
                    'yAxis': monthly_values
                }
            },
            'yearly': {
                'display': {
                    'year': [2023, 2024, 2025],
                    'values': [yearly_values[1], yearly_values[2], yearly_values[3]]
                },
                'graph': {
                    'xAxis': yearly_date,
                    'yAxis': yearly_values
                }
            }
        }
    # past
    else:
        fake_list = [0, 0, 0, 0, 0,
                     0, 0, 0, 0, 7.46]
        return{
            "daily": {
                "display": {
                    "date": [24, 25, 26],
                    "month": [3, 3, 3],
                    "year": [2022, 2022, 2022],
                    "values": [fake_list[-3], fake_list[-2], fake_list[-1]]
                },
                "graph": {
                    "xAxis": ["16/03/22", "17/03/22", "18/03/22", "19/03/22", "20/03/22", "21/03/22", "22/03/22", "23/03/22", "24/03/22", "25/03/22", "26/03/22"],
                    "yAxis": fake_list
                }
            },
            "monthly": {
                "display": {
                    "month": [],
                    "year": [],
                    "values": []
                },
                "graph": {
                    "xAxis": [],
                    "yAxis": []
                }
            },
            "yearly": {
                "display": {
                    "year": [],
                    "values": []
                }
            }
        }


def get_dashboard_logs(data, cur, conn, rtype):
    # print(data['datte'])
    # print(data['message'])
    if(rtype=="POST"):
        cur.execute(f"INSERT INTO Logs VALUES(16,'{data['datte']}','{data['message']}')")
        conn.commit()
    z = cur.execute("SELECT datte,message from Logs where user_id = 16").fetchall()
    z.reverse()
    return {
        'logs' : z
    }

    

'''
[9.50,9.53,8.66, 7.26, 7.57, 9.31, 10.33, 11.07, 11.06, 11.55]

Battery Page:

Get:

{
        chargeTill: "80%",
        dischargeTill: "20%",
        batteryType: "Lithium Ion",
        batteryVoltage: "3.7v (1s)",
        batteryAmp: "100MAh",
        graph: {
            xAxis: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
            yAxis: [95, 80, 60, 75, 63, 64, 65, 66, 67, 68]
        }
}


Post:

{
        chargeTill: "80%",
        dischargeTill: "20%",
        batteryType: "Lithium Ion",
        batteryVoltage: "3.7v (1s)",
        batteryAmp: "100MAh"
    }
'''
