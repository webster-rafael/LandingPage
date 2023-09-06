/**
 *	Myour - Personal Portfolio Template (HTML)
 *	Version: 1.0
 *	Author: beshleyua
 *	Author URL: http://themeforest.net/user/beshleyua
 *	Copyright © Myour by beshleyua. All Rights Reserved.
 **/

(function($) {
    'use strict';

    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };

    $(window).on("load", function() {

        /*
        	Preloader
        */
        var preload = $('.preloader');
        setTimeout(function() {
            preload.find('.spinner').velocity({
                opacity: '0',
                translateY: '-40px'
            }, {
                duration: 400,
                complete: function() {
                    preload.find('.box-1').velocity({
                        translateY: '-100%'
                    }, {
                        duration: 1000,
                        easing: [0.7, 0, 0.3, 1]
                    });
                    preload.find('.box-2').velocity({
                        translateY: '-100%'
                    }, {
                        duration: 400,
                        easing: [0.7, 0, 0.3, 1]
                    });
                }
            });
        }, 1000);

        /*
        	Typed Subtitle
        */
        if (($('.typed-subtitle').length) && ($('.h-subtitle p').length > 1)) {
            $('.typed-subtitle').each(function() {
                $(this).typed({
                    stringsElement: $(this).prev('.typing-subtitle'),
                    loop: true
                });
            });
        }

        /*
        	One Page Nav
        */
        var url_hash = location.hash;
        var sectionElem = $(url_hash);
        if (url_hash.indexOf('#') == 0 && sectionElem.length) {
            $('body, html').animate({
                scrollTop: $(url_hash).offset().top - 68
            }, 400);
        }

    });

    /*
    	Set full height in blocks
    */
    var width = $(window).width();
    var height = $(window).height();

    /*
    	Set Height Started Section
    */
    if (width < 783) {
        $('.section.started').css({
            'height': height
        });
    }

    /*
    	Started Slider
    */
    if ($('.started-carousel').length) {
        var started_slider = new Swiper('.started-carousel .swiper-container', {
            init: false,
            loop: false,
            spaceBetween: 0,
            effect: 'fade',
            slidesPerView: 1,
            simulateTouch: false,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                waitForTransition: false,
            }
        });
        started_slider.on('slideChange', function() {
            var index = started_slider.realIndex;
            var total = started_slider.slides.length;

            $('.started-carousel .swiper-slide').removeClass('first');
            $('.started-carousel .swiper-slide').each(function(i, slide) {
                if ((index - 1) >= i) {
                    $(slide).addClass('swiper-clip-active');
                } else {
                    $(slide).removeClass('swiper-clip-active');
                }
            });
            $('.started-carousel .swiper-slide').each(function(i, slide) {
                $(slide).css({
                    'z-index': total - i
                });
            });
        });
        started_slider.init();
    }

    /*
    	Content Carousel
    */
    if ($('.content-carousel').length) {
        var $carousel = $('.owl-carousel');
        $carousel.each(function() {
            var $this = $(this);
            var slidesview = $this.data('slidesview');
            var slidesview_mobile = $this.data('slidesview_mobile');
            $this.owlCarousel({
                margin: 40,
                items: slidesview,
                autoplay: false,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                loop: false,
                rewind: true,
                nav: false,
                dots: false,
                responsive: {
                    0: {
                        margin: 40,
                        items: slidesview_mobile
                    },
                    720: {
                        margin: 40,
                        items: slidesview
                    },
                    1200: {
                        margin: 40,
                        items: slidesview
                    }
                }
            });
            /* Go to the next item */
            $this.closest('.content-carousel').find('.next').click(function() {
                $(this).closest('.content-carousel').find('.owl-carousel').trigger('next.owl.carousel', [800]);
            });
            /* Go to the previous item */
            $this.closest('.content-carousel').find('.prev').click(function() {
                $(this).closest('.content-carousel').find('.owl-carousel').trigger('prev.owl.carousel', [800]);
            });
        });
    }

    /*
    	Button Hover
    */
    $('.animated-button > span').each(function(index) {
        var characters = $(this).text().trim().split("");
        var label = $(this);
        label.empty();
        $.each(characters, function(i, el) {
            label.append("<em>" + el + "</em>");
        });
    });

    /*
    	One Page Menu
    */
    $('header .top-menu').on('click', 'a', function() {
        var link = $(this).attr('href');
        if (link.indexOf('#') == 0) {
            if (!$('body').hasClass('page-template-template-layout-builder')) {
                location.href = $('.logo a').attr('href') + link;
            } else {
                $('body, html').animate({
                    scrollTop: $(link).offset().top - 115
                }, 400);
                if ($('header').hasClass('active')) {
                    $('.menu-btn').trigger('click');
                }
            }
            return false;
        }
    });
    if ($('.section').length && $('.top-menu li a').length) {
        $(window).on('scroll', function() {
            var scrollPos = $(window).scrollTop();
            $('.top-menu ul li a').each(function() {
                if ($(this).attr('href').indexOf('#') == 0) {
                    var currLink = $(this);
                    var refElement = $(currLink.attr("href"));
                    if (refElement.length) {
                        if (refElement.offset().top <= scrollPos + 120) {
                            $('.top-menu ul li').removeClass("current-menu-item");
                            currLink.closest('li').addClass("current-menu-item");
                        }
                    }
                }
            });
        });
    }

    /*
    	Header On Scroll
    */
    $(window).on('scroll', function() {

        /* add/remove header fixed class */
        if (($(this).scrollTop() >= 5) && ($('.section').length > 1)) {
            $('.header').addClass('fixed');
            $('.mouse-btn').fadeOut();
        }
        if (($(this).scrollTop() <= 5) && ($('.section').length > 1)) {
            $('.header').removeClass('fixed');
            $('.mouse-btn').fadeIn();
        }

    });

    /*
    	Menu on Mobile
    */
    $('header').on('click', '.menu-btn', function() {
        if ($('header').hasClass('active')) {
            $('header').removeClass('active');
            $('.footer .soc').fadeIn();
            $('body').addClass('loaded');
            if ($('.video-bg').length) {
                $('body').addClass('background-enabled');
            }
        } else {
            $('header').addClass('active');
            $('.footer .soc').hide();
            $('body').removeClass('loaded');
            $('body').removeClass('background-enabled');
        }

        return false;
    });

    /*
    	Menu Dropdown
    */
    if (width < 993) {
        $('.top-menu a.dropdown-toggle').on('click', function() {
            if ($(this).closest('li').hasClass('active')) {
                $(this).closest('li').removeClass('active');
                $(this).closest('li').find('> ul').slideUp();
            } else {
                $(this).closest('li').addClass('active');
                $(this).closest('li').find('> ul').slideDown();
            }

            return false;
        });
    }

    /*
    	Mouse Button Scroll
    */
    $('.section').on('click', '.mouse-btn', function() {
        $('body, html').animate({
            scrollTop: height - 150
        }, 800);
    });
    if ($('.section').length > 1) {
        $('.mouse-btn').show();
    }

    /*
    	Initialize portfolio items
    */
    if ($('.section.works .box-items').length) {
        var $container = $('.section.works .box-items');
        $container.imagesLoaded(function() {
            $container.isotope({
                itemSelector: '.box-col'
            });
        });
    }

    /*
    	Filter items on button click
    */
    $('.filters').on('click', '.btn-group', function() {
        var filterValue = $(this).find('input').val();
        $container.isotope({
            filter: filterValue
        });
        $('.filters .btn-group label').removeClass('glitch-effect');
        $(this).find('label').addClass('glitch-effect');
    });

    /*
    	Gallery popup
    */
    if (/\.(?:jpg|jpeg|gif|png)$/i.test($('.wp-block-gallery .blocks-gallery-item:first a').attr('href'))) {
        $('.wp-block-gallery a').magnificPopup({
            gallery: {
                enabled: true
            },
            type: 'image',
            closeBtnInside: false,
            mainClass: 'mfp-fade'
        });
    }

    /*
    	Image popup
    */
    $('.has-popup-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        image: {
            verticalFit: true
        }
    });

    /*
    	Video popup
    */
    $('.has-popup-video').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube_short: {
                    index: 'youtu.be/',
                    id: 'youtu.be/',
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        mainClass: 'mfp-fade',
        callbacks: {
            markupParse: function(template, values, item) {
                template.find('iframe').attr('allow', 'autoplay');
            }
        }
    });

    /*
    	Music popup
    */
    $('.has-popup-music').magnificPopup({
        type: 'iframe',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        mainClass: 'mfp-fade'
    });

    /*
    	Gallery popup
    */
    $('.has-popup-gallery').on('click', function() {
        var gallery = $(this).attr('href');

        $(gallery).magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });

    /*
    	Background video
    */
    if ($('.jarallax-video').length) {
        $('.jarallax-video').each(function() {
            $(this).jarallax();
        });
    }

    /*
    	Dotted Skills Line
    */
    function skills() {
        var skills_dotted = $('.skills.dotted .progress');
        var skills_dotted_w = skills_dotted.width();
        if (skills_dotted.length) {
            skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
            skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
            skills_dotted.find('.percentage .da').css({
                'width': skills_dotted_w
            });
        }
    }
    setTimeout(skills, 1000);

    /*
    	Circle Skills Line
    */
    var skills_circles = $('.skills.circles .progress');
    if (skills_circles.length) {
        skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
    }

    /*
    	Resize
    */
    $(window).resize(function() {

        /* Set full height in blocks */
        var width = $(window).width();
        var height = $(window).height();

        /* Set full height in started blocks */
        if (width < 783) {
            $('.section.started').css({
                'height': height
            });
        }

        /*
        	Dotted Skills Line On Resize Window
        */
        setTimeout(skillsDotted_resize, 750);

    });

    /*
    	Dotted Skills Line On Resize Window
    */

    function skillsDotted_resize() {
        var skills_dotted = $('.skills-list.dotted .progress');
        var skills_dotted_w = skills_dotted.width();
        if (skills_dotted.length) {
            skills_dotted.find('.percentage .da').css({
                'width': skills_dotted_w + 1
            });
        }
    }

})(jQuery);