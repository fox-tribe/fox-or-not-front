

async function userInfo() {

    const userInfo = async () => {
        const response = await fetch(`${backend_base_url}/user/api/authonly/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
        
        }
    )
    response_json = await response.json()
    }
    userInfo().then((data) => {
        detail = response_json
        let username = detail['username']
        let nickname = detail['nickname']
        let gender = detail['gender']
        let temp_html =`                <h2>현재정보</h2>
        
        <div class="befbio"><p><span style="color:black;">아이디:</span>   ${username}</p></div>
        <div class="befbio"><p><span style="color:black;">닉네임:</span>   ${nickname}</p></div>
        <div class="befbio"><p><span style="color:black;">성별:</span>    ${gender}</p></div>`
        $('#profile').prepend(temp_html)

        let username_html = `<h3><b>${nickname}</b>님 환영합니다</h3>`
        $('#mypage-username').prepend(username_html)

    })
}




function editInfo() {
    let nickname = document.getElementById("edit-nickname").value
    let password = document.getElementById("edit-password").value
    let selectGender = document.getElementById("edit-gender").value

    if (nickname =='' || selectGender == '-----'){
        alert('변경사항을 정확히 입력해주세요!')
    }
    else if (password ==''){
        alert('비밀번호확인이 필요합니다!')
    }
    else {
        changeInfo(nickname, password, selectGender)
    }
}

function changekey() {
	if (window.event.keyCode == 13) {
    	// 엔터키가 눌렸을 때
        editInfo()

    }
}






userInfo()