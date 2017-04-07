var name = decodeURI(location.href.split('?')[1].split('=')[1]);
var show = JSON.parse(localStorage.getItem(name))
Vue.component('show_data',{
	template:'\
		<div class="show_item"></div>\
	',
})

var show_data = new Vue({
	el:'#show_data',
	data:{
		question:show.question,
	}
})
var div = document.querySelectorAll('.show_data div');
for(var i = 0;i<div.length;i++){
	var show_item = echarts.init(div[i])
	if(show.question[i].tag == 'checkbox'){	
		console.log("a")
		var option_bar = bar(show.question[i])
		show_item.setOption(option_bar)
	}else if(show.question[i].tag == 'radio'){
		var option_pie = pie(show.question[i])
		show_item.setOption(option_pie)
	}else{
		var option_textarea = pie_textarea(show.question[i])
		show_item.setOption(option_textarea)
	}
}
function bar(obj){
	var item_length = obj.item.length
	var option = {
		title:{
			text:obj.title
		},
		tooltip:{},
		legend:{
			data:['选项选择次数']
		},
		xAxis:{
			data:obj.item
		},
		yAxis:{},
		series:[
			{
				name:'选项选择次数',
				type:'bar',
				data:(function(){
					var random = [];
					for(var i = 0;i<item_length;i++){
						random.push(Math.floor(Math.random()*80+20))
					}
					return random;
				})()
			},
		],
	}
	return option;
}
function pie(obj){
	var item_length = obj.item.length
	var option = {
		title:{
			text:obj.title
		},
		tooltip:{},
		series:[
			{
				name:'选项选择次数',
				type:'pie',
				radius:'55%',
				data:(function(){
					var random = [];					
					for(var i = 0;i<item_length;i++){
						var temp = {
							value:(function(){
								var x = Math.floor(Math.random()*80+20);
								return x;
							})(),
							name:obj.item[i]
						}
						random.push(temp);
					}
					return random;
				})(),
			},
		],
	}
	return option;
}
function pie_textarea(obj){
	var item_length = obj.item.length
	var option = {
		title:{
			text:obj.title
		},
		tooltip:{},
		series:[
			{
				name:'选项选择次数',
				type:'pie',
				radius:'55%',
				data:[
					{value:(function(){
								var x = Math.floor(Math.random()*80+20);
								return x;
							})(),name:'有效回答'},
					{value:(function(){
								var x = Math.floor(Math.random()*80+20);
								return x;
							})(),name:'无效回答'}
				]
				
			},
		],
	}
	return option;
}


