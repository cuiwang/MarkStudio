<template>
  <div>
    <el-dialog v-if="projectForm"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :visible.sync="showDialog"
               title="修改工程">
      <el-form ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="工程名称" required>
          <el-input v-model="projectForm.name"
                    :maxlength="10"
                    clearable
                    placeholder="请输入工程名称"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="projectForm.description"
                    clearable
                    maxlength="80"
                    placeholder="请填写描述,方便理解和解释"
                    show-word-limit></el-input>
        </el-form-item>
        <el-divider/>
        <el-form-item label="标注类型(多选)" required>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="type in Object.values(WorkingTypeName)" :key="type" :label="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.ENTITY])" label="实体标注标签组" required>
          <el-select v-model="projectForm.markTypeId"
                     placeholder="请选择实体标注标签组,自定义标注请在对应管理页面配置"
                     @change="onEntityTypeChanged">
            <el-option v-for="(markType, index) in markTypeDatas"
                       :key="index"
                       :label="markType.name"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.CLASSIFY])" label="文本分类标签组" required>
          <el-select v-model="projectForm.globalTypeId" placeholder="下拉选择需要的文本分类标签组" @change="onGlobalTypeChanged">
            <el-option v-for="(markType, index) in globalTypeDatas"
                       :key="index"
                       :label="markType.name"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.RELATION])" label="关系标注标签组" required>
          <el-select v-model="projectForm.relationTypeId" placeholder="下拉选择需要的关系标注标签组" @change="onRelationTypeChanged">
            <el-option v-for="(markType, index) in relationTypeDatas"
                       :key="index"
                       :label="markType.name"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.DIALOGUE])" label="对话标注标签组" required>
          <el-select v-model="projectForm.dialogueTypeId" placeholder="下拉选择需要的对话标注标签组" @change="onDialogueTypeChanged">
            <el-option v-for="(markType, index) in dialogueTypeDatas"
                       :key="index"
                       :label="markType.name"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="!projectForm['cloud']">
          <el-divider/>
          <el-form-item label="数据源">
            <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
              <el-radio v-model="projectForm.datasource_radio" label="1">本地文件</el-radio>
              <el-radio v-model="projectForm.datasource_radio" label="2">远程文件</el-radio>
              <el-radio v-model="projectForm.datasource_radio" label="3">MySQL</el-radio>
              <el-radio v-model="projectForm.datasource_radio" label="4">MongoDB</el-radio>
            </div>
          </el-form-item>
          <!--修改mysql-->
          <el-form v-if="projectForm.datasource_radio==='3'"
                   ref="projectForm"
                   :model="projectForm.datasource_info"
                   label-width="80px">
            <div class="h10"></div>
            <el-form-item label="主机地址" required>
              <el-input v-model="projectForm.datasource_info.host" placeholder="127.0.0.1"></el-input>
            </el-form-item>
            <el-form-item label="端口号" required>
              <el-input v-model="projectForm.datasource_info.port" placeholder="3306"></el-input>
            </el-form-item>
            <el-form-item label="用户名" required>
              <el-input v-model="projectForm.datasource_info.user" placeholder="请填写有读写下面数据库权限的账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="projectForm.datasource_info.password" placeholder="请填写密码"></el-input>
            </el-form-item>
            <el-form-item label="数据库名" required>
              <el-input v-model="projectForm.datasource_info.database" placeholder="请填写有读写权限的数据库名"></el-input>
            </el-form-item>
            <el-alert
                title="表名：开启数据同步，默认将覆盖此表，建议同步前修改此项！"
                type="warning"
            >
            </el-alert>
            <div class="h10"></div>
            <el-form-item label="表名" required>
              <el-input v-model="projectForm.datasource_info.table" placeholder="请填写数据源表名"></el-input>
            </el-form-item>
            <el-form-item label="字段名" required>
              <el-input v-model="projectForm.datasource_info.column" placeholder="请填写数据对应在表中的字段名"></el-input>
            </el-form-item>
            <el-form-item label="字符集">
              <el-input v-model="projectForm.datasource_info.charset"
                        disabled
                        placeholder="默认：'UTF8_GENERAL_CI'"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
                <el-button type="" @click="onTestMysqlConnectClick">测试连接</el-button>
                <el-button type="primary" @click="onPullMysqlDatasClick">测试读取数据</el-button>
              </div>
            </el-form-item>
          </el-form>
          <!--修改mongodb-->
          <el-form v-else-if="projectForm.datasource_radio==='4'"
                   ref="projectForm"
                   :model="projectForm.datasource_info"
                   label-width="80px">
            <div class="h10"></div>
            <el-form-item label="主机地址" required>
              <el-input v-model="projectForm.datasource_info.host" placeholder="127.0.0.1"></el-input>
            </el-form-item>
            <el-form-item label="端口号" required>
              <el-input v-model="projectForm.datasource_info.port" placeholder="3306"></el-input>
            </el-form-item>
            <el-form-item label="用户名" required>
              <el-input v-model="projectForm.datasource_info.user" placeholder="请填写有读写下面数据库权限的账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="projectForm.datasource_info.password" placeholder="请填写密码"></el-input>
            </el-form-item>
            <el-form-item label="数据库名" required>
              <el-input v-model="projectForm.datasource_info.database" placeholder="请填写有读写权限的数据库名"></el-input>
            </el-form-item>
            <el-alert
                title="表名：开启数据同步，默认将覆盖此表，建议同步前修改此项！"
                type="warning"
            >
            </el-alert>
            <div class="h10"></div>
            <el-form-item label="集合名" required>
              <el-input v-model="projectForm.datasource_info.table" placeholder="请填写数据源集合名"></el-input>
            </el-form-item>
            <el-form-item label="字段名" required>
              <el-input v-model="projectForm.datasource_info.column" placeholder="请填写数据对应在集合中的字段名"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
                <el-button type="" @click="onTestMongodbConnectClick">测试连接</el-button>
                <el-button type="primary" @click="onPullMongodbDatasClick">测试读取数据</el-button>
              </div>
            </el-form-item>
          </el-form>
          <!--追加txt数据-->
          <el-form-item v-else label="是否追加数据">
            <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
              <el-switch v-model="isAppendDatas"></el-switch>
            </div>
          </el-form-item>
          <div v-show="isAppendDatas">
            <el-form-item label="字符集选择">
              <el-select v-model="encoding" placeholder="默认字符集utf-8" @change="onEncodingChanged">
                <el-option v-for="(encode, index) in encodings" :key="index" :label="encode" :value="encode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-loading="isReadingFile" label="数据文件" required>
              <div class="flex_row align_center" style="justify-content: flex-start">
                <el-upload
                    :auto-upload="false"
                    :before-upload="beforeSourceUpload"
                    :file-list="sourcefileList"
                    :limit="1"
                    :multiple="false"
                    :on-change="handleSourceChange"
                    :on-exceed="handleSourceExceed"
                    :on-remove="handleSourceRemove"
                    accept=".txt,.TXT"
                    action="/"
                >
                  <div class="flex_row align_center">
                    <el-button size="small" type="info">点击上传txt数据</el-button>
                    <span class="w20"></span>
                    <span slot="tip" class="el-upload__tip">
                      只能上传txt文件，中文乱码请修改上面字符集.
                      <span style="font-weight: bold">按行</span>
                      读取txt数据
                    </span>
                  </div>
                </el-upload>
              </div>
            </el-form-item>
          </div>
          <el-form-item v-if="uploadOriginalDatas.length" label="数据预览">
            <div class="file_upload_tips">
              解析成功!总共
              <span style="font-weight: bold; color: #ff7c00">{{uploadOriginalDatas.length}}</span>
              条数据.前5条:
            </div>
            <div v-for="(item, index) in uploadOriginalDatas.slice(0, 5)"
                 style="overflow: hidden; text-overflow: ellipsis">{{index + 1}} . {{item}}
            </div>
          </el-form-item>
        </template>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="warning" @click="saveEditProjectClick">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import fs from 'fs'
import readline from 'readline'
import {Cons} from '../../Constant'
import db_utils from '../../libs/db_utils'
import MongoHelper from '../../libs/mongoHelper'
import DBHelper from '../../libs/mysqlHelper'
import {getCloudProjectLabels} from '../../libs/project_utils'

export default {
  name: 'EditProject',
  props: {
    showDialog: {
      // 类型限制
      type: Boolean,
      // 默认值
      default: false,
      required: true
    },
    project: null
  },
  watch: {
    project(newValue, oldValue) {
      if (this.project) {
        this.initLabelDatasFromDB()
        this.projectForm = JSON.parse(JSON.stringify(this.project))
        this.checkList = []
        // 判断是否云服务
        if (this.projectForm.cloud) {
          // 按照云服务读取规则,从数据库中检索出标签
         getCloudProjectLabels(this.projectForm._id).then(({projectForm,checkList})=>{
           this.checkList = checkList
           this.projectForm = {...this.projectForm,projectForm}
         })
        }
        else {
          if (this.projectForm.markTypeId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.ENTITY])
          }
          if (this.projectForm.globalTypeId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.CLASSIFY])
          }
          if (this.projectForm.relationTypeId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.RELATION])
          }
          if (this.projectForm.dialogueTypeId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.DIALOGUE])
          }
          if (this.projectForm.translationId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.TRANSLATION])
          }
          if (this.projectForm.text2sqlId) {
            this.checkList.push(this.WorkingTypeName[this.WorkingType.TEXT2SQL])
          }
        }
      }

    }
  },
  data() {
    return {
      markTypeDatas: [], //从数据库中读取的实体标注标签组列表
      globalTypeDatas: [], //从数据库中读取的文本分类标签组列表
      relationTypeDatas: [], //从数据库中读取的关系标注标签组列表
      dialogueTypeDatas: [], //从数据库中读取的对话标注标签组列表
      encoding: 'utf-8',
      encodings: Cons.ENCODINGS,
      isAppendDatas: false,
      isReadingFile: false, //是否正在解析文件
      sourcefileList: [],
      uploadOriginalDatas: [],
      projectForm: null,
      // ────────────────────────── 分割线  ──────────────────────────
      checkList: [],
      WorkingType: Cons.WorkingType,
      WorkingTypeName: Cons.WorkingTypeName,
      cloud_labels:[]
    }
  },
  mounted() {

  },
  methods: {
    checkedNewProjectItems() {
      if (!this.projectForm.name) {
        this.showMessageWithText('请填写工程名称')
        return false
      }else if (this.checkList.length === 0){
        this.showMessageWithText('请选择标注类型')
        return false
      }
      else if (this.projectForm.datasource_radio !== '3' && this.projectForm.datasource_radio !== '4' && !this.projectForm.dataFilePath && this.uploadOriginalDatas.length <= 0) {
        this.showMessageWithText('请按要求上传数据文件')
        return false
      }
      return true
    },
    // 判断当前标注类型是否激活
    doCheckMarkTypeIsActived(_type) {
      return this.checkList.indexOf(_type) !== -1
    },
    // 从数据库中加载所有的标注组
    initLabelDatasFromDB() {
      db_utils.find(db_utils.LABELS_DB, {
        type: Cons.WorkingType.ENTITY
      }, (err, documents) => {
        this.markTypeDatas = []
        for (const document of documents) {
          this.markTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type: Cons.WorkingType.CLASSIFY
      }, (err, documents) => {
        this.globalTypeDatas = []
        for (const document of documents) {
          this.globalTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type: Cons.WorkingType.RELATION
      }, (err, documents) => {
        this.relationTypeDatas = []
        for (const document of documents) {
          this.relationTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type: Cons.WorkingType.DIALOGUE
      }, (err, documents) => {
        this.dialogueTypeDatas = []
        for (const document of documents) {
          this.dialogueTypeDatas.unshift(document)
        }
      })
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // 选择实体标注标签组
    onEntityTypeChanged(_markTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _markTypeId}, (err, document) => {
        if (document) {
          this.projectForm.markTypeName = document.name
          if (this.projectForm.cloud){
            this.projectForm.EntityLabelData = document
          }
        }
      })
    },
    onGlobalTypeChanged(_globalTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _globalTypeId}, (err, document) => {
        if (document) {
          this.projectForm.globalTypeName = document.name
          if (this.projectForm.cloud){
            this.projectForm.GlobalLabelData = document
          }
        }
      })
    },
    onRelationTypeChanged(_relationTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _relationTypeId}, (err, document) => {
        if (document) {
          this.projectForm.relationTypeName = document.name
          if (this.projectForm.cloud){
            this.projectForm.RelationLabelData = document
          }
        }
      })
    },
    onDialogueTypeChanged(_dialogueTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _dialogueTypeId}, (err, document) => {
        if (document) {
          this.projectForm.dialogueTypeName = document.name
          if (this.projectForm.cloud){
            this.projectForm.DialogueLabelData = document
          }
        }
      })
    },
    // ────────────────────────── / 分割线 ──────────────────────────
    // 修改字符集
    onEncodingChanged(_encoding) {
      this.encoding = _encoding
    },
    // ›››››››››››››››››››››››››››› 上传数据源 ‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹
    handleSourceChange(file, fileList) {
      const path = file.raw.path
      if (path) {
        this.isReadingFile = true
        // 保存文件路径到工程form,用于后续存储
        this.projectForm.dataFilePath = path
        //用来存储结果的变量
        this.uploadOriginalDatas = []
        //创建文件流
        const readstream = fs.createReadStream(path, {
          autoClose: true, //默认读取完毕后自动关闭
          encoding: this.encoding
        })
        //创建逐行读取
        const rl = readline.createInterface({
          input: readstream
        })
        rl.on('line', (data) => {
            this.uploadOriginalDatas.push(data)
          })
          .on('close', () => {
            //结束后调用的
            this.isReadingFile = false
          })
      }
    },
    handleSourceExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: 'warning',
        offset: 70
      })
    },
    handleSourceRemove(files, fileList) {
      this.isReadingFile = false
      this.uploadOriginalDatas = []
    },
    beforeSourceUpload(file) {
      const isTxt = file.type === 'txt'
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isTxt) {
        this.$message.error('上传文件只能是 txt 格式!')
      }
      if (!isLt500M) {
        this.$message.error('上传文件大小不能超过 500MB!')
      }
      return isTxt && isLt500M
    },

    // ────────────────────────── 编辑工程 ──────────────────────────
    // 保存按钮点击
    async saveEditProjectClick() {
      // 1.校验 2.保存数据库 3通知更新
      if (this.checkedNewProjectItems()) {
        // 清理标注组,删除多余组
        this.doMarkTypeReform()
        // 是否追加
        if (this.isAppendDatas) {
          // 字段: _id,content,status,project_id,tags[{name,tag,start,end}]
          let datas = []
          // 拿到最大索引
          // 获取最后一条的Index
          db_utils.find_datas_by_sort({project_id: this.projectForm._id}, (err, docs) => {
            const max_index = docs[0].index
            if (max_index>=0) {
              this.uploadOriginalDatas.forEach((content, index) => {
                let _data = JSON.parse(JSON.stringify(Cons.DATA_TEMPLATE))
                _data.project_id = this.projectForm._id
                _data.index = max_index + index + 1
                _data.content = content
                datas.push(_data)
              })
              this.projectForm.num.total = docs.length + this.uploadOriginalDatas.length // 重新设置总数
              // save to db
              // 更新数据源后保存到数据库
              db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
                db_utils.update(db_utils.PROJECTS_DB, {_id: this.projectForm._id}, this.projectForm)
                this.showMessageWithText('修改成功!', 'success')
                this.$events.emit('EDIT_PROJECT_SUCESS')
                this.$emit('cancelButtonClick')
              })
            }else {
              this.showMessageWithText('数据库异常,'+JSON.stringify(docs[0]))
            }
          })
        }
        else {
          // save to db
          // 保存到数据库
          db_utils.update(db_utils.PROJECTS_DB, {_id: this.projectForm._id}, this.projectForm)
          // 判断是否云服务
          if (this.projectForm.cloud) {
            // 1.删除原专属
            await this.doRemoveLabel(this.projectForm._id)
            // 2.本地label库新增项目专属标注组
            for (const label of this.cloud_labels) {
              delete label['_id']
              label['user_id'] = this.user_id // 标记专属
              label['project_id'] = this.projectForm._id // 标记专属
              label['project_owner_id'] = this.projectForm.project_owner_id // 标记专属
              label['project_name'] = this.projectForm.name
              await this.doInsertLabel(label)
                        .catch(err => {
                          this.processing_active = 0
                          this.isProcessCloud = false
                          this.processCloudTipString = ''
                          this.$message.error('激活失败,请重试!')
                        })
            }
            this.doLocalSync(Cons.SyncLogType.PROJECT_BASIC,this.projectForm.project_owner_id,this.projectForm._id)
            this.doLocalSync(Cons.SyncLogType.PROJECT_LABEL,this.projectForm.project_owner_id,this.projectForm._id)
          }

          this.showMessageWithText('修改成功!', 'success')
          this.$events.emit('EDIT_PROJECT_SUCESS')
          this.$emit('cancelButtonClick')
        }
      }
    },
    // 删除专属label
    doRemoveLabel(_id){
      return new Promise((resolve, reject) => {
        db_utils.remove(db_utils.LABELS_DB, {project_id: _id},  (err) => {
          if (!err){
            resolve('')
          }else {
            reject('')
          }
        })
      })
    },
    // 标记为专属label
    doInsertLabel(label){
      return new Promise((resolve, reject) => {
        db_utils.insert(db_utils.LABELS_DB, label, (err) => {
          if (!err){
            resolve('')
          }else {
            reject('')
          }
        });
      })
    },
    // 标注类型清理
    doMarkTypeReform() {
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.ENTITY])) {
        delete this.projectForm.markTypeName
        delete this.projectForm.markTypeId
      }
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.CLASSIFY])) {
        delete this.projectForm.globalTypeName
        delete this.projectForm.globalTypeId
      }
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.DIALOGUE])) {
        delete this.projectForm.dialogueTypeName
        delete this.projectForm.dialogueTypeId
      }
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.RELATION])) {
        delete this.projectForm.relationTypeName
        delete this.projectForm.relationTypeId
      }
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.TRANSLATION])) {
        delete this.projectForm.translationName
        delete this.projectForm.translationId
      }
      else {
        this.projectForm.translationName = 'translation'
        this.projectForm.translationId = '-1'
      }
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.TEXT2SQL])) {
        delete this.projectForm.text2sqlName
        delete this.projectForm.text2sqlId
      }
      else {
        this.projectForm.text2sqlName = 'text2sql'
        this.projectForm.text2sqlId = '-1'
      }
      // 如果是云服务,需要重新判断一下最终选中的标注组
      if (this.projectForm.cloud){
        this.cloud_labels = []
        if (this.projectForm.markTypeId) {
          this.cloud_labels.push(this.projectForm.EntityLabelData)
        }
        if (this.projectForm.globalTypeId) {
          this.cloud_labels.push(this.projectForm.GlobalLabelData)
        }
        if (this.projectForm.relationTypeId) {
          this.cloud_labels.push(this.projectForm.RelationLabelData)
        }
        if (this.projectForm.dialogueTypeId) {
          this.cloud_labels.push(this.projectForm.DialogueLabelData)
        }
        if (this.projectForm.translationId) {
          this.cloud_labels.push({_id:-400,name:'文本翻译',type:Cons.WorkingType.TRANSLATION,hidden:1})
        }
        if (this.projectForm.text2sqlId) {
          this.cloud_labels.push({_id:-401,name:'语义解析',type:Cons.WorkingType.TEXT2SQL,hidden:1})
        }
      }
    },
    cancelButtonClick() {
      this.$emit('cancelButtonClick')
    },
    // ────────────────────────── / mysql ──────────────────────────
    onTestMysqlConnectClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port || !this.projectForm.datasource_info.user || !this.projectForm.datasource_info.password || !this.projectForm.datasource_info.database || !this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column) {
        this.showMessageWithText('请完成必填项!')
        return
      }
      let connection = new DBHelper().getConn(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port,
          this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database)
      connection.connect((err) => {
        // in case of error
        if (err) {
          this.db_err = err
          this.$message.error(err)
        }
        else {
          this.db_err = ''
          this.$message.success('连接可用,测试通过!')
        }
      })
    },
    onPullMysqlDatasClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port || !this.projectForm.datasource_info.user || !this.projectForm.datasource_info.password || !this.projectForm.datasource_info.database || !this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column) {
        this.showMessageWithText('请完成必填项!')
        return
      }
      let connection = new DBHelper().getConn(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port,
          this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database)
      connection.connect((err) => {
        // in case of error
        if (err) {
          this.db_err = err
          this.$message.error(err)
        }
        else {
          this.db_err = ''
          //this.$message.success('连接可用,测试通过!')
          // 读取数据
          let sql = `select ${this.projectForm.datasource_info.column} from ${this.projectForm.datasource_info.table}`
          connection.query(sql, (err, results) => {
            if (err) {
              this.db_err = err
              this.$message.error(err)
            }
            else {
              this.db_err = ''
              this.uploadOriginalDatas = results.map(res => {
                return res[this.projectForm.datasource_info.column]
              })
            }
          })
        }
      })
    },
    // ────────────────────────── / mongodb ──────────────────────────
    onTestMongodbConnectClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port || !this.projectForm.datasource_info.database || !this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column) {
        this.showMessageWithText('请完成必填项!')
        return
      }
      const db = new MongoHelper(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port, this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database, this.projectForm.datasource_info.table)
      db.getConn()
        .then((conn) => {
          this.db_err = ''
          this.$message.success('连接可用,测试通过!')
          conn.close()
        })
        .catch((err) => {
          this.db_err = err
          this.$message.error(err)
        })
    },
    onPullMongodbDatasClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port || !this.projectForm.datasource_info.database || !this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column) {
        this.showMessageWithText('请完成必填项!')
        return
      }
      const db = new MongoHelper(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port, this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database, this.projectForm.datasource_info.table)
      db.getConn()
        .then((conn) => {
          console.log('数据库已连接')
          const table = conn.db(this.projectForm.datasource_info.database)
                            .collection(this.projectForm.datasource_info.table)
          // 读取数据
          table.find({})
               .toArray((err, results) => {
                 // 返回集合中所有数据
                 if (err) {
                   this.db_err = err
                   this.$message.error(err)
                 }
                 else {
                   this.db_err = ''
                   this.uploadOriginalDatas = results.map(res => {
                     return res[this.projectForm.datasource_info.column]
                   })
                 }
                 conn.close()
               })
        })
        .catch((err) => {
          this.db_err = err
          this.$message.error(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../globals';

.el-select {
  width: 100%;
}

.el-select-dropdown__item {
  max-width: 540px;
}
</style>
