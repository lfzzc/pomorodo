$(function(){
    var session=$('.session');
    var title=$('.title');
    var content=$('.content');
    var h=$('.cir').height();
    var time=content.text()*60;
    //minus+plus
    function adjust(obj){
        if(!$('.cir').is(':animated')){
            var len,num;
            var titlecon=title.text().toLowerCase();
            if($(obj).hasClass('minus')){
                len=$(obj).next();
                num=len.text()-1>0?len.text()-1:1;
            }else{
                len=$(obj).prev();
                num=parseInt(len.text())+1;
            }
            len.text(num);
            if($(obj).parent().hasClass(titlecon+'l')){
                content.text($('.'+titlecon+'l').find('span').text());
                time=content.text()*60;
            }
        }
    }
    //倒计时
    function countdown(){
        if(content.text()==='0:00'){bos();}
        var min=parseInt(time/60);
        var sec=("00"+time%60).slice(-2);
        time--;
        content.text(min+':'+sec);
        animation();
        content.timer=setTimeout(countdown,1000);
    }
    //color animation
    function animation(){
        $('.cir').animate({height:0}, {duration:(time+1)*1000,easing:'linear',step:function(){
            $('.cir').css('overflow','visible');
        }
        });
    }
    //who is boss?
    function bos(){
        clearTimeout(content.timer);
        title.text(title.text()==='Session'?'Break':'Session');
        content.text($('.'+title.text().toLowerCase()+'l').find('span').text());
        time=content.text()*60;
        $('.cir').stop(true).height(h);
        $('.sessionin').css({'background-color':function(){
            return title.text()==='Session'?'rgb(108,154,38)':'rgb(255,68,68)';
        }});
    }
    //minus事件
    $('.minus').on('click',function(){
        adjust(this);
    });
    //plus事件
    $('.plus').on('click',function(){
        adjust(this);
    });
    //count事件
    session.on('click',function(){
        if($('.cir').is(':animated')){
            clearTimeout(content.timer);
            $('.cir').stop(true);
        }else{
            if(parseInt(content.text())===time/60){
                $('.cir').height(h);
            }
            countdown();
        }
    });
});