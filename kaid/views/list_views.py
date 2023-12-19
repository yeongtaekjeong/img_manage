from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import pandas as pd
import os

#######################################################################################################################
# 1. MethodName : [1]list
# 2. Comment    : 리스트 페이지 접근
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 18.
#######################################################################################################################
def list(request):
	return render(request, 'list.html')

#######################################################################################################################
# 1. MethodName : [2]getListAjax
# 2. Comment    : 사진 리스트 응답
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 19.
#######################################################################################################################
def getListAjax(request):
    df = pd.read_csv(f'{os.getcwd()}/kaid/static/data/sample.csv', encoding='utf-8-sig', dtype=object).fillna('')
    res = {}
    data = df.to_dict('records')
    res['data'] = data
    return JsonResponse(res)