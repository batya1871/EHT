from django.contrib.auth.decorators import login_required
from django.db.models import F
from django.http import HttpResponse
from django.urls import reverse_lazy

from .models import Difficulty_level, Choice, Result, Type_of_training
from django.shortcuts import render, redirect, get_object_or_404

menu_list = [
    {'ref': 'EyeHealth:type_selection', 'content': 'Выбор режима'},
    {'ref': 'EyeHealth:settings', 'content': 'Настройки'}
]

value_diff_list = {
    '1': 'easy',
    '2': 'medium',
    '3': 'hard'
}


def get_grade(count, correct_count, difficulty_level):
    percentage = correct_count / count * 100

    grade_thresholds = {
        "easy": [(90, 5, "greate-grade"), (70, 4, "good-grade"), (50, 3, "ok-grade")],
        "medium": [(80, 5, "greate-grade"), (60, 4, "good-grade"), (40, 3, "ok-grade")],
        "hard": [(70, 5, "greate-grade"), (50, 4, "good-grade"), (30, 3, "ok-grade")]
    }

    for threshold, grade, grade_style in grade_thresholds[difficulty_level.split("-")[0]]:
        if percentage >= threshold:
            return grade, grade_style

    return 2, "bad-grade"


@login_required
def type_selection(request):
    context = {
        'title': "Выбор типа тренировки"
    }
    return render(request, "EyeHealth/type_selection.html",context)


@login_required
def display_test(request, type_of_training, difficulty_level):
    return redirect(reverse_lazy('EyeHealth:display_task',
                                 kwargs={'type_of_training': type_of_training,
                                         'difficulty_level': difficulty_level,
                                         'task_num': 0}))


@login_required
def display_task(request, type_of_training, difficulty_level, task_num):
    context = {
        'title': "Задание №" + str(task_num),
        'type_of_training': type_of_training,
        'difficulty_level': difficulty_level,
        'task_num': task_num
    }
    return render(request, "EyeHealth/display_task.html", context)


@login_required
def task_grade(request, type_of_training, difficulty_level, task_num):
    context = {'type_of_training': type_of_training,
               'difficulty_level': difficulty_level,
               'title': "Переход к результатам"}
    return redirect(reverse_lazy('EyeHealth:results',
                                 kwargs={'type_of_training': type_of_training,
                                         'difficulty_level': difficulty_level}))


@login_required
def results(request, type_of_training, difficulty_level):
    context = {'type_of_training': type_of_training,
               'difficulty_level': difficulty_level,
               'title': "Результаты"}

    return render(request, 'EyeHealth/results.html', context)

def pingpong(request):
    return render(request, 'EyeHealth/pingpong-test.html')
def blink(request):
    return render(request, 'EyeHealth/blink-test.html')

def block_fall(request):
    return render(request, 'EyeHealth/block-fall-test.html')