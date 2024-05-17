from django.contrib.auth.decorators import login_required
from django.db.models import F
from django.http import HttpResponse
from django.urls import reverse_lazy

from django.shortcuts import render, redirect, get_object_or_404

from .services import warm_up_service, get_normal_text


@login_required
def type_selection(request):
    if request.method == "POST":

        diff_level = request.POST['diff_option'] + '_' + request.POST['type_option']
        return redirect(reverse_lazy('EyeHealth:display_test',
                                     kwargs={'type_of_warm_up': request.POST['type_option'],
                                             'difficulty_level': diff_level}))
    context = {
        'title': "Выбор типа тренировки"
    }
    return render(request, "EyeHealth/type_selection.html", context)


@login_required
def display_test(request, type_of_warm_up, difficulty_level):
    context = warm_up_service.initialize_test(request.user, type_of_warm_up, difficulty_level)
    return redirect(reverse_lazy('EyeHealth:display_task',
                                 kwargs={'type_of_warm_up': context['type_of_warm_up'],
                                         'difficulty_level': context['difficulty_level'],
                                         'task_num': context['task_num']}))



@login_required
def display_task(request, type_of_warm_up, difficulty_level, task_num):
    context = warm_up_service.display_task(request.user, task_num)
    context['title'] = "Задание №" + str(task_num + 1)
    if task_num < (context['tasks_count'] - 1):
        context['btn_text'] = "Следующее задание"
    else:
        context['btn_text'] = "Результаты"

    if context['type_of_warm_up'] == 'memorization':
        context['memory_task'] = get_normal_text(context['task'].task_text)
    print(context['is_answered'])
    return render(request,
                  'EyeHealth/display_task.html', context)


@login_required
def task_grade(request, type_of_warm_up, difficulty_level, task_num):
    if type_of_warm_up == "memorization":
        print(request.POST['count-answer'])
    return HttpResponse(request.POST['hidden_result'])


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


def memory(request):
    return render(request, 'EyeHealth/memory-test.html')
