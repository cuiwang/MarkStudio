<template>
  <el-dialog
      title="激活云服务"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="active_cloud_dialog"  width="40%" :visible.sync="showDialog" :show-close="false">
    <div slot="title" >
      <!--icon-->
      <div class="flex_row_allcenter hugetitle_text_size white_color">
        <div class="flex_row_allcenter" style="background-color: #909399;width: 50px;height: 50px;border-radius: 5px;">
          <i class="el-icon-s-platform"/>
        </div>
        <div class="margin_0_10 description_text_color">
          <i class="el-icon-d-arrow-right"/>
        </div>
        <div class="flex_row_allcenter" style="background-color: #409eff;width: 50px;height: 50px;border-radius: 5px;">
          <i class="el-icon-cloudy"/>
        </div>
      </div>
      <div class="h20"/>
      <!--  text   -->
      <div class="main_text_color title_text_size bold_text">离线工程转云服务</div>
      <div class="h5"/>
      <div class="description_text_color normal_text_size">({{project.name}})</div>
      <div class="h10"/>
      <!-- descrition -->
      <div class="description_text_color normal_text_size margin_0_20 flex_col">
        <span>您的数据将托管到在线服务!区别于离线工程,云服务只要网络通畅,即可访问数据.</span>
        <div class="flex_row_allcenter"><span>转换过程不可逆,建议转换前先</span><el-link type="warning" @click="exportProject(project)">导出备份! <i class="el-icon-thumb"/> </el-link></div>
      </div>
    </div>
    <!-- 描述内容 -->
    <div class="content">
      <el-divider/>
      <!--优势提示-->
      <div v-if="!isProcessCloud" class=" advantage margin_0_20 text_left">
        <div class="normal_text_size normal_text_color bold_text">转为云服务后</div>
        <div class="h10"></div>
        <div class="flex_row align_center padding_0_10 ">
          <i class="el-icon-circle-check success_color"></i><span class="w5"/><span>团队标注(多人协同)</span>
        </div>
        <div class="h5"></div>
        <div class="flex_row align_center padding_0_10 ">
          <i class="el-icon-circle-check success_color"></i><span class="w5"/><span>数据云存储(暂保存三年,到期后自动续期)</span>
        </div>
        <div class="h5"></div>
        <div class="flex_row align_center padding_0_10 ">
          <i class="el-icon-circle-check success_color"></i><span class="w5"/><span>支持版本管理,指定版本回滚</span>
        </div>
        <div class="h5"></div>
        <div class="flex_row align_center padding_0_10 ">
          <i class="el-icon-circle-check success_color"></i><span class="w5"/><span>实时标注,多端同步</span>
        </div>
        <div class="h5"></div>
        <div class="flex_row align_center padding_0_10 ">
          <i class="el-icon-circle-check success_color"></i><span class="w5"/><span>离线标注自动合并</span>
        </div>
        <div class="h10"></div>
        <div class="description_text_size">您当前所选的工程基础数据,将上传到云服务加密存储.</div>
      </div>
      <!--步骤提示-->
      <div v-else class="processing padding_0_10" >
        <!-- 分三步 -->
        <!-- 准备数据时的动画提示,每一步都要 -->
        <!-- 使用步骤条+骨架屏 -->
        <el-steps align-center :active="processing_active" finish-status="success" simple>
          <el-step title="标注组" icon="el-icon-upload">
          </el-step>
          <el-step title="作业数据" icon="el-icon-upload">
          </el-step>
          <el-step title="基础数据" icon="el-icon-upload">
          </el-step>
        </el-steps>
        <div class="h10"></div>
        <el-alert
            :title="processCloudTipString"
            type="info"
            center
            :closable="false"
        ></el-alert>
        <div class="h10"></div>
        <el-skeleton animated v-if="processing_active<3" >
          <template slot="template">
            <el-skeleton-item v-if="processing_active<1"  variant="p"/>
            <el-skeleton-item v-if="processing_active<2"  variant="p"/>
            <el-skeleton-item v-if="processing_active<3"  variant="p"/>
          </template>
        </el-skeleton>
      </div>
      <el-divider/>
    </div>
    <div slot="footer">
      <el-button style="float: left" disabled>帮助?</el-button>
      <el-button @click="cancelButtonClick">取 消</el-button>
      <el-button type="primary" :loading="isProcessCloud" @click="doActiveCloudServerClicked">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import db_utils    from '../../libs/db_utils'
import {Cons}      from '../../Constant'
import {fetchPost} from '../../libs/axiosService'

export default {
  name: 'CloudProject',
  props: {
    project: {
      type: Object,
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
    project(newValue, oldValue) {
      if (this.project) {
        this.cloud_labels = []
        if (this.project.markTypeId) {
          db_utils.findOne(db_utils.LABELS_DB, {
            type: Cons.WorkingType.ENTITY,_id:this.project.markTypeId
          }, (err, document) => {
            if (!err && document){
            this.cloud_labels.push(document)
            }
          })

        }
        if (this.project.globalTypeId) {
          db_utils.findOne(db_utils.LABELS_DB, {
            type: Cons.WorkingType.CLASSIFY,_id:this.project.globalTypeId
          }, (err, document) => {
            if (!err && document) {
              this.cloud_labels.push(document)
            }

          })

        }
        if (this.project.relationTypeId) {
          db_utils.findOne(db_utils.LABELS_DB, {
            type: Cons.WorkingType.RELATION,_id:this.project.relationTypeId
          }, (err, document) => {
            if (!err && document) {
              this.cloud_labels.push(document)
            }

          })
        }
        if (this.project.dialogueTypeId) {
          db_utils.findOne(db_utils.LABELS_DB, {
            type: Cons.WorkingType.DIALOGUE,_id:this.project.dialogueTypeId
          }, (err, document) => {
            if (!err && document) {
              this.cloud_labels.push(document)
            }

          })
        }
        // 添加hidden字段,在标注组管理中隐藏
        if (this.project.translationId) {
          this.cloud_labels.push({_id:-400,name:'文本翻译',type:Cons.WorkingType.TRANSLATION,hidden:1})
        }
        // 添加hidden字段,在标注组管理中隐藏
        if (this.project.text2sqlId) {
          this.cloud_labels.push({_id:-400,name:'语义解析',type:Cons.WorkingType.TEXT2SQL,hidden:1})
        }
      }
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo
    },
    userAvatar() {
      if (this.userInfo){
        return Cons.BASE_URL+'/storage/'+this.userInfo.avatar
      }else {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAB9RJREFUeF7tWn1sJVUVP+dO7R/NLihrFyMJUcKia0RX6HZZ2t03Z+YBoqkxRBZFIAICf6grfxjAb0QNCCYGJGqEgApGqDGSNMENfW/Offu28qqiVA1G8SNEg3FXRUzdNrtv5pj7eO/Z1868+ezaht7kZac75/c75/7uvXPvnDMIL/OGL/P+wwkTYHJycnB4eHhrEARblVKtn7k2A6CUOhwEQetnro8cOXJ43759x07E4KyaAO0OOwDgIqIjIuek7NBsEAQHlFJ68+bNMyMjI8dT4hOZFy4AM38QAN4JADYAvDJRFDFGIvJPRGQAOEBE9xfB2eEoTABmfjcA7AcAKjLAEC4jxD1E9FgRfnILwMzjIrIfES8tIqCkHCLyfUQ0QhxKigmzyyUAM38BAD6ZJ4C8WBG5y3Gcm7LyZBaAmb8BADdkdVwkDhGnbNt+VxbO1AJMT0+fPDAwcAAAzsvicBUxvx8cHBwbGxs7nMZHKgGY+Y0A8Js0Dv4PtjuJ6GdJ/SYWoFarnR0EwS+TEkfYzSPiL4IgeBoAGr7vH1JK+QAwalnWThEZNdcAsDmPH6XU6aVS6c9JOBIJ0J72RwDgFUlII2zuVUrdGRdYvV4/o9lsfgkA3pPD1+L8/PyWiYmJo3EciQTQWs+JyFviyKLu+75/Yblcnk6DZ+YbAeAraTDLbM2h6eI4fKwAzPwIAFwWRxRx/2kieltGbAumtZ5tL40sNPcS0Uf6AfsKUK1Wb1VKfTaL5zbmVUT0rxx4mJqaGtq0adN/snIEQfA513VvjcJHClCr1baJSENETsniXERudxznE1mwyzHM/F4A+F4WLkQ07xHnlUqlZ8PwkQIw81cB4MNZnLZfWmLXXxpuZjYCGCGytMilECqA1nq3iPw4iyeDEZFxx3FmsuLDcJ7njSFi5nM/Ip5v2/aTy7lDBcipNgwMDJyyZ8+eF4oUoFKpbLEs6+85OB8hovfFCuB53kWIaI66WduzRHRWVnA/nOd5f0DEM3JwX0xEPX1bMQM8z7sNET+dw8kUEWV6MYnzycw/AoC3x9n1uX8HEX186f0VAjCzSTiYbE6mlvf1tJ9TZr4LAD6WKbCXQA0i2h0pwMzMzNZjx479LYcD8wB80HGca/JwRGG11t8WkavycFuW9dq9e/f+tcPRMwM8z7sEEX+QxwEAPElE5+fkCIUz808AYGcebqXUFaVS6buhAjDzfQBgkpp52gtElOnwFOeUmc3OkivRunyG9swAZjavqW+NCyTuvu/7byiXy7+Ls0tzv8BcxBwR7QidAVrrF0XkpDSBhdmKyM2O49yZl2cpXmu9X0TuzsuJiP+2bfvkFQLMzs5uOXr0aJ6DRk9sIlJ2HKeaN2CDr9Vq24MgeKYILsMxNDT06l27dv3DXHeXQKVS2WlZlnnIFNIQ8U+2bec5tHTjYGaT4jq3kMAAwPf90XK5/NMeATzP24eIjxblpM1zPxFdl4eTmU1SxCRHCmsicpnjOJM9AjDzzQBwR2Fe2kSIOC0ilxNRquXFzK8DgCkAeHPRMQHALURk0m7/WwLMbHL8Jte/Kk1ErnUc54Ek5Mz8KQD4fBLbjDY3ElHrgdp9BmitLxCRJzISJoIh4hMmI2xZ1lOWZR0aHx9/3gAbjcapi4uLoyb1ZX6IeGEiwoxGQRBc7rpuK8HSFYCZzwSA0KxJRj8ml+gCwHAUHhH/KCImLb6tj40RqZL3CLyUf+kO1RVgcnLSGh4ebmbs7FLYId/3b+tkgZn5FgC4PS0vIj4vIl8nIlN/BGYeQcTPiMhEWq4Q+7OJ6Nc9M8D84Xnec4h4elYHQRBc77quOU73tIMHD77J932TH3x/Au65IAgeU0p9mYjml9trra8WkUTPkihfg4ODp3ZKaMuPwplfhZVSF5VKpb7PkGq1eppSykz3M0Vkm1LK/LsAAGZPnhsaGvpV54DSTyit9aUi0trGsjQi6va7RwCt9U0i0toe0jREHLVtu3WwOFGtXq+f1Ww2f5vB3w+J6JIOrkeAer1+brPZTFxYbK0hxGts234wQyC5IY1G46SFhYUX0xAFQXCV67oPhQpg/pOZ/wIApyUhFZH7HMe5PontatmkzGGaAstrlj5bwlJiZjQ/kCDgVcv9JfDdY5KigvUoEfXUFlYIUK1Wr1NKfTNBEBcQUSWB3aqbtMtnpmYQV4e8kogeXhrQCgFMXvD48eOmJPb6PpF/i4iuXvWepXCQoHz2FBGNLKeMKoz0LU0HQbDLdd3CXp1T9LOvKTObnWhFJw1IRG5wHGfFzA4VQERUrVYzsyAsAclEZL4AXXNNa/1FEQkryIaOfmsXi+oFM18BAN3torttIH7Utu171lzvX9rBTD3DHOZ6WtTo9xXA3NRaPy4i3SovIi74vr/ddd3n1qIA7ZifEZHtS+KLHP1YASqVym6l1AFE7CRKQwuMa0kMrfXd5svV9ro3X5y/o19uMsknMtcCQOsD5aiXnbUkQLVavVIp9Z12vPtd1zXfOUS2WAEMspOXE5EdjuPMraUOL4+lUz9AxK/Ztv2huFiTCjAAAI8T0apmauKCTXqfmc0XaRNEtBiHSSRAexbsICJTOVrzrVqtnuO67s+TBJpYgCRk69FmQ4D1OGpFxrwxA4pUcz1ybcyA9ThqRca8MQOKVHM9cm3MgPU4akXG/F9j9PNfdVvStQAAAABJRU5ErkJggg=="
      }
    }
  },
  data() {
    return {
      processing_active:0,// 云服务处理进度
      isProcessCloud:false,
      processCloudTipString:'',
      // ────────────────────────── 分割线  ──────────────────────────
      cloud_labels:[]// 项目所用标签组,在上次到服务器后,本地需要clone一份immutable数据
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
    },
    // ────────────────────────── 分割线  ──────────────────────────
    cancelButtonClick() {
      this.processing_active = 0
      this.isProcessCloud = false
      this.processCloudTipString = ''
      this.$emit('cancelButtonClick')
    },
     async doActiveCloudServerClicked() {
       this.isProcessCloud = true
       this.processing_active = 0
       this.processCloudTipString = '正在准备标注数据,请耐心等待...'
       const _labels = await this.doPrepareLabelData()
       // 1.上传标注数据
       const res1 = await this.doUploadLabelData({
         project_id:this.project._id,
         project_owner_id:this.user_id,
         datas:_labels
       }).catch(err2=>{
         this.processing_active = 0
         this.isProcessCloud = false
         this.processCloudTipString = ''
         this.$message.error('step1:激活失败,请重试!')
         db_utils.remove(db_utils.LABELS_DB,{project_id:this.project._id})
       })
       if (!res1)return

       //2.上传作业数据
       this.processing_active = 1
       this.processCloudTipString = '正在准备作业数据,请耐心等待...'
       let cloud_datas = await this.doPrepareWorkData()
       //2.上传作业数据
       const res2 = await this.doUploadWorkData({
         project_id:this.project._id,
         project_owner_id:this.user_id,
         datas:cloud_datas
       }).catch(err3=>{
         this.processing_active = 0
         this.isProcessCloud = false
         this.processCloudTipString = ''
         this.$message.error('step2:激活失败,请重试!')
       })
       if (!res2)return

       this.processing_active = 2
       this.processCloudTipString = '正在准备基础数据,请耐心等待...'
       const _basic = this.doPrepareBasicData()
       // 1.上传基础数据
       const res3 = await this.doUploadBasicData(_basic).catch(err => {
         this.processing_active = 0
         this.isProcessCloud = false
         this.processCloudTipString = ''
         this.$message.error('step3:激活失败,请重试!')
       })
       if (!res3)return

       this.processing_active = 3
       this.processCloudTipString = '激活完毕,正在进行最后清理...'

       // 全部上传完毕,将本地数据改成线上.
       // 1.新增cloud标记 新增user_id 项目所属用户 新增团队管理员为自己
       this.project['cloud'] = 1
       this.project['init'] = 1
       this.project['user_id'] = this.user_id;
       this.project['project_owner_id'] = this.user_id;
       this.project['project_id'] = this.project._id;

       db_utils.update(db_utils.PROJECTS_DB, {_id: this.project._id}, this.project)

      // 2.新增成员信息
       const owner_member = {
         project_id:this.project._id,
         project_owner_id:this.user_id,
         user_id:this.user_id,
         name:this.userInfo.name,
         avatar:this.userInfo.avatar,
         role:Cons.MEMBER_ROLE.MANAGER,
         status:Cons.MEMBER_STATUS.NORMAL
       }
       db_utils.insert(db_utils.MEMBERS_DB,owner_member)

       // 3. SYNCLOGS_DB 记录project 、label、datas.
       this.doLocalSync(Cons.SyncLogType.PROJECT_LABEL,this.user_id,this.project._id, res1.data.updated_at,res1.data.version)
       this.doLocalSync(Cons.SyncLogType.PROJECT_DATAS,this.user_id,this.project._id, res2.data.updated_at,res2.data.version)
       this.doLocalSync(Cons.SyncLogType.PROJECT_BASIC,this.user_id,this.project._id, res3.data.updated_at,res3.data.version)
       // 关闭窗口,通知刷新
       this.$emit('syncFinish')

     },
    doPrepareBasicData(){

      let cloud_basic = {}
      cloud_basic['project_id'] = this.project._id
      cloud_basic['project_owner_id'] = this.user_id
      cloud_basic['name'] = this.project.name
      cloud_basic['description'] = this.project.description

      return cloud_basic
    },
    async doPrepareLabelData() {
      // 2.本地label库新增项目专属标注组
      let _labels = []
      for (const label of this.cloud_labels) {
        delete label['_id']
        label['user_id'] = this.user_id // 标记专属
        label['project_id'] = this.project._id // 标记专属
        label['project_owner_id'] = this.user_id
        label['project_name'] = this.project.name
        _labels.push(await this.doInsertLabel(label))
      }
      return _labels;
    },
    doPrepareWorkData(){
      return new Promise((resolve, reject) => {
        db_utils.pureFind(db_utils.DATAS_DB,{ project_id: this.project._id}).exec((err, docs) => {
          if (!err && docs){
              resolve(docs)
            }else {
              reject('')
            }
        })
      })
    },
    // 标记为专属label
    doInsertLabel(label){
      return new Promise((resolve, reject) => {
        db_utils.insert(db_utils.LABELS_DB, label, (err,doc) => {
          if (!err){
            resolve(doc)
          }else {
            reject('')
          }
        });
      })
    },

    doUploadBasicData(params) {
      return fetchPost('/api/project/create',params)
    },
    doUploadLabelData(params) {
      return fetchPost('/api/label/create',params)
    },
    doUploadWorkData(params) {
      return fetchPost('/api/data/create',params)
    }
  }
}
</script>
<style scoped>
</style>