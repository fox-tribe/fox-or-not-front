const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


// #모달
async function modal() {
    const openButton = document.getElementById("modalclick");
    const modal = document.querySelector(".modal");
    const overlay = modal.querySelector(".modal__overlay");
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
    }

// #댓글 하트 채워지기
$(document).ready(function(){
    $("#like").click(function(){
        $("#reallike").show();
        $("#like").hide();
    })

    $("#reallike").click(function(){
        $("#like").show();
        $("#reallike").hide();
    })
})

// 로그아웃

function logout() {
    alert("로그아웃 하였습니다")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")

    window.location.replace(`${frontend_base_url}/index.html`)
}