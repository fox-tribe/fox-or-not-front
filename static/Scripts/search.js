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
        },
        body: JSON.stringify(searchData)
    })
    window.location.href = `${frontend_base_url}/search_result.html`
    response_json = await response.json()
    result = JSON.stringify(response_json)
    console.log(result)
    console.log(searchData.search)
    let temp_html = `<div class="board-name"><b>"${searchData.search}" 검색결과</b></div>`
    $('#search-keyword').append(temp_html)
    return result
    

}

const PagingConf = {
    totalCount: 100,
    numbersPerPage: 5,
    navPageNumber: 10
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


function getPosts() {
    $('#list-post').empty()

    const pageInfo = getPageInfo();

    let page = pageInfo.currentPage;
    let offset = pageInfo.numbersPerPage;
    let params = '?page=' + page;
    params += '&offset=' + offset;
    }
    $.ajax({
        type: 'GET',
        url: `${backend_base_url}/article/pagination?board=${decoded_name}&page=${page}`,
        data: {},
        async: false,
        success: function (result) {
            console.log(result)
            if (result['results'] != 0) {
                let posts = result['results'];
                for (let i = 0; i < posts.length; i++) {
                    let cnt = i + 1
                    const title = posts[i]['article_title']
                    const author = posts[i]['author']
                    const date = posts[i]['article_post_date']
                    let keyword_html = `<div class="board-name"><b>"${searchData.search}" 검색결과</b></div>`
                    $('#search-keyword').append(keyword_html)
                    let temp_html = `<tr>
                                        <th scope="col">${cnt}</th>
                                        <th scope="col">${title}</th>
                                        <th scope="col">${author}</th>
                                        <th scope="col">${date}</th>
                                    </tr>`
                    $('#list-post').append(temp_html)
                }
            } else {
                console.log("no posts")
            }
        },
        fail: function (response) {
            console.log("fail")
            // window.location.reload()
        }
    });
