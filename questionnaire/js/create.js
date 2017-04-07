var db = new Database();
var create= decodeURI(location.href.split('?')[1].split('=')[1]);
if(create == '新建'){
	var edit = {
		name:"请输入标题",
		edit:false,
		sign:{
			title:"",
			data:"",
			state:'',		
		},
		question:[],
	}
}else{
	var name = decodeURI(location.href.split('?')[1].split('=')[1]);
	var edit = JSON.parse(localStorage.getItem(name))
}
var name_sign = edit.name;
var edit_date = edit.sign.data.split('-')
var span_down = [];


Vue.component('ques',{
	template:'\
		<div  v-span_down>\
			<span>{{index+1}}.{{title}}({{category}})</span><span><input type="checkbox" @click="must_val($event)" checked v-show="must" :name="index"><input type="checkbox"  @click="must_val" v-show="!must"  :name="index">该选项是否必填</span>\
			<div class="limit">\
			<ul>\
				<li\
					is="quesitem"\
					v-for=" item in diedai"\
					:tag="tag_bridge"\
					:item="item"\
					:title="title"\
				></li>\
			</ul>\
			<div>\
				<span v-show="index" @click="sort(index,$event)">上移</span><span  @click="sort(index,$event)"    v-if="span_down[index]"  :data-span="index">下移</span><span  @click="sort(index,$event)">复用</span><span  @click="sort(index,$event)">删除</span>\
			</div>\
			<textarea v-if="text" ></textarea>\
			</div>\
		</div>\
	',
	props:["index",'title','category','diedai','tag_bridge','text','must','must_val','span_down','sort'],
})
Vue.component('quesitem',{
	template:'\
		<li><input :type="tag" :name="title">{{item}}</li>\
	',
	props:["tag",'item','title']
})

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
Vue.directive('span_down', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
	span_down.push(0)
	console.log(span_down)
	if(span_down.length != 1){
		span_down[span_down.length-2] = 1
		  
	}
  }
})

var section_1 = new Vue({
	el:'#section_1',
	data:{
		span_down:span_down,
		show_input:false,
		show_h1:true,
		h1:edit.name,
		converge:true,
		bac:false,
		ques_inp:false,
		item_inp:false,
		create_item:false,
		message:false,
		mes:"",
		category:'',
		question:edit.question,
		year:edit_date[0],
		month:edit_date[1],
		day:edit_date[2],
		calender_show:true,
		must_val:function(e){
			var x = e.target.name;		
			e.target.checked = !e.target.checked
			section_1._data.__ob__.value.question[x].must = !section_1._data.__ob__.value.question[x].must
			console.debug(section_1._data.__ob__.value.question[x].must);
		},
		sort:function(num,event){
			console.log(this)
			var question = section_1._data.__ob__.value.question
			switch(event.target.textContent){
				case "上移":
					var temp = question[num];
					question.splice(num,1);
					question.splice(num-1,0,temp);
					break;
					
				case "下移":
					var temp = question[num];
					question.splice(num,1);
					question.splice(num+1,0,temp);
					break;
					
				case "复用":
					var temp = question[num];
					question.splice(num,0,temp);
					break;
					
				case "删除":
					if(num == span_down.length-1){
						span_down.pop();
						if(span_down.length !=0){
							span_down[span_down.length-1] = 0
						}
					}else{span_down.splice(num,1)}
					question.splice(num,1);
					break;
			}
		},
		compare:function(){
			var x = section_1._data.__ob__.value
			var this_time = new Date(x.year,x.month-1,x.day+1).getTime();
			var now_time = new Date().getTime();
			if(this_time>=now_time){
				return true;
			}else{
				return false;
			}
		}
	},
	methods:{
		show_inp:function(){
			this.show_input = true;
			this.show_h1 = false;
		},
		show_H1:function(){
			if(document.getElementById('input').value){
				var x = db.check_repeat(document.getElementById('input').value)
				console.log(x)
				if(x){
					alert('重名了');
				}else{
					this.h1 = document.getElementById('input').value;
					edit.name = document.getElementById('input').value;
					edit.sign.title = document.getElementById('input').value;
				}
			}else{
				alert("你没输入标题哦")
			}
			this.show_input = false;
			this.show_h1 = true;
		},
		add_ques:function(){
			if(this.converge){
				var div = document.getElementById('add_ques');
				div.style.height = "6rem"
				this.converge = false;
			}else{
				var div = document.getElementById('add_ques');
				div.style.height = "3rem"
				this.converge = true;
			}
		},
		bac_click:function(e){
			this.bac = false;
			this.ques_inp = false;
			this.item_inp = false;
			this.create_item = false;
			this.message = false;
			document.getElementById('ques_inp').value = "";
			document.getElementById('item_inp').value = "";
		},
		btn_click:function(e){
			switch(e.target.textContent){
				case "单选题":
				case "多选题":
				this.category = "新建"+e.target.textContent;
				this.ques_inp = true;
				this.item_inp = true;
				this.create_item = true;
				break;
				
				case "文本题":
				this.category = "新建"+e.target.textContent;
				this.ques_inp = true;
				this.create_item = true;
				break;
				
				case "保存问卷":
				if(this.compare()){
					this.category = e.target.textContent;
					this.mes = "是否保存问卷";
					this.message = true;
				}else{
					this.category = '日期有误';
					this.mes = "请选择正确的日期";
					this.message = true;
				}
				break;
				
				case "发布问卷":
				this.category = e.target.textContent;
				this.mes = "是否发布问卷";
				this.message = true;
				break;
			}
			this.bac = true;
		},
		stop:function(e){
			e.stopPropagation();
		},
		check_null:function(ele,obj){
			if(ele.value){
				obj.title = ele.value.trim();
				return true;
			}else{
				alert("你还没输入问题哦");
				return false;
			}
		},
		split_item_inp:function(ele,obj){
			if(ele.value){
				obj.item = ele.value.trim().split(/\s+/g);
				return true;
			}else{
				alert("你还没输入选项哦");
				return false;
			}
			
		},
		add_ques_item:function(){
			var close_pop = true;
			switch(this.category){
				case "日期有误":
				break;
				
				case "新建单选题":
				var ques_item = {
					category:"",
					title:'',
					item:[],
					tag:'',
					must:true,
				};
				ques_item.category = "单选题";
				ques_item.tag = "radio",
				this.check_null(document.getElementById('ques_inp'),ques_item)?null:close_pop = false;
				this.split_item_inp(document.getElementById('item_inp'),ques_item)?null:close_pop = false;;
				close_pop&&edit.question.push(ques_item);
				break;
				
				case "新建多选题":
				var ques_item = {
					category:"",
					title:'',
					item:[],
					tag:'',
					must:true,
				};
				ques_item.category = "多选题";
				ques_item.tag = "checkbox",
				this.check_null(document.getElementById('ques_inp'),ques_item)?null:close_pop = false;;
				this.split_item_inp(document.getElementById('item_inp'),ques_item)?null:close_pop = false;;
				close_pop&&edit.question.push(ques_item);
				break;
				
				case "新建文本题":
				var ques_item = {
					category:"",
					title:'',
					item:[],
					tag:'',
					must:true,
				};
				ques_item.category = "文本题";
				ques_item.text = true;
				this.check_null(document.getElementById('ques_inp'),ques_item)?null:close_pop = false;;
				ques_item.item = [];
				ques_item.tag = '';
				close_pop&&edit.question.push(ques_item);
				break;
				
				case "保存问卷":
				if(document.getElementsByTagName('h1')[0].textContent != '请输入标题'){
					edit.sign.state = "未发布";
					edit.sign.data = document.getElementById('date').textContent;
					localStorage.removeItem(name_sign)
					localStorage.setItem(edit.name,JSON.stringify(edit));
					location.href='../index.html'
				}else{alert('请输入标题')}
				break;
				
				case "发布问卷":
				if(document.getElementsByTagName('h1')[0].textContent != '请输入标题'){
					edit.sign.state = "已发布";
					edit.sign.data = document.getElementById('date').textContent;
					localStorage.removeItem(name_sign)
					localStorage.setItem(edit.name,JSON.stringify(edit));
					location.href='../index.html'
				}else{alert("请输入标题")}
				break;			
			}
			close_pop&&this.bac_click();
		},
		calender:function(){
			if(this.calender_show){
				document.getElementById('calender').style.display = 'block'
				this.calender_show = !this.calender_show
			}else{
				document.getElementById('calender').style.display = 'none'
				this.calender_show = !this.calender_show
			}
		},
	}
})



