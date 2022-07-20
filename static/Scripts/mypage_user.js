async function userInfo() {

    const myData = async () => {
        const response = await fetch(`${backend_base_url}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
        
        }
    )
    response_json = await response.json()
    console.log(response_json)
    }

    myData().then((data) => {
        detail = response_json
        console.log(detail)
        let username_html = `<h3>${username}님 환영합니다</h3>`
        $('#mypage-username').prepend(username_html)
        for (let i = 0; i < detail.length; i++) {
            if (detail[i]['author'] == username) {
                let author = detail[i]['author']
                let id = detail[i]['id']
                let title = detail[i]['article_title']
                let contents = detail[i]['article_contents']
                let date = detail[i]['article_post_date']
                let count_fox = detail[i]['vote']['fox']
                let count_green = detail[i]['vote']['green']
                let count_miss = detail[i]['vote']['miss']
                let temp_html =`
                <div class="myarticle" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">
                <p><b>${title}</b></p>
                <p>🦊 : ${count_fox} <br> 💚 : ${count_green} <br> 💔 : ${count_miss}</p>
                </div>`
                $('#mypage-article-box').prepend(temp_html)
            }else{}
        }
        for (let i = 0; i < detail.length; i++) {
            for (let j = 0; j < detail[i]['comment_set'].length; j++) {
            if (detail[i]['comment_set'][j]['author'] == username) {
                let title = detail[i]['article_title']
                let id = detail[i]['id']
                let contents = detail[i]['comment_set'][j]['comment_contents']
                let likes = detail[i]['comment_set'][j]['count']
                let temp_html =`
                <div class="mycomment">
                <div class="thisarticle" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">${title}</div>
                <div class="thiscomment">${contents}</div>
                <div class="thislike"><i class="fa-solid fa-heart fa-2x"></i><p>${likes}</p></div>
                </div>`
                $('#mypage-comment-box').prepend(temp_html)
            }else{}
            }
        }
        

    })
}

userInfo()