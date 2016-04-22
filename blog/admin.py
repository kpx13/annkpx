# -*- coding: utf-8 -*-
from django.contrib import admin
import models

class CategoryAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'is_blog', 'order', 'slug')


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name', 'desc', 'slug', 'date')


admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Article, ArticleAdmin)
admin.site.register(models.ArticleTag)
