<template>
  <div class="container">
    <div class="header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1 text_left">
            <div class="bigtitle_text_size main_text_color text_left">消息中心</div>
            <div class="description_text_size description_text_color">请及时处理未读消息。</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="content">
      <div class="flex_row">
        <div class="left_menu flex_col align_center">
          <span :class="menu==='all'?'menu-active':'menu'" ><i class="el-icon-bell"/> 全部</span>
        </div>
        <div class="right_content">
          <div id="content">
            <div>
              <el-card shadow="never" v-loading="loading">
                  <el-table v-if="Notifications.length" :default-sort="{prop: 'status', order: 'descending'}" :data="Notifications.filter((data) => !search || data.description.toLowerCase().includes(search.toLowerCase()) || data['from_user_name'].toLowerCase().includes(search.toLowerCase()))">
                    <el-table-column header-align="center" width="120" prop="from_user_name" label="来源">
                      <template slot-scope="scope">
                        <div class="flex_col_allcenter">
                          <img class="system" v-if="!scope.row['from_user_id']" width="32" src="../assets/Icon512.png" >
                          <el-avatar v-else :src="BASE_IMGE_URL+scope.row['from_user_avatar']" ></el-avatar>
                          <span class="description_text_color description_text_size">{{scope.row['from_user_name']}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column width="100" prop="status" label="状态" sortable :sort-method="doSortStatus">
                      <template slot-scope="scope">
                          <el-tag :type="getType(scope.row.status)">{{scope.row.status | status2Str}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column width="100" prop="type" label="类型" sortable>
                      <template slot-scope="scope">
                        <div class="flex_col">
                          <span>{{scope.row.type | type2Str}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column width="100" prop="title" label="标题"></el-table-column>
                    <el-table-column prop="description" label="内容"></el-table-column>
                    <el-table-column width="170" prop="created_at" label="时间" sortable></el-table-column>
                    <el-table-column width="220" align="right">
                      <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                      </template>
                      <template slot-scope="scope" >
                        <div v-loading="scope.row.loading">
                          <div v-if="scope.row.status!==NotificationStatus.UNREAD" >
                            <el-button size="mini" type="danger" round @click="doDeleteClick(scope.row,scope.$index)">删除</el-button>
                          </div>
                          <div v-else>
                            <div class="flex_row align_center" v-if="scope.row.type === NotificationType.MEMBER">
                              <div class="flex_1"></div>
                              <el-button size="mini" round @click="doMemberDenyClick(scope.row,scope.$index)">拒绝</el-button>
                              <el-button size="mini" type="primary" round @click="doMemberAcceptClick(scope.row,scope.$index)">同意</el-button>
                              <el-button size="mini" type="danger" round @click="doDeleteClick(scope.row,scope.$index)">删除</el-button>
                            </div>
                            <div class="flex_row align_center" v-else>
                              <div class="flex_1"></div>
                              <el-button size="mini" type="primary" round @click="doReadedClick(scope.row,scope.$index)">已读</el-button>
                              <el-button size="mini" type="danger" round @click="doDeleteClick(scope.row,scope.$index)">删除</el-button>
                            </div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-empty v-else></el-empty>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Cons}           from '../Constant'
import {fetchGet, HTTP} from '../libs/axiosService'

export default {
  name: 'NotificationCenter',
  data() {
    return {
      menu: 'all',
      Notifications:[],
      NotificationType:Cons.NotificationType,
      NotificationStatus:Cons.NotificationStatus,
      BASE_IMGE_URL:Cons.BASE_URL + '/storage/',
      search: '',
      loading:false
    }
  },
  mounted() {
    this.initData()
  },
  filters: {
    type2Str(value) {
      return Cons.NotificationType2Str[value]
    },
    status2Str(value) {
      return Cons.NotificationStatus2Str[value]
    }
  },
  methods: {
    initData(){
      this.getNotifications()
    },
    getNotifications() {

      HTTP.before(()=>{
        this.loading = true
      }).get('/api/notification/notifications').then(res=>{
        this.Notifications = res.data
      }).finally(()=>{
        this.loading = false
      })

    },
    // 消息标记已读 (通知刷新)
    doReadedClick(notification,index,status=this.NotificationStatus.READED) {
      HTTP.before(()=>{
        notification.loading = true
        this.Notifications.splice(index,1,notification)
      }).post('/api/notification/changeNotification',{
        'notification_ids':[notification.id],
        'status':status
      }).then(res=>{
        notification.loading = false
        notification.status = status
        this.Notifications.splice(index,1,notification)
        // 通知刷新
        this.$events.emit('NOTIFICATION_CHANGED')

      }).catch(err=>{
        notification.loading = false
        this.Notifications.splice(index,1,notification)
      })
    },
    // 删除 (通知刷新)
    doDeleteClick(notification,index) {
      //
      HTTP.before(()=>{
        notification.loading = true
        this.Notifications.splice(index,1,notification)
      }).post('/api/member/deleteNotification',{
        'project_id':notification.data.project_id,
        'project_owner_id':notification.data.project_owner_id
      }).then(res=>{
        notification.loading = false
        this.Notifications.splice(index,1)
        // 通知刷新
        this.$events.emit('NOTIFICATION_CHANGED')
      }).catch(()=>{
        notification.loading = false
        this.Notifications.splice(index,1,notification)
      })
    },
    // 接受
    doMemberAcceptClick(notification,index) {
      //
      HTTP.before(()=>{
        notification.loading = true
        this.Notifications.splice(index,1,notification)
      }).post('/api/member/acceptInvitation',{
        'project_id':notification.data.project_id,
        'project_owner_id':notification.data.project_owner_id
      }).then(res=>{
        notification.loading = false
        notification.status = this.NotificationStatus.READED
        this.Notifications.splice(index,1,notification)
        this.doReadedClick(notification,index,this.NotificationStatus.READED)
      }).catch(()=>{
        notification.loading = false
        this.Notifications.splice(index,1,notification)
      })

    },
    // 拒绝
    doMemberDenyClick(notification,index) {
      //
      HTTP.before(()=>{
        notification.loading = true
        this.Notifications.splice(index,1,notification)
      }).post('/api/member/denyInvitation',{
        'project_id':notification.data.project_id,
        'project_owner_id':notification.data.project_owner_id
      }).then(res=>{
        notification.loading = false
        notification.status = this.NotificationStatus.DENY
        this.Notifications.splice(index,1,notification)
        this.doReadedClick(notification,index,this.NotificationStatus.DENY)

      }).catch(()=>{
        notification.loading = false
        this.Notifications.splice(index,1,notification)
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
    }
  },

}
</script>
<style lang="scss" scoped>
@import '../globals';


.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #ffffff;

  .left_menu {
    margin-top: 50px;
    margin-left: 50px;
    width: 200px;

    .menu-active {
      width: 100px;
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
      width: 100px;
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

  .right_content {
    flex: 1;
    margin: 50px;
  }
}

</style>