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

    var infoObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(!entry.isIntersecting) return;
            var $target = $(entry.target);
            var $parent = $target.closest('.p-contact');
            ($parent.length ? $parent : $target).addClass('is-revealed');
            infoObserver.unobserve(entry.target);
        });
    },{ threshold: 0.1});

    $('.p-online-store__image-wrap, .p-stockist__image-wrap, .p-contact__image-wrap, .p-brand-history__image-wrap, .p-key-person__image-wrap, .p-mp__slider, .p-flagship__image-wrap').each(function() {
        infoObserver.observe(this);
    });

    $('.p-masterpiece__item').on('mouseenter', function(){
        $(this).attr('src', $(this).attr('src').replace('.png', '_red.png'));
    }).on('mouseleave', function(){
        $(this).attr('src', $(this).attr('src').replace('_red.png','.png'));
    });

    $('.p-mp__slider').each(function(){
        var $slider = $(this);
        var $slides = $slider.find('.p-mp__slides');
        var total   = $slider.find('.p-mp__slide').length;
        var current = 0;

        if(total <= 1){
            $slider.find('.p-mp__btn').hide();
            return;
        }

        function goTo(index){
            current = (index + total) % total;
            $slides.css('transform', 'translateX(' + (-current * 100) + '%)');
        }

        $slider.find('.p-mp__btn--prev').on('click', function(){ goTo(current - 1);});
        $slider.find('.p-mp__btn--next').on('click', function(){ goTo(current + 1);});
    });

});