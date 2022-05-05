<template>
  <div id="content">
    <div style="height: 100px; width: 100%; position: fixed; z-index: 99">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div style="font-size: 20px; color: #303133; text-align: left">工程管理</div>
            <div class="h10"></div>
            <div style="font-size: 14px; color: #909399; text-align: left">以工程的形式组织标注工作,让标注工作更加系统化,组织化,实际工作中也会更加有条理.</div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button @click="needShowImportProjectView = true">导入工程</el-button>
            <el-button type="primary" @click="needShowNewProjectView = true">新建工程</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div style="height: 100px"></div>
    <!--  工程列表  -->
    <div class="project-warp margin_bottom_10 padding_0_10">
      <div class="project-warp-item margin_top_10" v-for="(project, index) in projects" :key="index">
        <el-card :shadow="project.working ? 'always' : 'hover'" v-loading="isWorking && project.working ">
          <div slot="header" class="clearfix flex_row_allcenter">
            <div :class="project.working?'green_dot':'gray_dot'"></div>
            <div style="float: left"> {{ project.name }}</div>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="activeProject(project._id)"
                       type="text"
                       :disabled="project.working">{{ project.working ? '工作中' : '激活工程' }}
            </el-button>
            <div class="flex_1"></div>
            <el-button :loading="isSaving" size="medium" @click="exportProject(project)">导出工程</el-button>
          </div>
          <div class="project_info flex_col">
            <el-row>
              <el-col>
                <el-progress v-if="project.working" :percentage="getPercentage(project)"></el-progress>
                <el-progress v-else color="#999999" :percentage="getPercentage(project)"></el-progress>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <!--标注总进度-->
            <el-row>
              <el-col :span="8">
                <div>标注总进度:</div>
              </el-col>
              <el-col :span="14">
                <div>
                  <span>{{ project.num.marked }}/
                    <span :class="project.num.total===0?'warnning_num':''">{{ project.num.total }}</span>
                  </span>
                  <el-tooltip class="item" effect="dark" content="已完成/总数(数值为0,请检查数据)" placement="top">
                    <i class="el-icon-question description_text_color"></i>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <!--标签组-->
            <el-row>
              <el-col :span="6">
                <div>标签组:</div>
              </el-col>
              <el-col :span="18">
                <el-collapse value="1">
                  <el-collapse-item>
                    <el-row>
                      <el-col :span="6">
                        <div>实体标签组:</div>
                      </el-col>
                      <el-col :span="16">
                        <el-tag v-if="!project.working" type="info" effect="light">
                          {{ getMaxString(project.markTypeName) }}
                        </el-tag>
                        <el-tag v-else effect="light">
                          {{ getMaxString(project.markTypeName) }}
                        </el-tag>
                      </el-col>
                    </el-row>
                    <el-row v-if="project.globalTypeName">
                      <div class="h10"></div>
                      <el-col :span="6">
                        <div>分类标注组:</div>
                      </el-col>
                      <el-col :span="16">
                        <el-tag v-if="!project.working" type="info" effect="light">{{
                            getMaxString(project.globalTypeName) || '-'
                          }}
                        </el-tag>
                        <el-tag v-else effect="light">{{ getMaxString(project.globalTypeName) || '-' }}</el-tag>
                      </el-col>
                    </el-row>
                    <el-row v-if="project.relationTypeName">
                      <div class="h10"></div>
                      <el-col :span="6">
                        <div>关系标签组:</div>
                      </el-col>
                      <el-col :span="16">
                        <el-tag v-if="!project.working" type="info" effect="light">{{
                            getMaxString(project.relationTypeName) || '-'
                          }}
                        </el-tag>
                        <el-tag v-else effect="light">{{ getMaxString(project.relationTypeName) || '-' }}</el-tag>
                      </el-col>
                    </el-row>
                    <el-row v-if="project.dialogueTypeName">
                      <div class="h10"></div>
                      <el-col :span="6">
                        <div>对话标签组:</div>
                      </el-col>
                      <el-col :span="16">
                        <el-tag v-if="!project.working" type="info" effect="light">{{
                            getMaxString(project.dialogueTypeName) || '-'
                          }}
                        </el-tag>
                        <el-tag v-else effect="light">{{ getMaxString(project.dialogueTypeName) || '-' }}</el-tag>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>数据源类型:</div>
              </el-col>
              <el-col :span="14">
                <div class="flex_row_allcenter">
                  <div class="flex_1">
                    <el-tag v-if="!project.working"
                            type="info"
                            effect="light">{{ getDatasetType(project.datasource_radio) }}
                    </el-tag>
                    <el-tag v-else effect="light">{{ getDatasetType(project.datasource_radio) }}</el-tag>
                  </div>
                  <span v-show="project.datasource_radio==='3'" class="description_text_color">
                    <el-tooltip class="item" effect="dark" content="Mysql数据服务需要用户事先定义数据，具体步骤请在帮助中心查看！" placement="left">
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
              <el-col :span="16" :offset="8">
                <div class="flex_row_allcenter">
                  <el-button-group>
                    <el-button :disabled="!project.working"
                               size="medium"
                               type=""
                               round
                               @click="onSyncMysqlToLocalClick(project)"
                               icon="el-icon-download">同步到本地
                    </el-button>
                    <el-button :disabled="!project.working"
                               size="medium"
                               type=""
                               round
                               @click="onSyncToMysqlServerClick(project)"
                               icon="el-icon-upload">上传到远端
                    </el-button>
                  </el-button-group>
                </div>
                <div class="h5"></div>
                <div class="flex_col minititle_text_size description_text_color">
                  <div class="flex_row_allcenter">
                    <span>上次同步到本地时间：{{ project.dataSyncToLocalTime ? doDateFromNow(project.dataSyncToLocalTime) : '-' }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>数量：{{ project.dataSyncToLocalNum || '-' }}</span>
                  </div>
                  <div class="flex_row_allcenter">
                    <span>上次上传到远端时间：{{ project.dataSyncToRemoteTime ? doDateFromNow(project.dataSyncToRemoteTime) : '-' }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>数量：{{ project.dataSyncToRemoteNum || '-' }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!--mongodb-->
            <el-row v-if="project.dataSync && project.datasource_radio && project.datasource_radio==='4'">
              <el-col :span="16" :offset="8">
                <div class="flex_row_allcenter">
                  <el-button-group>
                    <el-button :disabled="!project.working"
                               size="medium"
                               type=""
                               round
                               @click="onSyncMongoDBToLocalClick(project)"
                               icon="el-icon-download">同步到本地
                    </el-button>
                    <el-button :disabled="!project.working"
                               size="medium"
                               type=""
                               round
                               @click="onSyncToMongoDBServerClick(project)"
                               icon="el-icon-upload">上传到远端
                    </el-button>
                  </el-button-group>
                </div>
                <div class="h5"></div>
                <div class="flex_col minititle_text_size description_text_color">
                  <div class="flex_row_allcenter">
                    <span>上次同步到本地时间：{{ project.dataSyncToLocalTime ? doDateFromNow(project.dataSyncToLocalTime) : '-' }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>数量：{{ project.dataSyncToLocalNum || '-' }}</span>
                  </div>
                  <div class="flex_row_allcenter">
                    <span>上次上传到远端时间：{{ project.dataSyncToRemoteTime ? doDateFromNow(project.dataSyncToRemoteTime) : '-' }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>数量：{{ project.dataSyncToRemoteNum || '-' }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!--<el-row>-->
            <!--  <el-col :span="8">-->
            <!--    <div>数据来源:</div>-->
            <!--  </el-col>-->
            <!--  <el-col :span="14">-->
            <!--    <div style="word-break: break-all; white-space: normal">{{ project.dataFilePath }}</div>-->
            <!--  </el-col>-->
            <!--</el-row>-->
            <div class="h10"></div>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>创建时间:</div>
              </el-col>
              <el-col :span="14">
                <div class="normal_text_size normal_text_color">{{ project.created_at }}</div>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>修改时间:</div>
              </el-col>
              <el-col :span="14">
                <div class="normal_text_size normal_text_color">{{ project.updated_at }}</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="flex_row">
              <el-button-group>
                <el-button size="medium" type="" icon="el-icon-edit" @click="editProject(project)">编辑</el-button>
                <el-button size="medium" type="" icon="el-icon-delete" @click="deleteProject(project)">删除</el-button>
              </el-button-group>
              <div class="flex_1"></div>
              <el-button size="medium" type="primary" @click="exportResult(project)">导出结果</el-button>
            </div>
          </div>
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
    <EditProject :project-form="project"
                 :show-dialog="needShowEditProjectView"
                 @cancelButtonClick="(needShowEditProjectView = false) && (project = {})"></EditProject>
    <!--  导出工程数据 -->
    <ExprotProject v-show="project._id"
                   :show-dialog="needShowExportView"
                   :project="project"
                   @cancelButtonClick="needShowExportView = false"></ExprotProject>
  </div>
</template>
<script>
import db_utils      from '../libs/db_utils'
import NewProject    from '../components/NewProject'
import ExprotProject from '../components/ExprotProject'
import FileSaver     from 'file-saver'
import EditProject   from '../components/EditProject'
import ImportProject from '../components/ImportProject'
import DBHelper      from '../libs/mysqlHelper'
import date_utils    from '../libs/date_utils'
import MongoHelper   from '../libs/mongoHelper'

export default {
  name: 'Project',
  components: {
    ImportProject,
    EditProject,
    ExprotProject,
    NewProject,
  },
  data() {
    return {
      projects: [],
      project: {}, //编辑时临时保存
      search: '',
      needShowNewProjectView: false,
      needShowEditProjectView: false,
      needShowImportProjectView: false,
      needShowExportView: false,
      isSaving: false,//是否正在导出
      isWorking: false,//是否在处理数据或其他耗时任务
    }
  },
  mounted() {
    console.log('Project mounted')
    this.initEvent()
    this.initData()
  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // 新建工程成功
      this.$events.on('NEW_PROJECT_SUCESS', (project_id) => {
        // 刷新工程列表
        this.initData()
        // 自由处理是否激活工程
        this.$confirm('新建工程成功,是否现在激活工程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.activeProject(project_id)
        }).catch(() => {
        })
      })
      // 修改工程成功
      this.$events.on('EDIT_PROJECT_SUCESS', (project_id) => {
        this.initData()
      })
    },
    initData() {
      db_utils.generate_find(db_utils.PROJECTS_DB).sort({
        working: -1,
        updated_at: -1,
      }).exec((err, documents) => {
        this.projects = documents
      })
    },
    // ────────────────────────── UI Activity ──────────────────────────
    // 设置最大显示长度的字符串
    getMaxString(str) {
      return str.length > 30 ? str.substring(0, 29) + '...' : str
    },
    // 获取进度百分比
    getPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor((project.num.marked * 100) / project.num.total)
      } else {
        return 0
      }
    },
    // 将日期显示成距离最近多久
    doDateFromNow(date) {
      return date_utils.dateFromNow(date)
    },
    // 获取数据源类型字符串
    getDatasetType(type) {
      if (!type) {
        return '本地文件'
      } else {
        if (type === '1') {
          return '本地文件'
        } else if (type === '2') {
          return '远程文件'
        } else if (type === '3') {
          return 'MySQL'
        } else if (type === '4') {
          return 'MongoDB'
        }
      }
    },
    // ────────────────────────── / 分割线 ──────────────────────────
    // 激活工程
    activeProject(project_id) {
      db_utils.update_set(db_utils.PROJECTS_DB, {working: true}, {$set: {working: false}})
      db_utils.update_set(db_utils.PROJECTS_DB, {_id: project_id}, {$set: {working: true}})
      this.initData()
      // 激活成功,通知工作台刷新页面
      this.$events.emit('PROJECT_ACTIVE', '')
      this.$notify({
        title: '提示',
        message: '工程激活成功!',
        type: 'success',
      })
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
            db_utils.findOne(db_utils.MARK_TYPES_DB, {_id: project.markTypeId}, (err, document) => {
              projectMarkType = Object.freeze(document)
            })
          }
          // 是否需要加载了关系标注标签组
          if (project.relationTypeName) {
            db_utils.findOne(db_utils.RELATION_TYPES_DB, {_id: project.relationTypeId}, (err, document) => {
              projectRelationType = Object.freeze(document)
            })
          }
          // 是否需要加载了分类标注组
          if (project.globalTypeName) {
            db_utils.findOne(db_utils.GLOBAL_TYPES_DB, {_id: project.globalTypeId}, (err, document) => {
              projectGlobalType = Object.freeze(document)
            })
          }
          // 是否需要加载了对话标签组
          if (project.dialogueTypeName) {
            db_utils.findOne(db_utils.DIALOGUE_TYPES_DB, {_id: project.dialogueTypeId}, (err, document) => {
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
              projectDialogueType,
            }
            this.saveProjectJson(exportData)
          })
        }
      })
    },
    // 导出工程-保存成JSON
    saveProjectJson(exportData) {
      if (this.isSaving) {
        this.$notify({
          title: '导出工程',
          message: '正在导出,请稍后...',
          type: 'success',
        })
        return
      }
      this.isSaving = true
      // 将json转换成字符串
      const data = JSON.stringify(exportData)
      const blob = new Blob([data], {type: ''})
      this.$notify({
        title: '导出工程',
        message: '导出成功!',
        type: 'success',
      })
      FileSaver.saveAs(blob, exportData.project.name + '.project')
      this.isSaving = false
    },
    // 编辑工程
    editProject(project) {
      this.project = project
      this.needShowEditProjectView = true
    },
    // 导出结果
    exportResult(project) {
      this.project = project
      this.needShowExportView = true
    },
    // 删除工程
    deleteProject(project) {
      this.$confirm('此操作将永久删除该工程及其数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        db_utils.remove(db_utils.PROJECTS_DB, {_id: project._id}, {multi: true})
        db_utils.remove(db_utils.DATAS_DB, {project_id: project._id}, {multi: true})
        this.$message({
          type: 'success',
          message: '删除成功!',
          offset: 70,
        })
        this.initData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          offset: 70,
        })
      })
    },
    // unused 初始化远端数据库（还原清空）
    onInitMysqlClick(projectForm) {
      this.$confirm('此操作将清空"远端数据库", 操作成功后请按要求填充数据库后,选择[数据下载]同步到本地,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
        connection.connect((err) => {
          // in case of error
          if (err) {
            this.$message.error(err)
          } else {
            // 先 drop 再 create
            const drop_str = `DROP TABLE IF EXISTS ${projectForm.datasource_info.table}`
            const create_str = `CREATE TABLE IF NOT EXISTS ${projectForm.datasource_info.table} (_id INT PRIMARY KEY AUTO_INCREMENT, project_id int, _index text, content text NOT NULL, wrong int(1) DEFAULT 0,status int(1) DEFAULT 0,tags json,relations json,dialogue json, globalTypeId text, unique index project_index(project_id), index d_index(_index(5))) engine=InnoDB`
            connection.query(drop_str, (err, result) => {
              if (err) {
                this.$message.error(err)
              } else {
                connection.query(create_str, (err, result) => {
                  if (err) {
                    this.$message.error(err)
                  } else {
                    this.$message.success('初始化成功!请按要求填充数据库!')
                  }
                })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      })
    },
    // ────────────────────────── / database ──────────────────────────
    // 数据同步修改
    onDataSyncChange(value, project) {
      console.log(value)
      db_utils.update_set(db_utils.PROJECTS_DB, {_id: project._id}, {$set: {dataSync: value}})
      this.initData()
    },
    // 点击同步到远端MySQL
    onSyncToMysqlServerClick(projectForm) {
      this.$confirm(`本次操作将覆盖 ${projectForm.datasource_info.host} 数据库 ${projectForm.datasource_info.database} 表 ${projectForm.datasource_info.table}  "远端数据"! 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.isWorking = true
        let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
        connection.connect((err) => {
          // in case of error
          if (err) {
            this.$message.error(err)
            this.isWorking = false
          } else {
            this.$message.success('数据库连接成功!')
            //      将本地数据写入远程
            db_utils.find(db_utils.DATAS_DB, {project_id: projectForm._id}, (err, documents) => {
              if (err) {
                this.$message.error(err)
                this.isWorking = false
              } else {
                //  datas: documents, 转换成mysql能识别的数据类型
                let datas_values = documents.map(document => {
                  return [document.project_id, document.created_at, document.updated_at, document.index, document.content, document.wrong, document.status, JSON.stringify(document.tags), JSON.stringify(document.relations), JSON.stringify(document.dialogue), document.globalTypeId]
                })
                this.$confirm(`本次操作将本地数据库 ${datas_values.length} 条数据，覆盖远端数据库 ，是否继续？`, '再次提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(() => {
                  // 先 drop 再 create 再 insert
                  const drop_sql = `DROP TABLE IF EXISTS ${projectForm.datasource_info.table}`
                  const create_sql = `CREATE TABLE IF NOT EXISTS ${projectForm.datasource_info.table} (_id INT PRIMARY KEY AUTO_INCREMENT, project_id text, created_at text,updated_at text,_index text, content text NOT NULL, wrong int(1) DEFAULT 0,status int(1) DEFAULT 0,tags json,relations json,dialogue json, globalTypeId text, index project_index(project_id(11)), index d_index(_index(5))) engine=InnoDB`
                  let insert_sql = `INSERT IGNORE INTO ${projectForm.datasource_info.table}(project_id,created_at,updated_at,_index, content,wrong,status,tags,relations,dialogue,globalTypeId) VALUES ?`
                  // 1.drop table
                  connection.query(drop_sql, (err, result) => {
                    if (err) {
                      this.$message.error(err)
                      this.isWorking = false
                    } else {
                      this.$message.warning('数据库表初始化成功!')
                      // 2.create table
                      connection.query(create_sql, (err, result) => {
                        if (err) {
                          this.$message.error(err)
                          this.isWorking = false
                        } else {
                          this.$message.success('数据库重建成功!正在处理数据...')
                          // 3.insert table
                          connection.query(insert_sql, [datas_values], (err, result) => {
                            if (err) {
                              this.$message.error(err)
                              console.log(err)
                              this.isWorking = false
                            } else {
                              // 导入结束
                              this.$message.success('本地数据上传成功!')
                              this.isWorking = false
                              db_utils.update_set(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                                $set: {
                                  dataSyncToRemoteTime: date_utils.dateNow(),
                                  dataSyncToRemoteNum: datas_values.length,
                                },
                              })
                              this.initData()
                              console.log('INSERT SUCCESS')
                            }
                          })
                        }
                      })
                    }
                  })
                }).catch(() => {
                  this.isWorking = false
                  this.$message({
                    type: 'info',
                    message: '已取消',
                  })
                })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
        this.isWorking = false
      })
    },
    // 点击同步到本地MySQL
    onSyncMysqlToLocalClick(projectForm) {

      if (!projectForm.dataSyncToRemoteTime){
        this.$message.warning('请先将本地数据同步到远程!')
        return
      }


      this.$confirm(`本次操作将覆盖本地数据库 ! 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.isWorking = true
        let connection = new DBHelper().getConn(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database)
        connection.connect((err) => {
          // in case of error
          if (err) {
            this.$message.error(err)
            this.isWorking = false
          } else {
            this.$message.success('数据库连接成功!')
            // 读取数据
            const select_str = `SELECT project_id,created_at,updated_at,_index,content,wrong,status,tags,relations,dialogue,globalTypeId FROM ${projectForm.datasource_info.table} WHERE project_id='${projectForm._id}' ORDER BY _index ASC`
            connection.query(select_str, (err, results) => {
              if (err) {
                this.$message.error(err)
                console.log(err)
                this.isWorking = false
              } else {
                this.$confirm(`本次操作将远端数据库 ${results.length} 条数据，覆盖本地数据库，是否继续？`, '再次提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(() => {
                  // 执行覆盖本地操作
                  // 先删除本地记录
                  const remote_results = results
                  db_utils.remove(db_utils.DATAS_DB, {project_id: projectForm._id}, {multi: true}, (err) => {
                    if (err) {
                      this.$message.error(err)
                      console.log(err)
                      this.isWorking = false
                    } else {
                      console.log(remote_results)
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
                            datas: [],
                          }
                          datas.push(_data)
                          // 1 表示标注完成
                          if (content.status === 1) {
                            markedNum = markedNum + 1
                          }
                        } catch (e) {
                          console.log(e)
                        }
                      })
                      db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
                        if (err) {
                          this.$message.error(err)
                          console.log(err)
                          this.isWorking = false
                        } else {
                          this.$message.success('远端数据同步成功！')
                          this.isWorking = false
                          db_utils.update_set(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                            $set: {
                              dataSyncToLocalTime: date_utils.dateNow(),
                              dataSyncToLocalNum: datas.length,
                              currectDataIndex: 0,
                              num: {
                                total: datas.length,
                                marked: markedNum,
                              },
                            },
                          })
                          this.initData()
                          console.log('INSERT SUCCESS')
                        }
                      })
                    }
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消',
                  })
                  this.isWorking = false
                })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
        this.isWorking = false
      })
    },
    // 点击同步到远端MongoDB
    onSyncToMongoDBServerClick(projectForm) {
      this.$confirm(`本次操作将覆盖 MongoDB ${projectForm.datasource_info.host} 数据库 ${projectForm.datasource_info.database} 集合 ${projectForm.datasource_info.table}  "远端数据"! 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.isWorking = true
        const db = new MongoHelper(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database, projectForm.datasource_info.table)
        db.getConn().then((conn) => {
          console.log('数据库已连接')
          this.$message.success('数据库连接成功!')
          //      将本地数据写入远程
          db_utils.find(db_utils.DATAS_DB, {project_id: projectForm._id}, (err, documents) => {
            if (err) {
              this.$message.error(err)
              this.isWorking = false
            } else {
              //  datas: documents, 转换成mysql能识别的数据类型
              let datas_values = documents
              this.$confirm(`本次操作将本地数据库 ${datas_values.length} 条数据，覆盖远端MongoDB数据库 ，是否继续？`, '再次提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                // 先 drop 再 create 再 insert
                const table = conn.db(projectForm.datasource_info.database).collection(projectForm.datasource_info.table)
                table.drop()
                table.insertMany(datas_values, (err, res) => {
                  if (err) {
                    this.$message.error(err)
                    this.isWorking = false
                  } else {
                    console.log('插入的文档数量为: ' + res.insertedCount)
                    // 导入结束
                    this.$message.success('本地数据上传成功!')
                    this.isWorking = false
                    db_utils.update_set(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                      $set: {
                        dataSyncToRemoteTime: date_utils.dateNow(),
                        dataSyncToRemoteNum: datas_values.length,
                      },
                    })
                    this.initData()
                    console.log('INSERT SUCCESS')
                  }
                  conn.close()
                })
              }).catch(() => {
                this.isWorking = false
                this.$message({
                  type: 'info',
                  message: '已取消',
                })
              })
            }
          })
        }).catch((err) => {
          this.db_err = err
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
        this.isWorking = false
      })
    },
    // 点击同步到本地MongoDB
    onSyncMongoDBToLocalClick(projectForm) {
      this.$confirm(`本次操作将覆盖本地数据库 ! 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.isWorking = true
        const db = new MongoHelper(projectForm.datasource_info.host, projectForm.datasource_info.port, projectForm.datasource_info.user, projectForm.datasource_info.password, projectForm.datasource_info.database, projectForm.datasource_info.table)
        db.getConn().then((conn) => {
          console.log('数据库已连接')
          this.$message.success('数据库连接成功!')
          // 读取远程数据
          const table = conn.db(projectForm.datasource_info.database).collection(projectForm.datasource_info.table)
          table.find().sort({index: 'asc'}).toArray((err, results) => {
            if (err) {
              this.$message.error(err)
              console.log(err)
              this.isWorking = false
            } else {
              console.log(results)
              this.$confirm(`本次操作将远端数据库 ${results.length} 条数据，覆盖本地数据库，是否继续？`, '再次提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                // 执行覆盖本地操作
                // 先删除本地记录
                const remote_results = results
                db_utils.remove(db_utils.DATAS_DB, {project_id: projectForm._id}, {multi: true}, (err) => {
                  if (err) {
                    this.$message.error(err)
                    console.log(err)
                    this.isWorking = false
                  } else {
                    console.log(remote_results)
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
                      } catch (e) {
                        console.log(e)
                      }
                    })
                    db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
                      if (err) {
                        this.$message.error(err)
                        console.log(err)
                        this.isWorking = false
                      } else {
                        this.$message.success('远端数据同步成功！')
                        this.isWorking = false
                        db_utils.update_set(db_utils.PROJECTS_DB, {_id: projectForm._id}, {
                          $set: {
                            dataSyncToLocalTime: date_utils.dateNow(),
                            dataSyncToLocalNum: datas.length,
                            currectDataIndex: 0,
                            num: {
                              total: datas.length,
                              marked: markedNum,
                            },
                          },
                        })
                        this.initData()
                        console.log('INSERT SUCCESS')
                      }
                    })
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消',
                })
                this.isWorking = false
              })
            }
            conn.close()
          })
        }).catch((err) => {
          this.db_err = err
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
        this.isWorking = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';

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
    border-bottom: none !important;
  }
}
</style>
