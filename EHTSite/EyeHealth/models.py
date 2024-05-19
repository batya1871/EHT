from random import randint

from django.contrib.auth.models import AbstractUser
from django.db import models


class MyUser(AbstractUser):
    users_block = models.OneToOneField('Users_block', on_delete=models.SET_NULL, null=True, blank=True,
                                       related_name="user")

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def clean_data(self):
        self.choice_set.all().delete()
        self.result_set.all().delete()


class Type_of_warm_up(models.Model):
    name = models.CharField("Название", max_length=15, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип тренировки"
        verbose_name_plural = "Типы тренировок"


class Difficulty_level(models.Model):
    name = models.CharField("Сложность", max_length=25, unique=True)
    type_of_warm_up = models.ForeignKey(Type_of_warm_up, verbose_name="Тип разминки", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Уровень сложности"
        verbose_name_plural = "Уровни сложности"

    def get_first_task_block(self):
        return self.exercise_block_set.first()

    def get_random_task_block(self):
        task_block = self.task_block_set.all()[randint(0, self.task_block_set.count() - 1)]
        return task_block


class Task_block(models.Model):
    name = models.TextField("Название теста", unique=True)
    difficulty_level = models.ForeignKey(Difficulty_level, verbose_name="Уровень сложности", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тест"
        verbose_name_plural = "Тесты"


class Users_block(models.Model):
    task_block = models.ForeignKey(Task_block, verbose_name="Тест", on_delete=models.CASCADE)

    def __str__(self):
        return "Пользователь: " + str(self.user) + " Блок: " + str(self.task_block)


class Task(models.Model):
    task_text = models.TextField("Задание", blank=True)
    num = models.IntegerField("Номер в списке", default=0)
    task_block = models.ForeignKey(Task_block, verbose_name="Тест", on_delete=models.CASCADE)
    animatic_type = models.TextField("Тип анимации", blank=True)
    correct_answer = models.TextField("Правильный ответ")

    def __str__(self):
        return "№" + str(self.num) + " Задание: " + str(self.task_text)

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"


class Choice(models.Model):
    user = models.ForeignKey(MyUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    task = models.ForeignKey(Task, verbose_name="Задание", on_delete=models.CASCADE)
    user_answer = models.TextField("Ответ пользователя", default="")


class Result(models.Model):
    task_block = models.ForeignKey(Task_block, verbose_name="Тест", on_delete=models.CASCADE)
    user = models.ForeignKey(MyUser, verbose_name="Пользователь", on_delete=models.CASCADE)
    correct = models.IntegerField("Кол-во правильных ответов", blank=True, default=0)
    wrong = models.IntegerField("Кол-во неправильных ответов", blank=True, default=0)
    allClickCount = models.IntegerField("Общее количество необходимых кликов", blank=True, default=0)
    usersClickCount = models.IntegerField("Количество верных кликов пользователя", blank=True, default=0)

    def get_percentage(self, commonClick=0):
        if commonClick == 0:
            return self.usersClickCount / self.allClickCount * 100 if self.allClickCount > 0 else 0
        return self.usersClickCount / commonClick * 100

    def get_grade(self):
        percentage = (self.correct / self.task_block.task_set.count()) * 100
        grade_thresholds = {
            "easy": [(90, 5), (70, 4), (50, 3)],
            "medium": [(80, 5), (60, 4), (40, 3)],
            "hard": [(70, 5), (50, 4), (30, 3)]
        }
        for threshold, grade in grade_thresholds[self.task_block.difficulty_level.name.split("_")[0]]:
            if percentage >= threshold:
                return grade
        return 2
