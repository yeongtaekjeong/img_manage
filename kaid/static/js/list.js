var paging_div = 0  // 현재 페이지 상태 변수
var paging_std = 10  //페이지 그룹 내 숫자 범위 설정

$(document).ready(function() {
  var search_txt = $('#search1').val()
  var search_country = $('#search2').val()
  var search_spot = $('#search3').val()
  senddata = {'search_txt':search_txt,'search_country':search_country,'search_spot':search_spot}
  paging_set(1)
  search_checked(search_txt, search_country, search_spot)
});

function paging_set(num) {
  var page_number = num
  senddata['page_number'] = page_number

  //페이징 상태 변경
  page_state_mv(num)

  //상세 이미지 clear
  $('#detail-area').empty()

  $.ajax({
    type: 'POST',
    url: '/getListAjax/',
    data: JSON.stringify(senddata),
    dataType : 'JSON',
    contentType: "application/json",
    success: function(data){
      var col = 6  // 한 줄에 표시할 목록 개수
      var screen_h = String(parseInt(window.innerHeight / col)) + "px";
      var count = data.data.length
      var range = ((count / col) + 1) * col
      var html = ''
      var pagehtml = ''

      // if (img_path.indexOf('#') != -1) img_path.replace('#','\\#')
      
      var counthtml = '<div class="align-self-center" style="text-align:right;">총 '+data.allcount+'건의 결과</div>'
      $('#count_display').html(counthtml)

       // 사진 리스트 html
      if (count != 0) {
        for (i=0; i<range ; i++) {

          if (i % col == 0) { 
            html += '<div class="row" width="100%" id="rowbox">'
          }
          if (count > i) {
            var img_path = String(data.data[i]['img_path_y'])
            html += '<div class="col-sm mb-2" id="listimg" style="height:'+screen_h+'; cursor:pointer">'
            html += '<img src="/media/low_img'+img_path+'" onclick="detail_img(this)"'+
                    'onerror="this.onerror=null; this.src=\'../static/img/noimg.png\';" style="width:100%; height:82%">'
            html += '<p>'+data.data[i]['국가명']+' '+data.data[i]['도시명']+'</p>'
            html += '</div>' } 
          else { html += '<div class="col"></div>' }

          if (i % col == col-1) html += '</div></br>'
        }

        // 페이지 계산
        start = (paging_div*paging_std)-(paging_std-1)
        paging = parseInt(data.allcount / data.std_display) + 1

        // 페이징 html
        pagehtml += '<ul class="pagination pagination" width="100%">'

        if (paging_div >= 2) {
          pagehtml += '<li id="page_btn" class="page-item" aria-current="page" onclick="paging_set('+(start-1)+')">'
          pagehtml += '<span class="page-link">&laquo;</span></li>'
        }

        for(i=start; i<=paging; i++) {
          if (i==page_number) active = 'active'
          else active = ''
          pagehtml += '<li id="page_btn" class="page-item '+active+'" aria-current="page" onclick="paging_set('+i+')">'
          pagehtml += '<span class="page-link">'+i+'</span></li>'

          if (i%paging_std==0 && data.allcount>data.std_display*paging_std*paging_div) {
            pagehtml += '<li id="page_btn" class="page-item" aria-current="page" onclick="paging_set('+(i+1)+')">'
            pagehtml += '<span class="page-link">&raquo;</span></li>'
            break;
          }
        }
        pagehtml += '</ul>'
      }
      else {
        html += '<div class="row d-flex justify-content-center" id="rowbox">검색 결과가 없습니다.</div>'
      }

      $('.list').html(html)
      $('.page').html(pagehtml)
    },
    error:function(request, status, error) {
        alert("code:"+request.status+"\n"+"error:"+error);
    },
    beforeSend: function () {
      $('.list').empty()
      $('.page').empty()
      $('.list').append('<div class="d-flex justify-content-center mt-5">' +
        '<div class="spinner-border text-info" role="status">' +
        '<span class="visually-hidden">Loading...</span></div></div>')
    }
})
  window.scrollTo(0,0);
}

// page group 위치
function page_state_mv(n) {
  if (n != paging_std) {
    if (n % paging_std == 0) paging_div = parseInt(n/paging_std)
    else paging_div = parseInt(n/paging_std) + 1
  }
  else {
    paging_div = 1
  }
}

//모달창 스크롤 현재 상태에서 띄우기
$(".modal-btn").click(function() {
  var scroll_y = window.scrollY
  $('#searchModal').css('top',scroll_y)
  $('.modal-backdrop').css('top',scroll_y)
})

//검색 조건대로 모달창의 체크박스 및 입력칸 검색 상태 동기화하기
function search_checked(t,c,s) {
  var country_ck = document.getElementsByName('country')
  var spot_ck = document.getElementsByName('spot')

  const regex = /[\[\]\,\']/g;
  const c_value = c.replace(regex,'').split(' ');
  const s_value = s.replace(regex,'').split(' ');


  $('input[name=search_text]').val(t)

  for (i=0;i<country_ck.length;i++){
    if(c_value.includes(country_ck[i].value)) {
      country_ck[i].checked = true;
    }
  }
  for (i=0;i<spot_ck.length;i++){
    if(s_value.includes(spot_ck[i].value)) {
      spot_ck[i].checked = true;
    }
  }
}

// form submit 동작 실행 ('검색'버튼)
function submit_form(element) {
  $(element).closest("form").submit()
}

//이미지 상세 정보
function detail_img(element) {
  var screen_h = String(parseInt(window.innerHeight * 0.6)) + "px";
  var imgpath = element.getAttribute('src')
  imgpath = imgpath.replace('/media/low_img/','')

  img_list = document.querySelectorAll('#listimg')

  $('.border').animate({opacity:'1'});
  $('.border').removeClass('border border-danger border-5')

  $.ajax({
    type: 'POST',
    url: '/getDetailAjax/',
    dataType : 'json',
    data: JSON.stringify(imgpath),
    contentType: "application/json",
    success: function(data){
      org_img_path = imgpath.replace('media/SHOOT','')
      org_img_path = '/media'+data.data[0]['img_path_y']
      console.log(org_img_path)
      console.log('/media/low_img'+data.data[0]['img_path_y'])
      //대륙명,국가명,도시명,도시 세부,폴더명,file_name_x,명소명,분류,촬영시기,(참고)기사 발행년,(참고)월,(참고)페이지번호_기사_폴더이름,(참고)에디터,사진가,비고,merge_path,img_path_y,name,extension,file_name_y
      html = ""
      html += '<div class="row">'
      html += '<div class="col-sm-6" style="height:'+screen_h+';">'
      html += '<img src="'+org_img_path+'" style="width:100%; height:90%"'+
              'onerror="this.onerror=null; this.src=\'/media/low_img'+data.data[0]['img_path_y']+'\'";></div>'
      html += '<div class="col-sm-4 ms-2 mb-2">'
      html += '<p class="align-text-end btn-close" onclick="detail_close()"></p>'
      html += '<p class="mb-1">발행 : '+data.data[0]['(참고)기사 발행년']+'</p>'
      html += '<p class="mb-1">폴더이름 : '+data.data[0]['img_path_y']+'</p>'
      html += '<p class="mb-1">에디터 : '+data.data[0]['(참고)에디터']+'</p>'
      html += '<p class="mb-1">사진가 : '+data.data[0]['사진가']+'</p>'
      html += '<p class="mb-1">촬영시기 : '+data.data[0]['촬영시기']+'</p>'
      html += '<p class="mb-1">사진파일명 : '+data.data[0]['file_name_y']+'</p>'
      html += '<p class="mb-1">상호명(명소명) : '+data.data[0]['명소명']+'</p>'
      html += '<p class="mb-1">국가 : '+data.data[0]['국가명']+'</p>'
      html += '<p class="mb-1">분류 : '+data.data[0]['분류']+'</p>'
      html += '<p class="mb-1">도시 : '+data.data[0]['도시명']+'</p>'
      html += '</div></div>'
      
      $('#detail-area').html(html)
      $(element).addClass('border border-danger border-5')
      $(element).animate({opacity:'0.4'});
    },
    error:function(request, status, error) {
        alert("code:"+request.status+"\n"+"error:"+error);
    },
    beforeSend: function () {
      window.scrollTo(0,0);
      $('#detail-area').empty()
      $('#detail-area').append('<div class="d-flex justify-content-center mt-5">' +
        '<div class="spinner-border text-info" role="status">' +
        '<span class="visually-hidden">Loading...</span></div>이미지를 불러오는 중입니다</div>')
    }
  });
}

function detail_close() {
  $('#detail-area').empty()
}

$('input[type=checkbox]').click(function(){
  check_limit = 10

  if ($('#checkform input[type=checkbox]:checked').length > 10) {
    alert('10개 이상 선택할 수 없습니다.')
    var click_id = '#' + $(this).attr('id')
    $(click_id).prop("checked", false)
  }
})

// lazy load : 스크롤 내리면 조회되는 기능(사용자 불편함 감소를 위함)
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageXOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });