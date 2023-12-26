$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: '/getListAjax/',
        data: {},
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            var col = 6  // 한 줄에 표시할 목록 개수
            var screen_h = String(parseInt(window.innerHeight / col)) + "px";
            range = ((data.data.length / 6) + 1) * 6
            html = ""
            for (i=0 ; i<range ; i++) {
                if (i % col == 0) html += '<div class="row mt-2 mb-5">'
                if (data.data.length > i) {
                html += '<div class="col" id="listimg" style="height:'+screen_h+'; cursor:pointer">'
                html += '<img src="/media'+data.data[i]['폴더경로']+'/'+data.data[i]['파일이름']+'" onclick="detail_img(this)" style="width:100%; height:100%">'
                html += '<span>'+data.data[i]['나라']+' ＞ 여수,순천 </span>'
                html += '</div>' } else { html += '<div class="col"></div>' }
                if (i % col == col-1) html += '</div>'
            }
            $('.list').html(html)
        },
        error:function(request, status, error) {
            alert("code:"+request.status+"\n"+"error:"+error);
        },
    });


})

function detail_img(element) {
  var screen_h = String(parseInt(window.innerHeight * 0.6)) + "px";
  var imgpath = element.getAttribute('src')
  imgpath = imgpath.replace('/media','')

  $.ajax({
    type: 'POST',
    url: '/getDetailAjax/',
    dataType : 'json',
    data: JSON.stringify(imgpath),
    contentType: "application/json",
    success: function(data){
      html = ""
      html += '<div class="row" style="height:'+screen_h+';">'
      html += '<div class="col-sm-7">'
      html += '<img src="/media'+data.data[0]['폴더경로']+'/'+data.data[0]['파일이름']+'" style="width:100%; height:100%"></div>'
      html += '<div class="col ms-2">'
      html += '<p class="align-text-end btn-close" onclick="detail_close()"></p>'
      html += '<p class="mb-1">발행 : '+data.data[0]['발행']+'</p>'
      html += '<p class="mb-1">폴더이름 : '+data.data[0]['폴더경로']+'</p>'
      html += '<p class="mb-1">에디터 : '+data.data[0]['에디터']+'</p>'
      html += '<p class="mb-1">사진가 : '+data.data[0]['사진가']+'</p>'
      html += '<p class="mb-1">촬영시기 : '+data.data[0]['촬영시기']+'</p>'
      html += '<p class="mb-1">사진파일명 : '+data.data[0]['파일이름']+'</p>'
      html += '<p class="mb-1">상호명(명소명) : '+data.data[0]['상호명']+'</p>'
      html += '<p class="mb-1">국가 : '+data.data[0]['나라']+'</p>'
      html += '<p class="mb-1">분류 : '+data.data[0]['분류']+'</p>'
      html += '<p class="mb-1">도시 : '+data.data[0]['도시']+'</p>'
      html += '</div></div>'
      
      $('#detail-area').html(html)
    },
    error:function(request, status, error) {
        alert("code:"+request.status+"\n"+"error:"+error);
    },
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