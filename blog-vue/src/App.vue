<template>
  <div>
    <router-view />
    <div id="box">富强民主文明和谐</div>
  </div>
</template>
<script>
/* form里的值要与数据库名一致 */

export default {
  name: "App",
  // mounted() {
  //   //获取鼠标停留位置的位置
  //   var mousePos
  //   function mouseMove(ev) {
  //     var Ev = ev || window.event;
  //     mousePos = mouseXY(ev);
  //   }

  //   function mouseXY(ev) {
  //     if (ev.pageX || ev.pageY) {
  //       return { x: ev.pageX, y: ev.pageY };
  //     }
  //     return {
  //       x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
  //       y: ev.clientY + document.body.scrollTop - document.body.clientTop,
  //     };
  //   }
  //   document.onmousemove = mouseMove;



  //   document.onkeydown = function (e) {
  //     var currKey = 0,
  //       evt = e || window.event;
  //     currKey = evt.keyCode || evt.which || evt.charCode;
  //     if (currKey == 123) {
  //       window.event.cancelBubble = true;
  //       window.event.returnValue = false;
       
  //       var x = mousePos.x;
  //       var y = mousePos.y;
  //       res.style.top = y + "px";
  //       res.style.left = x + "px";
  //       res.style.display = "block";
  //     }
  //   };

  //   document.oncontextmenu = function (e) {

  //     return false;
  //    }

  //   var res = document.getElementById("box"); //找到id为box的div
  //   document.body.onmouseup = function (e) {
  //     //在body里点击触发事件
  //     if (e.button === 2) {
  //       var e = event || window.event;
  //       var scrollX =
  //         document.documentElement.scrollLeft || document.body.scrollLeft;
  //       var scrollY =
  //         document.documentElement.scrollTop || document.body.scrollTop;
  //       var x = e.pageX || e.clientX + scrollX;
  //       var y = e.pageY || e.clientY + scrollY;
  //       //如果button=1（鼠标左键），button=2（鼠标右键），button=0（鼠标中间键）
  //       //console.log(e); //将传进去的参数打印出来
  //       //console.log(x); //打印出鼠标点击的Y轴坐标
  //       //console.log(y); //打印出鼠标点击的X轴坐标
  //       res.style.top = y + "px"; //鼠标点击时给div定位Y轴
  //       res.style.left = x + "px"; //鼠标点击时给div定位X轴
  //       res.style.display = "block"; //显示div盒子
  //     } else {
  //       res.style.display = "none"; //否则不显示div盒子
  //     }
  //   };
  // },
  methods: {},
};
</script>

<style scoped>
#box {
  /* width: 150px; */
  border: 1px solid #999;
  box-shadow: 3px 3px 3px #ccc;
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 10px;
  display: none;
  color: red;
  z-index: 9999999;
}
</style>
