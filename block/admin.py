# -*- coding: utf-8 -*-
from django.contrib import admin
import models

class PageAdmin(admin.ModelAdmin):
    list_display = ('pagename', 'order', 'divider')

admin.site.register(models.Block, PageAdmin)