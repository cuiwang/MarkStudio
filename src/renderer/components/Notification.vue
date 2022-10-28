<template>
  <div class="container">
    <div class="header padding_10 flex_row_allcenter">
      <span class="smalltitle_text_size bold_text">消息</span>
      <span class="flex_1"></span>
      <el-link type="info">
        <span class="minititle_text_size">查看全部消息</span>
      </el-link>
    </div>
    <div class="separate_line box_shadow"></div>
    <div class="h10"></div>
    <div class="content" style="overflow: auto;max-height: 460px">
      <div  v-loading="notification.loading" v-for="(notification,index) in Notifications" :key="notification.id" >
       <div @click="doNormalReadedClick(notification,index)" class="cursor_pointer notification_item flex_row padding_10" :class="notification.status===0?'unread':'readed'">
         <div>
           <img class="system" v-if="!notification['from_user_id']" width="32" src="../assets/Icon512.png" >
           <el-avatar v-else :src="BASE_IMGE_URL+notification['from_user_avatar']"></el-avatar>
         </div>
         <div class="w5"/>
         <div class="flex_1">
           <!-- title -->
           <div class="flex_row align_center" >
             <span class="normal_text_size  bold_text" :class="notification.status===NotificationStatus.UNREAD?'normal_text_color':'description_text_color'">{{notification.title}}</span>
             <span class="w5"/>
             <span class="description_text_color">•</span>
             <span class="w5"/>
             <span class="minititle_text_size description_text_color">{{doDateFromNow(notification.created_at)}}</span>
             <span class="flex_1"></span>
           </div>
           <!-- description -->
           <div class="flex_row align_center flex_warp">
             <span class="normal_text_size normal_text_color">{{notification['from_user_name']}}</span>
             <span class="w5"></span>
             <span class="normal_text_size normal_text_color">{{notification.description}}</span>
           </div>
           <div class="h10"></div>
           <!-- buttons -->
           <div class="flex_row align_center" v-if="notification.type === NotificationType.MEMBER">
             <div class="flex_1"></div>
               <el-button size="mini" round @click="doMemberDenyClick(notification,index)">拒绝</el-button>
               <el-button size="mini" type="primary" round @click="doMemberAcceptClick(notification,index)">同意</el-button>
           </div>
           <div class="flex_row align_center" v-if="notification.type === NotificationType.SYSTEM">
             <div class="flex_1"></div>
             <el-button size="mini" type="primary" round @click="doSystemReadedClick(notification,index)">已读</el-button>
           </div>
         </div>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Cons} from '../Constant'
import {HTTP} from '../libs/axiosService'

export default {
  name: 'Notification',
  props: {
    notifications: {
      type: Array,
      required:true
    }
  },
  watch: {
    notifications(newValue, oldValue) {
      this.Notifications = this.notifications
    }
  },
  data() {
    return {
      Notifications:this.notifications,
      NotificationType:Cons.NotificationType,
      NotificationStatus:Cons.NotificationStatus,
      BASE_IMGE_URL:Cons.BASE_URL + '/storage/'
    }
  },
  methods: {
    // 普通信息标记已读
    doNormalReadedClick(notification,index) {
      if (notification.type === this.NotificationType.MESSAGE ){
        this.doReadedClick(notification,index,this.NotificationStatus.READED)
      }
    },
    // 系统消息标记已读
    doSystemReadedClick(notification,index) {
        this.doReadedClick(notification,index,this.NotificationStatus.READED)
    },
    // 通知信息标记
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
        this.Notifications.splice(index,1)
        // 通知刷新
        this.$events.emit('NOTIFICATION_CHANGED')

      }).catch(err=>{
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
        this.doReadedClick(notification,index,this.NotificationStatus.READED)
        this.$events.emit('PROJECT_IINVITATION_ACCEPTED')

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
        this.doReadedClick(notification,index,this.NotificationStatus.DENY)

      }).catch(()=>{
        notification.loading = false
        this.Notifications.splice(index,1,notification)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../globals';

.notification_item{
  margin-bottom: 1px;
}

.unread{
  background-color: #F0FAFF
}

.readed{
  background-color: #f8f9fa;
}
</style>