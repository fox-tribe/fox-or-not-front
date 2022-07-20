// 게시글 포스팅(articles) - 이미지 제작 후 바로 게시글로 넘어가도록
function handleArticleCreate() {

    console.log("create article")
    const contents = document.getElementById("article_content").value
    const title = document.getElementById("title").value

    var board = document.getElementById('board');
    board = board.options[board.selectedIndex].value;

    var category = "성인"
    postArticle(contents, title, board, category)  
}
