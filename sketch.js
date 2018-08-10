var canvasWidth;
var canvasHeight;
var numTones;

var allGeometries;
var startPosX;
var startPosY;
var defaultWidth;
var defaultHeight;
const colorDeviation = 10;
const hoverDeviation = 35;


function setup() {
    numTones = 8;

    allGeometries = new Array();
    startPosX = 20;
    startPosY = 100;
    defaultWidth = 100;
    defaultHeight = 400;
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
        var posX = startPosX + defaultWidth * i;
        var posY = startPosY;
        var rainbowHueBase = i * (255 / numTones);
        var obj = {
            'x': posX,
            'y': posY,
            'w': defaultWidth,
            'height': defaultHeight,
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
    textSize(40);
    text('my first internet xylophone!', 10, 40);
    textSize(20);
    text('(re-fresh for more tones & colors)', 10, 70);

    // coords for triangle stand
    // var x1 = startPosX + defaultWidth * numTones - 20;
    // var y1 = startPosY + defaultHeight / 2 - 150;
    // var x2 = startPosX + defaultWidth * numTones - 20;
    // var y2 = startPosY + defaultHeight / 2 + 150;
    // var x3 = startPosX + defaultWidth * numTones + 100;
    // var y3 = startPosY + defaultHeight / 2;
    fill('#a9e510');
    // triangle(x1, y1, x2, y2, x3, y3);
    // single circle stand
    // ellipse(startPosX + defaultWidth * numTones, startPosY + defaultHeight / 2, 150, 150);
    // double circle stand
    ellipse(startPosX + defaultWidth * numTones, startPosY, 75, 75);
    ellipse(startPosX + defaultWidth * numTones, startPosY + defaultHeight, 75, 75);

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
