// #사이드 모달
async function side_modal() {
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
}

// #로그인 모달
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})