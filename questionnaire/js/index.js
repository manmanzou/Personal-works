var da = new Database();
da.get_data("main");
var data = da.result

Vue.component('ques_show',{
	template:'\
		<div>\
			<input type="checkbox" name="check" :data-title="title" :data-index="index">\
			<span>{{title}}</span><span>截止日期：{{data}}</span><span>{{state}}</span>\
			<div class="btn"><button @click="edit($event)" :data-edit="title" :data-state="state">编辑</button><button :data-edit="title" @click="remove(index,$event)">删除</button><button @click="edit_write($event)" :data-date="data"  :data-edit="title">查看问卷</button><button  :data-edit="title" @click="showdata($event)">查看数据</button></div>\
		</div>\
		',
	props:['title','data','state','edit','remove','index','edit_write','showdata']
})
var section_1 = new Vue({
	el:'#section_1',
	data:{
		data:data,
		edit:function(event){
			if(event.target.dataset.state == "未发布"){
				var name = event.target.dataset.edit;
				location.href='./html/create.html?id='+name+''
			}else{alert('问卷已发布不能编辑')}
		},
		
		
		edit_write:function(event){
			var date = event.target.dataset.date.split('-');
			console.log(date)
			var a = event.target.dataset.edit
			var this_time = new Date(date[0],date[1],date[2]+1).getTime();
			var now_time = new Date().getTime();
			if(this_time>=now_time){
				location.href = './html/write.html?id='+a+''
			}else{alert("填写时间已截止")}
		},
		remove:function(num,event){
			var name = event.target.dataset.edit;
			data.splice(num,1)
			localStorage.removeItem(name);
		},
		showdata:function(event){
			var name = event.target.dataset.edit;
			location.href='./html/showdata.html?id='+name+''
		}
	},
	methods:{
		remove_batch:function(event){
			var checkbox_all = document.querySelectorAll("input[name='check']");
			for(var i = 0;i<checkbox_all.length;i++){
				if(checkbox_all[i].checked == true){	
					for(var c = 0;c<data.length;c++){
						if(data[c].title == checkbox_all[i].dataset.title){
							data.splice(c,1);
						}
					}
					localStorage.removeItem(checkbox_all[i].dataset.title)
				}
			}
			for(var i = 0;i<checkbox_all.length;i++){
				checkbox_all[i].checked = false;
			}
		},
		set_checked:function(event){
			var checkbox_all = document.querySelectorAll("input[name='check']");
			for(var i = 0;i<checkbox_all.length;i++){
				checkbox_all[i].checked = event.target.checked;
			}
		}
	}
})

var create_bnt = new Vue({
	el:'#newques',
	methods:{
		creat:function(){location.href='./html/create.html?create=新建'}
	}	
})