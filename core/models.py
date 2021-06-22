from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Data(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails")
    balance = models.BigIntegerField(default=0)
    basicgpu = models.IntegerField(default=0)
    advancedgpu = models.IntegerField(default=0)
    ultimategpu = models.IntegerField(default=0)
    lifetimeearning = models.IntegerField(default=0)
    lifetimespent = models.IntegerField(default = 0)
    buttonclicks = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "balance": self.balance,
            "basicgpu": self.basicgpu,
            "advancedgpu": self.advancedgpu,
            "ultimategpu": self.ultimategpu,
            "lifetimeearning": self.lifetimeearning,
            "lifetimespent": self.lifetimespent,
            "buttonclicks": self.buttonclicks
        }