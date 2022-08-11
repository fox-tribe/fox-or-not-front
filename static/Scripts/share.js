document.write('<script src="/static/Scripts/article_detail.js"></script>');

function kakaoshare() {
    
    var sharetitle = articleDetail.title;
    var sharedes = articleDetail.contents;
    var shareurl = '${frontend_base_url}/detail.html?id=${id}';

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
    // Kakao.Share.sendDefault({
    //     objectType: 'feed',
    //     content: {
    //       title: '오늘의 디저트',
    //       description: '아메리카노, 빵, 케익',
    //       imageUrl:
    //         'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
    //       link: {
    //         mobileWebUrl: 'https://developers.kakao.com',
    //         androidExecutionParams: 'test',
    //       },
    //     },
    //     itemContent: {
    //       profileText: 'Kakao',
    //       profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
    //       titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
    //       titleImageText: 'Cheese cake',
    //       titleImageCategory: 'Cake',
    //       items: [
    //         {
    //           item: 'Cake1',
    //           itemOp: '1000원',
    //         },
    //         {
    //           item: 'Cake2',
    //           itemOp: '2000원',
    //         },
    //         {
    //           item: 'Cake3',
    //           itemOp: '3000원',
    //         },
    //         {
    //           item: 'Cake4',
    //           itemOp: '4000원',
    //         },
    //         {
    //           item: 'Cake5',
    //           itemOp: '5000원',
    //         },
    //       ],
    //       sum: '총 결제금액',
    //       sumOp: '15000원',
    //     },
    //     social: {
    //       likeCount: 10,
    //       commentCount: 20,
    //       sharedCount: 30,
    //     },
    //     buttons: [
    //       {
    //         title: '웹으로 이동',
    //         link: {
    //           mobileWebUrl: 'https://developers.kakao.com',
    //         },
    //       },
    //       {
    //         title: '앱으로 이동',
    //         link: {
    //           mobileWebUrl: 'https://developers.kakao.com',
    //         },
    //       },
    //     ]
    //   });
    }