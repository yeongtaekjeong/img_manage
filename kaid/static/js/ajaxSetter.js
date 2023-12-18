var csrftoken = $("input[name=csrfmiddlewaretoken]").val();

$.ajaxSetup({
    headers: { "X-CSRFToken": csrftoken }
});