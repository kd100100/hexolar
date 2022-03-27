from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import json
import sqlite3
print("Starting Import of Dashboard")
from dashboard import *
print("Completed Import of Dashboard")
from utils import getlocation, nasa_data_fetch
from datetime import datetime

# Module imports
from feasiblity import check_feasibility
from power import predict_power

print("Imported Modules")

# database Init
conn = sqlite3.connect('hexolar.db', check_same_thread=False)
cur = conn.cursor()

# cur.execute(
#     "CREATE TABLE Panel_settings (user_id TEXT, automatic TEXT, gridType TEXT)")
# conn.commit()
#cur.execute("Insert into Panel_settings values(16,1,'Hybrid Grid')")
# conn.commit()
#data = cur.execute("SELECT * from panel_settings").fetchall()
# print(data)
#cur.execute(f"CREATE TABLE USERS (user_id TEXT,latitude TEXT,longitude TEXT,auto_tilt TEXT,wattage TEXT)")
# conn.commit()
#cur.execute("INSert INTO USERS VALUES ('16','13.4562','80.8776','0','4000')")
# conn.commit()
#cur.execute(f"CREATE TABLE Logs (user_id TEXT,datte TEXT,message TEXT)")
# conn.commit()

# zxc = cur.execute("SELEct * from logs").fetchall()
# print(zxc)

#data = cur.execute("SELECT * FROM USERS").fetchall()
#print("data", data)

# Flask App
app = Flask(__name__)
CORS(app)

# Check Feasiblity of Solar Panels


@app.route('/feasiblity')
def feasibility_route():

    data = request.args["data"]
    data = json.loads(data)
    result = check_feasibility(data)
    print(result)

    return result


# Predict Solar Panels Output Power
# Future performance
@app.route('/predict-power/wattage')
def predict_wattage_route():

    # input - userid = 1
    # firebase - userid's solar panel details {'panel_type': '', 'panel_size': '', 'panel_eff': ''}

    data = request.args["data"]
    data = json.loads(data)
    result = predict_power('wattage', data)

    return result


@app.route('/predict-power/efficiency')
def predict_efficiency_route():

    data = request.args["data"]
    data = json.loads(data)
    result = predict_power('efficiency', data)

    return result


@app.route('/dashboard/battery', methods=['GET', 'POST'])
def dashboard_battery():
    data = []
    # print(request.args)
    if(request.method == "POST"):
        data = request.args["data"]
        data = json.loads(data)
        result = get_dashboard_battery(data, cur, conn, "POST")
    else:
        result = get_dashboard_battery(data, cur, conn, "GET")
    return result


@app.route("/dashboard/tilt", methods=["GET", "POST"])
def dashboard_tilt():
    data = []
    # print(request.args)
    if(request.method == "POST"):
        data = request.args["data"]
        data = json.loads(data)
        result = get_dashboard_tilt(data, cur, conn, "POST")
    else:
        result = get_dashboard_tilt(data, cur, conn, "GET")
    return result


@app.route("/dashboard/location", methods=["GET", "POST"])
def dashboard_location():
    return getlocation(cur)


@app.route("/dashboard/grid", methods=["GET", "POST"])
def dashboard_grid():
    data = []
    # print(request.args)
    if(request.method == "POST"):
        data = request.args["data"]
        data = json.loads(data)
        result = get_dashboard_grid(data, cur, conn, "POST")
    else:
        result = get_dashboard_grid(data, cur, conn, "GET")
    return result


@app.route("/dashboard/compare")
def dashboard_compare():
    return get_dashboard_compare(cur)


@app.route("/dashboard/futurepast")
def dashboard_future():
    data = request.args["data"]
    data = json.loads(data)
    if data['comp'] == "both":
        return{
            "future": get_dashboard_futurepast({"comp": "future"}, cur),
            "past": get_dashboard_futurepast({"comp": "past"}, cur)
        }
    return get_dashboard_futurepast(data, cur)


@app.route("/dashboard")
def dashboard():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print("Current Time =", current_time)
    future = get_dashboard_futurepast({"comp": "future"}, cur)
    print("future done")
    past = get_dashboard_futurepast({"comp": "past"}, cur)
    print("past done")
    efficiency = get_dashboard_compare(cur)
    print("efficiency done")
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print("Current Time =", current_time)
    return{
        "future": future,
        "past": past,
        "efficiency": efficiency
    }


@app.route("/dashboard/logs", methods=['POST', 'GET'])
def dashboard_logs():
    data = []
    if(request.method == "POST"):
        data = request.args["data"]
        data = json.loads(data)
        result = get_dashboard_logs(data, cur, conn, "POST")
    else:
        result = get_dashboard_logs(data, cur, conn, "GET")
    return result


if __name__ == '__main__':
    app.run(debug=True)
    conn.close()
