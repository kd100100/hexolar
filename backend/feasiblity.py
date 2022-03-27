import requests

# Module imports
from power_calc import calculate_total_power, calculate_power_temp


def check_feasibility(location):

    parameters = "ALLSKY_SFC_SW_DWN,T2M_MAX"
    year = '2020'
    request = "https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=" + \
        parameters + "&community=RE&longitude=" + \
        str(location["longitude"]) + "&latitude=" + \
        str(location["latitude"]) + "&format=JSON&start=2020&end=2020"
    response = requests.get(request).json()

    # print(request)

    irradiance_value = response['properties']['parameter']['ALLSKY_SFC_SW_DWN'][year+'13']
    temp_value = response['properties']['parameter']['T2M_MAX'][year+'13']

    power = calculate_total_power({
        "user_data": {
            "type": "wattage",
            "panel_wattage": 4
        },
        "pred_value": irradiance_value
    })

    power_temp = calculate_power_temp(power, temp_value)
    total_power = power_temp * 365

    status = "success"
    if(irradiance_value >= 6):
        rate = 2
        #comment = "Wow!! You have the capacity to give a thundershock stronger than Pikachu!"
        #feedback = "It is Highly Feasible!"
        line1 = "Wow!! You have the capacity"
        line2 = "to give a thundershock"
        line3 = "stronger than Pikachu!"
    elif(irradiance_value >= 3.5 and irradiance_value < 6):
        rate = 1
        status = "medium"
        #comment = "Bingo, you can play GTA V for an entire year with the power you will be generating for 3 months."
        #feedback = "It is Feasible!"
        line1 = "Bingo, you can play GTA V for an"
        line2 = "entire year with the power you"
        line3 = "will be generating for 3 months."
    else:
        rate = 0
        status = "fail"
        #comment = "Oops, you have only enough sunshine over your rooftop to light a bulb for 1 year."
        #feedback = "It is Not Feasible!"
        line1 = "Oops, you have only enough"
        line2 = "sunshine over your rooftop to"
        line3 = "light a bulb for 1 year."

    return {
        "status": status,
        "amount": round(total_power, 2),
        "line1": line1,
        "line2": line2,
        "line3": line3
    }
    # return {
    #     "status": status,
    #     "rate": rate,
    #     "amount": total_power,
    #     "comment": comment,
    #     "feedback": feedback
    # }

# Example
# print(check_feasibility({
#     "latitude": "13",
#     "longitude": "80"
# }))


# {
#     "status": "high",
#     "amount": "7329.2",
#     "line1": "Wow!! You have the capacity",
#     "line2": "to give a thundershock",
#     "line3": "stronger than Pikachu!"
# }
# {
#     "status": "medium",
#     "amount": "7329.2",
#     "line1": "Bingo, you can play GTA V for an",
#     "line2": "entire year with the power you",
#     "line3": "will be generating for 3 months."
# }
# {
#     "status": "low",
#     "amount": "7329.2",
#     "line1": "Oops, you have only enough",
#     "line2": "sunshine over your rooftop to",
#     "line3": "light a bulb for 1 year."
# }
