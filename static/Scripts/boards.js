const board_url = window.location.search.split('=')
const boards_name = board_url[1]
const decoded_name = decodeURI(boards_name)


// 게시물 상세 페이지 부르기
window.onload = async function board() {
    // 로그인 로그아웃 마이페이지 회원가입 버튼 숨기기
    if (!localStorage.getItem("access")) {
        let logout_button = document.getElementById("logout-button")
        let mypage_button = document.getElementById("mypage-button")
        logout_button.style.display = "none"
        mypage_button.style.display = "none"
    }
    else {
        let login_button = document.getElementById("login-button")
        let signup_button = document.getElementById("signup-button")
        login_button.style.display = "none"
        signup_button.style.display = "none"
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
    sessionStorage.removeItem("num")
    sessionStorage.setItem("num", num)
    return result

}

// 검색기능
async function search() {
    const searchData = {
        type: document.getElementById('searchOption').value,
        search: document.getElementById('searchKeywords').value,
    }

    const response = await fetch(`${backend_base_url}/article/search/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(searchData)
    })
    if (searchData['search'] == '') {
        alert('검색어를 입력해주세요!')
    } else {
        // 세션 저장
        response_json = await response.json()
        result = JSON.stringify(response_json)
        num = response_json.length
        sessionStorage.setItem("result", result)
        sessionStorage.setItem("keyword", searchData.search)
        sessionStorage.setItem("type", searchData.type)
        sessionStorage.removeItem("num")
        sessionStorage.setItem("num", num)
        window.location.href = `${frontend_base_url}/search_result.html`
        return result
    }
    

    response_json = await response.json()
    return response_json.articles
}

// 페이지네이션
const PagingConf = {
    totalCount: 100,
    numbersPerPage: 5,
    navPageNumber: Math.ceil(sessionStorage.getItem("num")/10),
};

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

function postClick() {
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    } else {
        window.location.href='posting.html'
    }
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
            try{
            let posts = response['results'];
            if (posts[0]['board'] == '10대') {
                let board_html = `<b id="board-name">10대 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '20대'){
                let board_html = `<b id="board-name">20대 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '30대'){
                let board_html = `<b id="board-name">30대 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '직장인'){
                let board_html = `<b id="board-name">직장인 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '연인'){
                let board_html = `<b id="board-name">연인 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (posts[0]['board'] == '자유'){
                let board_html = `<b id="board-name">자유 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
            } else if (decoded_name == 'HOT'){
                let board_html = `<b id="board-name">HOT 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
                // HOT 게시판 리스팅
                $.ajax({
                    type: 'GET',
                    url: `${backend_base_url}/article/voteCount`,
                    data: {},
                    async: false,
                    success: function (response) {
                        response.reverse()
                        if (response['results'] != 0) {
                            for (let i = 0; i < response.length; i++) {
                                let cnt = i + 1
                                const id = response[i]['id']
                                const title = response[i]['article_title']
                                const author = response[i]['author']
                                const date = response[i]['article_post_date']
                                const vote = response[i]['vote']['count']
                                let temp_html = `<div class="post-line row" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">
                                                    <div class="post-number col-1" scope="col">${cnt}.</div>
                                                    <div class="post-title col-6" scope="col"><b>${title}</b></div>
                                                    <div class="post-author col col-md-col1" scope="col">${author}</div>
                                                    <div class="post-date col" scope="col">${date}</div>
                                                    <div class="post-date col" scope="col">투표:${vote}</div>
                                                </div>`
                                $('#list-post').append(temp_html)
                    }
                }
            }
            }
            )
            }
            
            if (response['results'] != 0) {
                let posts = response['results'];
                for (let i = 0; i < posts.length; i++) {
                    let cnt = i + 1
                    const id = posts[i]['id']
                    const title = posts[i]['article_title']
                    const author = posts[i]['author']
                    const date = posts[i]['article_post_date']
                    let temp_html = `<div class="post-line row" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">
                                        <div class="post-number col-1" scope="col">${cnt}.</div>
                                        <div class="post-title col-6" scope="col"><b>${title}</b></div>
                                        <div class="post-author col col-md-col1" scope="col">${author}</div>
                                        <div class="post-date col" scope="col">${date}</div>
                                    </div>`
                    $('#list-post').append(temp_html)
                }
            }
        } catch (err) {
            let board_html = `<b id="board-name">HOT 게시판</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
                // HOT 게시판 리스팅
                $.ajax({
                    type: 'GET',
                    url: `${backend_base_url}/article/voteCount/board/`,
                    data: {},
                    async: false,
                    success: function (response) {
                        response.reverse()
                        if (response['results'] != 0) {
                            for (let i = 0; i < response.length; i++) {
                                let cnt = i + 1
                                const id = response[i]['id']
                                const title = response[i]['article_title']
                                const author = response[i]['author']
                                const date = response[i]['article_post_date']
                                const vote = response[i]['vote']['count']
                                if (vote == 0 ){

                                } else {
                                let temp_html = `<div class="post-line row" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">
                                                    <div class="post-number col-1" scope="col">${cnt}.</div>
                                                    <div class="post-title col-6" scope="col"><b>${title}</b></div>
                                                    <div class="post-author col col-md-col1" scope="col">${author}</div>
                                                    <div class="post-date col" scope="col">${date}</div>
                                                    <div class="post-date col" scope="col">투표:${vote}</div>
                                                </div>`
                                $('#list-post').append(temp_html)
                                }
                    }

        }}})}},
        fail: function (response) {
            // window.location.reload()
        }
    });
}
