var canvas_memory = document.getElementById("canvas-memory");
if (canvas_memory != null){
    var ctx = canvas_memory.getContext("2d");
    var width = canvas_memory.width;
    var height = canvas_memory.height;
    var display_time = 20000;
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
        }

        // Метод для генерации случайных фигур и их расположения в таблице
        generateShapes() {
            var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда']; // Переименовали массив в shapesType
            var colors = ['red', 'blue', 'green', 'yellow'];
            var cellSize = (this.canvas.width - this.margin * 5) / 4; // Размер ячейки с учетом отступов
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    var type = shapesType[Math.floor(Math.random() * shapesType.length)]; // Используем новое название массива
                    var color = colors[Math.floor(Math.random() * colors.length)];
                    var x = col * (cellSize + this.margin) + this.margin;
                    var y = row * (cellSize + this.margin) + this.margin;
                    this.shapes.push(new Shape(type, color, x, y, cellSize));
                }
            }
        }

    generateShapesByType(type, count) {
        var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        var colors = ['red', 'blue', 'green', 'yellow'];
        var typeIndex = shapesType.indexOf(type); // Получаем индекс элемента в массиве
        if (typeIndex !== -1) {
            // Если элемент найден, извлекаем его из массива и удаляем
            shapesType.splice(typeIndex, 1);
        }
        var shapesWithoutCords = [];
        for (var i = 0; i < count; i++){
            var color = colors[Math.floor(Math.random() * colors.length)]
            shapesWithoutCords.push(new Shape(type, color))
        }
        for (var i = 0; i < (4*4)-count; i++){
            var type_rnd = shapesType[Math.floor(Math.random() * shapesType.length)]; // Используем новое название массива
            var color_rnd = colors[Math.floor(Math.random() * colors.length)];
            shapesWithoutCords.push(new Shape(type_rnd, color_rnd));
        }
        shapesWithoutCords = shuffleArray(shapesWithoutCords);
        var indexOfShape = 0;
        var cellSize = (this.canvas.width - this.margin * 5) / 4; // Размер ячейки с учетом отступов
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type,shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                indexOfShape++;
            }
        }

}

    generateShapesByColor(color, count) {
        var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        var colors = ['red', 'blue', 'green', 'yellow'];
        var colorIndex = colors.indexOf(color);
        if (colorIndex !== -1) {
            colors.splice(colorIndex, 1);
        }
        var shapesWithoutCords = [];
        for (var i = 0; i < count; i++) {
            var type = shapesType[Math.floor(Math.random() * shapesType.length)];
            shapesWithoutCords.push(new Shape(type, color));
        }
        for (var i = 0; i < (4 * 4) - count; i++) {
            var type_rnd = shapesType[Math.floor(Math.random() * shapesType.length)];
            var color_rnd = colors[Math.floor(Math.random() * colors.length)];
            shapesWithoutCords.push(new Shape(type_rnd, color_rnd));
        }
        shapesWithoutCords = shuffleArray(shapesWithoutCords);
        var indexOfShape = 0;
        var cellSize = (this.canvas.width - this.margin * 5) / 4;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type, shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                indexOfShape++;
            }
    }
}

    generateShapesByTypeAndColor(type, color, count) {
        var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        var colors = ['red', 'blue', 'green', 'yellow'];

        // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
        if (!shapesType.includes(type) || !colors.includes(color)) {
            console.error('Указанный тип или цвет фигуры не найдены.');
            return;
        }

        // Удаляем заданный тип из массива shapesType
        var typeIndex = shapesType.indexOf(type);
        shapesType.splice(typeIndex, 1);

        // Удаляем заданный цвет из массива colors
        var colorIndex = colors.indexOf(color);
        colors.splice(colorIndex, 1);

        // Генерируем фигуры заданного типа и цвета
        var shapesWithoutCords = [];
        for (var i = 0; i < count; i++) {
            shapesWithoutCords.push(new Shape(type, color));
        }

        // Дополняем оставшиеся ячейки случайными фигурами других типов и цветов
        for (var i = 0; i < (4 * 4) - count; i++) {
            var randomType = shapesType[Math.floor(Math.random() * shapesType.length)];
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            shapesWithoutCords.push(new Shape(randomType, randomColor));
        }

        // Перемешиваем массив фигур
        shapesWithoutCords = shuffleArray(shapesWithoutCords);

        // Распределяем фигуры заданного типа и цвета между оставшимися случайными
        var indexOfShape = 0;
        var cellSize = (this.canvas.width - this.margin * 5) / 4;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type, shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                indexOfShape++;
            }
        }
    }

    generateShapesByTypeAndColorAndRow(type, color, count, customRow) {
        if (count > 4) {
            console.error('Количество фигур не может быть больше 4.');
            return;
        }
        if (customRow > 3) {
            console.error('Индекс строки не может быть больше 3.');
            return;
        }

        var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        var colors = ['red', 'blue', 'green', 'yellow'];

        // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
        if (!shapesType.includes(type) || !colors.includes(color)) {
            console.error('Указанный тип или цвет фигуры не найдены.');
            return;
        }
        // Генерируем фигуры заданного типа и цвета
        var shapesWithoutCordsRow = [];
        for (var i = 0; i < count; i++) {
            shapesWithoutCordsRow.push(new Shape(type, color));
        }
        var rowCount = shapesWithoutCordsRow.length;
        if (rowCount < 4){
            for (var i = 0; i < (4 - rowCount); i++ ){
                var randomType = shapesType[Math.floor(Math.random() * shapesType.length)];
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                while (randomType == type && randomColor == color){
                    randomType = shapesType[Math.floor(Math.random() * shapesType.length)];
                    randomColor = colors[Math.floor(Math.random() * colors.length)];
                }
                shapesWithoutCordsRow.push(new Shape(randomType, randomColor));
            }
        }
        shapesWithoutCordsRow = shuffleArray(shapesWithoutCordsRow);
        var cellSize = (this.canvas.width - this.margin * 5) / 4;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                if (row != customRow){
                    var type = shapesType[Math.floor(Math.random() * shapesType.length)]; // Используем новое название массива
                    var color = colors[Math.floor(Math.random() * colors.length)];
                    this.shapes.push(new Shape(type, color, x, y, cellSize));
                }
                else{
                    this.shapes.push(new Shape(shapesWithoutCordsRow[col].type, shapesWithoutCordsRow[col].color, x, y, cellSize));
                }
            }


        }


    }

    generateShapesByTypeAndColorAndCol(type, color, count, customCol) {
        if (count > 4) {
            console.error('Количество фигур не может быть больше 4.');
            return;
        }
        if (customCol > 3) {
            console.error('Индекс столбца не может быть больше 3.');
            return;
        }

        var shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
        var colors = ['red', 'blue', 'green', 'yellow'];

        // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
        if (!shapesType.includes(type) || !colors.includes(color)) {
            console.error('Указанный тип или цвет фигуры не найдены.');
            return;
        }

        // Генерируем фигуры заданного типа и цвета
        var shapesWithoutCordsCol = [];
        for (var i = 0; i < count; i++) {
            shapesWithoutCordsCol.push(new Shape(type, color));
        }
        var colCount = shapesWithoutCordsCol.length;
        if (colCount < 4){
            for (var i = 0; i < (4 - colCount); i++ ){
                var randomType = shapesType[Math.floor(Math.random() * shapesType.length)];
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                while (randomType == type && randomColor == color){
                    randomType = shapesType[Math.floor(Math.random() * shapesType.length)];
                    randomColor = colors[Math.floor(Math.random() * colors.length)];
                }
                shapesWithoutCordsCol.push(new Shape(randomType, randomColor));
            }
        }
        shapesWithoutCordsCol = shuffleArray(shapesWithoutCordsCol);
        var cellSize = (this.canvas.width - this.margin * 5) / 4;
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                if (col != customCol){
                    var type = shapesType[Math.floor(Math.random() * shapesType.length)];
                    var color = colors[Math.floor(Math.random() * colors.length)];
                    this.shapes.push(new Shape(type, color, x, y, cellSize));
                }
                else{

                    this.shapes.push(new Shape(shapesWithoutCordsCol[row].type, shapesWithoutCordsCol[row].color, x, y, cellSize));
                }
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

    // Пример использования:
    var margin = 10; // Отступ между фигурами
    var shapeTable = new ShapeTable(canvas_memory, margin);
    shapeTable.generateShapesByTypeAndColorAndRow('круг','yellow', 3, 2);
    shapeTable.draw(); // Отрисовка таблицы с фигурами


    setTimeout(function() {
            console.log("Время для просмотра вышло")
            ctx.clearRect(0, 0, width, height);
        }, display_time);
}