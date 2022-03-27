from days_months_calc import get_next_date
from power_calc import calculate_total_power, calculate_power_temp
from irradiance_model import train_model_irradiance_daily
from tempreature_model import train_model_tempreature_daily
import random

random.seed(0)

def getlocation(cur):
    lat, lon = cur.execute(
        "SELECT latitude, longitude from USERS where user_id=16").fetchall()[0]
    return {
        "lat": lat,
        "lon": lon
    }


def nasa_data_fetch(cur):

    z = cur.execute("SELECT wattage from USERS where user_id=16").fetchall()[0]
    wattage = z[0]

    location = getlocation(cur)
    loc = {
        "latitude": location["lat"],
        "longitude": location["lon"]
    }

    #print(wattage)
    daily_irradiance_model = train_model_irradiance_daily(loc)
    daily_tempreature_model = train_model_tempreature_daily(loc)

    ten_days_keys = []
    ten_days_values = []

    d_date, d_month, d_year = "30", "11", "2021"

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

        ten_days_keys.append(key)
        ten_days_values.append(power_temp)

        d_date, d_month, d_year = get_next_date(d_date, d_month, d_year)

    return {
        'ten_days_keys': ten_days_keys,
        'ten_days_values': ten_days_values
    }



def dec_by_8_13(x):
    z = random.choice(list(range(5,15)))
    dec_val = z/100 * x
    return x - dec_val