# -*- coding: utf-8 -*-
from django.db import models
from ckeditor.fields import RichTextField
import pytils


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=u'название')
    is_blog = models.BooleanField(default=True, verbose_name=u'Имеет структуру блога')
    order = models.IntegerField(default=0, verbose_name=u'порядок')
    slug = models.SlugField(max_length=50, verbose_name=u'slug', blank=True, help_text=u'Заполнять не нужно')
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        verbose_name = u'категория'
        verbose_name_plural = u'категории'
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=pytils.translit.slugify(self.name)
        super(Category, self).save(*args, **kwargs)
        
    @staticmethod
    def get_by_slug(slug):
        try:
            return Category.objects.get(slug=slug)
        except:
            return None


class ArticleTag(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name=u'название')
    slug = models.SlugField(max_length=50, verbose_name=u'slug', blank=True, help_text=u'Заполнять не нужно')
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=pytils.translit.slugify(self.name)
        super(ArticleTag, self).save(*args, **kwargs)
        
    def nbsp(self):
        return self.name.replace(' ', '&nbsp;')

    def __unicode__(self):
        return self.slug
    
    class Meta:
        verbose_name = u'тег'
        verbose_name_plural = u'теги'
    

class Article(models.Model):
    category = models.ForeignKey(Category, verbose_name=u'категория')
    name = models.CharField(max_length=512, verbose_name=u'название')
    desc = RichTextField(max_length=2048, verbose_name=u'вступительный контент')
    text = RichTextField(verbose_name=u'продолжение контента')
    tags = models.ManyToManyField(ArticleTag, blank=True, verbose_name=u'теги')
    image = models.ImageField(upload_to=lambda instance, filename: 'uploads/blog/' + pytils.translit.translify(filename), 
                              null=True, blank=True, max_length=256, verbose_name=u'фото')
    slug = models.SlugField(max_length=300, verbose_name=u'slug', unique=True, blank=True, help_text=u'Заполнять не нужно')
    date = models.DateTimeField(u'дата добавления', auto_now_add=True)
   
    class Meta:
        verbose_name = u'статья'
        verbose_name_plural = u'статьи'
        ordering = ['-date']
    
    def __unicode__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=pytils.translit.slugify(self.name)
        super(Article, self).save(*args, **kwargs)
        
    @staticmethod
    def get_by_slug(slug):
        try:
            return Article.objects.get(slug=slug)
        except:
            return None
    
    @staticmethod
    def get_recent(count=4):
        return list(Article.objects.all()[:count])
    
    @staticmethod
    def get_by_tag(tag):
        if not tag:
            return []
        else:
            return list(Article.objects.filter(tags__in=[tag]))
