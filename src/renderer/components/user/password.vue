<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <el-form :model="passwordInfo"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="原密码" prop="old">
        <el-input v-model.number="passwordInfo.old"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new">
        <el-input type="password" v-model="passwordInfo.new" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="conform">
        <el-input type="password" v-model="passwordInfo.conform" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   :loading="showLoading"
                   @click="onMoidifyPasswordClick('ruleForm')">提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {fetchPost} from '../../libs/axiosService'

export default {
  name: 'password',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      else {
        if (this.passwordInfo.conform !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }
      else if (value !== this.passwordInfo.new) {
        callback(new Error('两次输入密码不一致!'))
      }
      else {
        callback()
      }
    }
    return {
      showLoading: false,
      passwordInfo: {
        old: '',
        new: '',
        conform: ''
      },
      rules: {
        new: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        conform: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {
    onMoidifyPasswordClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          this.showLoading = true
          fetchPost('/api/user/modify_password', {
            password_old: this.passwordInfo.old,
            password_new: this.passwordInfo.new
          })
              .then(res => {
                this.$alert('密码修改成功,请重新登录!', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // 退出成功,通知刷新页面
                    this.$events.emit('LOGOUT_SUCCESS', '')
                  }
                })
              })
              .finally(() => {
                this.showLoading = false
              })
        }
        else {
          return false
        }
      })
    },
  }
}
</script>
<style scoped>
</style>