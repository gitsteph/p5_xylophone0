var canvasWidth;
var canvasHeight;
var numTones;

var allGeometries;
const hoverDeviation = 100;


function setup() {
    numTones = 8;

    allGeometries = new Array();
    var startPosX = 0;
    var startPosY = 100;
    var w = 100;
    var h = 400;
    for (var i=0; i < numTones; i++) {
        var posX = startPosX + w * i;
        var posY = startPosY;
        var obj = {
            'x': posX,
            'y': posY,
            'w': w,
            'h': h,
            'r': random(255),
            'g': random(255),
            'b': random(255),
            'mouseOverBool': false
        };
        allGeometries.push(obj);
    }

    canvasWidth = windowWidth * 0.97;
    canvasHeight = windowHeight * 0.97;
    createCanvas(canvasWidth, canvasHeight);
    background('#FAE');
}

function mouseOverCheck(targetRect) {
    var isInsideTargetRect = false;
    if (mouseX >= targetRect.x && mouseX <= (targetRect.x + targetRect.w) 
        && mouseY >= targetRect.y && mouseY <= (targetRect.y + targetRect.h)) {
        isInsideTargetRect = true;
    }
    return isInsideTargetRect;
}

function draw() {
    cursor(HAND);
    for (var i = 0; i < allGeometries.length; i++) {
        var currentRect = allGeometries[i];
        currentRect.mouseOverBool = mouseOverCheck(currentRect);
        if (currentRect.mouseOverBool == true) {
            var r = currentRect.r + hoverDeviation;
            var g = currentRect.g + hoverDeviation;
            var b = currentRect.b + hoverDeviation;
        } else {
            var r = currentRect.r;
            var g = currentRect.g;
            var b = currentRect.b;
        }
        fill(r, g, b, 255);
        rect(currentRect.x, currentRect.y, currentRect.w, currentRect.h, 20);
    };
}

function mousePressed() {

}
