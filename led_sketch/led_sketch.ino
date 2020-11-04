#include <FastLED.h>

CRGB leds[1];
void setup() { FastLED.addLeds<WS2812B, 26>(leds, 1); }
void loop() { 
        leds[0] = CRGB::White; FastLED.show(); delay(300); 
        leds[0] = CRGB::Black; FastLED.show(); delay(300);
}
