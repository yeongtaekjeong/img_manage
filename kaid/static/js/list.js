$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: '/getListAjax/',
        data: {},
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            var col = 6
            var screen_h = String(parseInt(window.innerHeight / col)) + "px";
            range = ((data.data.length / 6) + 1) * 6
            html = ""
            for (i=0 ; i<range ; i++) {
                if (i % col == 0) html += '<div class="row mt-2 mb-5">'
                if (data.data.length > i) {
                html += '<div class="col" style="height:'+screen_h+'">'
                html += '<img src="/media'+data.data[i]['폴더경로']+'/'+data.data[i]['파일이름']+'" style="width:100%; height:100%">'
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

// lazy load : 스크롤 내리면 조회
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