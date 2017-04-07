var b = 1;//布尔变量 防止点击过快

var time = 0;//上次点击时间

//连续点击检测
function time_check(a){
	if(a-time<260){
		return false;
	}else{
		return true;
	}
}
//户型切换
function next(){
		var time_temp = new Date().getTime();
		if(time_check(time_temp)){	
			var li = $('.s6_bot li');
			var temp = li[4].getAttribute('class');
			for(var i = 3;i>=0;i--){
				li[i+1].setAttribute('class',li[i].getAttribute('class'))
			}
			li[0].setAttribute('class',temp)
			time = time_temp;
		}else{
			time = time_temp;
		}
}
function pervious(){
		var time_temp = new Date().getTime();
		if(time_check(time_temp)){	
			var li = $('.s6_bot li');
			var temp = li[0].getAttribute('class');
			for(var i = 1;i<li.length;i++){
				li[i-1].setAttribute('class',li[i].getAttribute('class'))
			}
			li[li.length-1].setAttribute('class',temp)
			time = time_temp;
		}else{
			time = time_temp;
		}

}

//大图切换
$('.rotary .next').click(function(){
	if(b){
		console.log('in')
		b = 0;
		var i = $('.show').attr('id').charAt(5);
		if(i == 3){
			i = 1
		}else{
			i++;
		};
		//改变class触发动画
		var div = $('.show div');
		div[0].setAttribute('class','hidden')
		div[1].setAttribute('class','hidden')
		div[2].setAttribute('class','hidden')
		$('.show').attr('class','left rotary_out_l')
		$('#show_'+i+'').attr('class','right')
		$('#show_'+i+'').attr('class','show rotary_in_l')
		setTimeout(function(){
			div = $('#show_'+i+' div')
			div[0].setAttribute('class','top_01')
			div[1].setAttribute('class','top_02')
			div[2].setAttribute('class','top_03')
			b = 1
		},800)
	}
})
$('.rotary .previous').click(function(){
	if(b){
		b = 0;
		var i = $('.show').attr('id').charAt(5);
		if(i == 1){
			i = 3
		}else{
			i--;
		};
		var div = $('.show div');
		div[0].setAttribute('class','hidden')
		div[1].setAttribute('class','hidden')
		div[2].setAttribute('class','hidden')
		$('.show').attr('class','right rotary_out_r')
		$('#show_'+i+'').attr('class','left')
		$('#show_'+i+'').attr('class','show rotary_in_r')
		setTimeout(function(){
			div = $('#show_'+i+' div')
			div[0].setAttribute('class','top_01')
			div[1].setAttribute('class','top_02')
			div[2].setAttribute('class','top_03')
			b = 1;
		},800)
	}
})
//户型切换
$('.s6_bot .previous').click(pervious)
$('.s6_bot .next').click(next);

//二级栏目切换
$('.select_btn span').click(function(){
	//重置同一父元素下同胞元素样式
	function reset_span(x,y){
		for(var i = x;i<y;i++){
			if(i != index){
				span[i].setAttribute('class','select_none');
			}
		}
	}
	var index = $(".select_btn span").index(this);
	var span = $(".select_btn span");
	var sign;			//指示元素在nodelist里的范围
	span[index].setAttribute('class','select_now');
	if(index>=0&&index<3){
		reset_span(0,3)
		sign = 0
	}else if(index>2&&index<6){
		reset_span(3,6)
		sign = 1
	}else{
		reset_span(6,9)
		sign = 2
	}
	var div = $('.select_items');
	switch(sign){
		case 0:
		div[0].style.left = ''+index%3*-1200+'px'
		break;
		
		case 1:
		div[1].style.left = ''+index%3*-1200+'px'
		break;
		
		case 2:
		div[2].style.left =''+index%3*-1200+'px'
		break;
		
	}
})
//一级栏目切换
$('.s8_mid_l_r button').click(function(){
	var index = $(".s8_mid_l_r button").index(this);
	var btn = $(".s8_mid_l_r button");
	btn[index].setAttribute('class','fl btn_bac');
	for(var i = 0;i<btn.length;i++){
		if(i != index){
			btn[i].setAttribute('class','fl');
		}
	}
	var div = $('.showmain>div')
	div[index].setAttribute('class','s8_bot clearfix z10');
	div[index].setAttribute('style','opacity:1');
	for(var i = 0;i<div.length;i++){
		if(i != index){
			div[i].setAttribute('class','s8_bot clearfix');
			div[i].setAttribute('style','opacity:0');
		}
	}
})
//改变侧栏样式
$('aside img').mouseover(function(){
	var index = $("aside img").index(this);
	var img = $('aside img');
	if(index == 0){
		img[index].setAttribute('src','./img/wz64.png')
	}else if(index == 1){
		img[index].setAttribute('src','./img/wz66.png')
		$('.qr').css('display','block')
	}
})
$('aside img').mouseout(function(){
	var index = $("aside img").index(this);
	var img = $('aside img');
	if(index == 0){
		img[index].setAttribute('src','./img/wz63.png')
	}else if(index == 1){
		img[index].setAttribute('src','./img/wz62.png')
		$('.qr').css('display','none')
	}
})

//户型图点击弹窗
$('.s6_bot li img').click(function(){
	var url = $(this).attr('src');
	$('.pop img').attr('src',url)
	$('.pop').css('display','block')
	if($(this).parent().attr('class') == 'dis_1'){
		pervious();
	}else if($(this).parent().attr('class') == 'dis_3'){
		next();
	}
})
//关闭弹窗
$('.close_pop').click(function(){
	$('.pop').css('display','none')
})
//平滑返回顶部
/*
$('#bac').click(function(){
	var d = document,
        dd = document.documentElement,
        db = document.body,
        top = dd.scrollTop || db.scrollTop,
        step = Math.floor(top / 20);
       (function() {
           top -= step;
           if (top > -step) {
               dd.scrollTop == 0 ? db.scrollTop = top: dd.scrollTop = top;
               setTimeout(arguments.callee, 20);
           }
       })();
})	
*/
$(document).scroll(function(){
	if(document.body.scrollTop >= 1400){
		$('#bac').css('display','block')
	}else if(document.body.scrollTop < 1400){
		$('#bac').css('display','none')
	}
})
$('#bac').click(function(){
	var db = document.body,
        top = db.scrollTop,
        step = Math.floor(top / 20);
       (function() {
           top -= step;
           if (top > -step) {
				db.scrollTop = top
                setTimeout(arguments.callee, 20);
           }
       })();
})	