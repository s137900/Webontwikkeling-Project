var input_tag = document.getElementById("search_text");
function set_sort_attr(Company_sort_field) {
    var url = window.location.href;
    var match = url.match(/\/company_page\/([^?]+)/) ? url.match(/\/company_page\/([^?]+)/) : "";
    var search_term = match ? match[1] : "";
    var params = new URLSearchParams(url.split('?')[1]);
    var asc_desc = params.get('asc_desc') ? params.get('asc_desc') : "";
    window.location.href =
        "/company_page/".concat(search_term, "?asc_desc=").concat(asc_desc, "&Company_sort_field=").concat(Company_sort_field);
}
function set_asc_desc(asc_desc) {
    var url = window.location.href;
    var match = url.match(/\/company_page\/([^?]+)/) ? url.match(/\/company_page\/([^?]+)/) : "";
    var search_term = match ? match[1] : "";
    var params = new URLSearchParams(url.split('?')[1]);
    var Company_sort_field = params.get('Company_sort_field') ? params.get('Company_sort_field') : "";
    window.location.href =
        "/company_page/".concat(search_term, "?asc_desc=").concat(asc_desc, "&Company_sort_field=").concat(Company_sort_field);
}
input_tag.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        var url = window.location.href;
        var params = new URLSearchParams(url.split('?')[1]);
        var asc_desc = params.get('asc_desc') ? params.get('asc_desc') : "";
        var Company_sort_field = params.get('Company_sort_field') ? params.get('Company_sort_field') : "";
        window.location.href =
            "/company_page/".concat(input_tag.value, "?asc_desc=").concat(asc_desc, "&Company_sort_field=").concat(Company_sort_field);
    }
});
