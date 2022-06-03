#include <core_build_options.h>
#include <swRTC.h>

swRTC rtc;  

#include "MPU6050.h"
#include "Wire.h"
 
MPU6050 accelgyro;
 
int16_t ax, ay, az;
int16_t gx, gy, gz;

int leftVibration = 5;
int rightVibration = 6;
int vibrationSensor = A0;
int pressureSensor = A1;
int startTime;
void setup() {
  
  Wire.begin();
  Serial.begin(38400);
  rtc.stopRTC();            //정지
  rtc.setTime(14, 46, 10);  //시, 분, 초
  rtc.setDate(3, 6, 2022); //일, 월, 년
  rtc.startRTC();           //시작
  accelgyro.initialize();
  
  Serial.println("LABEL, time, vibration, pressure, z_tilt");
  pinMode(leftVibration, OUTPUT);
  pinMode(rightVibration, OUTPUT);

  startTime = millis();
}

void loop() {
  int vibration = analogRead(vibrationSensor);
  int pressure = analogRead(pressureSensor);
  accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  Serial.print("DATA, ");
  digitalClockDisplay();
  Serial.print(",");
  Serial.print(1023 - vibration);
  Serial.print(",");
  Serial.print(pressure);
  Serial.print(",");
  Serial.println(ax);
  
  analogWrite(leftVibration, 0);
  analogWrite(rightVibration, 0);
  delay(500);
}

void digitalClockDisplay(){
  // digital clock display of the time
  Serial.print(rtc.getHours(), DEC);
  Serial.print(":");
  Serial.print(rtc.getMinutes(), DEC);
  Serial.print(":");
  Serial.print(rtc.getSeconds(), DEC);
  Serial.print(" "); 

  Serial.print(rtc.getYear(), DEC);
  Serial.print("/");
  Serial.print(rtc.getMonth(), DEC);
  Serial.print("/");
  Serial.print(rtc.getDay(), DEC);
}
