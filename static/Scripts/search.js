
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
        sessionStorage.setItem("num", num)
        window.location.href = `${frontend_base_url}/search_result.html`
        return result
    }
    

    response_json = await response.json()
    return response_json.articles
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
function postClick() {
    if (!localStorage.getItem("access")) {
        alert('로그인해주세요!')
    } else {
        window.location.href='posting.html'
    }
}

function getPosts() {

    $('#search-post').empty()

    const pageInfo = getPageInfo();

    let page = pageInfo.currentPage;
    let offset = pageInfo.numbersPerPage;
    let params = '?page=' + page;
    params += '&offset=' + offset;
    $.ajax({
        type: 'POST',
        url: `${backend_base_url}/article/search/`,
        data: {            
            type: sessionStorage.getItem("type"),
            search: sessionStorage.getItem("keyword")
        },
        async: false,
        success: function (response) {        
            console.log(response) 
            if (response.length != 0) {
                let posts = response;
                console.log(posts)
                let board_html = `<b id="board-name">'${sessionStorage.getItem("keyword")}' 검색결과</b>`
                $('#board-name').empty()
                $('#board-name').append(board_html)
                for (let i = 0; i < posts.length; i++) {
                    let cnt = i + 1
                    const id = posts[i]['id']
                    const title = posts[i]['article_title']
                    const author = posts[i]['author']
                    const date = posts[i]['article_post_date']

                    let temp_html = `<div class="post-line row" onclick="location.href='${frontend_base_url}/detail.html?id=${id}'">
                                        <div class="th number col-1" scope="col">${cnt}.</div>
                                        <div class="th title col-6" scope="col"><b>${title}</b></div>
                                        <div class="th author col col-md-col1" scope="col">${author}</div>
                                        <div class="th date col" scope="col">${date}</div>
                                    </div>`
                    $('#search-post').append(temp_html)
                }
            }
        },
        fail: function (response) {
            console.log("fail")
            // window.location.reload()
        }
    });
}

