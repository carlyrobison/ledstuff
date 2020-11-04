#include <FastLED.h>

FASTLED_USING_NAMESPACE

#if defined(FASTLED_VERSION) && (FASTLED_VERSION < 3001000)
#warning "Requires FastLED 3.1 or later; check github for latest code."
#endif

#define DATA_PIN    26 // PIN A0 is GPIO 26
#define LED_TYPE    WS2812
#define COLOR_ORDER GRB
#define NUM_LEDS    64
CRGB leds[NUM_LEDS];

#define BRIGHTNESS          96
#define FRAMES_PER_SECOND  120

// put your setup code here, to run once:
void setup() {
  delay(3000); // 3 second delay for recovery
  
  // tell FastLED about the LED strip configuration
  FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);

  // set master brightness control
  FastLED.setBrightness(BRIGHTNESS);
}

void loop() {
  // Turn the LED on, then pause
  
  leds[0] = CRGB::Purple;
  FastLED.show();
  delay(500);

  leds[0] = CRGB::Blue;
  FastLED.show();
  delay(500);

  leds[0] = CRGB::Green;
  FastLED.show();
  delay(500);

  leds[0] = CRGB::Yellow;
  FastLED.show();
  delay(500);

  leds[0] = CRGB::Red;
  FastLED.show();
  delay(500);
}
