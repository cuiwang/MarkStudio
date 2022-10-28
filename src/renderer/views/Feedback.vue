<template>
  <div id="content">
    <div style="margin: 20px; text-align: left" v-loading="loading">
      <el-card>
        <div class="title_text_size main_text_color">意见反馈</div>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="邮箱/手机号">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import {HTTP}   from '../libs/axiosService'

export default {
  name: 'Feedback',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        content: '',
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
    console.log('Feedback mounted')
    this.form.username = this.userInfo ? this.userInfo.email || '' : ''
  },
  methods: {
    onSubmit() {
      if (this.form.username && this.form.content) {
        HTTP.before(() => {
              this.loading = true
            })
            .post('/api/feedback', {
              username: this.form.username,
              content: this.form.content
            })
            .then(res => {
              this.$alert('谢谢！您的意见已收到。', '反馈', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            })
            .finally(() => {
              this.loading = false
            })
      }else {
        this.$message.warning('请输入联系方式及反馈内容')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';
</style>