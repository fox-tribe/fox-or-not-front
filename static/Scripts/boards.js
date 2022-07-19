const board_url = window.location.search.split('=')
const boards_name = board_url[1]



// 게시물 상세 페이지 부르기
window.onload = async function board() {
    let board = async () => {
        let response = await fetch(`${backend_base_url}/article/board?boards=${boards_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        response_json = await response.json()
    }
    board().then((data) => {
        detail = response_json
        console.log(detail)
        decoded_name = decodeURI(boards_name)
        for (let i = 0; i < detail[0][`${decoded_name}`].length; i++) {
        let author = detail[0][`${decoded_name}`][i]['author']
        let title = detail[0][`${decoded_name}`][i]['article_title']
        let date = detail[0][`${decoded_name}`][i]['article_post_date']
        const contents = document.createElement("li");
        contents.classList.add("content");
        contents.innerHTML = `
        <span class="content__id">${id}</span>
        <span class="content__title">${title}</span>
        <span class="content__author">${author}</span>
        <span class="content__date">${date}</span>
      `;
        }}
    )
}

