from django.db import models
from django.contrib.auth.models import User
import jsonfield
from datetime import datetime, timedelta


class Meta(models.Model):
    class Meta:
        permissions = (('view_inspection', '출하검사 화면 접근 권한'),
                       ('view_manage', '플랫폼 관리 화면 접근 권한'),
                       ('view_manage_changePath', '플랫폼 관리 경로 변경'),
                       ('view_manage_deleteData', '플랫폼 관리 데이터 초기화'),
                       ('view_auth', '계정 설정화면 접근 권한'),)


class Work(models.Model):
    sq = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, default='Untitled')
    category = models.CharField(max_length=10, default='None')
    share_state = models.BooleanField(default=0)
    update = models.CharField(max_length=30, default=datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S'))
    setting = jsonfield.JSONField(default={
        "target_data": [],
        "dc": {
            "pivot": {
                "row": ['M_Name', 'DUT', 'Gr'],
                "col": ['제품명', '측정일', '회차', '대분류', '소분류']
            },
            "filter": {
                "M_Name": ['*'],
                "DUT": ['*'],
                "Gr": ['*'],
                "Judge": ['P', 'F']
            }
        }
    })


class Path(models.Model):
    sq = models.BigAutoField(primary_key=True)
    tester = models.CharField(max_length=10, default='')
    path = models.CharField(max_length=1000, default='')


class Logging(models.Model):
    sq = models.BigAutoField(primary_key=True)
    user = models.CharField(max_length=50, default='')
    tester = models.CharField(max_length=10, default='')
    path = models.CharField(max_length=1000, default='')
    start_date = models.CharField(max_length=30, default='')
    end_date = models.CharField(max_length=30, default='')
    duration = models.IntegerField(default=0)
    scan_cnt = models.IntegerField(default=0)
    meta_cnt = models.IntegerField(default=0)
    json_cnt = models.IntegerField(default=0)
    state = models.IntegerField(default=0)


class History(models.Model):
    sq = models.BigAutoField(primary_key=True)
    tester = models.CharField(max_length=10, default='')
    para = models.IntegerField(default=0)
    sn = models.CharField(max_length=30, default='')
    date = models.CharField(max_length=30, default='')
