// 게시글 작성
function handleArticleCreate() {

    console.log("create article")
    const contents = document.getElementById("article_content").value
    console.log("contents")
    const title = document.getElementById("title").value

    var board = document.getElementById('board');
    board = board.options[board.selectedIndex].value;

    var category = "성인"
    postArticle(contents, title, board, category)  
}
