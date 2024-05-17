from django.shortcuts import get_object_or_404

from .models import *


class WarmUpService:
    context = {}

    def clean_context(self):
        self.context = {}

    def clean_users_data(self, user):
        user.choice_set.all().delete()
        user.result_set.all().delete()
        user.users_block = None

    def get_context(self) -> dict:
        return self.context

    def set_context(self, context: dict):
        self.context = context

    def set_nums(self, task_block: Task_block):
        tasks = task_block.task_set.all()
        for ind, task in enumerate(tasks):
            task.num = ind
            task.save()

    def get_active_block(self, user):
        return user.users_block.task_block if user.users_block is not None else None

    def is_choice_exist(self, user, task):
        return Choice.objects.filter(user=user, task=task).count() > 0

    def initialize_test(self, user, type_of_warm_up, difficulty_level_name) -> dict:
        self.clean_users_data(user)
        self.context = {
            'type_of_warm_up': type_of_warm_up
        }
        # Получаем уровень сложности из базы данных
        difficulty_level = get_object_or_404(Difficulty_level, name=difficulty_level_name)
        # Получаем случайный блок
        task_block = difficulty_level.get_random_task_block()
        # Создаем уникальную модель для пользователя и активного блока
        users_block = Users_block(user=user,
                                  task_block=task_block)
        users_block.save()
        user.users_block = users_block
        user.save()
        # Проставляем номера для заданий
        self.set_nums(task_block)
        # Создаем новую таблицу результатов для этого блока
        results_new = Result.objects.create(user=user, task_block=task_block)
        results_new.save()
        # Вносим в контекст данные об уровне сложности и о номере вопроса, ставя его в ноль
        self.context['difficulty_level'] = difficulty_level_name
        self.context['task_num'] = 0
        return self.context

    def display_task(self, user, task_num) -> dict:
        self.context['next_task'] = None
        # Получаем активный блок пользователя
        task_block = self.get_active_block(user)
        # Берем из него все задания в список, в порядке возрастания номеров
        task_list = task_block.task_set.order_by('num')
        # Вносим в контекст кол-во вопросов
        self.context['tasks_count'] = len(task_list)
        # Получаем текущий вопрос
        task = task_list[task_num]
        # Вносим в контекст следующий вопрос, если он есть
        if task_num < (len(task_list) - 1):
            self.context['next_task'] = task_list[task_num + 1]
        # Вносим в контекст тип анимации, если он есть
        if self.context['type_of_warm_up'] == 'observation':
            self.context['animatic_type'] = task.animatic_type
        # Вносим в контекст информацию о том, отвечали ли на этот вопрос
        if self.is_choice_exist(user, task):
            self.context['is_answered'] = True
        else:
            self.context['is_answered'] = False
            choice = Choice(user=user,
                            task=task)
            choice.save()
        # Вносим в контекст вопрос
        self.context['task'] = task
        return self.context


def get_normal_color(color):
    match color:
        case "red":
            return "красного "
        case "blue":
            return "синего "
        case "green":
            return "зеленого "
        case "yellow":
            return "желтого "


def get_digit_ending(type, digit):
    if type == "row":
        if digit == "3":
            return "-ей"
        else:
            return "-ой"
    if type == "col":
        if digit == "3":
            return "-ем"
        else:
            return "-ом"


def get_normal_text(task_text):
    """
    Позволяет превращать рабочие программные названия (# type-color-count-direction-number)
    в читаемый текст вопроса
    """
    shapesType = ['квадрат', 'круг', 'треугольник', 'звезда']
    colors = ['red', 'blue', 'green', 'yellow']
    task_text_block = task_text.split("-")  # type-color-count-direction-number
    result_text = "Сколько в таблице "

    match len(task_text_block):
        case 2:
            if task_text_block[0] in shapesType:
                result_text += 'было фигур типа "' + task_text_block[0] + '"?'
            if task_text_block[0] in colors:
                result_text += 'было фигур ' + get_normal_color(task_text_block[0]) + "цвета?"
        case 3:
            result_text += 'было фигур типа "' + task_text_block[0] + '" '
            result_text += get_normal_color(task_text_block[1]) + "цвета?"
        case 5:
            result_text += 'было фигур типа "' + task_text_block[0] + '" '
            result_text += get_normal_color(task_text_block[1]) + "цвета "
            if task_text_block[3] == "row":
                if task_text_block[4] == "2":
                    result_text += "во " + str((int(task_text_block[4]) + 1)) + "-ой строке?"
                else:
                    result_text += "в " + str((int(task_text_block[4]) + 1)) + get_digit_ending(task_text_block[3],
                                                                                           str((int(task_text_block[4]) + 1))) + " строке?"
            if task_text_block[3] == "col":
                if task_text_block[4] == "2":
                    result_text += "во " + str((int(task_text_block[4]) + 1)) + "-ом столбце?"
                else:
                    result_text += "в " + str((int(task_text_block[4]) + 1)) + get_digit_ending(task_text_block[3],
                                                                                           str((int(task_text_block[4]) + 1))) + " столбце?"

    return result_text


warm_up_service = WarmUpService()  # Инициализируем общий экземпляр сервиса