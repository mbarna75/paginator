$(function () {

    // elemek összegyűjtése
    let templateArtticle = {
        title: 'Mai hírek',
        body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias laborum reprehenderit itaque est qui ab dolor, ipsum iste provident placeat asperiores, eos amet eveniet nulla quaerat enim dignissimos atque adipisci.'

    };
    let $contentWrapper = $('#content-wrapper');
    let $pagination = $('#pagination');
    let articleCollection = [];
    let pageSize = 5;
    let maxPage = 0;
    let $currentButton = '';
    let $oldButton = '';
    let renderableMaxPage = 10;
    let $paginationLastButton = '';
    let paginationHtml = '';
    let $beforePages = $('#beforepages');
    let $afterPages = $('#afterpages');
    let $firstPage = $('#first');
    let $prevPage = $('#prev');
    let $nextPage = $('#next');
    let $lastPage = $('#last');
    let pageIndex = 0;
    let startPage = 0;
    let $paginationButtons = ''

    // cikkek generálása
    for (let index = 0; index < 50; index++) {
        articleCollection.push(templateArtticle);
    }

    // oldalak kiszámolása
    maxArtticle = articleCollection.length;
    if ((maxArtticle % 5) === 0) {
        maxPage = maxArtticle / 5
    }
    else {
        maxPage = Math.ceil(maxArtticle / 5);
    }
    console.log(maxPage);
    console.log(renderableMaxPage);


    // Lapozó kiszámolás    

    calculatePaginator();

    function calculatePaginator() {
        for (let page = startPage; page < startPage + renderableMaxPage; page++) { RenderPagination(page) };
        $paginationButtons = $('div#pagination button');
        $paginationLastButton = $('div#pagination button:first-child');
        $paginationLastButton.removeClass('btn-light').addClass('btn-primary');
        $firstPage.show().addClass('disabled');
        $prevPage.show().addClass('disabled');
        // ha csak 1 oldal van, azt még le kell kezelni
        $nextPage.show();
        $lastPage.show();
    }
    // lapozó kirajzolás
    function RenderPagination(page) {
        // kirajzolás, ha az oldalak száma <= 10
        paginationHtml = '<button type="button" class="btn btn-light">' + (page + 1) + '</button>';
        $pagination.append(paginationHtml);
    }

    // gombra reagálás
    $paginationButtons.click(function () {
        console.log('itt vagyok');
        $currentButton = $(this);
        $paginationLastButton.removeClass('btn-primary').addClass('btn-light');
        $paginationLastButton = $currentButton;
        $currentButton.removeClass('btn-light');
        $currentButton.addClass('btn-primary');
        pageIndex = $currentButton.text();
        RenderPage(pageIndex);
        if (pageIndex != 1) {
            $firstPage.removeClass('disabled');
            $prevPage.removeClass('disabled');
        }
        else {
            $firstPage.addClass('disabled');
            $prevPage.addClass('disabled');
        }
        if (pageIndex != maxPage) {
            $nextPage.removeClass('disabled');
            $lastPage.removeClass('disabled');
        }
        else {
            $nextPage.addClass('disabled');
            $lastPage.addClass('disabled');
        }


    });

    $firstPage.click(function () {
        pageIndex = 1;
        RenderPage(pageIndex);
        $paginationLastButton.removeClass('btn-primary').addClass('btn-light');
        startPage = 0;
        $pagination.html('');
        calculatePaginator();


    });
    $prevPage.click(function () {
        pageIndex -= 1
        RenderPage(pageIndex);

    })
    $nextPage.click(function () {
        pageIndex += 1
        RenderPage(pageIndex);

    })
    $lastPage.click(function () {
        RenderPage(maxPage);

    })

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