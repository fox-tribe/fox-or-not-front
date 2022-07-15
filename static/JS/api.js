const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


// 회원가입
async function handleSignin() {
    const signupData = {
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value,
        password2: document.getElementById('floatingPassword2').value,
        nickname: document.getElementById('floatingnNickname').value,
        // sex: document.getElementById('floatingSex').value,
        // birth: document.getElementById('floatingBirth').value


    }
    const password = document.getElementById('floatingPassword').value
    const password2 = document.getElementById('floatingPassword2').value
    const username = document.getElementById("floatingInput").value
    // const sex = document.getElementById("floatingSex").value
    const nickname = document.getElementById("floatingnNickname").value
    // const birth = document.getElementById("floatingnBirth").value


    const response = await fetch(`${backend_base_url}/user/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(signupData)
    }

    )
    if (username == '' || password == '' || nickname == '' ) {
        alert("빈칸을 입력해주세요")
    }
    else if (password == password2) {
        if (response.status == 200) {
            alert("회원가입 완료")
            response_json = await response.json()
            window.location.replace(`${frontend_base_url}/index.html`);
        } else if (response.status == 500) {
            alert("동일한 아이디 및 닉네임이 이미 존재합니다")
        } else {
            alert(response.status)
        }
    } else {
        alert("비밀번호가 일치하지 않습니다")
    }
}

// 로그인
async function handleLogin() {
    // console.log("handle login")

    const loginData = {
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value
    }
    username = loginData.username

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