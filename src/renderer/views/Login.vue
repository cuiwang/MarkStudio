<template>
  <div class="flex_col_allcenter height_100">
    <div class="el-card" style="height: 80%;width: 70%" :body-style="{height:'100%'}">
      <div class="flex_row_allcenter height_100">
        <div class="flex_col flex_1 height_100" style="background: #ffffff">
          <div class="flex_1"></div>
          <div class="flex_col" style="padding: 0 100px">
            <div class="hugetitle_text_size bold_text big_text_color">您好，欢迎使用！</div>
            <div class="h10"></div>
            <div class="main_text_color description_text_size" style="font-weight: lighter">欢迎使用，请输入已注册的邮件及密码。</div>
            <div class="h20"></div>
            <div class="text_left normal_text_size">邮箱</div>
            <div class="h10"></div>
            <div><el-input v-model="username" clearable placeholder="请输入注册邮箱"></el-input></div>
            <div class="h20"></div>
            <div class="text_left normal_text_size">密码</div>
            <div class="h10"></div>
            <div><el-input v-model="password" show-password clearable placeholder="请输入密码"></el-input></div>
            <div class="h20"></div>
            <div class="cursor_pointer text_right description_text_color description_text_size" @click="onForgetClick">忘记密码?</div>
            <div class="h20"></div>
            <el-button type="primary" :loading="showLoading" @click="onLoginButtonClick">登录</el-button>
            <div class="h20"></div>
            <div class="normal_text_size flex_row_allcenter">还没有账号? <el-link type="info" @click="onRegisterClick">点击注册</el-link></div>
          </div>
          <div class="flex_1"></div>
          <div class="text_left description_text_size description_text_color margin_20">© Choi Wan 2077</div>
        </div>
        <div class="flex_1 height_100 flex_col_allcenter right_container">
          <img src="../assets/logo_1024.png" width="35%">
          <div class="normal_text_color">{{productName}} v{{version}}</div>
          <div class="normal_text_color">{{description}}</div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config                from '../../../package.json'
import {fetchGet, fetchPost} from '../libs/axiosService'
import axios                 from 'axios'
import {Cons}                from '../Constant'

const { shell } = require('electron')

export default {
  name: 'Login',
  data() {
    return {
      username:'',
      password:'',
      productName: config.build.productName, // 获取包的信息
      version: config.version, // 获取包的信息
      description: config.description, // 获取包的信息
      showLoading:false,
      BASE_URL:Cons.BASE_URL

    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || ''
    this.password = localStorage.getItem('password') || ''
    this.initEvent()
  },
  methods: {
    initEvent(){
      // 监听回车事件
      // 按键事件监听
      document.onkeydown = (e) => {
        //事件对象兼容
        let evn = e || event || window.event
        let key = evn.keyCode || evn.which || evn.charCode
        //console.log(evn);
        //console.log(key);
        if ( key === 13) {
            this.onLoginButtonClick()
        }
      }
    },
    onForgetClick() {
      shell.openExternal(this.BASE_URL+'/password/reset')
    },
    onRegisterClick() {
      shell.openExternal(this.BASE_URL+'/register')
    },
    onLoginButtonClick() {
      // 检查合法性
      if (this.username && this.password){
        // 请求登录
        this.showLoading = true
        fetchPost('/api/login',{
          username:this.username,
          password:this.password
        }).then(res=>{
          // 保存用户信息,保存用户名和密码
          localStorage.setItem('username', this.username)
          localStorage.setItem('password', this.password)
          localStorage.setItem('user_id', res.data['id'])
          localStorage.setItem('token', res.data['access_token'])
          //localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$store.dispatch('user/setUserInfo',res.data)
          // 登录成功,通知刷新页面
          this.$events.emit('LOGIN_SUCCESS')
          this.$message.success('登录成功')
          // 跳转页面
          this.$router.push({
            path: '/project',
            params: {data: 'login'}
          })
          //this.$router.go(-1)//后退+刷新


        }).finally(()=>{
          this.showLoading = false
        })

      }else {
        // 提示完整性
        this.$message.error({
          message:'请检查用户名和密码是否完整',
          offset:100
        });
      }

    },

  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';

.right_container{
  background-color: rgba(235, 238, 245, 1);
  background-repeat: no-repeat;
  background-image: url("../assets/cool-background.svg");
}
</style>