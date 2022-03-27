

def calculate_total_power(data):
    
    if (data["user_data"]["type"] == "wattage"):
        #print(data["pred_value"]*4000)
        power = data["pred_value"] * int(data["user_data"]["panel_wattage"])
    else:
        power = data["pred_value"] * data["user_data"]["panel_area"] * \
            (data["user_data"]["panel_efficiency"] / 100)

    return power


def calculate_power_temp(power,temp):
    gamma = 0.258
    if(temp > 25):
        change_temp = temp-25
        total_percent = change_temp * gamma
        new_power = power - (total_percent/100) * power
        return new_power
    else:
        return power


# Examples
# print(calculate_total_power({
#     "user_data": {
#         "type": "efficiency",
#         "panel_area": 16,
#         "panel_efficiency": 30
#     },
#     "pred_value": 5,
#     "type": "monthly",
#     "month": 1,
#     "year": 2020
# }))
# print(calculate_total_power({
#     "user_data": {
#         "type": "wattage",
#         "panel_wattage": 5
#     },
#     "pred_value": 5,
#     "type": "monthly",
#     "month": 1,
#     "year": 2020
# }))