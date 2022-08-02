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
        // 로그인 로그아웃 회원가입 버튼 숨기기
        if (!localStorage.getItem("access")) {
            let my_buttons = document.getElementById("my-buttons")
            my_buttons.style.visibility = "hidden"
        }
        else {
            let login_button = document.getElementById("login-button")
            let signup_button = document.getElementById("signup-button")
            login_button.style.visibility = "hidden"
            signup_button.style.visibility = "hidden"
        }
        if (!localStorage.getItem("access")) {
            let my_buttons = document.getElementById("my-buttons")
            my_buttons.style.visibility = "hidden"
        }
        response_json = await response.json()
        return response_json.articles
    }
    // 게시물 상세 내용
    articleDetail().then((data) => {
        detail = response_json
        console.log(detail)
        let nickname = detail['nickname']
        let image = detail['article_image']
        let title = detail['article_title']
        let contents = detail['article_contents']
        let date = detail['article_post_date']
        let count_fox = detail['vote']['fox']
        let count_green = detail['vote']['green']
        let count_miss = detail['vote']['miss']
        if (image == null) {
            let temp_html =
                `<div class="titlediv">
                <div class="writeinfo">
                    <div><a>${nickname} - ${date}</a></div>
                </div>
                <div class="title"><h2>${title}</h2></div>
            </div>
        </div>
        <div class="contentdiv">
            <h3 class="content">${contents}</h3>
        </div>
        <div>
        <div class="botediv">
            <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
            <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
            <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
        </div>
        </div>`
            $('#article-detail-box').prepend(temp_html)
        } else {
            let temp_html =
                `<div class="titlediv">
                <div class="writeinfo">
                <div><a>${nickname} - ${date}</a></div>
            </div>
            <div class="title"><h2>${title}</h2></div>
            </div>
        </div>
        <div class="contentdiv">
            <img src="http://127.0.0.1:8000${image}" alt="" />
            <h3 class="content">${contents}</h3>
        </div>
        <div>
        <div class="botediv">
            <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
            <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
            <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
        </div>
        </div>`
            $('#article-detail-box').prepend(temp_html)
        }
        for (let i = 0; i < detail['comment_set'].length; i++) {
            let comments = detail['comment_set'][i]['comment_contents']
            let comment_id = detail['comment_set'][i]['id']
            let nickname = detail['comment_set'][i]['nickname']
            let comment_created_at = detail['comment_set'][i]['comment_created_at']
            let comment_like_count = detail['comment_set'][i]['count']
            let temp_html =
                `<div class="comments">
                    <div class="cowriteinfo">
                        <div><p class="cowriter">${nickname}</p></div>
                        <div><p class="cotime">${comment_created_at}</p></div>
                        <p class="comment-modify" id="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">수정</p>
                        <p class="comment-delete" onclick="getdeleteComment(${comment_id})"id="#">삭제</p>
                    </div>
                    <!-- 댓글 수정 모달 -->
                    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">댓글 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    댓글<br>
                                    <input type="text" class="modal-textinput" placeholder="comment" id="comment-update">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                    <button type="button" onclick="getUpdateComment(${comment_id})" class="btn btn-primary">댓글 수정</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="commentdetail">
                        <div class="comment"><h4>${comments}</h4></div>
                        <div style="display:flex; flex-direction:row; align-items:center">
                        <button type="button" id="like" class="like" onclick="likeButton(${comment_id})"><i class="fa-regular fa-heart fa-2x"></i></button>
                        <button type="button" id="reallike" class="reallike" onclick="likeButton(${comment_id})"><i class="fa-solid fa-heart fa-1x"></i></button>
                        <h5 style="margin:0; display:block">${comment_like_count}</h5>
                        </div>
                    </div>
                </div>`
            $('#comments-box').prepend(temp_html)
        }
    }
    )
}
/// 게시물 수정
async function getUpdateData() {
    let title= document.getElementById("title-update").value
    let contents = document.getElementById("contents-update").value
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    }
    updateArticle(title, contents)
}
// 게시물 삭제
async function removeArticle() {
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    }
    await deleteArticle(obj_id)
    window.location.replace(`${fronted_base_url}/index.html`)
}
// 댓글 작성
async function commentCreate() {
    let comment_contents = document.getElementById("wcomment").value
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    }
    else if (comment_contents == '') {
        alert('댓글을 작성해주세요!')
    }
    else {
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
        window.location.reload()
    }
}
/// 댓글 수정
async function getUpdateComment(comment_id) {
    let comment= document.getElementById("comment-update").value
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    }
    updateComment(comment, comment_id)
}

/// 댓글 삭제 
async function getdeleteComment(comment_id) {
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    }
    deleteComment(comment_id)
}
// 폭스 투표
async function vote1() {
    let category = {
        category: "폭스입니다",
    }
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
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
    window.location.reload()
}
// 그린라이트 투표
async function vote2() {
    let category = {
        category: "그린라이트",
    }
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
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
    window.location.reload()
}
// 오해 투표
async function vote3() {
    let category = {
        category: "오해입니다",
    }
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
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
    window.location.reload()
}
// 댓글 공감 투표
async function likeButton(comment_id) {
    let data = {
        category: "공감",
    }
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
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
    window.location.reload()
}