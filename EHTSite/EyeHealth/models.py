from random import randint

from django.contrib.auth.models import AbstractUser
from django.db import models


class MyUser(AbstractUser):

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def clean_data(self):
        self.choice_set.all().delete()
        self.result_set.all().delete()

    def is_answered_check(self, check_exercise):
        check = self.choice_set.filter(exercise=check_exercise)
        return check.first().user_answer if check.count() > 0 else None

    def get_skipped_exercise_count(self, tasks):
        return len(tasks) - self.choice_set.count()

    def get_answer_if_choice_wrong(self, task):
        choice = self.choice_set.filter(task=task)
        correct_answers = task.correct_answer
        if choice.first().user_answer != correct_answers:
            return choice.first().user_answer
        return None


class Type_of_training(models.Model):
    name = models.CharField("Название", max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип тренировки"
        verbose_name_plural = "Типы тренировок"


class Difficulty_level(models.Model):
    name = models.CharField("Сложность", max_length=20, unique=True)
    type_of_training = models.ForeignKey(Type_of_training, verbose_name="Тип тренировки", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Уровень сложности"
        verbose_name_plural = "Уровни сложности"

    def get_first_exercise_block(self):
        return self.exercise_block_set.first()

    def get_random_exercise_block(self):
        return self.exercise_block_set.all()[randint(0, self.exercise_block_set.count() - 1)]


class Task_block(models.Model):
    name = models.TextField("Название теста", unique=True)
    difficulty_level = models.ForeignKey(Difficulty_level, verbose_name="Уровень сложности", on_delete=models.CASCADE)

    def set_nums(self):
        exercises = self.exercise_set.all()
        for ind, exercise in enumerate(exercises):
            exercise.num = ind
            exercise.save()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тест"
        verbose_name_plural = "Тесты"


class Task(models.Model):
    task_text = models.TextField("Задание", blank=True)
    num = models.IntegerField("Номер в списке", default=0)
    task_block = models.ForeignKey(Task_block, verbose_name="Тест", on_delete=models.CASCADE)
    animatic_type = models.TextField("Тип анимации", blank=True)
    correct_answer = models.PositiveSmallIntegerField("Правильный ответ")
    processed = models.BooleanField("Это поле обработано", default=False)

    def __str__(self):
        return "№" + str(self.num) + " Задание: " + str(self.task)

    def end_of_processing(self):
        self.processed = True
        self.save()

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"


class Choice(models.Model):
    user = models.ForeignKey(MyUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    task = models.ForeignKey(Task, verbose_name="Задание", on_delete=models.CASCADE)
    user_answer = models.TextField("Ответ пользователя")


class Result(models.Model):
    type_of_training = models.ForeignKey(Type_of_training, verbose_name="Тип тренировки", on_delete=models.CASCADE)
    user = models.ForeignKey(MyUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    correct = models.IntegerField("Кол-во правильных ответов", default=0)
    wrong = models.IntegerField("Кол-во неправильных ответов", default=0)
