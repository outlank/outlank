from django.db import models


class Origin(models.Model):
    name = models.CharField(max_length=20, verbose_name='发货地名')


class Brand(models.Model):
    class Meta:
        verbose_name = '品牌'

    name = models.CharField(max_length=50, verbose_name='品牌名')

    origin = models.ForeignKey('Origin', on_delete=models.PROTECT)


class Spu(models.Model):
    class Meta:
        verbose_name = 'SPU'

    name = models.CharField(max_length=200, verbose_name='SPU名')

    brand = models.ForeignKey('Brand', on_delete=models.PROTECT)


# Create your models here.
class Sku(models.Model):
    class Meta:
        verbose_name = 'SKU'

    name = models.CharField(max_length=200, verbose_name='SKU名')
    specification = models.CharField(max_length=50, verbose_name='规格')

    cost_price = models.FloatField(verbose_name='成本价')
    parterner_price = models.FloatField(verbose_name='合伙人拿货价')
    manager_price = models.FloatField(verbose_name='店长拿货价')
    retail_price = models.FloatField(verbose_name='零售价')

    profit = models.FloatField(verbose_name='公司毛利')
    profit_percent = models.FloatField(verbose_name='公司毛利率')

    parterner_sell_profit = models.FloatField(verbose_name='合伙人销售毛利')
    parterner_sell_profit_percent = models.FloatField(verbose_name='合伙人销售毛利率')

    parterner_commission_profit = models.FloatField(verbose_name='合伙人销售毛利')
    parterner_commission_profit_percent = models.FloatField(
        verbose_name='合伙人销售毛利率')

    manager_profit = models.FloatField(verbose_name='店长销售毛利')
    manager_profit_percent = models.FloatField(verbose_name='店长销售毛利率')

    spu = models.ForeignKey('Spu', on_delete=models.PROTECT)
