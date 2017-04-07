var id;//setInterval()返回值
var li = $('.alternate li');//轮播图nodelist
var li_dic = $('.s1_change li')//轮播图底部按钮nodelist

//返回处于活跃状态的图片的索引
function source_nowImg(nodeList){
	for(var i = 0;i<nodeList.length;i++){
		if(nodeList[i].classList.contains('opacity')){
			return i
		}
	}
}

//清除活跃状态的轮播图及按钮样式
function clear_nowImg(i){
	li[i].classList.remove('opacity')
	li_dic[i].classList.remove('back_fff')
}
//设置活跃状态的轮播图及按钮样式
function set_nowImg(i){
	li[i].classList.add('opacity')
	li_dic[i].classList.add('back_fff')
}
//轮播函数
function s1(){
	var i = source_nowImg(li)	
	clear_nowImg(i)
	if(i == li.length-1){
		set_nowImg(0)
	}else{
		set_nowImg(i+1)
	}
}

//处理下拉列表的交互
$('nav li a').mouseover(function(){
	if($(this).text() == '最新活动'){
		$('#act_main').css('display','block')
		$('#act').css({'height':'320px','z-index':10})
	}else if($(this).text() == '所有产品'){
		$('#pro_main').css('display','block')
		$('#pro').css({'height':'320px','z-index':10})
		
	}
})
$('#act').mouseover(function(){
	$('#act_main').css('display','block')
	$('#act').css({'height':'320px','z-index':10})
})
$('#act').mouseout(function(){
	$('#act_main').css('display','none')
	$('#act').css({'height':'0px','z-index':0})
})
$('#pro').mouseover(function(){
	$('#pro_main').css('display','block')
	$('#pro').css({'height':'320px','z-index':10})
})
$('#pro').mouseout(function(){
	$('#pro_main').css('display','none')
	$('#pro').css({'height':'0px','z-index':0})
})
$('nav li a').mouseout(function(){
	$('#pro_main').css('display','none')
	$('#act_main').css('display','none')
	$('#act').css({'height':'0px','z-index':0})
	$('#pro').css({'height':'0px','z-index':0})
})

//开始轮播
$().ready(function(){
	id = setInterval(s1,3000);
})
//轮播底部按钮逻辑处理
$('.s1_change li').click(function(){
	clearInterval(id);
	var i = source_nowImg(li)	
	clear_nowImg(i)
	i = $('.s1_change li').index(this)
	set_nowImg(i)
	id = setInterval(s1,3000)
})

//轮播侧部按钮逻辑处理
$('.s1_mainImg').click(function(e){
	if($(e.target).attr('id') == 's1_previous'){
		clearInterval(id);
		var i = source_nowImg(li)
		clear_nowImg(i)
		i == 0?i = 2:i -= 1
		set_nowImg(i)
		id = setInterval(s1,3000)
	}else if($(e.target).attr('id') == 's1_next'){
		clearInterval(id);
		var i = source_nowImg(li)
		clear_nowImg(i)
		i == 2?i = 0:i += 1
		set_nowImg(i)
		id = setInterval(s1,3000)
	}
})

$(document).scroll(function(){
	if(document.body.scrollTop >= 1400){
		$('aside').css('display','block')
	}else if(document.body.scrollTop < 1400){
		$('aside').css('display','none')
	}
})
$('aside').click(function(){
	var db = document.body,
        top = db.scrollTop,
        step = Math.floor(top / 15);
       (function() {
           top -= step;
           if (top > -step) {
				db.scrollTop = top
                setTimeout(arguments.callee, 20);
           }
       })();
})	