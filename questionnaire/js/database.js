function Database(){
	this.result = [];
	this.ques_1 = {
		name:"示例问卷一",
		edit:false,
		sign:{
			title:"示例问卷一",
			data:"2017-3-15",
			state:"未发布",
		},
		question:[
			{
				category:"单选题",
				title:'题目一',
				item:['选项一','选项二','选项三','选项四','选项五'],
				tag:'radio',
				must:true,
			},
			{
				category:"多选题",
				title:'题目二',
				item:['选项一','选项二','选项三','选项四','选项五'],
				tag:'checkbox',
				must:true,
			},
			{
				category:"文本题",
				title:'题目三',
				item:[],
				tag:'',
				must:false,
				text:true,
			},
		],
	}
	this.ques_2 = {
		name:"示例问卷二",
		edit:false,
		sign:{
			title:"示例问卷二",
			data:"2017-3-15",
			state:"已发布",
		},
		question:[
			{
				category:"单选题",
				title:'题目一',
				item:['选项一','选项二','选项三',],
				tag:'radio',
				must:true,
			},
			{
				category:"多选题",
				title:'题目二',
				item:['选项一','选项二','选项三',],
				tag:'checkbox',
				must:true,
			},
			{
				category:"文本题",
				title:'题目三',
				item:[],
				tag:'',
				must:false,
				text:true,
			},
		],
	}
	this.initialize()
};
	
Database.prototype = {
	constructor:Database,
	initialize:function(){
		if(!localStorage.getItem("sign")){			
			localStorage.setItem(this.ques_1.name,JSON.stringify(this.ques_1))
			localStorage.setItem(this.ques_2.name,JSON.stringify(this.ques_2))
			localStorage.setItem("sign","true")
		}else{
			
		}
	},
	
	get_data:function(sign){
		switch(sign){
			case "main":
			this.get_data_main();
			break;
		}
	},
	
	get_data_main:function(){
		for(var key in localStorage){
			if(key != 'sign'&&key != 'key'&&key != 'getItem'&&key != "setItem"&&key != "removeItem"&&key != "clear"&&key != "length"){
				console.log(key)
				this.result.push(JSON.parse(localStorage.getItem(key)).sign)
			}
		}
	},
	get_edit:function(){
		for(var key in localStorage){
			if(JSON.parse(localStorage.getItem(key)).edit){
				return JSON.parse(localStorage.getItem(key));
			}
		}
	},
	check_repeat:function(str){
		var x = false;
		for(var key in localStorage){
			if(str == key){
				x = true;
				break;
			}
		}
		return x;
	},	
}
	
	
	
	



