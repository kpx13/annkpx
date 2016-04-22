# -*- coding: utf-8 -*-
from django.db import models
from ckeditor.fields import RichTextField
import pytils

class Block(models.Model):
    pagename = models.CharField(max_length=256, blank=True, default='home', verbose_name=u'страница')
    order = models.IntegerField(blank=True, null=True, verbose_name=u'порядок')
    divider = models.CharField(max_length=512, verbose_name=u'стиль блока')
    content = RichTextField(blank=True, verbose_name=u'контент')
    
    def save(self, *args, **kwargs):
        super(Block, self).save(*args, **kwargs)
        if not self.order:
            self.order = self.id
            self.save()
    
    @staticmethod
    def get_by_pagename(pagename):
        try:
            return Block.objects.filter(pagename=pagename)
        except:
            return None
        
    class Meta:
        verbose_name = u'текстовый блок'
        verbose_name_plural = u'текстовые блоки'
        ordering=['order']
        
    def __unicode__(self):
        return '%s-%s' % (self.pagename, self.order)