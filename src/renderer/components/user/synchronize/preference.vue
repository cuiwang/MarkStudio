<template>
  <el-card shadow="never" v-loading="showLoading">
    <div class="flex_row align_center">
      <div class="margin_10">
        <i class="el-icon-setting hugetitle_text_size"/>
      </div>
      <div class="flex_col">
        <span class="smalltitle_text_size bold_text">偏好设置
          <span v-if="!sync_setting_history.version" class="normal_text_size danger_color normal_text">
            <i class="el-icon-error"/>
            (发现云端无数据,请上传数据!)
          </span>
          <span v-else-if="sync_setting_history['updated_at']!==local_setting_history['updated_at']"
                class="normal_text_size warning_color normal_text">
            <i class="el-icon-warning"/>
            (发现版本不一致,请及时同步)
          </span>
          <span v-else class="normal_text_size success_color normal_text">
            <i class="el-icon-success"/>
          </span>
        </span>
        <span class="h5"/>
        <span class="normal_text_size normal_text_color">
          云端版本:
          <span class="maincolor">{{sync_setting_history['updated_at'] || '-'}} v{{sync_setting_history.version || '?'}}</span>
          <el-divider direction="vertical"/>
          本地版本:
          <span class="maincolor">{{local_setting_history['updated_at'] || '-'}} v{{local_setting_history['version'] || '?'}}</span>
        </span>
        <span class="h5"/>
        <span class="description_text_size description_text_color">
          <i class="el-icon-time"/>
          最近上传时间: {{doDateFromNow(sync_setting_history['updated_at'])}}
          <el-divider direction="vertical"/>
          <i class="el-icon-time"/>
          最近下载时间: {{doDateFromNow(sync_setting_history['downloaded_at'])}}
        </span>
      </div>
      <div class="flex_1"/>
      <el-dropdown v-if="sync_setting_history" size="small" @command="handleSettingCommand">
        <el-button type="primary" size="small">
          同步操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown"
                          style="width: 126px;overflow-y: hidden;padding: 10px 0;margin: 10px 0;">
          <el-dropdown-item command="upload" icon="el-icon-upload">上传本地数据</el-dropdown-item>
          <el-dropdown-item command="download"
                            :disabled="!sync_setting_history.version"
                            icon="el-icon-download"
                            divided>下载远程数据
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-refresh-left" disabled divided>回滚指定版本</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-card>
</template>
<script>
import {HTTP}               from '../../../libs/axiosService'
import db_utils             from '../../../libs/db_utils'
import {Cons}               from '../../../Constant'
import date_utils                               from '../../../libs/date_utils'
import {getUserSettingInfo, setUserSettingInfo} from '../../../libs/sync_utils'

export default {
  name: 'preference',
  data() {
    return {
      showLoading: false,
      sync_setting_history: {
        updated_at:'',
        version:''
      },
      local_setting_history:{
        updated_at:'',
        version:''
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.is_online){
        db_utils.pureFindOne(db_utils.SYNCLOGS_DB,{type:Cons.SyncLogType.SETTING,user_id:this.user_id}).sort({'updated_at':-1}).exec( (err, doc)=> {
          if (!err && doc){
            this.local_setting_history = doc
          }
          // 2.获取线上记录
          HTTP
              .before(() => {
                this.showLoading = true
              })
              .get('/api/setting/history')
              .then(
                  res => {
                    this.sync_setting_history = res.data
                    // 判断是否应该自动同步
                    if (!this.sync_setting_history.updated_at){
                      // 服务器无上传记录,即首次上传
                      this.doUploadSettingData()
                    }
                    else if (date_utils.isBefore(this.sync_setting_history.updated_at,this.local_setting_history.updated_at)){
                      // 服务器时间落后本地,即本地有新内容,要覆盖服务器
                      console.log('服务器时间落后本地,即本地有新内容,要覆盖服务器')
                      this.doUploadSettingData()
                    }else if (date_utils.isAfter(this.sync_setting_history.updated_at,this.local_setting_history.updated_at)){
                      // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                      console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                      this.doDownloadSettingData()
                    }
                  })
              .finally(() => {
                this.showLoading = false
              })
        });
      }
    },
    // ────────────────────────── / setting ──────────────────────────
    handleSettingCommand(command) {
      if (command === 'upload') {
        this.doUploadSettingData()
      }
      else if (command === 'download') {
        this.doDownloadSettingData()
      }
    },
    async doUploadSettingData() {

      const datas = getUserSettingInfo()
      HTTP.before(() => {
            this.showLoading = true
          })
          .post('/api/setting/upload', {
            datas: datas
          })
          .then(res => {
            // 上传成功,通知刷新页面
            // 记录本地同步信息
            this.doLocalSync(Cons.SyncLogType.SETTING,null, null, res.data.updated_at,res.data.version)
            this.initData()
          })
          .finally(() => {
            this.showLoading = false
          })
    },
    doDownloadSettingData() {
      HTTP.before(() => {
            this.showLoading = true
          })
          .get('/api/setting/download')
          .then(res => {
            if (res.data && res.data.datas) {
              setUserSettingInfo(res.data.datas)
              // 下载成功,通知刷新页面
              // 记录本地同步信息
              this.doLocalSync(Cons.SyncLogType.SETTING,null,null,res.data.updated_at,res.data.version)
              this.initData()
            }
          })
          .finally(() => {
            this.showLoading = false
          })
    },
  }
}
</script>
<style scoped>
</style>