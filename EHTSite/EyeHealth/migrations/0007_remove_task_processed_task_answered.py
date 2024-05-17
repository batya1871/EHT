# Generated by Django 5.0.5 on 2024-05-16 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EyeHealth', '0006_alter_task_correct_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='processed',
        ),
        migrations.AddField(
            model_name='task',
            name='answered',
            field=models.BooleanField(default=False, verbose_name='Вопрос отвечен'),
        ),
    ]
