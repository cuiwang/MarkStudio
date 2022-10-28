<template>
  <el-dialog
      destroy-on-close
      v-if="project"
      title="团队成员管理"
      custom-class="active_cloud_dialog"  width="30%" :visible.sync="showDialog">
    <div slot="title" class="flex_col_allcenter">
      <!--icon-->
      <div class="flex_row_allcenter hugetitle_text_size white_color">
        <div class="flex_row_allcenter" style="color: #409eff;width: 50px;height: 50px;border-radius: 5px;">
          <i class="el-icon-first-aid-kit"/>
        </div>
      </div>
      <span class="title_text_size big_text_color bold_text">邀请用户加入此团队</span>
      <span class="h5"/>
      <span class="description_text_size description_text_color" >{{project.name}}</span>
      <span class="h20"/>
      <el-input v-model="input_name" placeholder="搜索用户名或邮箱.." @input="onSearchUserInputChange"></el-input>
    </div>
    <!-- 描述内容 -->
    <div class="content flex_col_allcenter">
      <div class="width_100" style="overflow: auto;max-height: 300px;background-color: #f5f5f5;" >
      <div v-if="users.length>0">
        <div v-for="(user,index) in users" :key="index" class="flex_col padding_10_20">
          <div class="flex_row align_center">
          <!--  头像-->
            <div class="flex_row_allcenter" style="width: 40px;height: 40px;">
              <el-avatar v-if="user.avatar" :src="`${BASE_URL + '/storage/' +user.avatar}`"></el-avatar>
              <el-avatar v-else  icon="el-icon-user-solid"></el-avatar>
            </div>
            <span class="w10"/>
          <!-- 消息 -->
            <div class="flex_col flex_1" style="align-items: flex-start">
              <span class="normal_text_size normal_text_color">{{user.name}}</span>
              <span class="h5"></span>
              <span class="description_text_color description_text_size">{{user.email}}</span>
            </div>
          <!-- 操作 -->
            <el-button v-if="user.invitation" size="mini" type="danger" @click="onRemoveButtonClick(user,index)">移除</el-button>
            <el-button v-else-if="user.id === user_id" disabled size="mini" type="info" >自己</el-button>
            <el-button v-else size="mini" @click="onInviteButtonClick(user,index)">邀请</el-button>
          </div>
        </div>
      </div>
        <div v-else><el-empty description=" "></el-empty></div>
      </div>
      <!---->
      <span class="h10"/>
      <span class="minititle_text_size description_text_color" style="align-self: flex-start;margin-left: 20px">用户不存在?输入邮箱邀请对方加入:</span>
      <span class="h10"/>
      <div style="box-sizing: border-box;padding: 0 20px;width: 100%">
        <div class="tag_input">
          <el-input v-model="input_email" placeholder="请输入对方邮箱.."></el-input>

        </div>
      </div>
      <span class="h20"/>
    </div>
    <div slot="footer">
      <el-button @click="cancelButtonClick">取 消</el-button>
      <el-button @click="onDoInviteClick" v-if="invitation_num" type="primary" :loading="loading" >邀请({{invitation_num}}人)</el-button>
      <el-button v-else type="primary" disabled :loading="loading" >邀 请</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {HTTP}    from '../../libs/axiosService'
import {Cons}    from '../../Constant'
import TagsInput from '../TagsInput'
import db_utils  from '../../libs/db_utils'

export default {
  name: 'ProjectMember',
  components: {TagsInput},
  props: {
    prop_project: {
      default: null,
      required: true
    },
    showDialog: {
      // 类型限制
      type: Boolean,
      // 默认值
      default: false,
      required: true
    }
  },
  watch: {
    prop_project(newValue, oldValue) {
      this.project = this.prop_project
    }
  },
  computed: {
    invitation_num() {
      let num = this.final_invited_users.length
      if (this.input_email){
        num = num+1
      }
      return num
    }
  },
  data() {
    return {
      project:null,
      BASE_URL:Cons.BASE_URL,
      loading: false,
      input_name:'',
      input_email:'',
      users:[],
      invited_users:{},
      final_invited_users:[],

    }
  },
  methods: {
    cancelButtonClick() {
      this.loading = false
      this.input_name = ''
      this.input_email = ''
      this.users = []
      this.invited_users = {}
      this.final_invited_users= []
      this.$emit('cancelButtonClick')
    },
    onSearchUserInputChange(name) {
      if (!name)return
      HTTP.before(()=>{
        this.loading = true
      }).get('/api/user/getUsers',{name:this.input_name}).then(res=>{
        this.users = res.data
      }).finally(()=>{
        this.loading = false
      })
    },
    onInviteButtonClick(user, index) {
      user['invitation'] = 1
      this.users.splice(index,1,user)
      this.invited_users[index] = user
      this.final_invited_users = Object.values(this.invited_users)
    },
    onRemoveButtonClick(user, index) {
      delete user['invitation']
      this.users.splice(index,1,user)
      delete this.invited_users[index]
      this.final_invited_users = Object.values(this.invited_users)
    },
    onDoInviteClick() {
      HTTP.before(()=>{
        this.loading = true
      }).post('/api/member/inviteMembers',{
        project_id:this.project.project_id,
        project_owner_id:this.project.project_owner_id,
        ids:this.final_invited_users.map(value => {
          return value['id']
        }),
        email:this.input_email
      }).then(res=>{

        const datas = res.data

        this.project['members'] = []
        // 更新project表
        datas.forEach(data=>{
          this.project['members'].push({
            name:data.user.name,
            user_id:data.user.id,
            avatar:data.user.avatar,
            role:data.role,
            status:data.status
          })
        })

        db_utils.update(db_utils.PROJECTS_DB, {project_id: this.project.project_id}, this.project)
        this.$events.emit('EDIT_PROJECT_SUCESS')
        this.cancelButtonClick()

      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
</style>