var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var xSpeed = 5;
var ySpeed = 3;
var radius = 30;
var minSec = 3000;
var maxSec = 4000;
var clickLimit = 4;
var timeOfAnimation = clickLimit*(maxSec + 2000);

var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

var Ball = function (xSpeed, ySpeed, radius, clickLimit) {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.isFilled = false;
    this.clickable = true;
    this.clickCount = 0; // Счетчик кликов
    this.clickLimit = clickLimit; // Максимальное количество кликов
};

Ball.prototype.move = function () {
    // Проверка на выход за границы по горизонтали
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
        this.xSpeed = -this.xSpeed;
    }
    // Проверка на выход за границы по вертикали
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
        this.ySpeed = -this.ySpeed;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
};

Ball.prototype.draw = function () {
    circle(this.x, this.y, this.radius, this.isFilled);
};

var ball = new Ball(xSpeed, ySpeed, radius, clickLimit);

// Массив с интервалами
var intervals = [Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec, 2000];

// Текущий индекс интервала
var currentIntervalIndex = 0;

// Функция для смены интервала
function changeInterval() {

    currentIntervalIndex++;
    if (currentIntervalIndex == 1) {
        intervals[0] = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
        console.log(intervals[0]);
    }
    if (currentIntervalIndex >= intervals.length) {
        currentIntervalIndex = 0;
    }
}

Ball.prototype.toggleFill = function () {
    this.isFilled = !this.isFilled;
    this.clickable = true;
    changeInterval();
    if (this.isFilled && this.clickCount < this.clickLimit) {
        canvas.addEventListener("click", clickHandler);
    } else {
        canvas.removeEventListener("click", clickHandler);
    }
    setTimeout(function () {
        if(ball.clickCount < ball.clickLimit){
            ball.toggleFill();
        }
    }, intervals[currentIntervalIndex]);
};

setTimeout(function () {
    if(ball.clickCount < ball.clickLimit)
    {ball.toggleFill();}
}, intervals[currentIntervalIndex]);

function clickHandler(event) {
    if (ball.clickable) {
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
        if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius  && ball.clickable && ball.clickCount < ball.clickLimit) {
            ball.clickCount++;
            console.log("КЛИК");
            ball.clickable = false;
            if (ball.clickCount >= ball.clickLimit) {
            ball.isFilled = false; // Если достигнуто максимальное количество кликов, круг больше не закрашивается
            // И кликабельность круга отключается
            console.log("Достигнуто максимальное количество кликов");
        }

        }
    }
}

var animationTimer = setTimeout(function () {
    clearInterval(animationInterval);
    console.log("Конец анимации")
}, timeOfAnimation); // Установка таймера на всю длительность анимации


var animationInterval = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    ball.draw();
    ball.move();
    ctx.strokeRect(0, 0, width, height);
}, 30);
