const url = window.location.search.split('=')
const obj_id = url[1]
// 게시물 상세 페이지 부르기
window.onload = async function articleDetail() {
    let articleDetail = async () => {
        let response = await fetch(`${backend_base_url}/article/${obj_id}/detail/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        response_json = await response.json()
        return response_json.articles
    }
    // 게시물 상세 내용
    articleDetail().then((data) => {
        detail = response_json
        console.log(detail)
        let author = detail['author']
        let title = detail['article_title']
        let contents = detail['article_contents']
        let date = detail['article_post_date']
        let count_fox = detail['vote']['fox']
        let count_green = detail['vote']['green']
        let count_miss = detail['vote']['miss']
        let temp_html =
        `<div class="titlediv">
            <div><h2 class="title">${title}</h2></div>
            <div class="writeinfo">
                <h3 class="writer">${author}</h3>
                <h3 class="time">${date}</h3>
            </div>
        </div>
        <div class="contentdiv">
            <h3 class="content">${contents}</h3>
        </div>
        <div>
        <h4>폭스 ${count_fox}</h4>
        <h4>그린 ${count_green}</h4>
        <h4>오해 ${count_miss}</h4>
        </div>`
        $('#article-detail-box').prepend(temp_html)
        for (let i = 0; i < detail['comment_set'].length; i++) {
            let comments = detail['comment_set'][i]['comment_contents']
            let comment_id = detail['comment_set'][i]['id']
            let comment_author = detail['comment_set'][i]['author']
            let comment_created_at = detail['comment_set'][i]['comment_created_at']
            let comment_like_count = detail['comment_set'][i]['count']
            let temp_html =
                `<div class="comments">
                    <div class="cowriteinfo">
                        <div><p class="cowriter">${comment_author}</p></div>
                        <div><p class="cotime">${comment_created_at}</p></div>
                    </div>
                    <div class="commentdetail">
                        <div class="comment"><h4>${comments}</h4></div>
                        <div><button type="button" id="like" class="like" onclick="likeButton(${comment_id})"><i class="fa-regular fa-heart fa-2x"></i></button></div>
                        <div><button type="button" id="reallike" class="reallike" onclick="likeButton(${comment_id})"><i class="fa-solid fa-heart fa-2x"></i></button></div>
                        <div class="comment"><h5>${comment_like_count}</h5></div>
                    </div>
                </div>`
        $('#comments-box').prepend(temp_html)
        }}
    )
}
// 댓글 작성
async function commentCreate() {
    let comment_contents = document.getElementById("wcomment").value
    let comment_data = {
        comment_contents: comment_contents,
    }
    let response = await fetch(`${backend_base_url}/article/${obj_id}/comment/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(comment_data)
    })
    response_json = await response.json()
    console.log(response_json)
    window.location.reload()
}
// 폭스 투표
async function vote1() {
    let category = {
        category:"폭스입니다",
    }
    const response = await fetch(`${backend_base_url}/article/${obj_id}/article/vote/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(category)
    }
    )
    response_json = await response.json()
    console.log(alert(response_json.message))
    window.location.reload()
}
// 그린라이트 투표
async function vote2() {
    let category = {
        category:"그린라이트",
    }
    const response = await fetch(`${backend_base_url}/article/${obj_id}/article/vote/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(category)
    }
    )
    response_json = await response.json()
    console.log(alert(response_json.message))
    window.location.reload()
}
// 오해 투표
async function vote3() {
    let category = {
        category:"오해입니다",
    }
    const response = await fetch(`${backend_base_url}/article/${obj_id}/article/vote/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(category)
    }
    )
    response_json = await response.json()
    console.log(alert(response_json.message))
    window.location.reload()
}

// 댓글 공감 투표
async function likeButton(comment_id) {
    let data = {
        category:"공감",
    }
    const response = await fetch(`${backend_base_url}/article/${comment_id}/comment/like/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(data)
    }
    )
    response_json = await response.json()
    console.log(alert(response_json.message))
    window.location.reload()
}
