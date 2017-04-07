(function(){
	var date = {
		year:'',
		month:'',
		day:'',
		sign:'',
	};
	var date_now = new Date();
	var date_input =  document.getElementById('date');
	var calender = document.getElementById('calender_tab');
	var html = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
	var year = document.getElementById('year');
	var month = document.getElementById('month');
	var td = calender.getElementsByTagName('td');
	var month_day = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	
	for(var i = 0;i<6;i++){
		html += '<tr>';
		for(var c = 0;c<7;c++){
			html += '<td></td>'
		}
		html += '</tr>'
	}
	calender.innerHTML = html;
	
	function initialize_date(){
		date.year = date_now.getFullYear();
		date.month = date_now.getMonth();
		date.day = date_now.getDate();
	}
	function set_date_input(){
		var x = section_1._data.__ob__.value;
		x.year = date.year;
		x.month = Number(date.month)+1;
		x.day = date.day
	}
	function set_sel_year(){
		for(var i = 0;i<year.length;i++){
			if(year.options[i].textContent == date.year){
				year.options[i].selected = true;
			}
		}
	}
	function set_sel_month(){
		for(var i = 0;i<month.length;i++){
			if(month.options[i].text == date.month+1){
				month.options[i].selected = true;
			}
		}
	}
	function set_Feb_day(){
		new Date(date.year,1,29).getDate() == 29?month_day[1] = 29:month_day[1] = 28;
	}
	function render_calender(){
		set_Feb_day();
		var day = new Date(date.year,date.month,1).getDay();
		
		if(day != 0 ){
			for(var i = 0;i<month_day[date.month];i++){				
				td[day+i].textContent = i+1;
				td[day+i].className = 'td_this'
				if(i+1 == date.day){
					td[day+i].className = 'td_sign';
					date.sign = day+i;
				}				
			}
		}else{
			for(var i = 0;i<month_day[date.month];i++){
				td[7+i].textContent = i+1;
				td[7+i].className = 'td_this'
				if(i+1 == date.day){
					td[7+i].className = 'td_sign';
					date.sign = 7+i;					
				}			
			}
		}
		if(day == 0){
			day = 7
		}
		if(date.year == 2020&&date.month == 11){
			for(var i = day+month_day[date.month];i<td.length;i++){
				td[i].textContent = '';
			}
		}else{
			for(var i = day+month_day[date.month],c = 1;i<td.length;i++,c++){
				td[i].textContent = c;
				td[i].className = 'td_other'
			}
		}
		if(date.month == 0){
			var month_special = 11;
		}else{
			month_special = date.month - 1
		}
		if(date.year == 2010 && date.month == 0){
			for(var i = day-1;i >=0 ;i--){
				td[i].textContent = '';
			}
		}else{
			for(var i = day-1,c = month_day[month_special];i >=0 ;i--,c--){
				td[i].textContent = c;
				td[i].className = 'td_other'
			}
		}
	}
	function reset_td(){
		td[date.sign].className = ''
	}
	function month_update_above(){
		if(date.month == 0){
			if(date.year == 2010){
				
			}else{
				date.year = date.year -1;
				date.month = 11 
			}
		}else{
			date.month = date.month-1;
		}
	}
	function month_update_bellow(){
		if(date.month == 11){
			if(date.year == 2020){
				
			}else{
				date.year = date.year + 1;
				date.month = 0 
			}
		}else{
			date.month = date.month + 1;
		}	
	}
	//通用方法
	function addEventHandler(ele, event, hanlder) {
		if (ele.addEventListener) {
			ele.addEventListener(event, hanlder, false);
		} else if (ele.attachEvent) {
			ele.attachEvent("on"+event, hanlder);
		} else  {
			ele["on" + event] = hanlder;
		}
	}
	initialize_date();
	set_sel_year();
	set_sel_month();	
	render_calender();
	addEventHandler(document.getElementById('left'),'click',function(){
		reset_td();
		month_update_above();	
		set_sel_year();
		set_sel_month();
		render_calender();
		set_date_input();
	})
	addEventHandler(document.getElementById('right'),'click', function(){
		reset_td();
		month_update_bellow();	
		set_sel_year();
		set_sel_month();
		render_calender();
		set_date_input();
	});
	addEventHandler(year,'change',function(){
		date.year = year.value;
		set_date_input()
		reset_td();
		render_calender();
	})
	addEventHandler(month,'change',function(){
		date.month = month.value-1;
		set_date_input()
		reset_td();
		render_calender();
	})
	addEventHandler(calender,'click',function(e){
		if(e.target.nodeName.toLowerCase() == 'td'){
			if(e.target.textContent == ''){
				alert('日期无效')
			}else{
				reset_td();
				date.day = Number(e.target.textContent);
				for(var i = 0;i<td.length;i++){
					if(e.target == td[i]){
						date.sign = i;
					}
				}
				if(date.day<14&&td[date.sign].className == 'td_other'){
					if(date.month != 11&&date.year != 2020){
						date.month += 1;
					}else if(date.month == 11&&date.year != 2020){
						date.month = 0;
						date.year += 1;
					}
				}else if(date.day>21&&td[date.sign].className == 'td_other'){
					if(date.month != 0&&date.year != 2010){
						date.month -= 1;
					}else if(date.month == 0&&date.year != 2010){
						date.month = 11;
						date.year -= 1
					}
				}
				set_date_input();
				set_sel_year();
				set_sel_month();
				render_calender();
				document.getElementById('calender').style.display = 'none';
				section_1._data.__ob__.value.calender_show = !section_1._data.__ob__.value.calender_show
			}
		}
	})
})();