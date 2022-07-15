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