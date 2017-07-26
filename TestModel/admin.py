# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from TestModel.models import Test, Contact, Tag


# Register your models here.
class TagInline(admin.TabularInline):
    model = Tag


class ContactAdmin(admin.ModelAdmin):
    inlines = [TagInline]  # Inline
    list_display = ('name', 'age', 'email')
    search_fields = ('name',)
    fieldsets = (
        ['Main', {
            'fields': ('name', 'email'),
        }],
        ['Advance', {
            'classes': ('collapse',),  # CSS
            'fields': ('age',),
        }]
    )

admin.site.register(Contact, ContactAdmin)
admin.site.register([Test])
