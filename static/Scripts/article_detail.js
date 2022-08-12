const url = window.location.search.split('=')
const obj_id = url[1]

// #로그인 모달
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

// 게시물 상세 페이지 부르기
window.onload = async function articleDetail() {    
    
    let articleDetail = async () => {
        let response = await fetch(`${backend_base_url}/article/${obj_id}/detail/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        })

    const openButton = document.getElementById("modalclick");
    const modal = document.querySelector(".side_modal");
    const overlay = modal.querySelector(".side_modal__overlay");
    const closeBtn = modal.querySelector(".button");
    const openModal = () => {
        modal.classList.remove("hidden");
    }
    const closeModal = () => {
        modal.classList.add("hidden");
    }
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    openButton.addEventListener("click", openModal);

        
        // 로그인 로그아웃 회원가입 버튼 숨기기
        if (!localStorage.getItem("access")) {
            let my_buttons = document.getElementById("my-buttons")
            my_buttons.style.display = "none"

        }
        else {
            let login_button = document.getElementById("login-button")
            let signup_button = document.getElementById("signup-button")
            login_button.style.display = "none"
            signup_button.style.display = "none"
        }
        
        response_json = await response.json()
        return response_json.articles

    }
    // 게시물 상세 내용
    articleDetail().then((data) => {
        detail = response_json
        if (localStorage.getItem("access")) {
            const payload = localStorage.getItem("payload")
            const words = payload.split(':');
            id = words[5].split(',')

            let login_id = id[0]
            let article_author = detail['article_author']
            let nickname = detail['nickname']
            let image = detail['article_image']
            let title = detail['article_title']
            let contents = detail['article_contents']
            let date = detail['article_post_date']
            let count_fox = detail['vote']['fox']
            let count_green = detail['vote']['green']
            let count_miss = detail['vote']['miss']
                if (image == null && login_id != article_author) {
                let temp_html =
                    `<div class="titlediv">
                    <div class="writeinfo">
                        <div><a>${nickname} - ${date}</a></div>
                    </div>
                    <div id="title" class="title"><h2>${title}</h2></div>
                </div>
            </div>
            <div class="contentdiv">
                <h5 id="content" class="content">${contents}</h5>
            </div>
            <div>
            <div class="botediv">
                <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
            </div>
            </div>`
                $('#article-detail-box').prepend(temp_html)
            } else if (image == null && login_id == article_author){
                let temp_html =
                    `
                    <!-- 게시물 수정 모달 -->
                    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">게시물 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    제목<br>
                                    <textarea type="text" class="modal-textinput" id="title-update">${title}</textarea>
                                    내용입력<br>
                                    <textarea class="modal-textarea" id="contents-update">${contents}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                    <button type="button" onclick="getUpdateData()" class="btn btn-primary">수정하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="articlebuttons" id="article-buttons">
                        <p class="comment-modify"  onclick="updateMode()" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">게시글 수정</p>
                        <p class="comment-delete" onclick="removeArticle()">삭제</p>
                    </div>
                    <div class="titlediv">
                    <div class="writeinfo">
                    <div><a>${nickname} - ${date}</a></div>
                </div>
                <div class="title"><h2>${title}</h2></div>
                </div>
            </div>
            <div class="contentdiv">
                <h5 class="content">${contents}</h5>
            </div>
            <div>
            <div class="botediv">
                <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
            </div>
            </div>`
                $('#article-detail-box').prepend(temp_html)
            } else if (image != null && login_id != article_author){
                let temp_html =
                    `<div class="titlediv">
                    <div class="writeinfo">
                    <div><a>${nickname} - ${date}</a></div>
                </div>
                <div class="title"><h2>${title}</h2></div>
                </div>
            </div>
            <div class="contentdiv">
                <img src="${backend_base_url}${image}" alt="" />
                <h5 class="content">${contents}</h5>
            </div>
            <div>
            <div class="botediv">
                <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
            </div>
            </div>`
                $('#article-detail-box').prepend(temp_html)
            } else if (image != null && login_id == article_author){
                let temp_html =
                    `
                    <!-- 게시물 수정 모달 -->
                    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">게시물 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    제목<br>
                                    <textarea type="text" class="modal-textinput" id="title-update">${title}</textarea>
                                    내용입력<br>
                                    <textarea class="modal-textarea" id="contents-update">${contents}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                    <button type="button" onclick="getUpdateData()" class="btn btn-primary">수정하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="articlebuttons" id="article-buttons">
                        <p class="comment-modify" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">게시글 수정</p>
                        <p class="comment-delete" onclick="removeArticle()">삭제</p>
                    </div>
                <div class="titlediv">
                    <div class="writeinfo">
                    <div><a>${nickname} - ${date}</a></div>
                </div>
                <div class="title"><h2>${title}</h2></div>
                </div>
            </div>
            <div class="contentdiv">
                <img src="${backend_base_url}${image}" alt="" />
                <h5 class="content">${contents}</h5>
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
                let login_id = id[0]
                let comment_author = detail['comment_set'][i]['comment_author']

                let comments = detail['comment_set'][i]['comment_contents']
                let comment_id = detail['comment_set'][i]['id']
                let nickname = detail['comment_set'][i]['nickname']
                let comment_created_at = detail['comment_set'][i]['comment_created_at']
                let comment_like_count = detail['comment_set'][i]['count']
                if (comment_like_count == 0 && login_id != comment_author) {
                    let temp_html =
                    `<div class="comments">
                        <div class="cowriteinfo">
                            <div><p class="cowriter">${nickname}</p></div>
                            <div><p class="cotime">${comment_created_at}</p></div>
                        </div>
                        <div class="commentdetail">
                            <div class="comment"><h6>${comments}</h6></div>
                            <div style="display:flex; flex-direction:row; align-items:center">
                            <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="heart" onclick="likeButton(${comment_id})"height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                            <h5 style="margin:0; display:block">${comment_like_count}</h5>
                            </div>
                        </div>
                    </div>`
                $('#comments-box').prepend(temp_html)
            } else if (comment_like_count == 0 && login_id == comment_author){
                let temp_html =
                    `<div class="comments">
                        <div class="cowriteinfo">
                            <div><p class="cowriter">${nickname}</p></div>
                            <div><p class="cotime">${comment_created_at}</p></div>
                            <p class="comment-delete" onclick="getdeleteComment(${comment_id})"id="#">삭제</p>
                        </div>
                        <div class="commentdetail">
                            <div class="comment"><h6>${comments}</h6></div>
                            <div style="display:flex; flex-direction:row; align-items:center">
                            <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="heart" onclick="likeButton(${comment_id})"height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                            <h5 style="margin:0; display:block">${comment_like_count}</h5>
                            </div>
                        </div>
                    </div>`
                $('#comments-box').prepend(temp_html)
            } else if (comment_like_count != 0 && login_id == comment_author){
                let temp_html =
                    `<div class="comments">
                        <div class="cowriteinfo">
                            <div><p class="cowriter">${nickname}</p></div>
                            <div><p class="cotime">${comment_created_at}</p></div>
                            <p class="comment-delete" onclick="getdeleteComment(${comment_id})"id="#">삭제</p>
                        </div>
                        <div class="commentdetail">
                            <div class="comment"><h6>${comments}</h6></div>
                            <div style="display:flex; flex-direction:row; align-items:center">
                            <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="hearts" onclick="likeButton(${comment_id})" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <h5 style="margin:0; display:block">${comment_like_count}</h5>
                            </div>
                        </div>
                    </div>`
                $('#comments-box').prepend(temp_html)

            } else if (comment_like_count != 0 && login_id != comment_author){
                let temp_html =
                    `<div class="comments">
                        <div class="cowriteinfo">
                            <div><p class="cowriter">${nickname}</p></div>
                            <div><p class="cotime">${comment_created_at}</p></div>
                        </div>
                        <div class="commentdetail">
                            <div class="comment"><h6>${comments}</h6></div>
                            <div style="display:flex; flex-direction:row; align-items:center">
                            <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="hearts" onclick="likeButton(${comment_id})" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <h5 style="margin:0; display:block">${comment_like_count}</h5>
                            </div>
                        </div>
                    </div>`
                $('#comments-box').prepend(temp_html)
                


                $(document).on("click", ".staticBackdropLabel", function () {
                    var comment = $(this).data('id');
                    $(`.modal-footer #comment-update${comment_id}`).val( comment );
            });

            }
        
    }}  else if (!localStorage.getItem("access")){
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
                <h5 class="content">${contents}</h5>
            </div>
            <div>
            <div class="botediv">
                <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
                <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
            </div>
            </div>`
            $('#article-detail-box').prepend(temp_html)
    } else if (image != null) {
        let temp_html =
        `
    <div class="titlediv">
        <div class="writeinfo">
        <div><a>${nickname} - ${date}</a></div>
    </div>
    <div class="title"><h2>${title}</h2></div>
    </div>
</div>
<div class="contentdiv">
    <img src="${backend_base_url}${image}" alt="" />
    <h5 class="content">${contents}</h5>
</div>
<div>
<div class="botediv">
    <div class="boteb"><button type="button" class="bote" onclick="vote1()">🦊</button><p class="btext1">폭스입니다 (${count_fox})</p></div>
    <div class="boteb"><button type="button" class="bote" onclick="vote2()">💚</button><p class="btext2">그린라이트 (${count_green})</p></div>
    <div class="boteb"><button type="button" class="bote" onclick="vote3()">💔</button><p class="btext3">오해입니다 (${count_miss})</p></div>
</div>
</div>`
    $('#article-detail-box').prepend(temp_html)
    } for (let i = 0; i < detail['comment_set'].length; i++) {
        let comments = detail['comment_set'][i]['comment_contents']
        let comment_id = detail['comment_set'][i]['id']
        let nickname = detail['comment_set'][i]['nickname']
        let comment_created_at = detail['comment_set'][i]['comment_created_at']
        let comment_like_count = detail['comment_set'][i]['count']
        if (comment_like_count == 0) {
            let temp_html =
            `<div class="comments">
                <div class="cowriteinfo">
                    <div><p class="cowriter">${nickname}</p></div>
                    <div><p class="cotime">${comment_created_at}</p></div>
                </div>
                <div class="commentdetail">
                    <div class="comment"><h6>${comments}</h6></div>
                    <div style="display:flex; flex-direction:row; align-items:center">
                    <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="heart" onclick="likeButton(${comment_id})"height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                    <h5 style="margin:0; display:block">${comment_like_count}</h5>
                    </div>
                </div>
            </div>`
        $('#comments-box').prepend(temp_html)
} else if(comment_like_count != 0){
    let temp_html =
    `<div class="comments">
        <div class="cowriteinfo">
            <div><p class="cowriter">${nickname}</p></div>
            <div><p class="cotime">${comment_created_at}</p></div>
        </div>
        <div class="commentdetail">
            <div class="comment"><h6>${comments}</h6></div>
            <div style="display:flex; flex-direction:row; align-items:center">
            <svg xmlns="http://www.w3.org/2000/svg" id="hearts-button" class="hearts" onclick="likeButton(${comment_id})" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <h5 style="margin:0; display:block">${comment_like_count}</h5>
            </div>
        </div>
    </div>`
$('#comments-box').prepend(temp_html)
}
} }} )
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
    let comment= document.getElementById(`comment-update${comment_id}`).value
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

function updateMode() {
  
    const title = response_json["article_title"]
    const content = response_json["article_contents"]
    
    const input_title = document.createElement("textarea")
    input_title.setAttribute("id", "input_title")
    input_title.innerText = title.innerHTML

    const input_content = document.createElement("textarea")
    input_content.setAttribute("id", "input_content")
    input_content.innerText = content.innerHTML
    
    const body = document.body
    body.insertBefore(input_title, title)
    body.insertBefore(input_content, content)
}

// #로그인 모달
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')