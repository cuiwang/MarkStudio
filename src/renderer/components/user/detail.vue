<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>个人详情</span>
    </div>
    <el-form :inline="true" :model="userInfo" class="form-inline">
      <el-form-item label="头像:">
        <el-card v-loading="showLoading"
                 element-loading-text="正在上传..."
                 shadow="never">
          <el-upload
              :action="upload_avatar_action"
              :headers="upload_avatar_headers"
              name="avatar"
              class="avatar-uploader"
              :show-file-list="false"
              :on-error="onAvatorUploadError"
              :on-progress="onAvatorUploading"
              :on-success="onAvatorUploadSuccess"
              accept=".jpg,.jpeg,.png,gif,JPG,JPEG,PNG,GIF"
          >
            <el-avatar v-if="userInfo" :src="userAvatar" class="avatar"></el-avatar>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-card>
      </el-form-item>
    </el-form>
    <el-form v-if="userInfo" :inline="true" :model="userInfo" class="form-inline">
      <el-form-item label="昵称:">
        <el-input size="small" v-model="userInfo.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   :loading="showLoading"
                   type="primary"
                   @click="onModifyNameClick">修改
        </el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="userInfo" :inline="true" :model="userInfo" class="form-inline">
      <el-form-item label="邮箱:">
        <el-input size="small" disabled v-model="userInfo.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" disabled type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {Cons}      from '../../Constant'
import {fetchPost} from '../../libs/axiosService'

export default {
  name: 'detail',
  data() {
    return {
      showLoading: false,
      upload_avatar_action: Cons.BASE_URL + '/api/user/modify_avatar',
      upload_avatar_headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    userAvatar() {
      if (this.userInfo) {
        return Cons.BASE_URL + '/storage/' + this.userInfo.avatar
      }
      else {
        return 'data:image/png;base64,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'
      }
    }
  },
  methods: {
    onModifyNameClick() {
      if (this.userInfo.name) {
        this.showLoading = true
        fetchPost('/api/user/modify_name', {
          name: this.userInfo.name
        })
            .then(res => {
              this.showLocalNotification('修改成功！')
              // 修改成功,通知刷新页面
              //localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
              this.$store.dispatch('user/setUserInfo', this.userInfo)
              this.$events.emit('USER_INFO_UPDATE', '')
            })
            .finally(() => {
              this.showLoading = false
            })
      }
    },
    onAvatorUploadSuccess(res) {
      this.showLoading = false
      //this.userInfo.avatar = res.data.avatar
      //localStorage.setItem('userInfo', JSON.stringify(res.data))
      this.$store.dispatch('user/setUserInfo', res.data)
      this.$events.emit('USER_INFO_UPDATE', '')
    },
    onAvatorUploading() {
      this.showLoading = true
    },
    onAvatorUploadError() {
      this.showLoading = false
      this.$message.error({
        message: '上传失败',
        offset: 100
      })
    },
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}

.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>