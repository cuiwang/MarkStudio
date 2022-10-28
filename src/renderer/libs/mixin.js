import date_utils from './date_utils'
import db_utils   from './db_utils'
import {Cons}     from '../Constant'
import store      from '../store'
export default {
  data(){
    return {

    }
  },
  computed: {
    is_online() {
      return store.state.user.is_online
    },
    user_id(){
      return parseInt(localStorage.getItem('user_id'))
    },
    token(){
      return localStorage.getItem('token') || ''
    },
  },
  methods: {
    // 处理本地数据变化事件
    doLocalSync(type,project_owner_id,project_id,updated_at,version){
      const newDoc = {
        updated_at:updated_at||date_utils.dateNow(),
        type:type||Cons.SyncLogType.SETTING,
        project_owner_id:project_owner_id,
        project_id:project_id||'',
        version:version||'',
        user_id:this.user_id,
      }
      db_utils.insert(db_utils.SYNCLOGS_DB,newDoc,(err,doc)=>{
        if (!err){
          // 如果有网,就要把变动提交给服务器
          if (this.is_online){
            this.$events.emit('doNetSync', doc);
          }
        }
      })
    },

    formatPhone(row, col, value){//隐藏手机号
      if(!value) return ''
      return value.replace(value.substring(2,9),'*'.repeat(7))
    },
    // 将日期显示成距离最近多久
    doDateFromNow(date) {
      if (!date) {
        return '-'
      }
      return date_utils.dateFromNow(date)
    },
    // 截取文本最大30字符
      getMaxString(str,len=30) {
      return str.length > len ? str.substring(0, len-1) + '...' : str
    },
    // 弹出toast
    showMessageWithText(text, type = 'error') {
      this.$message({
        message: text,
        type: type,
        center: true,
        offset: 70,
      })
    },
    // 弹出通知
    showLocalNotification(title,type='success',position='top-right',message,showClose=false){
      this.$notify(
          {
            title:title,
            message:message,
            type:type,
            position:position,
            showClose:showClose,
            duration:2000

          }
      )
    },
    // ────────────────────────── EventEmitter  ──────────────────────────
    addEventListener(listeners){
      for (const listener of listeners) {
        this.$events.on(listener[0],listener[1])
      }
    },
    removeEventListener(listeners){
      for (const listener of listeners) {
        this.$events.removeListener(listener[0],listener[1])
      }
    },

  },
}