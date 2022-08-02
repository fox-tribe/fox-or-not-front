document.write('<script src="/static/Scripts/article_detail.js"></script>');

function kakaoshare() {
    function articleDetail()
        var sharetitle = articleDetail.title;
        var sharedes = articleDetail.contents;
        var shareurl = '';

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
        title: sharetitle, 
        description: sharedes,
        imageUrl:
            '../static/image/logo.png',
        link: {
            mobileWebUrl: shareurl,
            webUrl: shareurl,
        },
        },

        buttons: [
        {
            title: '게시글 자세히 보기',
            link: {
                mobileWebUrl: shareurl,
                webUrl: shareurl,
            },
        }
        ]
    });
}