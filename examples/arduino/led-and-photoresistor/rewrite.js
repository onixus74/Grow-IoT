// Require the Grow.js build and johnny-five library.
var GrowInstance = require('../../../dist/Grow.umd.js');
var five = require('johnny-five');

// Create a new board object
var board = new five.Board();

// When board is ready run this start function.
board.on("ready", function start() {
    // Define variables
    // Note: if you wire the device slightly differently you may need to
    // change the pin numbers below.
    var LED = new five.Pin(13),
        lightSensor = new five.Sensor("A0");

    // Create a new grow instance.
    var grow = new GrowInstance({
        name: "Light", // The display name for the thing.
        id: "Light",
        desription: "An LED light with a basic on/off api.",
        username: "jakehart", // The username of the account you want this device to be added to.
        properties: { // These can be updated by the API.
            state: "off",
            lightconditions: function () {
                return 'unset';
            }
        },
        actions: {
            "on": {
                name: "On", // Display name for the action
                description: "Turns the light on.", // Optional description
                schedule: "at 9:00am", // Optional scheduling using later.js
                event: "Light turned on", // Optional event to emit when called.
                function: function () {
                    // The implementation of the action.
                    LED.high();
                    grow.setProperty('state', 'on');
                }
            },
            "off": {
                name: "off",
                schedule: "at 8:30pm",
                event: "Light turned off",
                function: function () {
                    LED.low();
                    grow.setProperty('state', 'off');
                }
            },
            "log_light_data": {
                name: "Log light data", // Events get a display name like actions
                type: "light", // Currently need for visualization component... HACK.
                template: "sensor",
                schedule: "every 1 second", // Events should have a schedule option that determines how often to check for conditions.
                function: function () {
                    // function should return the event to emit when it should be emited.
                    grow.sendData({
                      type: "light",
                      value: lightSensor.value
                    });
                }
            }
        },
        events: {
            "dark": {
                name: "It's dark.",
                on: 'light_data', // Hook into an action.
                function: function () {
                    if (lightSensor.value < 100 && grow.thing.getProperty('lightconditions') != 'dark') {
                        // This could be nice with a chaining API...
                        grow.emitEvent('dark');
                        grow.thing.setProperty('lightconditions', 'dark');
                        grow.thing.callAction('turn_light_on');
                    }
                }
            }
        }
    });
});
