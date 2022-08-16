function kakaoshare() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
        title: '너 그거 폭스야', 
        description: '알쏭달쏭 이성문제 고민상담 커뮤니티🦊',
        imageUrl:
            'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjPWjI%2FbtrJFO30iDI%2FJwnfE2YhkQZbeCvgnIMVnK%2Fimg.png',
        link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
        },
        },

        buttons: [
        {
            title: '사이트 놀러가기',
            link: {
                mobileWebUrl:'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com',
            },
        }
        ]
    });
}