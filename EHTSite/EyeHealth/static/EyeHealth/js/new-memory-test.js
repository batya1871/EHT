var display_time = -1;
switch (difficulty_level){
case "easy":{
display_time = 15000;
break;
}
case "medium":{
display_time = 10000;
break;
}
case "hard":{
display_time = 5000;
break;
}
}

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}
class Shape {
constructor(type, color, x=0, y=0, size=0) {
this.type = type; // тип фигуры
this.color = color; // цвет фигуры
this.x = x; // координата x
this.y = y; // координата y
this.size = size; // размер фигуры
}
draw(ctx) {
// Рисуем фигуру в зависимости от типа
ctx.beginPath();
switch (this.type) {
case 'квадрат':
    ctx.rect(this.x, this.y, this.size, this.size);
    break;
case 'круг':
    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
    break;
case 'треугольник':


    ctx.beginPath();
    ctx.moveTo(this.x + this.size / 2, this.y); // Вершина
    ctx.lineTo(this.x, this.y + this.size); // Левый нижний угол
    ctx.lineTo(this.x + this.size, this.y + this.size); // Правый нижний угол
    ctx.closePath();
    break;
case 'звезда':
    const spikes = 5;
    const step = Math.PI / spikes;
    let rot = Math.PI / 2 * 3;
    let x = this.x + this.size / 2;
    let y = this.y + this.size / 2;
    let outerRadius = this.size / 2;
    let innerRadius = outerRadius / 2;
    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = this.x + this.size / 2 + Math.cos(rot) * outerRadius;
        y = this.y + this.size / 2 + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = this.x + this.size / 2 + Math.cos(rot) * innerRadius;
        y = this.y + this.size / 2 + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2 - outerRadius);
    ctx.closePath();
    break;
default:
    console.error('Неизвестный тип фигуры:', this.type);
    return;
}
ctx.fillStyle = this.color;
ctx.fill();
}
}

class ShapeTable {
    constructor(canvas, margin) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.shapes = []; // Массив фигур
        this.margin = margin;
        this.NUM_ROWS = 4;
        this.NUM_COLS = 4;
        this.shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        this.colors = ['red', 'blue', 'green', 'yellow'];
    }
    // Вспомогательная функция для генерации случайного типа фигуры
    getRandomType() {
        return this.shapesType[Math.floor(Math.random() * this.shapesType.length)];
    }

    // Вспомогательная функция для генерации случайного цвета
    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    // Вспомогательная функция для проверки наличия типа в массиве shapesType
    isValidType(type) {
        return this.shapesType.includes(type);
    }

    // Вспомогательная функция для проверки наличия цвета в массиве colors
    isValidColor(color) {
        return this.colors.includes(color);
    }

    // Вспомогательная функция для расчета размера ячейки
    calculateCellSize() {
        return (this.canvas.width - this.margin * (this.NUM_COLS + 1)) / this.NUM_COLS;
    }

    // Метод для генерации случайных фигур и их расположения в таблице
    generateShapes() {
        const cellSize = this.calculateCellSize();
        for (let row = 0; row < this.NUM_ROWS; row++) {
            for (let col = 0; col < this.NUM_COLS; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                this.shapes.push(new Shape(this.getRandomType(), this.getRandomColor(), x, y, cellSize));
            }
        }
    }
// Метод для отрисовки таблицы с фигурами
draw() {
    this.shapes.forEach(shape => {
        shape.draw(this.ctx);
    });
}
}

const shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
const colors = ['red', 'blue', 'green', 'yellow'];
var margin = 10; // Отступ между фигурами
var shapeTable = new ShapeTable(canvas, margin);

shapeTable.generateShapes()
shapeTable.draw(); // Отрисовка таблицы с фигурами

setTimeout(function() {
        console.log("Время для просмотра вышло")
        ctx.clearRect(0, 0, width, height);
        hidden_task_memory = document.getElementById("hidden_memory_task");
        console.log(hidden_task_memory)
        task_memorization_text =  document.getElementById("text-task-base-id");
        console.log(task_memorization_text)
        task_memorization_text.innerText = hidden_task_memory.value;
        end_animation_div.classList.remove("input-hidden");
    }, display_time);
