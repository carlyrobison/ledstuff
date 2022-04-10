#include <ssl_client.h>
#include <FastLED.h>
#include "ArduinoJson.h"
//#include <Arduino.h>
//
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include "secrets.h"

FASTLED_USING_NAMESPACE

#if defined(FASTLED_VERSION) && (FASTLED_VERSION < 3001000)
#warning "Requires FastLED 3.1 or later; check github for latest code."
#endif

#define DATA_PIN    26 // PIN A0 is GPIO 26
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB
#define NUM_LEDS    3

// Current time
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0; 
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

// Variable to store the HTTP request
String header;

CRGB leds[NUM_LEDS];
CRGB rainbow[6] = {CRGB::Purple, CRGB::Blue, CRGB::Green, CRGB::Yellow, CRGB::Orange, CRGB::Red};
int i = 0;

#define BRIGHTNESS          50
#define FRAMES_PER_SECOND    6

WiFiMulti WiFiMulti;
// defined in secrets.h
char ssid[] = SECRET_SSID;   // your network SSID (name) 
char pass[] = SECRET_PASS;   // your network password

void fillLED(int n, CRGB color) {
  leds[n] = color;
}

void fillLED(int n, CHSV color) {
  leds[n] = color;
}

void fillLEDs(CRGB color) {
  for (int i = 0; i < NUM_LEDS; i++) {
    fillLED(i, color);
  }
}

// put your setup code here, to run once:
void setup() {
  Serial.begin(115200);
  Serial.println();

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SECRET_SSID, SECRET_PASS);

  // tell FastLED about the LED strip configuration
  FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(BRIGHTNESS);
  delay(3000); // 3 second delay for recovery
  
  fillLEDs(CRGB::Red);
  FastLED.show();

//   wait for WiFi connection
  Serial.println("Waiting for WiFi to connect...");
  while ((WiFiMulti.run() != WL_CONNECTED)) {
    Serial.println(".");
  }
  Serial.println(" connected");

  fillLED(0, CRGB::Green);
  FastLED.show();
}

void loop() {
  webLoop();
  
  FastLED.show();
  delay(1000/FRAMES_PER_SECOND);
}

void parseJson(String msg){
  String msg2 = "{'lights':[[241,100,100]]}";
  StaticJsonDocument<300> doc;  // consider more buffer
  auto error = deserializeJson(doc, msg2);

  if (error) { //Check for errors in parsing
    Serial.print(F("deserializeJson() failed with code "));
    Serial.println(error.c_str());
    delay(1000);
    return;
  }

  serializeJson(doc, Serial);

  JsonArray a = doc["lights"].as<JsonArray>();
  for (JsonVariant v : a) {
    JsonArray light = v.as<JsonArray>();
    Serial.println(light[0].as<int>());
//    Serial.println(lightVals[i][0], lightVals[i][1], lightVals[i][2]);
//    Serial.println(lightVals[i][0]);
    fillLED(i, CRGB(light[0].as<int>(), light[1].as<int>(), light[2].as<int>()));
  }
}

void webLoop(){
  Serial.println();
  Serial.println("Waiting 1s before the next round...");
  delay(5000);
  HTTPClient http;

  Serial.print("[HTTP] begin...\n");
  if (http.begin(IP_ADDRESS, PORT)) {
    Serial.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println(payload);
        parseJson(payload);
        
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.printf("[HTTP] Unable to connect\n");
  }
}
