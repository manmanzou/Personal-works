var name = decodeURI(location.href.split('?')[1].split('=')[1])
var write = JSON.parse(localStorage.getItem(name))



Vue.component('question_item',{
	template:'\
	<div class="border_btm">\
		<div ><span>Q{{index+1}}</span><span>{{title}}</span><span>&nbsp;&nbsp;&nbsp;({{category}})</span><span v-show="text">选填</span></div>\
		<ul>\
				<li\
					is="quesitem"\
					v-for=" item in diedai"\
					:tag="tag"\
					:item="item"\
					:title="title"\
				></li>\
		</ul>\
		<textarea v-if="text" ></textarea>\
	</div>\
	',
	props:['index','title','category','text','diedai','tag']
})

Vue.component('quesitem',{
	template:'\
		<li><input :type="tag" :name="title">{{item}}</li>\
	',
	props:["tag",'item','title']
})

var section_1 = new Vue({
	el:'#section_1',
	data:{
		write:write,
		name:write.name,
		question:write.question,
	},
	methods:{
		skip:function(){
			if(write.sign.state == '已发布'){
				alert('提交成功');
				location.href='../index.html'
			}else{
				alert('问卷未发布');
				location.href='../index.html'
			}
		}
	}
})
setTimeout(function(){
	if(write.sign.state == '未发布'){
		alert('问卷还未发布暂不支持提交');
	}
},300)
