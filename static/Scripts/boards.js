const board_url = window.location.search.split('=')
const boards_name = board_url[1]
const decoded_name = decodeURI(boards_name)


// 게시물 상세 페이지 부르기
window.onload = async function board() {
    // 로그인 로그아웃 마이페이지 회원가입 버튼 숨기기
    if (!localStorage.getItem("access")) {
        let logout_button = document.getElementById("logout-button")
        let mypage_button = document.getElementById("mypage-button")
        logout_button.style.visibility = "hidden"
        mypage_button.style.visibility = "hidden"
    }
    else {
        let login_button = document.getElementById("login-button")
        let signup_button = document.getElementById("signup-button")
        login_button.style.visibility = "hidden"
        signup_button.style.visibility = "hidden"
    }
    const response = await fetch(`${backend_base_url}/article/?board=${decoded_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    response_json = await response.json()
    num = response_json.length
    result = JSON.stringify(response_json)
    sessionStorage.setItem("num", num)
    return result

}
const PagingConf = {
    totalCount: 100,
    numbersPerPage: 5,
    navPageNumber: Math.ceil(sessionStorage.getItem("num")/10),
};
sessionStorage.removeItem("num")
const feedNumber = {
    num : 0
}

$(document).ready(function () {
    setPageInfo(PagingConf.numbersPerPage, PagingConf.navPageNumber, 1);
    // setFeedNumber( $(val) );
    makePageNav();
    getPosts();
});

function makePageNav() {
    const pageInfo = getPageInfo();
    renderPaging($('.paging'), PagingConf.totalCount, pageInfo.numbersPerPage, pageInfo.navPageNumber, pageInfo.currentPage, true);
}

function renderPaging(appendElement, totalCount, numbersPerPage, navPageNumber, currentPage) {

    let totalPage = Math.ceil(totalCount / numbersPerPage); // 전체 페이지수
    let pageGroup = Math.ceil(currentPage / navPageNumber); // 1~10 : 1그룹 11~20 : 2그룹

    let last = pageGroup * navPageNumber; // 마지막 페이지수, 전체 페이지수 넘지않게 처리
    if (last > totalPage) {
        last = totalPage;
    }

    let first = last - (navPageNumber - 1);
    let front = 1;
    let prev = first - 1;
    let next = last + 1;
    let rear = totalPage;

    let innerHtml = ''; // 이동 페이지 수와 화살표 html

    // 왼쪽 < <<
    if (prev > 0) {
        innerHtml += '<a href=# onclick="movePage(' + front + ')"> << </a>';
        innerHtml += '<a href=# onclick="movePage(' + prev + ')"> < </a> ';
    }
    // 중간 이동 태그
    for (let i = first; i <= last; i++) {
        if (currentPage === i) {
            innerHtml += '<a href=# class="on" onclick="movePage(' + i + ')">' + i + '</a> ';
        } else {
            innerHtml += '<a href=# onclick="movePage(' + i + ')">' + i + '</a> ';
        }
    }
    // 오른쪽 > >>
    if (last < totalPage) {
        innerHtml += '<a href=# onclick="movePage(' + next + ')"> > </a>';
        innerHtml += '<a href=# onclick="movePage(' + rear + ')"> >> </a>';
    }

    appendElement.empty();
    appendElement.append(innerHtml);
}

function movePage(currentPage) {
    const pageInfo = getPageInfo();
    setPageInfo(pageInfo.numbersPerPage, pageInfo.navPageNumber, currentPage);
    makePageNav();
    getPosts();
}

function setPageInfo(numbersPerPage, navPageNumber, currentPage) {
    const pageInfo = {
        numbersPerPage: numbersPerPage,
        navPageNumber: navPageNumber,
        currentPage: currentPage
    };
    sessionStorage.setItem('pageInfo', JSON.stringify(pageInfo));
}

function getPageInfo() {
    return JSON.parse(sessionStorage.getItem('pageInfo'));
}

function getFeedInfo() {
    return JSON.parse(sessionStorage.getItem('pageInfo'));
}


function getPosts() {
    $('#list-post').empty()

    const pageInfo = getPageInfo();

    let page = pageInfo.currentPage;
    let offset = pageInfo.numbersPerPage;
    let params = '?page=' + page;
    params += '&offset=' + offset;
    $.ajax({
        type: 'GET',
        url: `${backend_base_url}/article/pagination?board=${decoded_name}&page=${page}`,
        data: {},
        async: false,
        success: function (response) {
            let posts = response['results'];
            if (posts[0]['board'] == '10대') {
                let board_html = `<b id="board-name">10대 게시판</b>`
                $('#board-name').append(board_html)
                
            } else if (posts[0]['board'] == '20대'){
                let board_html = `<b id="board-name">20대 게시판</b>`
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '30대'){
                let board_html = `<b id="board-name">30대 게시판</b>`
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '직장인'){
                let board_html = `<b id="board-name">직장인 게시판</b>`
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '연인'){
                let board_html = `<b id="board-name">연인 게시판</b>`
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '자유'){
                let board_html = `<b id="board-name">자유 게시판</b>`
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == 'HOT') {
                let board_html = `<b id="board-name">HOT 게시판</b>`
                $('#board-name').append(board_html)
            }
            
            if (response['results'] != 0) {
                let posts = response['results'];
                for (let i = 0; i < posts.length; i++) {
                    let cnt = i + 1
                    const title = posts[i]['article_title']
                    const author = posts[i]['author']
                    const date = posts[i]['article_post_date']
                    let temp_html = `<div class="tr">
                                        <div class="th number" scope="col">${cnt}.</div>
                                        <div class="th title" scope="col"><b>${title}</b></div>
                                        <div class="th author" scope="col">${author}</div>
                                        <div class="th date" scope="col">${date}</div>
                                    </div>`
                    $('#list-post').append(temp_html)
                }
            }
        },
        fail: function (response) {
            console.log("fail")
            // window.location.reload()
        }
    });
}
