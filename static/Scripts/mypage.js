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