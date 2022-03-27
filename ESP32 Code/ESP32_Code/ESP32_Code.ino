#define BLYNK_AUTH_TOKEN  "z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu"
#define BLYNK_PRINT Serial
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <ESP32Servo.h>
#include "ACS712.h"

Servo servo;

ACS712  ACS_PANELCURRENT(A0, 3.3, 4095, 185);
ACS712  ACS_BATTERYCURRENT(A10, 3.3, 4095, 185);

char auth[] = BLYNK_AUTH_TOKEN;

char ssid[] = "Keerthivasan";
char pass[] = "1234567890";

#define PANELVOLTAGE A4 
#define BATTERYVOLTAGE A5

int panel_voltage;
int battery_voltage;

float panelvolt = 0.0;
float batteryvolt = 0.0;
float R1 = 30000.0;
float R2 = 7500.0;
float in1_volt = 0;
float in2_volt = 0;

void setup()
{
Serial.begin(115200);
Blynk.begin(auth, ssid, pass);
ACS_PANELCURRENT.autoMidPoint();
ACS_BATTERYCURRENT.autoMidPoint();
servo.attach(25);
}

void loop()
{
panel_voltage = analogRead(PANELVOLTAGE);
panelvolt = (panel_voltage*3.3)/4095;
in1_volt = panelvolt/(R2/(R1+R2))+0.70;
Serial.println(in1_volt);

battery_voltage = analogRead(BATTERYVOLTAGE);
batteryvolt = (battery_voltage*3.3)/4095;
in2_volt = batteryvolt/(R2/(R1+R2))+0.70;
Serial.println(in2_volt);

float panel_mA = ACS_PANELCURRENT.mA_DC()*10000;
float battery_mA = ACS_BATTERYCURRENT.mA_DC()*10000;
Serial.print("Panel Current: ");
Serial.println(panel_mA);
Serial.println(battery_mA);

Blynk.virtualWrite(V2, in1_volt);
Blynk.virtualWrite(V3, in2_volt);
Blynk.virtualWrite(V6, panel_mA);
Blynk.virtualWrite(V7, battery_mA);

Blynk.run();
delay(1000);
}
BLYNK_WRITE(V1)
{
servo.write(param.asInt());
}
