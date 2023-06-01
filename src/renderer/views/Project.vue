<template>
  <div id="content">
    <div style="height: 100px; width: 100%; position: fixed; z-index: 99">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div class="bigtitle_text_size main_text_color text_left">工程管理</div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button @click="needShowImportProjectView = true">导入工程</el-button>
            <el-button type="primary" @click="needShowNewProjectView = true">新建工程</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div style="height: 100px;flex-shrink: 0"></div>
    <!--  工程列表  -->
    <div class="project-warp margin_bottom_10 padding_0_10">
      <div v-for="(project, index) in projects" :key="project._id" class="project-warp-item margin_top_10">
        <el-card
            v-loading="isWorking && project.working "
                 :class="project['cloud']?'cloud_bg':''"
                 :shadow="project.working ? 'always' : 'hover'">
          <div slot="header" class="clearfix flex_row_allcenter">
            <div :class="project.working?'green_dot':'gray_dot'"></div>
            <div style="float: left"> {{project.name}}</div>
            <el-divider direction="vertical"></el-divider>
            <el-button :disabled="project.working || (!project.init&&project.cloud===1)"
                       type="text"
                       @click="activeProject(project._id)">{{project.working ? '工作中' : '激活工程'}}
            </el-button>
            <div class="flex_1"></div>
            <el-button v-if="project['_id']==='-1'" disabled type="text"
                       @click="activeCloud(project)"
            >激活云服务</el-button>
            <el-button v-else-if="!project['cloud']" type="text"
                       @click="activeCloud(project)"
            >激活云服务</el-button>
            <el-button v-else
                       type="text"
            >
              <img v-if="project.init" src="../assets/cloud_icon.png" width="16">
              <img v-else src="../assets/cloud_icon.png" style="filter: grayscale(80%)" width="16">
            </el-button>
          </div>
          <!--描述内容-->
          <div class="margin_0_10 padding_10 description_text_color description_text_size"
               style="background-color: #f5f5f5;border-radius: 5px">{{project.description}}
          </div>
          <div class="h10"></div>
         <!-- 判断云服务是否初始化 -->
         <template v-if="!project['cloud'] || project['init']">
           <div class="project_info flex_col">
             <!--标注总进度-->
             <el-row>
               <el-col>
                 <el-progress v-if="project.working" :percentage="getPercentage(project)"></el-progress>
                 <el-progress v-else :percentage="getPercentage(project)" color="#999999"></el-progress>
               </el-col>
             </el-row>
             <div class="h10"></div>
             <el-row v-if="project.num">
               <el-col :span="8">
                 <div>数据统计:</div>
               </el-col>
               <el-col :span="14">
                 <div>
                   <span>{{project.num.marked}}/
                     <span :class="project.num.total===0?'warnning_num':''">{{project.num.total}}</span>
                   </span>
                   <el-tooltip class="item" content="已完成数/总数" effect="dark" placement="top">
                     <i class="el-icon-question description_text_color"></i>
                   </el-tooltip>
                 </div>
               </el-col>
             </el-row>
             <div class="h10"></div>
             <!--标注类型-->
             <el-row>
               <el-col :span="8">
                 <div>标注类型:</div>
               </el-col>
               <el-col :span="15">
                 <el-collapse value="1">
                   <el-collapse-item :title="getMarkTypeString(project)">
                     <el-row v-if="project.markTypeName">
                       <el-col :span="6">
                         <div>实体标注</div>
                       </el-col>
                       <el-col :span="16">
                         <el-tag effect="light" type="info">
                           {{project.markTypeName}}
                         </el-tag>
                       </el-col>
                     </el-row>
                     <el-row v-if="project.globalTypeName">
                       <div class="h10"></div>
                       <el-col :span="6">
                         <div>分类标注</div>
                       </el-col>
                       <el-col :span="16">
                         <el-tag effect="light" type="info">{{
                             getMaxString(project.globalTypeName) || '-'
                           }}
                         </el-tag>
                       </el-col>
                     </el-row>
                     <el-row v-if="project.relationTypeName">
                       <div class="h10"></div>
                       <el-col :span="6">
                         <div>关系标注</div>
                       </el-col>
                       <el-col :span="16">
                         <el-tag effect="light" type="info">{{
                             getMaxString(project.relationTypeName) || '-'
                           }}
                         </el-tag>
                       </el-col>
                     </el-row>
                     <el-row v-if="project.dialogueTypeName">
                       <div class="h10"></div>
                       <el-col :span="6">
                         <div>对话标注</div>
                       </el-col>
                       <el-col :span="16">
                         <el-tag effect="light" type="info">{{
                             getMaxString(project.dialogueTypeName) || '-'
                           }}
                         </el-tag>
                       </el-col>
                     </el-row>
                     <el-row v-if="project.translationName">
                       <div class="h10"></div>
                       <el-col :span="6">
                         <div>文本翻译</div>
                       </el-col>
                       <el-col :span="16">
                       </el-col>
                     </el-row>
                   </el-collapse-item>
                 </el-collapse>
               </el-col>
             </el-row>
             <div class="h10"></div>
             <template v-if="!project['cloud']">
               <!--数据来源-->
               <el-row>
                 <el-col :span="8">
                   <div>数据来源:</div>
                 </el-col>
                 <el-col :span="14">
                   <div class="flex_row_allcenter">
                     <div class="flex_1">
                       <el-tag v-if="!project.working"
                               effect="light"
                               type="info">{{getDatasetType(project.datasource_radio)}}
                       </el-tag>
                       <el-tag v-else effect="light">{{getDatasetType(project.datasource_radio)}}</el-tag>
                     </div>
                     <span v-show="project.datasource_radio==='3'" class="description_text_color">
                       <el-tooltip class="item"
                                   content="Mysql数据服务需要用户事先定义数据，具体步骤请在帮助中心查看！"
                                   effect="dark"
                                   placement="left">
                         <i class="el-icon-info"></i>
                       </el-tooltip>
                     </span>
                   </div>
                 </el-col>
               </el-row>
               <div class="h5"></div>
               <el-row v-if="project.datasource_radio && (project.datasource_radio==='3' || project.datasource_radio==='4')">
                 <el-col :span="8">
                   <div>开启数据同步:</div>
                 </el-col>
                 <el-col :span="14">
                   <el-switch
                       :disabled="!project.working"
                       :value="project.dataSync||false"
                       @change="onDataSyncChange($event,project)"
                   >
                   </el-switch>
                 </el-col>
               </el-row>
               <div class="h5"></div>
               <!--mysql-->
               <el-row v-if="project.dataSync && project.datasource_radio && project.datasource_radio==='3'">
                 <el-col :offset="8" :span="16">
                   <div class="flex_row_allcenter">
                     <el-button-group>
                       <el-button :disabled="!project.working"
                                  icon="el-icon-download"
                                  round
                                  size="medium"
                                  type=""
                                  @click="onSyncMysqlToLocalClick(project)">同步到本地
                       </el-button>
                       <el-button :disabled="!project.working"
                                  icon="el-icon-upload"
                                  round
                                  size="medium"
                                  type=""
                                  @click="onSyncToMysqlServerClick(project)">上传到远端
                       </el-button>
                     </el-button-group>
                   </div>
                   <div class="h5"></div>
                   <div class="flex_col minititle_text_size description_text_color">
                     <div class="flex_row_allcenter">
                       <span>上次同步到本地时间：{{project.dataSyncToLocalTime ? doDateFromNow(project.dataSyncToLocalTime) : '-'}}</span>
                       <el-divider direction="vertical"></el-divider>
                       <span>数量：{{project.dataSyncToLocalNum || '-'}}</span>
                     </div>
                     <div class="flex_row_allcenter">
                       <span>上次上传到远端时间：{{project.dataSyncToRemoteTime ? doDateFromNow(project.dataSyncToRemoteTime) : '-'}}</span>
                       <el-divider direction="vertical"></el-divider>
                       <span>数量：{{project.dataSyncToRemoteNum || '-'}}</span>
                     </div>
                   </div>
                 </el-col>
               </el-row>
               <!--mongodb-->
               <el-row v-if="project.dataSync && project.datasource_radio && project.datasource_radio==='4'">
                 <el-col :offset="8" :span="16">
                   <div class="flex_row_allcenter">
                     <el-button-group>
                       <el-button :disabled="!project.working"
                                  icon="el-icon-download"
                                  round
                                  size="medium"
                                  type=""
                                  @click="onSyncMongoDBToLocalClick(project)">同步到本地
                       </el-button>
                       <el-button :disabled="!project.working"
                                  icon="el-icon-upload"
                                  round
                                  size="medium"
                                  type=""
                                  @click="onSyncToMongoDBServerClick(project)">上传到远端
                       </el-button>
                     </el-button-group>
                   </div>
                   <div class="h5"></div>
                   <div class="flex_col minititle_text_size description_text_color">
                     <div class="flex_row_allcenter">
                       <span>上次同步到本地时间：{{project.dataSyncToLocalTime ? doDateFromNow(project.dataSyncToLocalTime) : '-'}}</span>
                       <el-divider direction="vertical"></el-divider>
                       <span>数量：{{project.dataSyncToLocalNum || '-'}}</span>
                     </div>
                     <div class="flex_row_allcenter">
                       <span>上次上传到远端时间：{{project.dataSyncToRemoteTime ? doDateFromNow(project.dataSyncToRemoteTime) : '-'}}</span>
                       <el-divider direction="vertical"></el-divider>
                       <span>数量：{{project.dataSyncToRemoteNum || '-'}}</span>
                     </div>
                   </div>
                 </el-col>
               </el-row>
               <div class="h10"></div>
             </template>
             <div class="h10"></div>
             <el-row>
               <el-col :span="8">
                 <div>创建时间:</div>
               </el-col>
               <el-col :span="14">
                 <div class="normal_text_size normal_text_color">{{project.created_at}}</div>
               </el-col>
             </el-row>
             <div class="h10"></div>
             <el-row>
               <el-col :span="8">
                 <div>修改时间:</div>
               </el-col>
               <el-col :span="14">
                 <div class="normal_text_size normal_text_color">{{project.updated_at}}</div>
               </el-col>
             </el-row>
             <template v-if="project['cloud']">
               <el-divider></el-divider>
               <!--团队成员-->
               <el-row type="flex">
                 <el-col :span="24">
                   <div class="flex_row align_center padding_10" style="background-color: #f5f5f5;border-radius: 5px;overflow: auto">
                     <div class="flex_1 flex_row align_center">
                       <div v-for="(member,index) in project.members" :key="index" class="member_avatar">
                         <el-badge v-if="member.status===MEMBER_STATUS.NORMAL" class="member_avatar_badge" is-dot type="success"> <i v-if="member.role === ROLE.MANAGER" class="member_owner el-icon-star-on"></i> <el-avatar  :src="BASE_URL+member.avatar"></el-avatar></el-badge>
                         <el-badge v-else-if="member.status===MEMBER_STATUS.REJECT" class="member_avatar_badge" is-dot type="danger"><el-avatar  :src="BASE_URL+member.avatar"></el-avatar></el-badge>
                         <el-badge v-else class="member_avatar_badge" is-dot type="warning"><el-avatar  :src="BASE_URL+member.avatar"></el-avatar></el-badge>
                       </div>
                       <span v-if="project.project_owner_id === user_id" class="member_add_icon" @click="addMemberToProject(project)"><img src="../assets/member_add.png" width="18"></span>
                       <span v-else class="member_add_icon" @click="exitMemberToProject(project)"><img src="../assets/member_exit.png" width="18"></span>
                     </div>
                     <span class="description_text_color padding_10">
                       <!--<i class="el-icon-more"></i>-->
                     </span>
                   </div>
                 </el-col>
               </el-row>
             </template>
             <el-divider></el-divider>
             <div class="flex_row">
               <el-button-group >
                 <el-button v-if="!project['cloud']||(project['cloud']&&project.project_owner_id===user_id)" icon="el-icon-edit" size="medium" type="" @click="editProject(project)">修改</el-button>
                 <el-button icon="el-icon-delete" size="medium" type="" @click="deleteProject(project)">删除</el-button>
               </el-button-group>
               <div class="flex_1"></div>
               <el-button v-if="!project['cloud']" :loading="isSaving" size="medium" @click="exportProject(project)">导出工程</el-button>
               <el-button size="medium" type="primary" @click="exportResult(project)">导出结果</el-button>
             </div>
           </div>
         </template>
          <template v-else>
            <div class="wait_init flex_col_allcenter" style="height: 328px;">
              <div class="flex_1"></div>
              <span class="title_text_size normal_text_color">云服务未初始化！</span>
              <span class="h10"></span>
              <span class="description_text_size description_text_color">请点击初始化按钮，将数据同步到本地。</span>
              <span class="h30"></span>
              <el-button :loading="project.loading"  round type="primary" @click="doInitCloudProject(project,index)"><i class="el-icon-sunset"/> 初始化</el-button>
              <div class="flex_1"></div>
              <div class="flex_row width_100">
                <el-button icon="el-icon-delete" size="medium" type="" @click="deleteProject(project)">删除</el-button>
                <div class="flex_1"></div>
              </div>

            </div>
          </template>
        </el-card>
      </div>
    </div>
    <!--新建工程弹框-->
    <NewProject :show-dialog="needShowNewProjectView"
                @cancelButtonClick="(needShowNewProjectView = false) && (project = {})"></NewProject>
    <!--导入工程弹框-->
    <ImportProject :show-dialog="needShowImportProjectView"
                   @cancelButtonClick="(needShowImportProjectView = false) && (project = {})"></ImportProject>
    <!--编辑工程弹框-->
    <EditProject :project="project"
                 :show-dialog="needShowEditProjectView"
                 @cancelButtonClick="(needShowEditProjectView = false) && (project = {})"></EditProject>
    <!--  导出工程数据 -->
    <ExprotProject :project="project"
                   :show-dialog="needShowExportView"
                   @cancelButtonClick="(needShowExportView = false) && (project = {})"></ExprotProject>
    <!--  激活云服务-->
    <CloudProject :project="project"
                  :show-dialog="needShowCloudProjectView"
                  @cancelButtonClick="(needShowCloudProjectView = false) && (project = {})"
                  @syncFinish="syncCloudProjectFinished"
    ></CloudProject>
  <!-- 添加成员 -->
    <ProjectMember
        v-if="project"
        :prop_project="project"
        :show-dialog="needShowProjectMemberView"
        @cancelButtonClick="needShowProjectMemberView = false"></ProjectMember>

  </div>
</template>
<script>
import FileSaver from 'file-saver'
import CloudProject from '../components/project/CloudProject'
import EditProject from '../components/project/EditProject'
import ExprotProject from '../components/project/ExprotProject'
import ImportProject from '../components/project/ImportProject'
import NewProject from '../components/project/NewProject'
import ProjectMember from '../components/project/ProjectMember'
import {Cons} from '../Constant'
import {HTTP} from '../libs/axiosService'
import date_utils from '../libs/date_utils'
import db_utils from '../libs/db_utils'
import MongoHelper from '../libs/mongoHelper'
import DBHelper from '../libs/mysqlHelper'
import {getCloudProjectLabels, getCloudProjectMembers, getNumFromProject} from '../libs/project_utils'
import {
  doDownloadProjectBasic,
  doDownloadProjectData,
  doDownloadProjectLabel,
  doDownloadProjectMembers
} from '../libs/sync_utils'

export default {
  name: 'Project',
  components: {
    ProjectMember,
    CloudProject,
    ImportProject,
    EditProject,
    ExprotProject,
    NewProject
  },
  data() {
    return {
      projects: [],
      project: {}, //编辑时临时保存
      search: '',
      needShowNewProjectView: false,
      needShowEditProjectView: false,
      needShowImportProjectView: false,
      needShowCloudProjectView: false,
      needShowExportView: false,
      needShowProjectMemberView: false,
      isSaving: false,//是否正在导出
      isWorking: false,//是否在处理数据或其他耗时任务
      BASE_URL:Cons.BASE_URL+'/storage/',
      MEMBER_STATUS:Cons.MEMBER_STATUS,
      ROLE:Cons.MEMBER_ROLE,
      // ────────────────────────── 分割线  ──────────────────────────
      Listeners:[]
    }
  },
  mounted() {
    console.log('Project mounted')
    this.initEvent()
    this.initData()
  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // WS_CONNECT_SUCCESS
      const WS_CONNECT_SUCCESS_listener = () => {
        // 连上了ws服务
        this.initData()
      }
      // 数据库初始化完毕,一般在mounted后
      const DB_INIT_FINISH_listener = (text) => {
        this.initData()
      }
      // 新建工程成功
      const NEW_PROJECT_SUCESS_listener =  (_id) => {
        // 刷新工程列表
        this.initData()
        // 自由处理是否激活工程
        this.$confirm('新建工程成功,是否现在激活工程?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              this.activeProject(_id)
            })
            .catch(() => {
            })
      }
      // 修改工程成功
      const EDIT_PROJECT_SUCESS_listener = () => {
        this.initData()
      }
      // PROJECT_IINVITATION_ACCEPTED_listener
      // 用户接收邀请，更新成员信息
      const PROJECT_IINVITATION_ACCEPTED_listener = ()=>{
        this.initData()
      }
      this.Listeners = [
          ['WS_CONNECT_SUCCESS',WS_CONNECT_SUCCESS_listener],
          ['DB_INIT_FINISH',DB_INIT_FINISH_listener],
          ['NEW_PROJECT_SUCESS',NEW_PROJECT_SUCESS_listener],
          ['EDIT_PROJECT_SUCESS',EDIT_PROJECT_SUCESS_listener],
          ['PROJECT_IINVITATION_ACCEPTED',PROJECT_IINVITATION_ACCEPTED_listener],
      ]
      this.addEventListener(this.Listeners)
    },
     initData() {
       db_utils.pureFind(db_utils.PROJECTS_DB, {user_id: {$exists: false}})
              .sort({
                working: -1,
                updated_at: -1
              })
              .exec((err, documents) => {
                this.projects = documents
                // 已登录用户
                if (this.user_id) {
                  db_utils.pureFind(db_utils.PROJECTS_DB, {user_id: this.user_id})
                          .sort({
                            cloud: -1,
                            working: -1,
                            updated_at: -1
                          })
                          .exec((err, documents) => {
                            for (const document of documents) {
                              this.projects.unshift(document)
                            }
                            // 获取项目进度,获取项目标签组,获取项目成员信息
                            this.doGetProjectExtraInfo()

                          })
                }else {
                  // 获取项目进度,获取项目标签组
                  this.doGetProjectExtraInfo()
                }

              })


    },
    // ────────────────────────── UI Activity ──────────────────────────
    // 获取进度百分比
     getPercentage(project) {
      if (project.num && project.num.total) {
        return Math.floor((project.num.marked * 100) / project.num.total)
      }
      else {
        return 0
      }
    },
    // 获取数据源类型字符串
    getDatasetType(type) {
      if (!type) {
        return '本地文件'
      }
      else {
        if (type === '1') {
          return '本地文件'
        }
        else if (type === '2') {
          return '远程文件'
        }
        else if (type === '3') {
          return 'MySQL'
        }
        else if (type === '4') {
          return 'MongoDB'
        }
      }
    },
    // ────────────────────────── / 分割线 ──────────────────────────
    // 激活云服务
    activeCloud(project) {
      this.project = project
      // 首次激活,提示初始化
      this.needShowCloudProjectView = true
      // project 新增 cloud字段,上传基本信息,上传标注信息
    },
    // 激活工程
    activeProject(_id) {
      db_utils.update(db_utils.PROJECTS_DB, {working: true}, {$set: {working: false}}, true)
      db_utils.update(db_utils.PROJECTS_DB, {_id: _id}, {$set: {working: true}}, true)
      this.initData()
      // 激活成功,打开工作台
      this.$events.emit('OPEN_DASHBOARD')
    },
    // 导出工程
    exportProject(project) {
      // 从数据库读取工程信息,工程数据信息,工程标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, {_id: project._id}, (err, document) => {
        if (document) {
          let projectMarkType,
              projectRelationType,
              projectGlobalType,
              projectDialogueType
          // 是否需要加载了实体标注标签组
          if (project.markTypeName) {
            db_utils.findOne(db_utils.LABELS_DB, {_id: project.markTypeId}, (err, document) => {
              projectMarkType = Object.freeze(document)
            })
          }
          // 是否需要加载了关系标注标签组
          if (project.relationTypeName) {
            db_utils.findOne(db_utils.LABELS_DB, {_id: project.relationTypeId}, (err, document) => {
              projectRelationType = Object.freeze(document)
            })
          }
          // 是否需要加载了分类标签组
          if (project.globalTypeName) {
            db_utils.findOne(db_utils.LABELS_DB, {_id: project.globalTypeId}, (err, document) => {
              projectGlobalType = Object.freeze(document)
            })
          }
          // 是否需要加载了对话标签组
          if (project.dialogueTypeName) {
            db_utils.findOne(db_utils.LABELS_DB, {_id: project.dialogueTypeId}, (err, document) => {
              projectDialogueType = Object.freeze(document)
            })
          }
          db_utils.find(db_utils.DATAS_DB, {project_id: project._id}, (err, documents) => {
            let exportData = {
              project: document,
              datas: documents,
              projectMarkType,
              projectRelationType,
              projectGlobalType,
              projectDialogueType
            }
            this.saveProjectJson(exportData)
          })
        }
      })
    },
    // 导出工程-保存成JSON
    saveProjectJson(exportData) {
      if (this.isSaving) {
        this.showLocalNotification('正在导出,请稍后...')
        return
      }
      this.isSaving = true
      // 将json转换成字符串
      const data = JSON.stringify(exportData)
      const blob = new Blob([data], {type: ''})
      this.showLocalNotification('导出成功!')
      FileSaver.saveAs(blob, exportData.project.name + '.project')
      this.isSaving = false
    },
    // 编辑工程
    editProject(project) {
      this.project = project
      this.needShowEditProjectView = true
    },
    // 删除工程
    deleteProject(project) {
      if (project.cloud && project.init && project.project_owner_id === this.user_id){
        this.$confirm('此操作将删除该工程，云服务数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'danger'
            })
            .then(() => {
                // 在线删除项目后离线删除项目
                HTTP.before(() => {
                      project.working = true
                    })
                    .post('/api/project/delete', {
                      project_id: project.project_id,
                      project_owner_id: project.project_owner_id,
                    }).then(res=>{
                  db_utils.remove(db_utils.PROJECTS_DB, {_id: project.project_id})
                  db_utils.remove(db_utils.LABELS_DB, {project_id: project.project_id})
                  db_utils.remove(db_utils.DATAS_DB, {project_id: project.project_id})
                  db_utils.remove(db_utils.MEMBERS_DB, {project_id: project.project_id})
                  db_utils.remove(db_utils.SYNCLOGS_DB, {project_id: project.project_id})
                  this.showLocalNotification('项目已删除','success')
                  this.initData()//重新加载数据
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
                offset: 70
              })
            })

      }else {
        this.$confirm('此操作将删除该工程,本地数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'danger'
            })
            .then(() => {
              db_utils.remove(db_utils.PROJECTS_DB, {_id: project._id})
              db_utils.remove(db_utils.LABELS_DB, {_id: project._id})
              db_utils.remove(db_utils.DATAS_DB, {project_id: project._id})
              // 本地项目没有下面两项
              //db_utils.remove(db_utils.MEMBERS_DB, {project_id: project._id})
              //db_utils.remove(db_utils.SYNCLOGS_DB, {project_id: project.project_id})

              this.$message({
                type: 'success',
                message: '删除成功!',
                offset: 70
              })
              this.initData()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
                offset: 70
              })
            })
      }

    },
    // 导出结果
    exportResult(project) {
      this.project = project
      this.needShowExportView = true
    },
    // 添加成员
    addMemberToProject(project) {
      this.project = project
      this.needShowProjectMemberView = true
    },
    // 成员退出
    exitMemberToProject(project){
      this.$confirm('您将离开此工程，并删除此工程本地数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定离开此项目
        HTTP.before(()=>{
         this.isWorking = true
        }).post('/api/member/quitMember',{
          'project_id':project.project_id,
          'project_owner_id':project.project_owner_id
        }).then(res=>{
          // 本地清理project label datas
          db_utils.remove(db_utils.PROJECTS_DB,{'project_id':project.project_id})
          db_utils.remove(db_utils.LABELS_DB,{'project_id':project.project_id})
          db_utils.remove(db_utils.DATAS_DB,{'project_id':project.project_id})
          db_utils.remove(db_utils.MEMBERS_DB,{'project_id':project.project_id})
          db_utils.remove(db_utils.SYNCLOGS_DB, {project_id: project.project_id})

          this.$events.emit('EDIT_PROJECT_SUCESS')
          // 关闭了工程,需要退出聊天群组
          this.$events.emit('PROJECT_CLOSED',project.project_id,project.user_id,this.user_id)

        }).finally(()=>{
          this.isWorking = false
        })

      }).catch(() => {
      });
    },
    // unused 初始化远端数据库（还原清空）
    onInitMysqlClick(projectForm) {
      this.$confirm('此操作将清空"远端数据库", 操作成功后请按要求填充数据库后,选择[数据下载]同步到本地,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
            connection.connect((err) => {
              // in case of error
              if (err) {
                this.$message.error(err)
              }
              else {
                // 先 drop 再 create
                const drop_str = `DROP TABLE IF EXISTS ${projectForm.datasource_info.table}`
                const create_str = `CREATE TABLE IF NOT EXISTS ${projectForm.datasource_info.table} (_id INT PRIMARY KEY AUTO_INCREMENT, project_id int, _index text, content text NOT NULL, wrong int(1) DEFAULT 0,status int(1) DEFAULT 0,tags json,relations json,dialogue json, globalTypeId text, unique index project_index(project_id), index d_index(_index(5))) engine=InnoDB`
                connection.query(drop_str, (err, result) => {
                  if (err) {
                    this.$message.error(err)
                  }
                  else {
                    connection.query(create_str, (err, result) => {
                      if (err) {
                        this.$message.error(err)
                      }
                      else {
                        this.$message.success('初始化成功!请按要求填充数据库!')
                      }
                    })
                  }
                })
              }
            })
          })
          .catch(() => {
          })
    },
    // 数据同步修改
    onDataSyncChange(value, project) {
      db_utils.update(db_utils.PROJECTS_DB, {_id: project._id}, {$set: {dataSync: value}}, true)
      this.initData()
    },
    // 点击同步到远端MySQL
    onSyncToMysqlServerClick(projectForm) {
      this.$confirm(`本次操作将覆盖 ${projectForm.datasource_info.host} 数据库 ${projectForm.datasource_info.database} 表 ${projectForm.datasource_info.table}  "远端数据"! 是否继续?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.isWorking = true
            let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
            connection.connect((err) => {
              // in case of error
              if (err) {
                this.$message.error(err)
                this.isWorking = false
              }
              else {
                this.$message.success('数据库连接成功!')
                //      将本地数据写入远程
                db_utils.find(db_utils.DATAS_DB, {project_id: projectForm._id}, (err, documents) => {
                  if (err) {
                    this.$message.error(err)
                    this.isWorking = false
                  }
                  else {
                    //  datas: documents, 转换成mysql能识别的数据类型
                    let datas_values = documents.map(document => {
                      return [document.project_id, document.created_at, document.updated_at, document.index, document.content, document.wrong, document.status, JSON.stringify(document.tags), JSON.stringify(document.relations), JSON.stringify(document.dialogue), document.globalTypeId]
                    })
                    this.$confirm(`本次操作将本地数据库 ${datas_values.length} 条数据，覆盖远端数据库 ，是否继续？`, '再次提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        })
                        .then(() => {
                          // 先 drop 再 create 再 insert
                          const drop_sql = `DROP TABLE IF EXISTS ${projectForm.datasource_info.table}`
                          const create_sql = `CREATE TABLE IF NOT EXISTS ${projectForm.datasource_info.table} (_id INT PRIMARY KEY AUTO_INCREMENT, project_id text, created_at text,updated_at text,_index text, content text NOT NULL, wrong int(1) DEFAULT 0,status int(1) DEFAULT 0,tags json,relations json,dialogue json, globalTypeId text, index project_index(project_id(11)), index d_index(_index(5))) engine=InnoDB`
                          let insert_sql = `INSERT IGNORE INTO ${projectForm.datasource_info.table}(project_id,created_at,updated_at,_index, content,wrong,status,tags,relations,dialogue,globalTypeId) VALUES ?`
                          // 1.drop table
                          connection.query(drop_sql, (err, result) => {
                            if (err) {
                              this.$message.error(err)
                              this.isWorking = false
                            }
                            else {
                              this.$message.warning('数据库表初始化成功!')
                              // 2.create table
                              connection.query(create_sql, (err, result) => {
                                if (err) {
                                  this.$message.error(err)
                                  this.isWorking = false
                                }
                                else {
                                  this.$message.success('数据库重建成功!正在处理数据...')
                                  // 3.insert table
                                  connection.query(insert_sql, [datas_values], (err, result) => {
                                    if (err) {
                                      this.$message.error(err)
                                      this.isWorking = false
                                    }
                                    else {
                                      // 导入结束
                                      this.$message.success('本地数据上传成功!')
                                      this.isWorking = false
                                      db_utils.update(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                                        $set: {
                                          dataSyncToRemoteTime: date_utils.dateNow(),
                                          dataSyncToRemoteNum: datas_values.length
                                        }
                                      }, true)
                                      this.initData()
                                      console.log('INSERT SUCCESS')
                                    }
                                  })
                                }
                              })
                            }
                          })
                        })
                        .catch(() => {
                          this.isWorking = false
                        })
                  }
                })
              }
            })
          })
          .catch(() => {
            this.isWorking = false
          })
    },
    // 点击同步到本地MySQL
    onSyncMysqlToLocalClick(projectForm) {
      if (!projectForm.dataSyncToRemoteTime) {
        this.$message.warning('请先将本地数据同步到远程!')
        return
      }
      this.$confirm(`本次操作将覆盖本地数据库 ! 是否继续?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.isWorking = true
            let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
            connection.connect((err) => {
              // in case of error
              if (err) {
                this.$message.error(err)
                this.isWorking = false
              }
              else {
                this.$message.success('数据库连接成功!')
                // 读取数据
                const select_str = `SELECT project_id,created_at,updated_at,_index,content,wrong,status,tags,relations,dialogue,globalTypeId FROM ${projectForm.datasource_info.table} WHERE project_id='${projectForm._id}' ORDER BY _index ASC`
                connection.query(select_str, (err, results) => {
                  if (err) {
                    this.$message.error(err)
                    this.isWorking = false
                  }
                  else {
                    this.$confirm(`本次操作将远端数据库 ${results.length} 条数据，覆盖本地数据库，是否继续？`, '再次提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        })
                        .then(() => {
                          // 执行覆盖本地操作
                          // 先删除本地记录
                          const remote_results = results
                          db_utils.remove(db_utils.DATAS_DB, {project_id: projectForm._id}, (err) => {
                            if (err) {
                              this.$message.error(err)
                              this.isWorking = false
                            }
                            else {
                              let datas = []
                              let markedNum = 0
                              remote_results.forEach((content, index) => {
                                try {
                                  let _data = content
                                  _data.project_id = projectForm._id
                                  _data.index = index
                                  _data.tags = JSON.parse(_data.tags) || []
                                  _data.relations = JSON.parse(_data.relations) || []
                                  _data.dialogue = JSON.parse(_data.dialogue) || {
                                    separator: '',
                                    datas: []
                                  }
                                  datas.push(_data)
                                  // 1 表示标注完成
                                  if (content.status === 1) {
                                    markedNum = markedNum + 1
                                  }
                                }
                                catch (e) {
                                  console.log(e)
                                }
                              })
                              db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
                                if (err) {
                                  this.$message.error(err)
                                  this.isWorking = false
                                }
                                else {
                                  this.$message.success('远端数据同步成功！')
                                  this.isWorking = false
                                  db_utils.update(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                                    $set: {
                                      dataSyncToLocalTime: date_utils.dateNow(),
                                      dataSyncToLocalNum: datas.length,
                                      currectDataIndex: 0,
                                      num: {
                                        total: datas.length,
                                        marked: markedNum
                                      }
                                    }
                                  }, true)
                                  this.initData()
                                  console.log('INSERT SUCCESS')
                                }
                              })
                            }
                          })
                        })
                        .catch(() => {
                          this.isWorking = false
                        })
                  }
                })
              }
            })
          })
          .catch(() => {
            this.isWorking = false
          })
    },
    // 点击同步到远端MongoDB
    onSyncToMongoDBServerClick(projectForm) {
      this.$confirm(`本次操作将覆盖 MongoDB ${projectForm.datasource_info.host} 数据库 ${projectForm.datasource_info.database} 集合 ${projectForm.datasource_info.table}  "远端数据"! 是否继续?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.isWorking = true
            const db = new MongoHelper(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database, projectForm.datasource_info.table)
            db.getConn()
              .then((conn) => {
                console.log('数据库已连接')
                this.$message.success('数据库连接成功!')
                //      将本地数据写入远程
                db_utils.find(db_utils.DATAS_DB, {project_id: projectForm._id}, (err, documents) => {
                  if (err) {
                    this.$message.error(err)
                    this.isWorking = false
                  }
                  else {
                    //  datas: documents, 转换成mysql能识别的数据类型
                    let datas_values = documents
                    this.$confirm(`本次操作将本地数据库 ${datas_values.length} 条数据，覆盖远端MongoDB数据库 ，是否继续？`, '再次提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        })
                        .then(() => {
                          // 先 drop 再 create 再 insert
                          const table = conn.db(projectForm.datasource_info.database)
                                            .collection(projectForm.datasource_info.table)
                          table.drop()
                          table.insertMany(datas_values, (err, res) => {
                            if (err) {
                              this.$message.error(err)
                              this.isWorking = false
                            }
                            else {
                              console.log('插入的文档数量为: ' + res.insertedCount)
                              // 导入结束
                              this.$message.success('本地数据上传成功!')
                              this.isWorking = false
                              db_utils.update(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                                $set: {
                                  dataSyncToRemoteTime: date_utils.dateNow(),
                                  dataSyncToRemoteNum: datas_values.length
                                }
                              }, true)
                              this.initData()
                              console.log('INSERT SUCCESS')
                            }
                            conn.close()
                          })
                        })
                        .catch(() => {
                          this.isWorking = false
                        })
                  }
                })
              })
              .catch((err) => {
                this.db_err = err
                this.$message.error(err)
              })
          })
          .catch(() => {
            this.isWorking = false
          })
    },
    // 点击同步到本地MongoDB
    onSyncMongoDBToLocalClick(projectForm) {
      this.$confirm(`本次操作将覆盖本地数据库 ! 是否继续?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.isWorking = true
            const db = new MongoHelper(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database, projectForm.datasource_info.table)
            db.getConn()
              .then((conn) => {
                console.log('数据库已连接')
                this.$message.success('数据库连接成功!')
                // 读取远程数据
                const table = conn.db(projectForm.datasource_info.database)
                                  .collection(projectForm.datasource_info.table)
                table.find()
                     .sort({index: 'asc'})
                     .toArray((err, results) => {
                       if (err) {
                         this.$message.error(err)
                         this.isWorking = false
                       }
                       else {
                         this.$confirm(`本次操作将远端数据库 ${results.length} 条数据，覆盖本地数据库，是否继续？`, '再次提示', {
                               confirmButtonText: '确定',
                               cancelButtonText: '取消',
                               type: 'warning'
                             })
                             .then(() => {
                               // 执行覆盖本地操作
                               // 先删除本地记录
                               const remote_results = results
                               db_utils.remove(db_utils.DATAS_DB, {project_id: projectForm._id}, (err) => {
                                 if (err) {
                                   this.$message.error(err)
                                   this.isWorking = false
                                 }
                                 else {
                                   let datas = []
                                   let markedNum = 0
                                   remote_results.forEach((content, index) => {
                                     try {
                                       let _data = content
                                       delete _data.id
                                       _data.project_id = projectForm._id
                                       _data.index = index
                                       datas.push(_data)
                                       // 1 表示标注完成
                                       if (content.status === 1) {
                                         markedNum = markedNum + 1
                                       }
                                     }
                                     catch (e) {
                                       console.log(e)
                                     }
                                   })
                                   db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
                                     if (err) {
                                       this.$message.error(err)
                                       this.isWorking = false
                                     }
                                     else {
                                       this.$message.success('远端数据同步成功！')
                                       this.isWorking = false
                                       db_utils.update(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                                         $set: {
                                           dataSyncToLocalTime: date_utils.dateNow(),
                                           dataSyncToLocalNum: datas.length,
                                           currectDataIndex: 0,
                                           num: {
                                             total: datas.length,
                                             marked: markedNum
                                           }
                                         }
                                       }, true)
                                       this.initData()
                                       console.log('INSERT SUCCESS')
                                     }
                                   })
                                 }
                               })
                             })
                             .catch(() => {
                               this.isWorking = false
                             })
                       }
                       conn.close()
                     })
              })
              .catch((err) => {
                this.db_err = err
                this.$message.error(err)
              })
          })
          .catch(() => {
            this.isWorking = false
          })
    },
    getMarkTypeString(project) {
      let str = ''
      if (project.markTypeName) {
        str += '实体标注 '
      }
      if (project.globalTypeName) {
        str += '分类标注 '
      }
      if (project.relationTypeName) {
        str += '关系标注 '
      }
      if (project.dialogueTypeName) {
        str += '对话标注 '
      }
      if (project.translationName) {
        str += '文本翻译 '
      }
      return str
    },
    syncCloudProjectFinished() {
      this.initData()
      this.needShowCloudProjectView = false
    },

    // 生成项目额外信息，项目进度，项目标签，项目成员
    doGetProjectExtraInfo() {
      // 获取项目进度,获取项目标签组
      for (let i = 0; i < this.projects.length; i++) {
        const project = this.projects[i]
        getNumFromProject(project).then(num=>{
          this.$set(this.projects[i],'num',num)
        }).catch(err=>
            console.log(err)
        )
        // 云服务(已初始化)
        if (project.cloud && project.init){
          // 格式化，本地转云标签
          getCloudProjectLabels(project.project_id).then(({projectForm})=>{
            this.$set(this.projects,i,{...project,...projectForm})
          })
          // 获取成员
          getCloudProjectMembers(project.project_id).then((members)=>{
            this.$set(this.projects[i],'members',members)
          })
          if (this.is_online){
            // 更新团队信息
            const request_param = {project_id:project.project_id,project_owner_id:project.project_owner_id,user_id:this.user_id}
            doDownloadProjectMembers(request_param).then(members=>{
              this.$set(this.projects[i],'members',members)
            })
          }

        }
      }
    },
      async doInitCloudProject(project,index) {
        project.loading = true
        this.projects.splice(index,1,project)
        //（下载工程信息，下载标注信息，下载数据信息,下载成员信息<写下载同步日志>）
        const params = {
          'project_id': project.project_id,
          'project_owner_id': project.project_owner_id,
          'user_id': this.user_id
        }
        let reject = null
        // 下载成员信息
         await doDownloadProjectMembers(params).catch(err=>{
           reject = err
         })
        if (reject){
          this.$message.error('数据异常：1')
          project.loading = false
          this.projects.splice(index,1,project)
          return
        }
        // 下载数据信息
        await doDownloadProjectData(params).catch(err=>{
          reject = err
        })
        if (reject){
          this.$message.error('数据异常：2')
          project.loading = false
          this.projects.splice(index,1,project)
          return
        }
        // 下载标注信息
        await doDownloadProjectLabel(params).catch(err=>{
          reject = err
        })
        if (reject){
          this.$message.error('数据异常：3')
          project.loading = false
          this.projects.splice(index,1,project)
          return
        }

        // 下载工程信息
        await doDownloadProjectBasic(params).catch(err=>{
          reject = err
        })
        if (reject){
          this.$message.error('数据异常：4')
          project.loading = false
          this.projects.splice(index,1,project)
          return
        }
        project.loading = false
        this.projects.splice(index,1,project)
        this.showLocalNotification('初始化成功')
        this.$events.emit('NEW_PROJECT_SUCESS',project._id)
      },


  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';

.darkmode--activated .member_avatar{
  mix-blend-mode: difference;
}

.el-avatar{
  background-color: transparent;
}

.project-warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    content: '';
    width: 32%;
  }

  .project-warp-item {
    width: 32%;
  }

  .warnning_num {
    color: #f56c6c;
  }

  .el-collapse {
    border: none;
  }

  /deep/ .el-collapse-item__header {
    color: #909399;
    background-color: transparent;
  }

  .cloud_bg {
    background-image: linear-gradient( rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1) ), url("../assets/cloud_bg.png")
  }

  .member_add_icon{
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: #b8b8b8;
    background-color: #f8f9fa;

  }
  .member_add_icon:hover{
    background-color: #d8d8d8;
  }


  .member_avatar +.member_avatar{
    margin-left: 5px;
  }

  .member_owner{
    position: absolute;
    top: -2px;
    z-index: 1;
    color: #f9c713;
  }

  /deep/ .el-badge__content.is-fixed.is-dot{
    top: 35px !important;
    right:10px !important;
  }

}

</style>
<style lang="scss">
.active_cloud_dialog {
  .el-dialog__body {
    padding: 0;
  }

  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>