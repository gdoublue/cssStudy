$(function () {
   
    $body=$('body')
    $('.card').on('click',function (e) {
        const user = IsMobile()
        const $window = $(window)
        let card = $(e.currentTarget);
        
        let card_offset_scrolltop = card.offset().top - $window.scrollTop();
            
        card.css('--data-offset-top',card_offset_scrolltop*-1+'px')
        card.toggleClass('active');

        let height = $window.height();
        
        if(user){
            console.log(user);
            let imgh =card.find('img').outerHeight(),
                ratio = 480/420,
                hh =card.find('h4').outerHeight();    
            height *=ratio    
            height -= (imgh + hh);

            console.log(height);
        }else{
            
            let ratio = 480/420,
                imgh =card.find('img').outerHeight()*ratio,
                hh =card.find('h4').outerHeight()*ratio;
                height = $window.height();     
            height -= imgh + hh;
            height /= ratio
        }   
        console.log(height);
        card.find('.content').css('height',height+'px')


        if(card.hasClass('active')){
            $body.addClass('noscroll')
        }else{
            $body.removeClass('noscroll')
        }


    })

      //判断是否是手机
      function IsMobile() {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i) ? true : false;
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i) ? true : false;
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS()
                 || isMobile.Windows());
            }
        };

        return isMobile.any(); //是移动设备
    }

    }
);


