// 게시글 작성
function handleArticleCreate() {

    const contents = document.getElementById("article_content").value
    const title = document.getElementById("title").value

    var board = document.getElementById('board');
    board = board.options[board.selectedIndex].value;

    var category = "성인"
    if ( contents == '' || title == '' || board == '업로드 할 게시판을 선택해주세요'){
        alert('내용을 입력해주세요!')
    }
    postArticle(contents, title, board, category)  
}
