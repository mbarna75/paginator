$(function () {

    // elemek összegyűjtése
    let $contentWrapper = $('#content-wrapper');
    let $pagination = $('#pagination');
    

    let templateArtticle = {
        title: 'Mai hírek',
        body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias laborum reprehenderit itaque est qui ab dolor, ipsum iste provident placeat asperiores, eos amet eveniet nulla quaerat enim dignissimos atque adipisci.'

    };
    let articleCollection = [];
    let pageSize = 5;
    let maxPage = 0;
    let $currentButton = '';
    let $oldButton = '';

    // cikkek generálása
    for (let index = 0; index < 30; index++) {
        articleCollection.push(templateArtticle);
    }
    
    // oldalak kiszámolása
    maxArtticle = articleCollection.length;
    if ((maxArtticle % 5) === 0){
        maxPage = maxArtticle / 5
    }
    else {
        maxPage = Math.ceil(maxArtticle / 5);
    }
    console.log(maxPage);
    
    // lapozó kirajzolás

    for (let page = 0 ; page < maxPage; page++){RenderPagination(page)};
    let $buttons = $('button');

    // gombra reagálás
    $buttons.click(function () {
        $currentButton = $(this);
        
        if ($oldButton != '') {
            $oldButton.removeClass('btn-primary').addClass('btn-light');
        }
        $oldButton = $currentButton;
        $currentButton.removeClass('btn-light');
        $currentButton.addClass('btn-primary');
        let pageIndex = $currentButton.text();
        RenderPage(pageIndex);
    });
    
    function RenderPagination(page){
        let paginationHtml = '<button type="button" class="btn btn-light">'+ (page + 1) +'</button>';
        $pagination.append(paginationHtml);
    }
    

    RenderPage(1);

    console.log(articleCollection);

    function RenderPage(pageIndex) {
        $contentWrapper.html('');
        for (
            let index = (pageIndex - 1) * pageSize;
            index < pageIndex * pageSize;
            index++
        ) {
            RenderArticle(index);

        }
    };
    function RenderArticle(index) {
        let article = articleCollection[index];
        let articleHtml = '<div><strong>' + article.title + ' (' + (index + 1) + ')</strong><p>'
            + article.body + '</p></div>';

        $contentWrapper.append(articleHtml);
    }
});