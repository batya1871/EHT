var canvas_blink = document.getElementById("canvas-blink");
if (canvas_blink != null){
    var ctx = canvas_blink.getContext("2d");
var width = canvas_blink.width;
var height = canvas_blink.height;
//Настройка диапазона прыжка
var maxSpeed = 200;
var minSpeed = -200;
//Радиус
var radius = 30;
//Настройка диапазона между нажатиями
var minSec = 3000;
var maxSec = 4000;
var blink_intervals = 700; //Сколько прыгает (харкодится внизу)
var FilledTime = 1500; //Сколько ждет нажатия
var clickLimit = 5; //Сколько должно быть нажатий
//Настройка общего времени анимации
var isEndOfAnimation = false;
var timeOfAnimation = (clickLimit*(maxSec + FilledTime) + 500);

var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

var Ball = function (maxSpeed, minSpeed, radius, clickLimit) {
    this.x = width / 2;
    this.y = height / 2;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.radius = radius;
    this.isFilled = false;
    this.clickable = true;
    this.showCount = 0;
    this.clickCount = 0; // Счетчик кликов
    this.clickLimit = clickLimit; // Максимальное количество кликов

};
Ball.prototype.checkCollision = function(xSpeed, ySpeed){
    if (this.x - this.radius < 0){
            this.x = 0;
            this.x += -xSpeed;
    }
    if (this.x + this.radius > width){
        this.x = width - this.radius;
        this.x += -xSpeed;
    }
    if (this.y - this.radius < 0){
        this.y = this.radius;
        this.y += -ySpeed;
    }
    if (this.y + this.radius > height){
        this.y = height - this.radius;
        this.y += -ySpeed;
    }
}

Ball.prototype.move = function () {
    if (this.isFilled) {
        xSpeed = 0;
        ySpeed = 0;
    }
    else {
        xSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
        ySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
    }
    this.x += xSpeed;
    this.y += ySpeed;
    this.checkCollision(xSpeed,ySpeed);
};

Ball.prototype.draw = function () {
    circle(this.x, this.y, this.radius, this.isFilled);
};
Ball.prototype.draw_and_move = function (ctx) {
    ctx.clearRect(0, 0, width, height);
    this.draw();
    this.move();
    ctx.strokeRect(0, 0, width, height);
}

var ball = new Ball(xSpeed, ySpeed, radius, clickLimit);

// Массивы с интервалами
var intervals = [Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec, FilledTime];


// Текущий индекс интервала
var currentIntervalIndex = 0;

// Функция для смены интервала
function changeInterval() {
    if (!isEndOfAnimation){
            currentIntervalIndex++;
        if (currentIntervalIndex == 1) {
            intervals[0] = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;

        }
        if (currentIntervalIndex >= intervals.length) {
            currentIntervalIndex = 0;
        }
    }
}

Ball.prototype.toggleFill = function () {
    if (this.isFilled){
        this.isFilled = false;
        this.clickable = false;
        changeInterval();
    }
    else {
        if (this.showCount < (this.clickLimit)) {
            this.clickable = true;
            this.isFilled = true;
            changeInterval();
        }
    }


    if (this.isFilled && this.clickCount < this.clickLimit) {
        canvas_blink.addEventListener("click", clickHandler);
    } else {
        canvas_blink.removeEventListener("click", clickHandler);
    }
    if (!isEndOfAnimation){
        setTimeout(function () {
                ball.toggleFill();
                if (ball.isFilled && ball.showCount < ball.clickLimit) ball.showCount++;
        }, intervals[currentIntervalIndex]);
    }
};

setTimeout(function () {
    if(ball.clickCount < ball.clickLimit){
        ball.toggleFill();
        if (ball.isFilled) ball.showCount++;
    }
}, intervals[currentIntervalIndex]);

function clickHandler(event) {
    if (ball.clickable) {
        var mouseX = event.clientX - canvas_blink.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas_blink.getBoundingClientRect().top;
        ctx.fillStyle = "red";
            ball.draw();
            setTimeout(function () {
                ctx.fillStyle = "black";
            }, 100); // Меняем цвет обратно через 100 миллисекунд

        if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius  && ball.clickable && ball.clickCount < ball.clickLimit) {
            ball.clickCount++;
            console.log("КЛИК");
            ball.clickable = false;
        }
    }
}

var animationTimer = setTimeout(function () {
    clearInterval(animationInterval);
    isEndOfAnimation = true;
    console.log("Конец анимации");
    console.log("Результаты")
    console.log("Кол-во показываний = " + ball.showCount);
    console.log("Кол-во верных кликов = " + ball.clickCount);
    if (ball.showCount == ball.clickCount){
        console.log("Харош");
    }
}, timeOfAnimation); // Установка таймера на всю длительность анимации

function do_animatic(){
    ball.draw_and_move(ctx)
    if (ball.isFilled){
        clearInterval(animationInterval);
        blink_intervals = 30;
        animationInterval = setInterval(do_animatic, blink_intervals);
    }
    else {
        clearInterval(animationInterval);
        blink_intervals = 500;
        animationInterval = setInterval(do_animatic, blink_intervals);
    }
}


var animationInterval = setInterval(do_animatic, blink_intervals);

}