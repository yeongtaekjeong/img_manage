class Country:
    asia = [
        ['대한민국','KR'], ['네팔','NP'], ['라오스','LA'], ['마카오','MO'], ['말레이시아','MY'], ['몰디브','MV'], ['몽골','MN'], ['미얀마','MM'],
        ['베트남','VN'], ['브루나이','BN'], ['스리랑카','LK'], ['싱가포르','SG'], ['우주베키스탄','UZ'], ['이란','IR'], ['인도','IN'],
        ['인도네시아','ID'], ['일본','JP'], ['중국','CN'], ['카타르','QA'], ['캄보디아','KH'], ['타이완','TW'], ['태국','TH'], ['피지','FJ'],
        ['필리핀','PH'], ['홍콩','HK'],
    ]
    europe = [
        ['그리스','GR'], ['네덜란드','NL'], ['노르웨이','NO'], ['독일','DE'], ['러시아','RU'], ['몰타','MT'], ['벨기에','BE'], ['불가리아','BG'],
        ['스위스','CH'], ['스페인','ES'], ['슬로바키아','SK'], ['슬로베니아','SI'], ['에스토니아','EE'], ['영국','GB'], ['오스트리아','AT'],
        ['이탈리아','IT'], ['체코','CZ'], ['크로아티아','HR'], ['포르투갈','PT'], ['프랑스','FR'], ['핀란드','FI'], ['헝가리','HU'],
    ]
    america = [
        ['멕시코','MX'], ['미국','US'], ['볼리비아','BO'], ['브라질','BR'], ['칠레','CL'], ['캐나다','CA'], ['콜롬비아','CO'], ['쿠바','CU'],
        ['페루','PE'],
    ]
    africa = [
        ['남아공','ZA'],['마다가스카르','MG'], ['모리셔스','MU'], ['세이셸','SC'], ['알제리','DZ'], ['에티오피아','ET'], ['이집트','EG'],
        ['짐바브웨','ZW'], ['케냐','KE'], ['튀니지','TN'],
    ]
    oceania = [
        ['뉴질랜드','NZ'], ['뉴칼레도니아','NC'], ['프랑스령 폴리네시아 (타히티)','PF'],
    ]
    middle_east = [
        ['아랍에미리트 (두바이)','AE'], ['이스라엘','IL'], ['터키','TR'],
    ]

class Spot:
    spot_list = [
        ['식당' , 'restaurant', '밥집, 술집, 루프탑, 펍, 바'],
        ['카페' ,  'cafe', '카페, 아이스크림 가게, 빵집'],
        ['쇼핑' , 'shopping', '상점, 서점, 쇼핑센터, 시장, 야시장, 쇼핑아이팀, 쇼핑 거리, 마사지 숍, 음식 누끼'],
        ['사적지' , 'historical_site', '사원, 궁전, 성벽, 사찰, 유적지, 유네스코 문화유산, 교회, 수도원, 성당, 수용소'],
        ['명소' , 'sights', '(국립)공원, 전망대, 마을, 연구기관, 등대, 부두, 드라이브 코스, 항구, 광장, 전망대, 대학, 식물원, 공항, 지하철 역, 산책로, 은행, 대학교, 타워, 꽃재배단지'],
        ['자연' , 'nature', '폭포, 숲길, 산, 해변, 바다, 제도, 섬, 호수'],
        ['문화공간', 'culture', '박물관, 미술관, 동물원, 아트센터, 역사 센터, 콘서트 홀, 양조장, 극장, 복합문화공간, 수족관, 도서관'],
        ['체험' , 'activity', '원데이 클래스, 액티비티, 박람회, 테마파크, 공방 체험, 스파, 축제, 워터파크, 세트장, 셀프 스튜디오, 페스티벌, 음식 투어, 크루즈'],
        ['숙소' , 'hotel', '호텔, 리조트, 게스트 하우스'],
        ['인물' , 'person', '인터뷰 컷'],
        ['기타' , 'etc', '정보 알 수 없는 이미지 컷'],
    ]