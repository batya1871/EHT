# Generated by Django 5.0.5 on 2024-05-16 14:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EyeHealth', '0009_users_block_myuser_users_block'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task_block',
            name='is_active_block',
        ),
    ]
