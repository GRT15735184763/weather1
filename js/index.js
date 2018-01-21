/*
* @Author: GRT
* @Date:   2018-01-20 08:56:23
* @Last Modified by:   GRT
* @Last Modified time: 2018-01-20 21:51:12
*/
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
		// 调试
	}
});
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原", 
	dataType:"jsonp",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})
// 页面加载函数
window.onload=function(){
	// 页面更新
	update();
	
	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	// 点击城市详情出现城市详情页
	pos.onclick=function(){
		cityBox.style.display="block";
	}
// 点击城市详情，跳转首页，出现该城市天气情况
	var BOX=$(".city .citys .con .box");
	// console.log(BOX);
	for (let i in BOX){
		BOX[i].onclick=function(){
		var chengshi=this.innerHTML;
	    AJAX(chengshi);    // 调用AJAX函数
		}
		
	}
	// 搜索部分
	
	//var 定义变量
	 var searchbox=document.getElementsByClassName("searchbox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text; 
    searchbox.onfocus=function(){
    	button.innerHTML="确认";
    	text=searchbox.value;
    }
    button.onclick=function(){
    var neirong=button.innerHTML; 
    if(neirong=="取消"){
    	var city3=document.getElementsByClassName("city")[0];
    	city3.style.display="none";
    }else{
    	for(let i in city){
    		for(let j in city[i]){
    			if(text==j){
    				AJAX(text);
    				return;
    			}else{
    				alert("没有此城市天气情况");
    				return;
    			}
    		}

    	}
    }

  }
 }

	function AJAX(str){
		$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`, 
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
		// return tianqi;
	   	 	update();
	    	var city2=$(".city")[0];
	    	city2.style.display="none";
		} 
	})
}

// 获取数据函数
function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;
	 // 当前空气质量
	 var quality_level=document.getElementsByTagName("h5")[0];
	 // console.log(quality_level);  
	 // 输出
	 quality_level.innerHTML=tianqi.weather.quality_level;
	// 当前温度
	 var current_temperature=document.getElementsByClassName("title1")[0];
	 current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	 // 当前天气状况
	 var current_condition=document.getElementsByClassName("title2")[0];
	 current_condition.innerHTML=tianqi.weather.current_condition;
    // 当前风的方向
     var wind_direction=document.getElementsByClassName("wind_der")[0];
     wind_direction.innerHTML=tianqi.weather.wind_direction;
     // 当前风的等级
     var wind_level=document.getElementsByClassName("wind_level")[0];
     wind_level.innerHTML=tianqi.weather.wind_level+"级";
     // 今天的天气图标
     var today_icon=document.getElementsByClassName("icon")[0];
     today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;
     // 明天的天气图标
     var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
     tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

     var today_heigher=document.getElementsByClassName("heigher")[0];
	 today_heigher.innerHTML=tianqi.weather.dat_high_temperature+"°/";

	 var today_lower=document.getElementsByClassName("lower")[0];
	 today_lower.innerHTML=tianqi.weather.dat_low_temperature+"°";

	 var tomorrow_heigher=document.getElementsByClassName("tomorrow_heigher")[0];
	 tomorrow_heigher.innerHTML=tianqi.weather.tomorrow_high_temperature+"°/";

	 var tomorrow_lower=document.getElementsByClassName("tomorrow_lower")[0];
	 tomorrow_lower.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";

	 var today_con=document.getElementsByClassName("con")[0];
	 today_con.innerHTML=tianqi.weather.day_condition;
	 var tomorrow_con=document.getElementsByClassName("tomorrow_con")[0];
	 tomorrow_con.innerHTML=tianqi.weather.tomorrow_condition;
     // 每小时的天气情况
    // var box1=document.createElement("div");
    // box1.className="box";
    // var wrap=document.getElementsByClassName("wrap");
    // 定义变量
    // box1.appendChild(box1);

    // var time=document.createElement("div");
    // time.className="time";
    // var Icon=document.getElementsByClassName("Icon");
    // box1.appendChild(Icon);

    // var tem=document.createElement("div");
    // tem.className="tem";
    // var tem=document.getElementsByClassName("tem");
    // box1.appendChild(tem);
    //每小时天气预报
	var hourlyArr=tianqi.weather.hourly_forecast;
	 var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){
		//创建box
		var box1=document.createElement("div");
	    box1.className="box";
	   
	    //创建time块
	    var time=document.createElement("div");
	    //添加类名
		time.className="time";
		//添加到父级元素上
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyArr[i].hour+":00";

		//添加图标块
		var Icon=document.createElement("div");
		Icon.className="Icon";
		box1.appendChild(Icon);
		//修改样式
		Icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

		//创建温度块
		var tem=document.createElement("div");
		tem.className="tem";
		box1.appendChild(tem);
		//修改样式
		tem.innerHTML=hourlyArr[i].temperature+"°";

		//添加到box
		wrap.appendChild(box1);
	}

     
    // 未来十五天天气情况
   	var dayArr=tianqi.weather.forecast_list;
   	var wrap1=document.getElementsByClassName("wrap1")[0];
   	for (let i in dayArr){
   		var box2=document.createElement("div");
   		box2.className="box";

   		var date=document.createElement("div");
   		date.className="date";
   		box2.appendChild(date);
   		date.innerHTML=dayArr[i].date;

   		var weather=document.createElement("div");
   		weather.className="weather";
   		box2.appendChild(weather);
   		weather.innerHTML=dayArr[i].condition;

   		var Icon=document.createElement("div");
   		Icon.className="Icon";
   		box2.appendChild(Icon);
   		Icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`

   		var temhigher=document.createElement("div");
   		temhigher.className="temhigher";
   		box2.appendChild(temhigher);
   		temhigher.innerHTML=dayArr[i].high_temperature+"°";

   		var temlower=document.createElement("div");
   		temlower.className="temlower";
   		box2.appendChild(temlower);
   		temlower.innerHTML=dayArr[i].low_temperature+"°";

   		var wind=document.createElement("div");
   		wind.className="wind";
   		box2.appendChild(wind);
   		wind.innerHTML=dayArr[i].wind_direction;

   		var level=document.createElement("div");
   		level.className="level";
   		box2.appendChild(level);
   		level.innerHTML=dayArr[i].wind_level+"级";

   		wrap1.appendChild(box2);
   	}
   	// 关于城市
   	var city1=document.getElementsByClassName("city")[0];
   	for (let i in city){
   		var citys=document.createElement("div");
   		citys.className="citys";

   		var title=document.createElement("div");
   		title.className="title";
   		title.innerHTML=i;
   		citys.appendChild(title);

   		var con=document.createElement("div");
   		con.className="con";

   		for (let j in city[i]){
   			var box=document.createElement("div");
   			box.className="box";
   			box.innerHTML=j;
   			con.appendChild(box); 
   		}
   		citys.appendChild(con);
   		city1.appendChild(citys);
   	}
 }
