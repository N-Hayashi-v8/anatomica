var collectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        $(entry.target).find('.p-collection__item').each(function (i) {
            var $item = $(this);
            setTimeout(function () {
                $item.addClass('is-revealed');
            }, i * 150);
        });

        collectionObserver.unobserve(entry.target);
    });
}, { threshold: 0.1 });

$(window).on('load', function(){
    $('.p-collection__group').each(function () {
        collectionObserver.observe(this);
    });

    $('.p-masterpiece__item').on('mouseenter', function(){
        $(this).attr('src', $(this).attr('src').replace('.png', '_red.png'));
    }).on('mouseleave', function(){
        $(this).attr('src', $(this).attr('src').replace('_red.png','.png'));
    });
});