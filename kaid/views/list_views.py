from django.shortcuts import render
from django.http import JsonResponse
# from django.conf import settings
import pandas as pd
import os
import json

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
    search = {}

    if request.method == 'POST':
        resdata = request.POST
        text = resdata['search_text']
        country = resdata.getlist('country')
        spot = resdata.getlist('spot')
        search = {'search_text':text, 'search_country':country, 'search_spot':spot}

    context = {'country' : country_all, 'category' : category_all, 'search':search}

    return render(request, 'list.html', context)

#######################################################################################################################
# 1. MethodName : [2]getListAjax
# 2. Comment    : 사진 리스트 응답
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 19.
#######################################################################################################################
def getListAjax(request):
    df = pd.DataFrame({'default':[]})

    resdata = dict(json.loads(request.body))
    txt = resdata['search_txt'].replace(' ','')

    except_list = ['[]','']
    country = resdata['search_country']
    if country not in except_list:
        country = str('|'.join(eval(country)))

    spot = resdata['search_spot']
    if spot not in except_list: 
        spot = str('|'.join(eval(spot)))
    
    if (txt not in except_list) or (country not in except_list) or (spot not in except_list):
        df = pd.read_csv(f'{os.getcwd()}/kaid/static/data/merge_img_path_2_utf.csv', encoding='utf-8-sig', dtype=object).fillna('')

        if txt not in except_list:
            df = df[(df['대륙명'].str.contains(txt)) | (df['국가명'].str.contains(txt)) | (df['도시명'].str.contains(txt)) | (df['(참고)페이지번호_기사_폴더이름'].str.contains(txt)) |
                    (df['도시 세부'].str.contains(txt)) | (df['명소명'].str.contains(txt)) | (df['분류'].str.contains(txt)) | 
                    (df['(참고)기사 발행년'].str.contains(txt)) | (df['(참고)에디터'].str.contains(txt))  | (df['사진가'].str.contains(txt))]
        
        if country not in except_list:
            df = df[df['국가명'].str.contains(country)]

        if spot not in except_list:
            df = df[df['분류'].str.contains(spot)]

    res = {}
    allcount = len(df)
    res['allcount'] = allcount

    # 한 화면에 보여줄 개수 설정
    std_display = 300
    num = (resdata['page_number']-1) * std_display
    df = df[num:num+std_display]

    data = df.to_dict('records')
    res['std_display'] = std_display
    res['data'] = data
    

    return JsonResponse(res)

def getDetailAjax(request):
    imgpath = json.loads(request.body)

    df = pd.read_csv(f'{os.getcwd()}/kaid/static/data/sample_kr.csv', encoding='utf-8-sig', dtype=object).fillna('')
    
    df['filepath'] = df['폴더경로']+'/'+df['파일이름']
    df = df[df['filepath'] == imgpath]
    df['폴더경로'] = str(df['폴더경로'].iloc[0]).replace('/SHOOT','/SHOOT_OG')

    res = {}
    data = df.to_dict('records')
    res['data'] = data

    return  JsonResponse(res)