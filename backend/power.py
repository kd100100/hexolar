# Module Imports
from irradiance_model import train_model_irradiance_daily, train_model_irradiance_monthly
from tempreature_model import train_model_tempreature_daily, train_model_tempreature_monthly
from days_months_calc import get_next_date, get_next_month, get_days
from power_calc import calculate_total_power, calculate_power_temp


def predict_power(ipType, data):

    print("------->", data)

    daily_irradiance_model = train_model_irradiance_daily(data["location"])
    monthly_irradiance_model = train_model_irradiance_monthly(data["location"])

    daily_tempreature_model = train_model_tempreature_daily(data["location"])
    monthly_tempreature_model = train_model_tempreature_monthly(
        data["location"])

    # print(daily_irradiance_model.predict([[data["time"]["date"], data["time"]["month"], data["time"]["year"]]]))

    result = {
        "next5days": {},
        "next5months": {},
        "next5years": {}
    }

    d_date, d_month, d_year = data["time"]["date"], data["time"]["month"], data["time"]["year"]
    m_month, m_year = data["time"]["month"], data["time"]["year"]
    y_year = data["time"]["year"]
    for i in range(5):

        # days
        key = d_date + "/" + d_month + "/" + d_year
        irradiance = daily_irradiance_model.predict(
            [[int(d_date), int(d_month), int(d_year)]])[0]
        temperature = daily_tempreature_model.predict(
            [[int(d_date), int(d_month), int(d_year)]])[0]

        if ipType == "wattage":
            power = calculate_total_power({
                "user_data": {
                    "type": "wattage",
                    "panel_wattage": data["panel_wattage"],
                },
                "pred_value": irradiance
            })
        else:
            power = calculate_total_power({
                "user_data": {
                    "type": "efficiency",
                    "panel_area": data["panel_area"],
                    "panel_efficiency": data["panel_efficiency"]
                },
                "pred_value": irradiance
            })

        power_temp = calculate_power_temp(power, temperature)

        result["next5days"][key] = power_temp

        # months
        key = m_month + "/" + m_year
        irradiance = monthly_irradiance_model.predict(
            [[int(m_month), int(m_year)]])[0]
        temperature = monthly_tempreature_model.predict(
            [[int(m_month), int(m_year)]])[0]

        if ipType == "wattage":
            power = calculate_total_power({
                "user_data": {
                    "type": "wattage",
                    "panel_wattage": data["panel_wattage"],
                },
                "pred_value": irradiance
            })
        else:
            power = calculate_total_power({
                "user_data": {
                    "type": "efficiency",
                    "panel_area": data["panel_area"],
                    "panel_efficiency": data["panel_efficiency"]
                },
                "pred_value": irradiance
            })

        power_temp = calculate_power_temp(
            power, temperature) * get_days(m_month, m_year)

        result["next5months"][key] = power_temp

        # years
        key = y_year
        sum = 0
        # print("#######################################################")
        # print(y_year)
        for i in range(12):
            if i == 0: 
                #print("---", i+1, y_year, monthly_irradiance_model.predict(
                #[[i+1, int(y_year)]])[0])
                pass
            irradiance=monthly_irradiance_model.predict([[i+1, int(y_year)]])[0]
            temperature=monthly_tempreature_model.predict([[i+1, int(y_year)]])[0]

            if ipType == "wattage":
                power=calculate_total_power({
                    "user_data": {
                        "type": "wattage",
                        "panel_wattage": data["panel_wattage"],
                    },
                    "pred_value": irradiance
                })
            else:
                power=calculate_total_power({
                    "user_data": {
                        "type": "efficiency",
                        "panel_area": data["panel_area"],
                        "panel_efficiency": data["panel_efficiency"]
                    },
                    "pred_value": irradiance
                })

            sum += calculate_power_temp(power,
                                        temperature) * get_days(i+1, y_year)
        # print("#######################################################")
        # print(">>>>>>>>>>>>>>>>>>>>", y_year, sum)

        result["next5years"][key]=sum

        d_date, d_month, d_year=get_next_date(d_date, d_month, d_year)
        m_month, m_year=get_next_month(m_month, m_year)
        y_year=str(int(y_year) + 1)

    return result

# train_model_power({
#     "location": {
#         "latitude": "13",
#         "longitude": "80"
#     }
# })
# print(predict_power("wattage", {
#     "location": {
#         "latitude": "13",
#         "longitude": "80"
#     },
#     "time": {
#         "date": "01",
#         "month": "05",
#         "year": "2021"
#     },
#     "panel_wattage": 5
# }))
