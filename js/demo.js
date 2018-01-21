	/*
* @Author: GRT
* @Date:   2018-01-19 15:50:37
* @Last Modified by:   GRT
* @Last Modified time: 2018-01-19 19:49:56
*/
var aa="123";
console.log(aa);
 let button=document.getElementsByClassName("button");
 console.log(button);
 // 当页面加载完成时// 
 window.onload=function(){
// 当点击按钮消失
    // var button=document.getElementsByClassName("button");
    // console.log(button);
    button[0].onclick=function(){
	    // alert("这是一个按钮");
	    var city=document.getElementsByClassName("city");
	    console.log(city);
	    city[0].style.display="none";
}
var pos=document.getElementsByClassName("pos");
pos[0].onclick=function(){
	var city=document.getElementsByClassName("city");
	    console.log(city);
	    city[0].style.display="block";
	}
}
// 引入远程数据

// 关于城市的数据
$.ajax({
	url: 'https://www.toutiao.com/stream/widget/local_weather/city/',
	dataType:"jsonp",
 	method:"get",
 	success:function(obj){
 		var city=obj.data;
 		console.log(city);
 	}
 })
 $.ajax({
 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
 	dataType:"jsonp",
 	method:"get",
 	success:function(obj){
 		var tianqi=obj.data;
 		console.log(tianqi);
 		console.log(tianqi.weather.current_temperture);
 		// var tem=tianqi.weather
 	}
 })




	// 当整个页面加载完成时，才能对元素操作；
	// 获取元素，document.getElementsByClassName("");看是第几个元素
	// 添加事件函数；
	// 进行样式的操作；
