// 메인페이지 게시판별 게시글가져오기
async function getArticlesByBoard() {
    
    // 로그인 로그아웃 회원가입 버튼 숨기기
    if (!localStorage.getItem("access")) {
        let logout_button = document.getElementById("logout-button")
        logout_button.style.visibility = "hidden"
    }
    else {
        let login_button = document.getElementById("login-button")
        let signup_button = document.getElementById("signup-button")
        login_button.style.visibility = "hidden"
        signup_button.style.visibility = "hidden"
    }

    const myData = async () => {
        const response = await fetch(`${backend_base_url}/article/board/?boards=직장인&boards=대학생&boards=10대&boards=LGBTQ&boards=자유&boards=HOT`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        
        }
    )

    response_json = await response.json()
    return response_json.articles
    }

    myData().then((data) => {
        detail = response_json
        console.log(detail)
        try {       
        for (let i = 0; i < 5; i++) {
            let title = detail[0]['직장인'][i]['article_title']
            let id = detail[0]['직장인'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#company-box').prepend(temp_html)
        }} catch (err) {
        }
        try{
        for (let i = 0; i < 5; i++) {
            let title = detail[1]['대학생'][i]['article_title']
            let id = detail[1]['대학생'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#college-box').prepend(temp_html)
        }} catch (err) {}
        try{
        for (let i = 0; i < 5; i++) {
            let title = detail[2]['10대'][i]['article_title']
            let id = detail[2]['10대'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#teen-box').prepend(temp_html)
        }} catch (err) {}
        try{
        for (let i = 0; i < 5; i++) {
            let title = detail[3]['LGBTQ'][i]['article_title']
            let id = detail[3]['LGBTQ'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#lgbtq-box').prepend(temp_html)
        }} catch (err) {}
        try {
        for (let i = 0; i < 5; i++) {
            let title = detail[4]['자유'][i]['article_title']
            let id = detail[4]['자유'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#free-box').prepend(temp_html)
        }} catch (err) {}
        try {
        for (let i = 0; i < 5; i++) {
            let title = detail[5]['HOT'][i]['article_title']
            let id = detail[5]['HOT'][i]['id']
            let temp_html = `
                <div class="board-title" id="worker" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
            </div>`
            
            $('#hot-box').prepend(temp_html)
        }} catch (err) {}

    const mostLiked = async () => {
        const response = await fetch(`${backend_base_url}/article/likeCount`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        
        }
    )

    response_json = await response.json()
    return response_json.articles
    }

    mostLiked().then((data) => {
        detail = response_json
        try {       
        for (let i = 0; i < 6; i++) {
            let title = detail[i]['article_title']
            let id = detail[i]['id']
            let author = detail[i]['author']
            let temp_html = `
            <div class="pop-article row">
                <div class="pop-article-title col" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}
                </div>
                <div class="pop-article-writer col" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${author}</div>
            </div>`
            $('#mostLiked-box').prepend(temp_html)
        }} catch (err) {
    }}
    )


})}