
// gdb리스트에서 이전 호출 정보를 가지기 위한 전역 변수
var gdbtitle = ''
// gdb리스트 목록을 백업하기 위한 전역 변수
var backup_listdata

$(document).ready(function() {
    create_ajax_data('1')
    create_ajax_data('2')
    gdb_list()
    //gdb2()
});


//전체화면 아이콘을 클릭하면 그래프 영역들의 z-index를 세팅함.
$(document).on("click", "a[name='expandWindow']", function () {
    idx = $("a[name='expandWindow']").index(this) + 1
    cardId = '#card' + String(idx)
    if ($(cardId).css('zIndex') != 999) {
        $(cardId).css('zIndex', 999)
    }
    else if($(cardId).css('zIndex') == 999){
        $(cardId).css('zIndex', 1)
    }
    create_ajax_data(String(idx))
})

$(document).on("click", "a[name='rotateAjaxData']", function () {
    idx = $("a[name='rotateAjaxData']").index(this) + 1
    create_ajax_data(String(idx))
})

$(document).on("click", "button[name='applyAjaxData']", function () {
    idx = $("button[name='applyAjaxData']").index(this) + 1
    create_ajax_data(String(idx))
})

// select_data(그래프 넘버)
// num 1,2일 경우 화면의 '적용' 버튼을 누른후 선택된 라디오, 셀렉트박스의 정보를 API 형식에 맞게 만들어 넘겨줌. (=> reloading(num, data) 함수 실행)
// num 3일 경우 목록 title 데이터를 API 형식에 맞게 만들어 reloading(num, data) 함수 실행
function create_ajax_data(num, givedata) {
    switch(num) {
        case '1':
        case '2':
            var id = "container" + num
            var category = $("#"+id+" input[name=inlineRadioOptions]:checked").val()
            var x_axis = $("#"+id+" select[name=select1]").val()
            var y_axis = $("#"+id+" select[name=select2]").val()
            var load_path = "../data/"


            if (num == 1) reloading(num, {"data_name": category, "date_name": x_axis, "column_name": y_axis, "load_path": load_path})
            else if (num == 2) reloading(num, {"data_name": category, "column_name": y_axis, "load_path": load_path})
            break;
        case '3':
            if (givedata == undefined) var title = gdbtitle;
            else var title = givedata;
            reloading(num, {"option":title, "data_name":"ddd"})
            break;
    }
}

// 새로고침 ajax
// reloading(그래프 넘버, ajax를 통해 전달할 값(라디오버튼, 셀렉트박스가 해당))
// num은 그래프 번호를 나타내고, givedata는 API에 전달할 파라미터 값을 나타냄
// 함수 -> 그래프 번호별 view 함수 실행 -> API 값 받음 -> 각 graph 그리는 함수로 전달 (analysis_templates_js.js에 그래프 함수 모아놓음.)
function reloading(num, givedata) {

    switch(num) {
        case '1':
            urlname = '/graph_1/';
            var block_ele = $('#card1');
            break;
        case '2':
            urlname = '/graph_2/';
            var block_ele = $('#card2');
            break;
        case '3':
            urlname = '/graph_3/';
            var block_ele = $('#card3');
            break;

    }

    $.ajax({
        type: 'POST',
        url: urlname,
        data: JSON.stringify(givedata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            if (data.statusCode == 404) location.href = '/alert?msg='+data.msg+'&link='+data.link
            block_ele.unblock();
            if (num == '1') linegraph(data)
            else if (num == '2') wordgraph(data)
            else if (num == '3') gdb(data)

        },
        error:function(request, status, error) {
            alert("code:"+request.status+"\n"+"error:"+error);

        },
        beforeSend: function() {
          block_ele.block({
            message: '<div class="ft-refresh-cw icon-spin font-medium-2"></div>',
            overlayCSS: {
              backgroundColor: '#EAEAEA',
              cursor: 'wait',
            },
            css: {
              border: 0,
              padding: 0,
              backgroundColor: 'none',
            }
          });
        },

          });
}

//API로부터 gdb의 리스트 데이터을 가져옴.
//리스트 데이터를 backup_listdata 전역변수에 백업해놓은 후
//gdb_list_backup() 함수로 연결하여 목록 만큼 li 목록을 생성함.
function gdb_list() {
        var block_ele = $('#list-tab');

        $.ajax({
            type: 'POST',
            url: '/graph_list/',
            data: {},
            dataType : 'JSON',
            contentType: "application/json",
            success: function(data){
                if (data.statusCode == 404) location.href = '/alert?msg='+data.msg+'&link='+data.link
                backup_listdata = data
                gdb_list_backup(backup_listdata)
            },
            error:function(request, status, error) {
                alert("code:"+request.status+"\n"+"error:"+error);

            },
            beforeSend: function() {
              block_ele.block({
                message: '<div class="ft-refresh-cw icon-spin font-medium-2"></div>',
                overlayCSS: {
                  backgroundColor: '#EAEAEA',
                  cursor: 'wait',
                },
                css: {
                  border: 0,
                  padding: 0,
                  backgroundColor: 'none',
                }
              });
            },
        });
}

// 리스트 데이터를 불러와 화면에 리스트를 만듦.
// gdb_list() 함수로부터 data를 받아 화면에 리스트를 만듦.
function gdb_list_backup(data) {
    $("#listbutton span").remove();
    $("#list-tab div").remove();

    lenlist = (data.data).length;
    $('#listbutton').append('<span> * '+lenlist+'개의 자료가 있습니다.</span>');

    for (let i=0; i<lenlist; i++) {
    var title = data.data[i].title
    $('#list-tab').append('<div class="listitem">'+
                        '<li class="list-group-item list-group-item-action" id="gdblist" data-bs-toggle="list"'+
                        ' value="'+title+'">'+
                        '<p class="d-flex w-100 justify-content-between">' +
                        '<span class="mb-1 listtitle" style="font-weight:bold">' + title + '</span>' +
                        '<small>' + data.data[i].prbln_ymd + '</small></p>' +
                        '<p class="mb-1">'+ data.data[i].author +'</p>' +
                        '<small>'+ data.data[i].prsnt_inst_nm +'</small>' +
                        '</li></div>')
        }

    $('li#gdblist').click(function(){
        gdbtitle = $(this).attr("value");
        create_ajax_data('3',gdbtitle)
        })
    return;
}

// 리스트 검색 함수
// 키보드를 누를때마다 실행되고, 썻다가 다 지우면 gdb_list_backup 함수를 통해 리스트 다시 불러옴.
$(document).on("keyup", "input[id='floatingInput']", function () {
    var listitem = document.getElementsByClassName('listitem')
    var listtitle = document.getElementsByClassName('listtitle')

    if ($(this).val() != '') {
        var search = $(this).val().toLowerCase()

        for (let i=0; i<listtitle.length; i++){
            var text = listtitle[i].innerHTML.toLowerCase()

            if (text.indexOf(search) != -1) {
                listitem[i].style.display = "flex"
            } else {
                listitem[i].style.display = "none"
            }
        }
    }
    else if ($(this).val() == '')
    {
        gdb_list_backup(backup_listdata)
    }
})

$(document).on("click", "button[name='goJupyter']", function () {
    url = $("input[name=jupyter_url]").val()
    state = $("input[name=jupyter_state]").val()
    if (state == 'False') {
    alert("연결에 실패하였습니다.\n관리자에게 문의해주세요.");
    return;
    }
    window.open(url, '');
})