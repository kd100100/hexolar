import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import requests

def train_model_irradiance_daily(data):

    parameters = "ALLSKY_SFC_SW_DWN"
    request = "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=" + parameters + "&community=RE&longitude=" + \
        data["longitude"] + "&latitude=" + data["latitude"] + "&start=20000101&end=20201231&format=JSON"
    response = requests.get(request).json()
    # print(request)
    # print(response)
    #print("Received Data")

    # Creating the dataframe
    series = pd.Series(response["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"])
    df = pd.DataFrame(series)

    # Data Preprocessing
    df.reset_index(inplace=True)
    df.rename(columns={0: 'value', 'index': 'date'}, inplace=True)
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')

    # Feature Engineering
    df['day'] = df['date'].dt.day
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    df.drop(columns='date', inplace=True)

    # Splitting the data into training and testing
    X = df.drop(columns=['value'])
    y = df['value']
    #print("Preprocessed Data")

    # Training the models
    rf = RandomForestRegressor(max_depth=9)
    rf.fit(X, y)
    #print("Trained Models")

    return rf


def train_model_irradiance_monthly(data):

    parameters = "ALLSKY_SFC_SW_DWN"
    request = "https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=" + parameters + "&community=RE&longitude=" + data["longitude"] + "&latitude=" + data["latitude"] + "&format=JSON&start=2000&end=2020"
    response = requests.get(request).json()
    #print("Received Data")

    # Creating the dataframe
    series = pd.Series(response["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"])
    df = pd.DataFrame(series)

    # Data Preprocessing
    df.reset_index(inplace=True)
    df.rename(columns={0:'value','index':'date'}, inplace=True)
    df['date']=df['date']+'01'

    drop_list=[]
    for i in range (len(df)):
        if '13' in df.iloc[i,0][4:]:
            drop_list.append(i)
    df=df.drop(drop_list)

    df.reset_index(inplace=True)
    df['date']=pd.to_datetime(df['date'],format='%Y%m%d')

    # Feature Engineering
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    df.drop(columns='date',inplace=True)
    df.drop(columns='index',inplace=True)
    ##print(df.shape)
    
    # Splitting the data into training and testing
    X = df.drop(columns=['value'])
    y = df['value']
    #print("Preprocessed Data")

    rf = RandomForestRegressor(max_depth=9)
    rf.fit(X, y)
    #print("Trained Models")

    return rf

# train_model_irradiance_monthly({
#     "latitude": "13",
#     "longitude": "80"
# })