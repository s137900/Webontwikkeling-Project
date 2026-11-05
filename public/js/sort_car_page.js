var input_tag = document.getElementById("search_text");
function set_sort_attr(car_sort_field) {
    var url = window.location.href;
    var match = url.match(/\/car_page\/([^?]+)/) ? url.match(/\/car_page\/([^?]+)/) : "";
    var search_term = match ? match[1] : "";
    var params = new URLSearchParams(url.split('?')[1]);
    var asc_desc = params.get('asc_desc') ? params.get('asc_desc') : "";
    window.location.href =
        "/car_page/".concat(search_term, "?asc_desc=").concat(asc_desc, "&car_sort_field=").concat(car_sort_field);
}
function set_asc_desc(asc_desc) {
    var url = window.location.href;
    var match = url.match(/\/car_page\/([^?]+)/) ? url.match(/\/car_page\/([^?]+)/) : "";
    var search_term = match ? match[1] : "";
    var params = new URLSearchParams(url.split('?')[1]);
    var car_sort_field = params.get('car_sort_field') ? params.get('car_sort_field') : "";
    window.location.href =
        "/car_page/".concat(search_term, "?asc_desc=").concat(asc_desc, "&car_sort_field=").concat(car_sort_field);
}
input_tag.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        var url = window.location.href;
        var params = new URLSearchParams(url.split('?')[1]);
        var asc_desc = params.get('asc_desc') ? params.get('asc_desc') : "";
        var car_sort_field = params.get('car_sort_field') ? params.get('car_sort_field') : "";
        window.location.href =
            "/car_page/".concat(input_tag.value, "?asc_desc=").concat(asc_desc, "&car_sort_field=").concat(car_sort_field);
    }
});
