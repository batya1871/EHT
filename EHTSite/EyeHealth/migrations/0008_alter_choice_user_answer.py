# Generated by Django 5.0.5 on 2024-05-16 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EyeHealth', '0007_remove_task_processed_task_answered'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choice',
            name='user_answer',
            field=models.TextField(default='', verbose_name='Ответ пользователя'),
        ),
    ]
