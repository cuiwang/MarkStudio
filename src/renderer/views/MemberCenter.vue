<template>
  <div class="container">
    <div class="header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div class="bigtitle_text_size main_text_color text_left">团队管理</div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button type=""  icon="el-icon-plus" @click="addMemberToProject">邀请成员</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="content">
      <div class="flex_row">
        <div class="left_menu flex_col align_center">
          <div v-for="project in projects" :key="project.project_id" style="margin-bottom: 10px">
            <span :class="menu===project.project_id?'menu-active':'menu'" @click="onMenuClick(project)"><i class="el-icon-ship"/> {{project.name}}</span>
          </div>
        </div>
        <div class="right_content">
          <div id="content">
            <div>
              <el-card shadow="never" v-loading="loading">
                <el-table  :data="members">
                  <el-table-column header-align="center" width="220" prop="from_user_name" label="用户">
                    <template slot-scope="scope">
                      <div class="flex_row align_center member_avatar">
                        <el-avatar  :src="BASE_IMGE_URL+scope.row['user']['avatar']"></el-avatar>
                        <el-badge is-dot class="badge" :type="scope.row['user']['is_online']?'success':'danger'">
                        </el-badge>
                        <div class="w10"/>
                        <div class="flex_col  text_left">
                          <span class="smalltitle_text_size normal_text_color">{{scope.row['user']['name']}}</span>
                          <span class="description_text_color minititle_text_size">{{scope.row['user']['email']}}</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" prop="status" label="状态" sortable :sort-method="doSortStatus">
                    <template slot-scope="scope">
                      <el-tag :type="getType(scope.row.status)">{{scope.row.status | status2Str}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" prop="type" label="在线">
                    <template slot-scope="scope">
                      <div class="flex_col">
                        <span>{{scope.row['user']['is_online'] | isOnline}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" prop="type" label="角色">
                    <template slot-scope="scope">
                      <div class="flex_col">
                        <span>{{scope.row.role | role2Str}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center"  align="center" width="170" prop="created_at" label="加入时间" sortable></el-table-column>
                  <el-table-column header-align="center"  align="center" label="操作">
                    <template slot-scope="scope" >
                      <div v-loading="scope.row.loading">
                        <!--管理员的操作-->
                        <div v-if="user_id === currentProject.project_owner_id">
                          <el-button v-if="scope.row.status === MEMBER_STATUS.REJECT" size="mini" type="primary" round @click="doAgainInvitation(scope.row,scope.$index)">重新邀请</el-button>
                          <el-button v-if="scope.row.status === MEMBER_STATUS.WAITING" size="mini" round @click="doCancelInvitation(scope.row,scope.$index)">取消邀请</el-button>
                          <el-button v-if="scope.row.status === MEMBER_STATUS.NORMAL && user_id !== scope.row['user']['id']" size="mini" type="danger" round @click="doDeletelInvitation(scope.row,scope.$index)">移出团队</el-button>
                        </div>
                        <!--非管理员只能操作自己-->
                        <div v-else>
                          <el-button v-if="user_id === scope.row['user']['id']" size="mini" type="danger" round >退出</el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加成员 -->
    <ProjectMember
        :show-dialog="needShowProjectMemberView"
        @cancelButtonClick="needShowProjectMemberView = false"
        :prop_project="currentProject"></ProjectMember>
  </div>
</template>
<script>

import db_utils      from '../libs/db_utils'
import {HTTP}        from '../libs/axiosService'
import {Cons}        from '../Constant'
import ProjectMember from '../components/project/ProjectMember'

export default {
  name: 'MemberCenter',
  components: {ProjectMember},
  data() {
    return {
      currentProject:null,
      projects:[],
      members:[],
      menu:'',
      BASE_IMGE_URL:Cons.BASE_URL + '/storage/',
      loading:false,
      MEMBER_STATUS:Cons.MEMBER_STATUS,
      MEMBER_ROLE:Cons.MEMBER_ROLE,
      needShowProjectMemberView:false,
      Listeners:[]
    }
  },
  filters: {
    isOnline(value) {
      return value?'在线':'离线'
    },
    role2Str(value) {
      return Cons.MEMBER_ROLE2Str[value]
    },
    status2Str(value) {
      return Cons.MEMBER_STATUS2Str[value]
    }
  },
  mounted() {
    this.initEvent()
    this.initData()
  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },
  methods: {
    initEvent(){
      //EDIT_PROJECT_SUCESS
      const EDIT_PROJECT_SUCESS_listener = () => {
        this.initData()
      }
      this.Listeners = [
          ['EDIT_PROJECT_SUCESS=',EDIT_PROJECT_SUCESS_listener]
      ]
      this.addEventListener(this.Listeners)
    },
    initData() {
      // 已登录用户
      if (this.user_id) {
        db_utils.pureFind(db_utils.PROJECTS_DB, {user_id: this.user_id,cloud:1})
                .sort({
                  cloud: -1,
                  working: -1,
                  updated_at: -1
                })
                .exec((err, documents) => {
                  if (!err && documents){
                  this.projects = documents
                    this.currentProject = this.projects[0]
                    this.menu = this.currentProject.project_id
                    // 获取项目成员
                    this.getMembers(this.currentProject)
                  }
                })
      }
    },
    onMenuClick(project) {
      this.menu = project.project_id
      this.currentProject = project
      this.getMembers(project)
    },
    // 添加成员
    addMemberToProject() {
      this.needShowProjectMemberView = true
    },
    getMembers(project){
      HTTP.before(()=>{
        this.loading = true
      }).get('/api/member/download',{
        'project_id':project.project_id,
        'project_owner_id':project.project_owner_id
      }).then(res=>{
        this.members = res.data
      }).finally(()=>{
        this.loading = false
      })
    },
    getType(data) {
      let type = ''
      switch (data) {
        case 0:
          type = 'warning';break;
        case 1:
          type = 'success';break;
        case 2:
          type = 'danger';break;
        default:break;
      }
      return type
    },
    doSortStatus(a,b) {
      return a.status>b.status
    },
    doAgainInvitation(member, index) {
      HTTP.before(()=>{
        member.loading = true
        this.members.splice(index,1,member)
      }).post('/api/member/inviteMembers',{
        'project_id':this.currentProject.project_id,
        'project_owner_id':this.currentProject.project_owner_id,
        'ids':[member.user.id]
      }).then(res=>{
        member.loading = false
        member.status = this.MEMBER_STATUS.WAITING
        this.members.splice(index,1,member)
      }).catch(()=>{
        member.loading = false
        this.members.splice(index,1,member)
      })
    },
    doCancelInvitation(member, index) {
      HTTP.before(()=>{
        member.loading = true
        this.members.splice(index,1,member)
      }).post('/api/member/cancelInvitation',{
        'project_id':this.currentProject.project_id,
        'project_owner_id':this.currentProject.project_owner_id,
        'ids':[member.user.id]
      }).then(res=>{
        member.loading = false
        this.members.splice(index,1)
      }).catch(()=>{
        member.loading = false
        this.members.splice(index,1,member)
      })
    },
    doDeletelInvitation(member, index) {


      this.$confirm('此操作将用户移出标注团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doCancelInvitation(member,index)
      }).catch(() => {
      });

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../globals';

.darkmode--activated .member_avatar{
  mix-blend-mode: difference;
}

.el-avatar{
  background-color: transparent;
}

.badge {
  margin-left: -15px;
  margin-bottom: -35px;
}


.container{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.content{
  flex: 1;
  overflow: auto;
  background-color: #ffffff;

  .left_menu{
    margin-top: 50px;
    margin-left: 50px;
    width: 180px;

    .menu-active {
      width: 80px;
      user-select: none;
      cursor: pointer;
      color: #515764;
      font-size: 14px;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
      background: #f3f4f8;
      padding: 3px 15px;
      border-radius: 3px;
    }


    .menu {
      width: 80px;
      user-select: none;
      cursor: pointer;
      color: #757980;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      padding: 3px 15px;
      border-radius: 3px;
    }

  }

  .right_content{
    flex: 1;
    margin: 50px;
  }
}
</style>