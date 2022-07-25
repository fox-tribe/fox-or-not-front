const board_url = window.location.search.split('=')
const boards_name = board_url[1]
const decoded_name = decodeURI(boards_name)

// 게시물 상세 페이지 부르기
window.onload = async function board() {
    // 로그인 로그아웃 글쓰기 마이페이지 회원가입 버튼 숨기기
    if (!localStorage.getItem("access")) {
        let logout_button = document.getElementById("logout-button")
        let mypage_button = document.getElementById("mypage-button")
        let posting_button = document.getElementById("posting-button")
        logout_button.style.visibility = "hidden"
        mypage_button.style.visibility = "hidden"
        posting_button.style.visibility = "hidden"
    }
    else {
        let login_button = document.getElementById("login-button")
        let signup_button = document.getElementById("signup-button")
        login_button.style.visibility = "hidden"
        signup_button.style.visibility = "hidden"
    }

    let board = async () => {
        let response = await fetch(`${backend_base_url}/article/board?boards=${decoded_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        response_json = await response.json()
    }

    board().then((data) => {
        detail = response_json
        for (let i = 0; i < 3; i++) {
            const boards_author = detail[0][`${decoded_name}`][i]['author']
            const boards_title = detail[0][`${decoded_name}`][i]['article_title']
            const boards_date = detail[0][`${decoded_name}`][i]['article_post_date']
            const boards_id = detail[0][`${decoded_name}`][i]['id']
            const content = document.createElement("li");
            content.classList.add("content");
            content.innerHTML = `
        <span class="content__id">${boards_id}</span>
        <span class="content__title">${boards_title}</span>
        <span class="content__author">${boards_author}</span>
        <span class="content__date">${boards_date}</span>
      `;
            return content;
        }
    }
    )
}
