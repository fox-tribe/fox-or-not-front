

// #모달
async function modal() {
    const openButton = document.getElementById("modalclick");
    const modal = document.querySelector(".modal");
    const overlay = modal.querySelector(".modal__overlay");
    const closeBtn = modal.querySelector(".modalbutton");
    const openModal = () => {
        modal.classList.remove("hidden");
    }
    const closeModal = () => {
        modal.classList.add("hidden");
    }
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    openButton.addEventListener("click", openModal);
    }


// 탭 - 버튼 css바꾸기
const nonClick = document.querySelectorAll(".non-click, .click");

function handleClick(event) {
  nonClick.forEach((e) => {
    e.classList.remove("click");
  });
  event.target.classList.add("click");
}

nonClick.forEach((e) => {
  e.addEventListener("click", handleClick);
});



// 탭 - div 내용 바꾸기
    var mylogs = document.getElementById("mylogs"); 
    var biofixed = document.getElementById("biofixed"); 
    var terms = document.getElementById("terms"); 
    var clicktap1 = document.getElementById("tap1")
    var clicktap2 = document.getElementById("tap2")
    var clicktap3 = document.getElementById("tap3")

    clicktap1.onclick = function() {
        mylogs.style.display = 'flex'; 
        biofixed.style.display = 'none'; 	
        terms.style.display = 'none'; 	
    }
    clicktap2.onclick = function() {
        mylogs.style.display = 'none'; 
        biofixed.style.display = 'flex'; 	
        terms.style.display = 'none'; 	
    }
    clicktap3.onclick = function() {
        mylogs.style.display = 'none'; 
        biofixed.style.display = 'none'; 	
        terms.style.display = 'block'; 	
    }


async function getMyArticles() {

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    parsed_token = parseJwt(localStorage.getItem('access'))
    username = parsed_token.username
    

    const myData = async () => {
        const response = await fetch(`${backend_base_url}/article/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        
        }
    )
    response_json = await response.json()
    
    }

    myData().then((data) => {
        detail = response_json
        console.log(detail)

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

