const loader = new PxLoader()
const images = []
const $iphone = $('#iphone')
const context = $iphone[0].getContext('2d')
for (let i =0; i<85;i++){
    images[i] = loader.addImage(
        `https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.${('0' + (i + 1)).slice(-2)}.png`
    )
}
loader.addCompletionListener(function () {

    $('body').addClass('loaded')
    context.drawImage(images[0],0,0,432,976)
})

loader.start()
function showHideText(el,current,showFrom,showTo,hideFrom,hideTo) {
    if(current<showFrom){
        $(el).css('opacity',0)
    }

    if(current>showFrom && current <= showTo){
        $(el).css('opacity',(current-showFrom)/(showTo-showFrom))
    }
    if(typeof hideFrom !== 'undefined' && typeof hideTo !== 'undefined'){
        if(current >hideFrom && current <= hideTo){
            $(el).css('opacity',(hideTo-current)/(hideTo-hideFrom))
        }

        if(current >hideTo){
            $(el).css('opacity',0)
        }
    }
}

$(function () {
    $('#iphone').height($(window).height())
})
$(window).on('scroll',function () {
    let scrolled = document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight)
    if(scrolled <= 0.1){
        $('.top').css('opacity',(0.1-scrolled)/0.1)
    }else{
        $('.top').css('opacity',0)
    }

    let frame = Math.ceil((scrolled-0.1)/.9*84)
    changeFrame(frame)
    moveDevice('#iphone', scrolled, 0.3, 0.6, 0.6, 1)
    showHideText('.left',scrolled,0.45,0.52,0.58,0.65)
    showHideText('.right',scrolled,0.8,1)
})


function changeFrame (frame){
    let index = frame -1
    if(index < 0) index=0
    if(index >84) index = 84
    context.drawImage(images[index],0,0,432,976)
}
//移动左右
function moveDevice(el, current, toLeftFrom, toLeftTo, toRightFrom, toRightTo) {
    if (current <= toLeftTo) {
        if (current >= toLeftFrom) {
            let offsetRatio = (current - toLeftFrom) / (toLeftTo - toLeftFrom)
            $(el).css('left', $(el).width() / 2 * -1 * offsetRatio)
        }
    } else {
        let offsetRatio = (current - toRightFrom) / (toRightTo - toRightFrom)
        $(el).css('left', $(el).width() / 2 * -1 +  $(el).width() * offsetRatio)

    }
}


