from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Type_of_training)
admin.site.register(Difficulty_level)
admin.site.register(Task_block)
admin.site.register(Task)