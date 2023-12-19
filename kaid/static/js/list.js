$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: '/getListAjax/',
        data: {},
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            range = ((data.data.length / 6) + 1) * 6
            html = ""
            for (i=0 ; i<range ; i++) {
                if (i % 6 == 0) html += '<div class="row mt-2">'
                if (data.data.length > i) {
                html += '<div class="col">'
                html += '<img src="/media'+data.data[i]['폴더경로']+'/'+data.data[i]['파일이름']+'" width="100%">'
                html += '<span>태국 ＞ 치앙마이 ＞ ... </span>'
                html += '</div>' } else { html += '<div class="col"></div>' }
                if (i % 6 == 5) html += '</div>'
            }
            $('.list').html(html)
        },
        error:function(request, status, error) {
            alert("code:"+request.status+"\n"+"error:"+error);
        },
    });


})