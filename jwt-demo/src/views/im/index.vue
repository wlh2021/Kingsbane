<template>
  <div>
    <!-- <el-tabs type="border-card" id="left">
      <el-tab-pane label="世界">
        <div v-for="user in allUsers" :key="user">
          {{user.username}}&nbsp;&nbsp;&nbsp; {{user.online ? "在线" : "离线"}}
        </div>

      </el-tab-pane>

      <el-tab-pane label="在线好友">


      </el-tab-pane>
      
    </el-tabs> -->

    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="4">
          <el-card style="width: 300px; height: 300px; color: #333">
            <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
              在线用户<span style="font-size: 12px"
                >（点击聊天气泡开始聊天）</span
              >
            </div>
            <div
              style="padding: 10px 0"
              v-for="user in users"
              :key="user.username"
            >
              <span>{{ user.username }}</span>
              <i
                class="el-icon-chat-dot-round"
                style="margin-left: 10px; font-size: 16px; cursor: pointer"
                @click="choice(user.username)"
              ></i>
              <span
                style="font-size: 12px; color: limegreen; margin-left: 5px"
                v-if="user.username === chatUser"
                >chatting...</span
              >
            </div>
          </el-card>
        </el-col>

        <el-col :span="20">
          <div
            style="
              width: 800px;
              margin: 0 auto;
              background-color: white;
              border-radius: 5px;
              box-shadow: 0 0 10px #ccc;
            "
          >
            <div style="text-align: center; line-height: 50px">
              {{ chatUser }}
            </div>
            <div
              style="height: 350px; overflow: auto; border-top: 1px solid #ccc"
              v-html="content"
            ></div>
            <div style="height: 200px">
              <textarea
                v-model="text"
                style="
                  height: 160px;
                  width: 100%;
                  padding: 20px;
                  border: none;
                  border-top: 1px solid #ccc;
                  border-bottom: 1px solid #ccc;
                  outline: none;
                "
              ></textarea>
              <div style="text-align: right; padding-right: 10px">
                <el-button type="primary" size="mini" @click="send"
                  >发送</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { getInfo } from "../../api/login";
import { getChatByUser } from "../../api/chat";
import { listAll } from "../../api/user";
let socket;

export default {
  name: "Im",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {},
      isCollapse: false,
      allUsers: [],
      users: [],
      chatUser: "",
      text: "",
      messages: [],
      content: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    //选择和谁聊天
    choice(username) {
      this.chatUser = username;
      this.content = "";
      getChatByUser(this.user, this.chatUser).then((res) => {
        console.log(res);
        res.data.chatList.forEach((item) => {
          if (this.user == item.fromUser) {
            this.createContent(null, item.fromUser, item.message);
          } else {
            this.createContent(item, null, item.message);
          }
        });
      });
    },

    send() {
      if (!this.chatUser) {
        this.$message({ type: "warning", message: "请选择聊天对象" });
        return;
      }
      if (!this.text) {
        this.$message({ type: "warning", message: "请输入内容" });
      } else {
        if (typeof WebSocket == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          // 组装待发送的消息 json
          // {"from": "zhang", "to": "admin", "text": "聊天文本"}
          console.log("啊啊啊啊:   " + this.user);
          let message = { from: this.user, to: this.chatUser, text: this.text };
          socket.send(JSON.stringify(message)); // 将组装好的json发送给服务端，由服务端进行转发
          this.messages.push({ user: this.user, text: this.text });
          // 构建消息内容，本人消息
          this.createContent(null, this.user, this.text);
          this.text = "";
        }
      }
    },
    createContent(remoteUser, nowUser, text) {
      // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html;
      // 当前用户消息
      if (nowUser) {
        // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        console.log("本人的消息");
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
          '    <div class="tip left">' +
          text +
          "</div>\n" +
          "  </div>\n" +
          '  <div class="el-col el-col-2">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          '    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">\n' +
          "  </span>\n" +
          "  </div>\n" +
          "</div>";
      } else if (remoteUser) {
        // remoteUser表示远程用户聊天消息，蓝色的气泡
        console.log("不是本人的消息");
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-2" style="text-align: right">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          '    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">\n' +
          "  </span>\n" +
          "  </div>\n" +
          '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
          '    <div class="tip right">' +
          text +
          "</div>\n" +
          "  </div>\n" +
          "</div>";
      }
      if (!remoteUser && !nowUser) {
        console.log("html:" + html);
      }

      this.content += html;
    },
    init() {
      listAll().then((res) => {
        this.allUsers = res.data.userList;
        console.log(this.allUsers);
      });

      this.user = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : {};
      let username = this.user;
      //let username
      //   getInfo().then((res) =>{
      //       username = res.data.username
      //       console.log(username + "-------------")
      //   });

      let _this = this;
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        let socketUrl = "ws://127.0.0.1:9090/imserver/" + username;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg) {
          console.log("收到数据====" + msg.data);
          let data = JSON.parse(msg.data); // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
          if (data.users) {
            // 获取在线人员信息
            _this.users = data.users.filter(
              (user) => user.username !== username
            ); // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
            
          } else {
            // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
            //  // {"from": "zhang", "text": "hello"}
            if (data.from === _this.chatUser) {
              _this.messages.push(data);
              // 构建消息内容
              _this.createContent(data.from, null, data.text);
            }
          }
        };
        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
        };
      }
    },
  },
};
</script>

<style>
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: 1px solid transparent;
    margin-top: -1px;
    color: #909399;
    width: 200px;
}
.el-tabs--border-card {
    background: #FFF;
    border: 1px solid #DCDFE6;
    -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    box-shadow: 0 2px 4px 0rgba(0,0,0,.12),0 0 6px 0rgba(0,0,0,.04);
    max-width: 400px;
}

.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}

.right {
  background-color: deepskyblue;
}
.left {
  background-color: forestgreen;
}
</style>

