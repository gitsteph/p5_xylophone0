var canvasWidth;
var canvasHeight;
var numTones;

var allGeometries;
const colorDeviation = 10;
const hoverDeviation = 35;


function setup() {
    numTones = 8;

    allGeometries = new Array();
    var startPosX = 0;
    var startPosY = 100;
    var w = 100;
    var height = 400;
    for (var i=0; i < numTones; i++) {
        // instantiate oscillator
        var env = new p5.Envelope();
        env.setADSR(.001, .2, .2, .5);
        env.setRange(0.4, 0.0);
        var osc = new p5.Oscillator();
        osc.setType('sine');
        var freqBase = 200 + i * (800 / numTones);
        var freqDeviation = 20;
        osc.freq(random((freqBase - freqDeviation), (freqBase + freqDeviation)));
        osc.amp(env);
        osc.start();

        // declare rect properties
        var posX = startPosX + w * i;
        var posY = startPosY;
        var rainbowHueBase = i * (255 / numTones);
        var obj = {
            'x': posX,
            'y': posY,
            'w': w,
            'height': height,
            'hue': int(random((rainbowHueBase - colorDeviation), (rainbowHueBase + colorDeviation))),
            's': random(150, 255),
            'b': random(150, 220),
            'env': env,
            'mouseOverBool': false
        };
        allGeometries.push(obj);
    }

    canvasWidth = windowWidth * 0.97;
    canvasHeight = windowHeight * 0.97;
    createCanvas(canvasWidth, canvasHeight);
    background(random(['#CEE5F2', '#3A405A', '#FFD2FC', '#FFEBE7',]));
}

function mouseOverCheck(targetRect) {
    var isInsideTargetRect = false;
    if (mouseX >= targetRect.x && mouseX <= (targetRect.x + targetRect.w) 
        && mouseY >= targetRect.y && mouseY <= (targetRect.y + targetRect.height)) {
        isInsideTargetRect = true;
    }
    return isInsideTargetRect;
}

function draw() {
    cursor(ARROW);
    for (var i = 0; i < allGeometries.length; i++) {
        var currentRect = allGeometries[i];
        currentRect.mouseOverBool = mouseOverCheck(currentRect);
        if (currentRect.mouseOverBool == true) {
            cursor(HAND);
            var hue = currentRect.hue;
            var s = currentRect.s;
            var b = currentRect.b + hoverDeviation;
            currentRect.env.play();
        } else {
            var hue = currentRect.hue;
            var s = currentRect.s;
            var b = currentRect.b;
        }
        colorMode(HSB, 255);
        fill(hue, s, b, 255);
        rect(currentRect.x, currentRect.y, currentRect.w, currentRect.height, 20);
    }
}

function mousePressed() {

}
