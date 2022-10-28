<template>
  <div>
    <el-dialog title="新建工程"
               :visible.sync="showDialog"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-form ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="工程名称" required>
          <el-input v-model="projectForm.name"
                    clearable
                    :maxlength="10"
                    show-word-limit
                    placeholder="请输入工程名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input clearable
                    v-model="projectForm.description"
                    placeholder="请填写描述,方便理解和解释"
                    maxlength="50"
                    show-word-limit></el-input>
        </el-form-item>
        <el-divider/>
        <el-form-item label="标注类型(多选)" required>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="type in Object.values(WorkingTypeName)" :key="type" :label="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item required label="实体标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.ENTITY])">
          <el-select v-model="projectForm.markTypeId"
                     @change="onEntityTypeChanged"
                     placeholder="请选择实体标注标签组,自定义标注请在对应管理页面配置">
            <el-option v-for="(markType, index) in markTypeDatas"
                       :key="index"
                       :label="markType.content"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="文本分类标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.CLASSIFY])">
          <el-select v-model="projectForm.globalTypeId" @change="onGlobalTypeChanged" placeholder="下拉选择需要的文本分类标签组">
            <el-option v-for="(markType, index) in globalTypeDatas"
                       :key="index"
                       :label="markType.content"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="关系标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.RELATION])">
          <el-select v-model="projectForm.relationTypeId" @change="onRelationTypeChanged" placeholder="下拉选择需要的关系标注标签组">
            <el-option v-for="(markType, index) in relationTypeDatas"
                       :key="index"
                       :label="markType.content"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="对话标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.DIALOGUE])">
          <el-select v-model="projectForm.dialogueTypeId" @change="onDialogueTypeChanged" placeholder="下拉选择需要的对话标注标签组">
            <el-option v-for="(markType, index) in dialogueTypeDatas"
                       :key="index"
                       :label="markType.content"
                       :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-divider/>
        <el-form-item label="数据源">
          <div class="flex_row align_center" style="height: 40px; justify-content: space-around">
            <el-radio v-model="projectForm.datasource_radio" label="1">本地文件</el-radio>
            <el-radio v-model="projectForm.datasource_radio" label="2">远程文件</el-radio>
            <el-radio v-model="projectForm.datasource_radio" label="3">MySQL</el-radio>
            <el-radio v-model="projectForm.datasource_radio" label="4">MongoDB</el-radio>
          </div>
        </el-form-item>
        <el-form-item v-if="projectForm.datasource_radio==='1'" label="数据文件" required v-loading="isReadingFile">
          <el-upload
              action="/"
              :file-list="fileList"
              :on-change="handleChange"
              :limit="1"
              accept=".txt,.TXT"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :multiple="false"
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
        </el-form-item>
        <el-form-item v-if="projectForm.datasource_radio==='2'" label="远程文件地址" required v-loading="isReadingFile">
          <el-input v-model="datasource_file_url" placeholder="在线文件url地址.例:http://127.0.0.1:8080/dataset/demo.txt">
            <el-button slot="append"
                       icon="el-icon-download"
                       :disabled="datasource_file_url.length===0"
                       @click="onDatasetOnlineClick">点击获取
            </el-button>
          </el-input>
        </el-form-item>
        <el-form v-if="projectForm.datasource_radio==='3'" ref="projectForm" :model="projectForm.datasource_info" label-width="80px">
          <el-alert
              title="使用MySQL双向同步功能，请先准备好如下连接信息。"
              show-icon
              type="info">
          </el-alert>
          <div class="h10"></div>
          <el-alert
              v-if="db_err"
              :title="db_err"
              show-icon
              type="danger">
          </el-alert>
          <div class="h10"></div>
          <el-form-item required label="主机地址">
            <el-input v-model="projectForm.datasource_info.host" placeholder="127.0.0.1"></el-input>
          </el-form-item>
          <el-form-item required label="端口号">
            <el-input v-model="projectForm.datasource_info.port" placeholder="3306"></el-input>
          </el-form-item>
          <el-form-item required label="用户名">
            <el-input v-model="projectForm.datasource_info.user" placeholder="请填写有读写下面数据库权限的账号"></el-input>
          </el-form-item>
          <el-form-item required label="密码">
            <el-input v-model="projectForm.datasource_info.password" placeholder="请填写密码"></el-input>
          </el-form-item>
          <el-form-item required label="数据库名">
            <el-input v-model="projectForm.datasource_info.database" placeholder="请填写有读写权限的数据库名"></el-input>
          </el-form-item>
          <el-alert
              title="表名：开启数据同步，默认将覆盖此表，建议同步前修改此项！"
              type="warning"
          >
          </el-alert>
          <div class="h10"></div>
          <el-form-item required label="表名">
            <el-input v-model="projectForm.datasource_info.table" placeholder="请填写数据源表名"></el-input>
          </el-form-item>
          <el-form-item required label="字段名">
            <el-input v-model="projectForm.datasource_info.column" placeholder="请填写数据对应在表中的字段名"></el-input>
          </el-form-item>
          <el-form-item label="字符集">
            <el-input disabled v-model="projectForm.datasource_info.charset" placeholder="默认：'UTF8_GENERAL_CI'"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
              <el-button type="" @click="onTestMysqlConnectClick">测试连接</el-button>
              <el-button type="primary" @click="onPullMysqlDatasClick">读取数据</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form v-if="projectForm.datasource_radio==='4'" ref="projectForm" :model="projectForm.datasource_info" label-width="80px">
          <el-alert
              title="使用MongoDB双向同步功能，请先准备好如下连接信息。"
              show-icon
              type="info">
          </el-alert>
          <div class="h10"></div>
          <el-alert
              v-if="db_err"
              :title="db_err"
              show-icon
              type="danger">
          </el-alert>
          <div class="h10"></div>
          <el-form-item required label="主机地址">
            <el-input v-model="projectForm.datasource_info.host" placeholder="127.0.0.1"></el-input>
          </el-form-item>
          <el-form-item required label="端口号">
            <el-input v-model="projectForm.datasource_info.port" placeholder="27017"></el-input>
          </el-form-item>
          <el-form-item  label="用户名">
            <el-input v-model="projectForm.datasource_info.user" placeholder="建议配置用户名！"></el-input>
          </el-form-item>
          <el-form-item  label="密码">
            <el-input v-model="projectForm.datasource_info.password" placeholder="请填写密码"></el-input>
          </el-form-item>
          <el-form-item required label="数据库名">
            <el-input v-model="projectForm.datasource_info.database" placeholder="请填写有读写权限的数据库名"></el-input>
          </el-form-item>
          <el-alert
              title="集合名：开启数据同步，默认将覆盖此集合，建议同步前修改此项！"
              type="warning"
          >
          </el-alert>
          <div class="h10"></div>
          <el-form-item required label="集合名">
            <el-input v-model="projectForm.datasource_info.table" placeholder="请填写数据源集合名"></el-input>
          </el-form-item>
          <el-form-item required label="字段名">
            <el-input v-model="projectForm.datasource_info.column" placeholder="请填写数据对应在集合中的字段名"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
              <el-button type="" @click="onTestMongodbConnectClick">测试连接</el-button>
              <el-button type="primary" @click="onPullMongodbDatasClick">读取数据</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form-item v-if="projectForm.datasource_radio!=='3' && projectForm.datasource_radio!=='4'" required label="字符集选择">
          <el-select v-model="encoding" @change="onEncodingChanged" placeholder="默认字符集utf-8">
            <el-option v-for="(encode, index) in encodings" :key="index" :label="encode" :value="encode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="projectForm.datasource_radio!=='3' && projectForm.datasource_radio!=='4'" label="数据分隔符">
          <el-input v-model="separation_tag"
                    clearable
                    placeholder="请输入自定义分隔符"
          >
            <el-button slot="append" @click="onSeparationTagInputClick">确定</el-button>
          </el-input>
        </el-form-item>

        <el-form-item v-if="uploadOriginalDatas.length" label="数据预览">
          <div class="file_upload_tips">
            解析成功!总共
            <span style="font-weight: bold; color: #ff7c00">{{ uploadOriginalDatas.length }}</span>
            条数据.前5条:
          </div>
          <div style="overflow: hidden; text-overflow: ellipsis"
               v-for="(item, index) in uploadOriginalDatas.slice(0, 5)">{{ index + 1 }} . {{ item }}
          </div>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="primary" :disabled="uploadOriginalDatas.length===0" :loading="isReadingFile" @click="saveNewProjectClick">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import db_utils    from '../../libs/db_utils'
import fs          from 'fs'
import readline    from 'readline'
import {fetchGet}  from '../../libs/axiosService'
import DBHelper    from '../../libs/mysqlHelper'
import {Cons}      from '../../Constant'
import MongoHelper from '../../libs/mongoHelper'

export default {
  name: 'NewProject',
  props: {
    showDialog: {
      // 类型限制
      type: Boolean,
      // 默认值
      default: false,
      required: true,
    },
  },
  data() {
    return {
      projectForm: JSON.parse(JSON.stringify(Cons.PROJECT_TEMPLATE)),
      db_err:'',
      // ────────────────────────── 分割线  ──────────────────────────
      datasource_file_url: '',
      encoding: 'utf-8',
      encodings: Cons.ENCODINGS,
      separation_tag:'',
      file_data:'',
      fileList: [], //上传组件,文件预览
      isReadingFile: false, //是否正在解析文件
      // ────────────────────────── 分割线  ──────────────────────────
      markTypeDatas: [], //从数据库中读取的实体标注标签组列表
      globalTypeDatas: [], //从数据库中读取的文本分类标签组列表
      relationTypeDatas: [], //从数据库中读取的关系标注标签组列表
      dialogueTypeDatas: [], //从数据库中读取的对话标注标签组列表
      // ────────────────────────── 分割线  ──────────────────────────
      uploadOriginalDatas: [], // 按行解析完,存入数组,准备处理
      // ────────────────────────── 分割线  ──────────────────────────
      checkList: [],
      WorkingType: Cons.WorkingType,
      WorkingTypeName: Cons.WorkingTypeName
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.ENTITY
      }, (err, documents) => {
        this.markTypeDatas = []
        for (const document of documents) {
          this.markTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.CLASSIFY
      }, (err, documents) => {
        this.globalTypeDatas = []
        for (const document of documents) {
          this.globalTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.RELATION
      }, (err, documents) => {
        this.relationTypeDatas = []
        for (const document of documents) {
          this.relationTypeDatas.unshift(document)
        }
      })
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.DIALOGUE
      }, (err, documents) => {
        this.dialogueTypeDatas = []
        for (const document of documents) {
          this.dialogueTypeDatas.unshift(document)
        }
      })
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // 判断当前标注类型是否激活
    doCheckMarkTypeIsActived(_type) {
      return this.checkList.indexOf(_type) !== -1
    },
    // ────────────────────────── 上传  ──────────────────────────
    beforeUpload(file) {
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
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
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
          encoding: this.encoding,
        })
        //创建逐行读取
        const rl = readline.createInterface({
          input: readstream,
        })
        rl.on('line', (data) => {
          this.uploadOriginalDatas.push(data)
        }).on('close', () => {
          //结束后调用的
          this.isReadingFile = false
        })
        // Read and disply the file data on console
        readstream.on('data',  (chunk)=> {
          this.file_data = chunk.toString()
        });
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: 'warning',
        offset: 70,
      })
    },
    handleRemove(files, fileList) {
      this.isReadingFile = false
      this.uploadOriginalDatas = []
    },
    // 修改字符集
    onEncodingChanged(_encoding) {
      this.encoding = _encoding
    },
    // ────────────────────────── 分割线 ──────────────────────────
    onEntityTypeChanged(_markTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _markTypeId}, (err, document) => {
        if (document) {
          this.projectForm.markTypeName = document.name
        }
      })
    },
    onGlobalTypeChanged(_globalTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _globalTypeId}, (err, document) => {
        if (document) {
          this.projectForm.globalTypeName = document.name
        }
      })
    },
    onRelationTypeChanged(_relationTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _relationTypeId}, (err, document) => {
        if (document) {
          this.projectForm.relationTypeName = document.name
        }
      })
    },
    onDialogueTypeChanged(_dialogueTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, {_id: _dialogueTypeId}, (err, document) => {
        if (document) {
          this.projectForm.dialogueTypeName = document.name
        }
      })
    },
    // ────────────────────────── 分割线  ──────────────────────────
    // 保存数据到数据库
    saveDatas(project_id) {
      // 字段: _id,content,status,project_id,tags[{name,tag,start,end}]
      let datas = []
      this.uploadOriginalDatas.forEach((content, index) => {
        let _data = JSON.parse(JSON.stringify(Cons.DATA_TEMPLATE))
        _data.project_id = project_id
        _data.index = index
        _data.content = content
        datas.push(_data)
      })
      db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
        this.showMessageWithText('保存成功!', 'success')
        this.$events.emit('NEW_PROJECT_SUCESS', project_id)
        this.$emit('cancelButtonClick')
      })
    },
    // 数据分割
    onSeparationTagInputClick() {
      this.uploadOriginalDatas = this.file_data.split(this.separation_tag)
    },
    // ────────────────────────── 新建工程 ──────────────────────────
    // 保存按钮点击
    saveNewProjectClick() {
      // 1.校验 2.保存数据库 3通知更新
      if (this.checkedNewProjectItems()) {
        this.doMarkTypeReform()
        // 如果是mysql
          // save to db
          // 保存到数据库
          // 1.保存数据 得到工程id , 得到实体标注标签组名称 2.保存工程
          db_utils.insert(db_utils.PROJECTS_DB, this.projectForm, (err, newDoc) => {
            //console.log(err)
            //console.log('project new:');
            //console.log(newDoc);
            this.saveDatas(newDoc._id)
          })
        }

    },
    checkedNewProjectItems() {
      if (!this.projectForm.name) {
        this.showMessageWithText('请填写工程名称')
        return false
      }else if (this.checkList.length === 0){
        this.showMessageWithText('请选择标注类型')
        return false
      }
      else if (this.projectForm.datasource_radio!=='3'  &&this.projectForm.datasource_radio!=='4'&& !this.projectForm.dataFilePath && this.uploadOriginalDatas.length <= 0) {
        this.showMessageWithText('请按要求上传数据文件')
        return false
      }
      return true
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
      // 文本翻译
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.TRANSLATION])) {
        delete this.projectForm.translationName
        delete this.projectForm.translationId
      }else {
        this.projectForm.translationName = 'translation'
        this.projectForm.translationId = '-1'
      }
      // 语义解析
      if (!this.doCheckMarkTypeIsActived(this.WorkingTypeName[this.WorkingType.TEXT2SQL])) {
        delete this.projectForm.text2sqlName
        delete this.projectForm.text2sqlId
      }else {
        this.projectForm.text2sqlName = 'text2sql'
        this.projectForm.text2sqlId = '-1'
      }

    },
    cancelButtonClick() {
      this.$emit('cancelButtonClick')
    },
    // ────────────────────────── 在线数据  ──────────────────────────
    getDatasetFile_Online() {
      this.isReadingFile = true
      fetchGet(this.datasource_file_url).then((response) => {
        const _response_data = response.data
        // 保存文件路径到工程form,用于后续存储
        this.projectForm.dataFilePath = this.datasource_file_url
        //用来存储结果的变量
        this.uploadOriginalDatas = _response_data.split(/[(\r\n\s)]+/)
        this.isReadingFile = false
      }).catch((error) => {
        this.$message.error(error.toLocaleString())
        this.isReadingFile = false
      })
    },
    onDatasetOnlineClick() {
      this.getDatasetFile_Online()
    },
    // ────────────────────────── / mysql ──────────────────────────
    onTestMysqlConnectClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port||!this.projectForm.datasource_info.user||!this.projectForm.datasource_info.password||!this.projectForm.datasource_info.database||!this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column  ){
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
        } else {
          this.db_err = ''
          this.$message.success('连接可用,测试通过!')

        }
      })
    },
    onPullMysqlDatasClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port||!this.projectForm.datasource_info.user||!this.projectForm.datasource_info.password||!this.projectForm.datasource_info.database||!this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column  ){
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
        } else {
          this.db_err = ''
          //this.$message.success('连接可用,测试通过!')
          // 读取数据
          let sql = `select ${this.projectForm.datasource_info.column} from ${this.projectForm.datasource_info.table}`
          connection.query(sql,(err,results)=>{
            if (err) {
              this.db_err = err
              this.$message.error(err)
            } else {
              this.db_err = ''
              this.uploadOriginalDatas = results.map(res=>{
                return res[this.projectForm.datasource_info.column]
              })
            }
          })
        }
      })
    },
    // ────────────────────────── / mongodb ──────────────────────────
    onTestMongodbConnectClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port||!this.projectForm.datasource_info.database||!this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column  ){
        this.showMessageWithText('请完成必填项!')
        return
      }

      const db = new MongoHelper(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port, this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database, this.projectForm.datasource_info.table)
      db.getConn().then((conn) => {
        this.db_err = ''
        this.$message.success('连接可用,测试通过!')
        conn.close()
      }).catch((err) => {
        this.db_err = err
        this.$message.error(err)
      })

    },
    onPullMongodbDatasClick() {
      if (!this.projectForm.datasource_info.host || !this.projectForm.datasource_info.port||!this.projectForm.datasource_info.database||!this.projectForm.datasource_info.table || !this.projectForm.datasource_info.column  ){
        this.showMessageWithText('请完成必填项!')
        return
      }

      const db = new MongoHelper(this.projectForm.datasource_info.host, this.projectForm.datasource_info.port, this.projectForm.datasource_info.user, this.projectForm.datasource_info.password, this.projectForm.datasource_info.database, this.projectForm.datasource_info.table)

      db.getConn().then((conn) => {
        console.log('数据库已连接')
        const table = conn.db(this.projectForm.datasource_info.database).collection(this.projectForm.datasource_info.table)
        // 读取数据
        table.find({}).toArray((err, results)=> {
          // 返回集合中所有数据
          if (err) {
            this.db_err = err
            this.$message.error(err)
          }else {
            this.db_err = ''
            this.uploadOriginalDatas = results.map(res=>{
              return res[this.projectForm.datasource_info.column]
            })
          }
          conn.close();
        });
      }).catch((err) => {
        this.db_err = err
        this.$message.error(err)
      })


    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../globals';

.el-select {
  width: 100%;
}
.el-select-dropdown__item{
  max-width: 540px;
}
</style>
