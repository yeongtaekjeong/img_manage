from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import pandas as pd
import os

from .country_data import Country, Spot

#######################################################################################################################
# 1. MethodName : [1]list
# 2. Comment    : 리스트 페이지 접근
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 18.
#######################################################################################################################
def list(request):
    country_all = {'asia_list' : Country.asia, 'europe_list':Country.europe, 'america_list':Country.america,
				'africa_list':Country.africa, 'oceania_list':Country.oceania, 'middle_east_list':Country.middle_east}
    
    category_all = Spot.spot_list

    context = {'country' : country_all, 'category' : category_all}

    return render(request, 'list.html', context)

#######################################################################################################################
# 1. MethodName : [2]getListAjax
# 2. Comment    : 사진 리스트 응답
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 19.
#######################################################################################################################
def getListAjax(request):
    df = pd.read_csv(f'{os.getcwd()}/kaid/static/data/sample_kr.csv', encoding='utf-8-sig', dtype=object).fillna('')
    res = {}
    data = df.to_dict('records')
    res['data'] = data

    return JsonResponse(res)
