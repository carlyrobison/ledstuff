# LED Stuff


## Purpose

To easily display

## Getting Started

### Hardware
- WS2812B strip of 60 LEDS * 5M
- Adafruit ESP32 Feather board
- 5V * 1A power adapter
- Breadboard and pins as needed
- 330 ohm resistor on data line since I heard that's good
- TODO: Wiring Diagram

### Software
- Download the Arduino IDE
- Add ESP32 board definitions (Arduino -> Preferences -> Additional Board Manager URLs -> https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json)
- Install ESP32 board definitions (Tools -> Board -> Boards Manager... -> esp32 -> Install)
- Install FastLED (Tools -> Manage Libraries... -> FastLED -> Install)
- Install USB to UART driver if necessary (https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)
- Clone this repo! And then upload to the board

## Credits: Zoe and Carly
