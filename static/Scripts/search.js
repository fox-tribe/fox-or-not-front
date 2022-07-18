// 검색기능
async function search() {
    const searchData = {
        type: document.getElementById('searchOption').value,
        search: document.getElementById('searchKeywords').value,
    }
    console.log(document.getElementById('searchOption').value)
    console.log(document.getElementById('searchKeywords').value)
    const response = await fetch(`${backend_base_url}/article/search/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
    })

    response_json = await response.json()
    console.log(JSON.stringify(response_json))
    return JSON.stringify(response_json)
    

}
