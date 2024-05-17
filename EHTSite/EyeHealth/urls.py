from django.urls import path

from . import views
app_name = "EyeHealth"
urlpatterns = [
    path("", views.type_selection, name="type_selection"),
    path("<str:type_of_warm_up>/<str:difficulty_level>/", views.display_test, name="display_test"),
    path("<str:type_of_warm_up>/<str:difficulty_level>/<int:task_num>", views.display_task,
         name="display_task"),
    path('<str:type_of_warm_up>/<str:difficulty_level>/<int:task_num>/grade/',
         views.task_grade, name='task_grade'),
    path('<str:type_of_warm_up>/<str:difficulty_level>/results', views.results,
         name='results'),
    path('pingpong/', views.pingpong),
    path('blink/', views.blink),
    path('block-fall/', views.block_fall),
    path('memory/', views.memory),
    path('warm-up/', views.warm_up)
]