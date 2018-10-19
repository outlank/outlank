from django.db import models

class Spu(models.Model):
    name = models.CharField


# Create your models here.
class Sku(models.Model):
    name = models.CharField(max_length=50)
