function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
//弹窗
function over(str){
			document.getElementById('mes').textContent = str;
			document.getElementById('trompt').style.display = 'block';		
		}
		
//指令处理
function respond(e){
	//指令入栈
	function set(str_1,str_2){
		if(snake.command_cache.length == 0 && snake.body_derection != str_1){
			snake.command_cache.push(str_2)
		}else if(snake.command_cache.length == 1 && snake.command_cache[0] != str_1){
			snake.command_cache.push(str_2)
		}
	}
	
	switch(e.keyCode){	
		case 38:
		e.preventDefault();
		set('bottom','top')
		break;
		
		case 40:
		e.preventDefault();
		set('top','bottom')
		break;
		
		case 37:
		e.preventDefault();
		set('right','left')
		break;
		
		case 39:
		e.preventDefault();
		set('left','right')
		break;
		
		//暂停及开始
		case 32:
		if(snake.state){
			clearInterval(snake.id);
			snake.state = !snake.state
		}else{
			//设置基准时间
			snake.now_time = new Date().getTime();
			snake.id = setInterval(draw_snake,snake.v);
			snake.state = !snake.state
		}
		break;
	}
}
//蛇
var snake = {
	body:[],//身体
	derection:['left','right','bottom','top'],
	v:50,//速度
	body_derection:'',//方向
	command_cache:[],//指令栈
	id:null,
	state:false,
	mode:0,
	now_time:0,
	time:0,
	//生成身体
	body_build:function(){
		var x = Math.floor(Math.random()*108)+6;
		var y = Math.floor(Math.random()*108)+6;
		var der = Math.floor(Math.random()*4);//随机生成身体朝向
		var temp = [];
		temp.push(x);temp.push(y);this.body.push(temp);
		switch(der){
			case 0:
			for(i = 0;i<6;i++){
				temp = [];
				temp.push(++x);temp.push(y);this.body.push(temp);
			}
			this.command_cache.push('left')
			break;
			
			case 1:
			for(i = 0;i<6;i++){
				temp = [];
				temp.push(--x);temp.push(y);this.body.push(temp);
			}
			this.command_cache.push('right')
			break;
			
			case 2:
			for(i = 0;i<6;i++){
				temp = [];
				temp.push(x);temp.push(--y);this.body.push(temp);
			}
			this.command_cache.push('bottom')
			break;
			
			case 3:
			for(i = 0;i<6;i++){
				temp = [];
				temp.push(x);temp.push(++y);this.body.push(temp);
			}
			this.command_cache.push('top')
			break;			
		}
	},
	//更新身体
	upload_body:function(b){
		var temp = [];
		
		if(b){
			//吃到食物不缩减身体长度
			this.body.pop();
		}
		//从指令栈中更新方向
		if(this.command_cache.length != 0){
			this.body_derection = this.command_cache.shift();
		}
		//根据方向更新头部
		switch(this.body_derection){
			case 'left':
			temp[0] = this.body[0][0] - 1;
			temp[1] = this.body[0][1];
			this.body.unshift(temp); 
			break;
			
			case 'right':
			temp[0] = this.body[0][0] + 1;
			temp[1] = this.body[0][1];
			this.body.unshift(temp); 
			break;
			
			case 'bottom':
			temp[1] = this.body[0][1] + 1;
			temp[0] = this.body[0][0];
			this.body.unshift(temp); 
			break;
			
			case 'top':
			temp[1] = this.body[0][1] - 1;
			temp[0] = this.body[0][0];
			this.body.unshift(temp); 
			break;
		}
	},
	
	//碰撞检测
	detection_impact:function(){
		var sign = false;
		for(var i = 1;i<this.body.length;i++){
			this.body[0][0] == this.body[i][0]&&this.body[0][1] == this.body[i][1]&&(sign = true)
			if(sign){
				clearInterval(this.id);
				return true;
			}
		}
		if(this.body[0][0]<0||this.body[0][0]>119||this.body[0][1]<0||this.body[0][1]>119){
			clearInterval(this.id);
			return true;
		}
		
	},
	//食物检测
	food_check:function(){
		if(this.body[0][0]==food.food_derection[0]&&this.body[0][1]==food.food_derection[1]){
			this.upload_body(false)
			food.sign = true;
		}else{
			this.upload_body(true)
		}
	},
	//普通模式速度更新
	v_up:function(){
		var temp = new Date().getTime();
		this.time += (temp - this.now_time)
		this.now_time = temp;
		if(this.time >= 7000 && this.v>=20){
			this.time = 0
			clearInterval(this.id);
			this.v -= 5;
			this.id = setInterval(draw_snake,snake.v);
		}
	},
	//胜利检测
	mode_check:function(){
		if(this.mode == 1 && this.body.length == 15){
			clearInterval(this.id);
			over('you win')//调用弹窗
		}else if(this.mode == 2 && this.body.length == 10){		
			if(this.v != 15){
				init(2)
			}else{
				clearInterval(this.id);
				over('you win')
			}
		}
	}
}

//食物
var food = {
	sign:true,//标记是否需要更新食物
	food_derection:[],//食物坐标
	
	//创建食物
	food_create:function(){
		var temp = [];
		var index;
		var x;
		var y;
		
		//速度过大不生成墙壁边缘的食物
		if(snake.v <= 30){
			for(var i = 1;i<119;i++){
				temp.push(i)
			}
			y = Math.floor(Math.random()*118+1);
		}else{
			for(var i = 0;i<120;i++){
				temp.push(i)
			}
			y = Math.floor(Math.random()*120);
		}	
		
		//剔除无法生成食物的位置
		for(i = 0;i<snake.body.length;i++){
			if(y == snake.body[i][1]){
				index = temp.indexOf(snake.body[i][0])
				temp.splice(index,1)
			}
		}
		if(temp.length == 0){
			return food_create();
		}else{
			x = temp[Math.floor(Math.random()*temp.length)]
			temp = [];
			temp.push(x,y)
			return temp;
		}
	},
	
}

//画图
function draw_snake(){
	//模式1速度更新
	if(snake.state && snake.v != 15 && snake.mode == 1){
		snake.v_up();
	}
	//是否吃到食物检测
	snake.food_check();
	
	//碰撞检测
	if(snake.detection_impact()){
		over('game over')
		return;
	}
	
	var canvas = document.getElementById('snake_app');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,600,600);	
	
	//是否需要生成食物
	if(food.sign){
		food.food_derection = food.food_create();
		food.sign = false;
	}
	ctx.fillStyle = 'blue'
	ctx.fillRect(food.food_derection[0]*5,food.food_derection[1]*5,5,5)
	
	ctx.fillStyle = 'red'
	//迭代绘制头部，减少闪烁
	for(var c = 1;c<6;c++){
		switch(snake.body_derection){
			case 'left':
			ctx.fillRect(snake.body[0][0]*5+5-c,snake.body[0][1]*5,1,5)
			break;
			
			case 'right':
			ctx.fillRect(snake.body[0][0]*5-1+c,snake.body[0][1]*5,1,5)
			break;
			
			case 'top':
			ctx.fillRect(snake.body[0][0]*5,snake.body[0][1]*5+5-c,5,1)
			break;
			
			case 'bottom':
			ctx.fillRect(snake.body[0][0]*5,snake.body[0][1]*5-1+c,5,1)
			break;
			
		}
	}
	ctx.fillStyle = 'yellow'
	for(var i =1;i<snake.body.length;i++){
		ctx.fillRect(snake.body[i][0]*5,snake.body[i][1]*5,5,5)
	}
	snake.mode_check();//过关检测
}

//入口
function init(num){
	document.getElementById('shade').style.display = 'none'
	if(num == 2){
		if(snake.v >= 20){
			snake.v -= 5;
		}
		clearInterval(snake.id);
		snake.state = false;
		snake.body = [];		
	}
		snake.body_build()
		draw_snake()
		snake.mode = num
}
addEventHandler(document.getElementById('again'),'click',function(){
	//重置状态
	snake.v = 50;
	snake.body = []
	snake.command_cache = [],
	snake.derection = ''
	snake.state = false;
	food.sign = true;
	document.getElementById('shade').style.display = 'block'
	document.getElementById('trompt').style.display = 'none'
	
})
addEventHandler(document.getElementById('normal'),'click',function(){
	init(1)
})
addEventHandler(document.getElementById('next'),'click',function(){
	init(2)
})
//指令监听
addEventHandler(document,'keydown',respond)
