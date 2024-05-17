var canvas_pingpong = document.getElementById("canvas-pingpong");
if (canvas_pingpong != null){
    var ctx = canvas_pingpong.getContext("2d");
var width = canvas_pingpong.width;
var height = canvas_pingpong.height;
var xSpeed = 5;
var ySpeed = 3;
var radius = 40;
var minSec = 3000;
var maxSec = 4000;
var FilledTime = 1500;
var clickLimit = 3;
var isEndOfAnimation = false;
var timeOfAnimation = ((clickLimit)*(maxSec + FilledTime) + 500);

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
    this.showCount = 0;
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
        canvas_pingpong.addEventListener("click", clickHandler);
    } else {
        canvas_pingpong.removeEventListener("click", clickHandler);
    }
    if (!isEndOfAnimation){
        setTimeout(function () {
        ball.toggleFill();
        if (ball.isFilled && ball.showCount < ball.clickLimit) ball.showCount++;
        }, intervals[currentIntervalIndex]);
    }

};

setTimeout(function () {
    ball.toggleFill();
    if (ball.isFilled) ball.showCount++;
}, intervals[currentIntervalIndex]);

function clickHandler(event) {
    if (ball.clickable) {
        var mouseX = event.clientX - canvas_pingpong.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas_pingpong.getBoundingClientRect().top;
        if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius  && ball.clickable && ball.clickCount < ball.clickLimit) {
            ball.clickCount++;
            console.log("КЛИК");
            ball.clickable = false;
            // Изменяем цвет круга на мгновение на красный
            ctx.fillStyle = "red";
            ball.draw();
            setTimeout(function () {
                ctx.fillStyle = "black";
            }, 100); // Меняем цвет обратно через 100 миллисекунд
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


var animationInterval = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    ball.draw();
    ball.move();
    ctx.strokeRect(0, 0, width, height);
}, 30);

}