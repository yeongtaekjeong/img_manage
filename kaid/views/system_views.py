from django.shortcuts import render
from .country_data import Country, Spot

#######################################################################################################################
# 1. MethodName : [1]index
# 2. Comment    : 인덱스 페이지
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 18.
#######################################################################################################################
def index(request):

	country_all = {'asia_list' : Country.asia, 'europe_list':Country.europe, 'america_list':Country.america,
				'africa_list':Country.africa, 'oceania_list':Country.oceania, 'middle_east_list':Country.middle_east}
	
	category_all = Spot.spot_list
	
	context = {'country' : country_all, 'category' : category_all}

	return render(request, 'index.html', context)