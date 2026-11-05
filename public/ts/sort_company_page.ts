

const input_tag = document.getElementById("search_text") as HTMLInputElement

function set_sort_attr(Company_sort_field:string) {
    const url = window.location.href
    const match = url.match(/\/company_page\/([^?]+)/) ? url.match(/\/company_page\/([^?]+)/) : "" ;
    const search_term = match ? match[1] : ""

    
    const params = new URLSearchParams(url.split('?')[1]);
    const asc_desc       = params.get('asc_desc') ? params.get('asc_desc') : "";
    
    window.location.href = 
        `/company_page/${search_term}?asc_desc=${asc_desc}&Company_sort_field=${Company_sort_field}`

}


function set_asc_desc(asc_desc:boolean) {
    const url = window.location.href
    const match = url.match(/\/company_page\/([^?]+)/) ? url.match(/\/company_page\/([^?]+)/) : "" ;
    const search_term = match ? match[1] : ""

    const params = new URLSearchParams(url.split('?')[1]);
    const Company_sort_field = params.get('Company_sort_field') ? params.get('Company_sort_field') : "";
    
    window.location.href = 
        `/company_page/${search_term}?asc_desc=${asc_desc}&Company_sort_field=${Company_sort_field}`
}


input_tag.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const url = window.location.href

        const params = new URLSearchParams(url.split('?')[1]);

        const asc_desc       = params.get('asc_desc') ? params.get('asc_desc') : "";
        const Company_sort_field = params.get('Company_sort_field') ? params.get('Company_sort_field') : "";
        window.location.href = 
            `/company_page/${input_tag.value}?asc_desc=${asc_desc}&Company_sort_field=${Company_sort_field}`

    }
});