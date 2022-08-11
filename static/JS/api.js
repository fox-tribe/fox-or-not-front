const backend_base_url = "https://api.fox-or-not.com"
const frontend_base_url = "https://fox-or-not.com"



// 회원가입
async function handleSignin() {
    var selectGender = document.getElementById('floatingGender');
    selectGender = selectGender.options[selectGender.selectedIndex].value;
    
    const signupData = {
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value,
        password2: document.getElementById('floatingPassword2').value,
        nickname: document.getElementById('floatingnNickname').value,
        gender: document.getElementById('floatingGender').value,
        birth: document.getElementById('floatingBirth').value
    }


    const password = document.getElementById('floatingPassword').value
    const password2 = document.getElementById('floatingPassword2').value
    const username = document.getElementById("floatingInput").value
    const nickname = document.getElementById("floatingnNickname").value
    const birth = document.getElementById("floatingBirth").value
    

    const response = await fetch(`${backend_base_url}/user/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(signupData)
    }

    )
    if (username == '' || password == '' || nickname == '' || selectGender == '' || birth == '' ) {
        alert("빈칸을 입력해주세요")
    }
    else if (password == password2) {
        if (response.status == 200) {
            alert("회원가입 완료")
            response_json = await response.json()
            window.location.replace(`${frontend_base_url}/signup.html`);
        } else if (response.status == 500) {
            alert("동일한 아이디 및 닉네임이 이미 존재합니다")
        } else {
            alert(response.status)
        }
    } else {
        alert("비밀번호가 일치하지 않습니다")
    }
}

// 회원정보 변경
async function changeInfo(nickname, password, selectGender){
    
    let data = {
        password : password,
        gender : selectGender,
        nickname : nickname,
    }
    console.log(data)
    
    const response = await fetch(`${backend_base_url}/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify(data)
        
        }
)
response_json = await response.json()
window.location.replace(`${frontend_base_url}/mypage.html`)
}

// 로그인
async function handleLogin() {
    // console.log("handle login")

    const loginData = {
        username: document.getElementById("floatingloginID").value,
        password: document.getElementById('floatingloginPassword').value
    }
    username = loginData.username

    const login_response = await fetch(`${backend_base_url}/user/login/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    login_response_json = await login_response.json()
    console.log(login_response_json)

    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )

    response_json = await response.json()


    if (response.status == 200) {
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        localStorage.setItem("payload", jsonPayload);
        alert(username + "님의 접속을 환영합니다")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert('로그인 정보가 일치하지 않습니다.')
    }

}


// 로그아웃

function logout() {
    alert("로그아웃 하였습니다")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")

    window.location.replace(`${frontend_base_url}/index.html`)
}


// article 작성
async function postArticle(contents, title, board, category) {
    const image = document.getElementById("formFile").files[0]
    const test_exposure_date = "3000-12-01"
    console.log(image)
    let form_data = new FormData()
    form_data.enctype = "multipart/form-data"
    form_data.append("article_image", image)
    form_data.append("article_title", title)
    form_data.append("article_contents", contents)
    form_data.append("board", board)
    form_data.append("article_category", category)
    form_data.append("article_exposure_date", test_exposure_date)
    const response = await fetch(`${backend_base_url}/article/`, {
        method: 'POST',
        headers: {
            // Accept: "multipart/form-data",
            // "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "access-control-allow-origin": "*",
        },
        body: form_data
    }).then(res => res.json())
    window.location.replace(`${frontend_base_url}/index.html`);
}


// article 수정

async function updateArticle(title, contents)  {
    
    let updateData = {
        article_title: title,
        article_contents: contents,
    }
    let response = await fetch(`${backend_base_url}/article/${obj_id}/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "access-control-allow-origin": "*"
        },
        body: JSON.stringify(updateData)
    })

    response_json = await response.json()
    window.location.replace(`${frontend_base_url}/detail.html?id=${obj_id}`);

}



// article 삭제

async function deleteArticle() {
    const response = await fetch(`${backend_base_url}/article/${obj_id}/`, {
        method: 'DELETE',

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "access-control-allow-origin": "*"
        },

    }
    )
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/index.html`);
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }

}


// 댓글 수정

async function updateComment(comment, comment_id)  {
    console.log(comment_id)
    
    let updateData = {
        comment_contents: comment
    }
    let response = await fetch(`${backend_base_url}/article/${comment_id}/comment/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "access-control-allow-origin": "*"
        },
        body: JSON.stringify(updateData)
    })

    response_json = await response.json()
    window.location.replace(`${frontend_base_url}/detail.html?id=${obj_id}`);

}


// 댓글 삭제

async function deleteComment(comment_id) {
    const response = await fetch(`${backend_base_url}/article/${comment_id}/comment/`, {
        method: 'DELETE',

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "access-control-allow-origin": "*"
        },

    }
    )
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/detail.html?id=${obj_id}`);
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }

}



// 게시판 페이지네이션
async function boardPagenation() {
    let boardPagenation = async () => {
        const response = await fetch(`${backend_base_url}/article/pagination?board=${decoded_name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    response_json = await response.json()
    }
    
    
    // 게시글 정보 구간
    boardPagenation().then((data) => {
        detail = response_json
        console.log(detail)
        for (let i = 0; i < detail['results'].length ; i++) {
        const title = detail['results'][i]['article_title']
        const author = detail['results'][i]['author']
        const date = detail['results'][i]['article_post_date']
        const content = document.createElement("li");
        content.classList.add("content");
        content.innerHTML = `
        <span class="content__title">${title}</span>
        <span class="content__author">${author}</span>
        <span class="content__date">${date}</span>
        `;
        }  
}
)
}

