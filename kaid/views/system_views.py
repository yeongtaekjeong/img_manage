from django.shortcuts import render
from .country_data import Country

#######################################################################################################################
# 1. MethodName : [1]index
# 2. Comment    : 인덱스 페이지
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 18.
#######################################################################################################################
def index(request):

	country_all = {'asia_list' : Country.asia}

	return render(request, 'index.html', country_all)