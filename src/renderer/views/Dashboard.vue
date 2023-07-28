<template>
  <div id="content">
    <div class="content-fixed-header">
      <BoardHeader :project="project"/>
    </div>
    <!--中间操作区-->
    <div v-if="project.name && isDbIniting && isReady" class="main_container">
      <!--左侧标记区-->
      <div class="main_left_warp" v-loading="showLoading">
        <!--头部导航-->
        <el-card shadow="never" body-style="padding:10px">
          <div class="main_left_warp_header clearfix">
            <div class="flex_row align_center">
              <div style="flex: 1; display: flex; align-items: center; justify-content: flex-start">
                <div class="status_tips">
                  <el-link type="danger" v-if="data.wrong === 1">无效数据</el-link>
                  <el-link type="success" v-else-if="data.status === DataType.FINISHED">已完成</el-link>
                  <el-link type="info" v-else-if="data.status === DataType.MARKING">标注中......</el-link>
                </div>
              </div>
              <el-button-group class="hidden-sm-and-down" v-if="project.num">
                <el-button class="mark_page_button"
                           icon="el-icon-arrow-left"
                           :disabled="project.currectDataIndex === 0"
                           @click="getLastData">上一条
                </el-button>
                <el-button class="mark_page_button">
                  <el-popover trigger="hover" placement="bottom">
                    <div class="flex_col_allcenter">
                      <el-input size="mini" v-model="inputDataIndex" type="number" placeholder="请输入数字">
                        <el-button slot="append"
                                   icon="el-icon-search"
                                   @click="doChangeInputDataIndex(inputDataIndex)"></el-button>
                      </el-input>
                      <div class="h5"></div>
                      <el-pagination
                          :current-page="project.currectDataIndex + 1"
                          :page-size="1"
                          small
                          layout="prev, pager, next"
                          :total="project.num.total"
                          @current-change="onCurrentPageChange"
                      ></el-pagination>
                    </div>
                    <span slot="reference">
                      {{project.currectDataIndex + 1}} / {{project.num.total}}
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                  </el-popover>
                </el-button>
                <el-button class="mark_page_button"
                           :disabled="project.currectDataIndex === project.num.total - 1"
                           @click="getNextData">
                  下一条
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </el-button-group>
              <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
                <el-checkbox
                    size="mini"
                    class="description_text_color"
                    :disabled="data.status === DataType.FINISHED"
                    @change="onWrongCheckboxChange"
                    :checked="data.wrong===1"
                    >内容错误
                </el-checkbox>
                <el-divider direction="vertical"/>
                <el-button :disabled="data.status === DataType.FINISHED"
                           size="mini"
                           @click="onModifyButtonClick">修改内容
                </el-button>
                <el-divider direction="vertical"/>
                <el-button v-if="data.status === DataType.FINISHED"
                           size="mini"
                           icon="el-icon-refresh-left"
                           @click="onActiveButtonClick">再次标注
                </el-button>
                <el-button v-if="data.status === DataType.MARKING"
                           size="mini"
                           type="primary"
                           @click="onFinishButtonClick">标注完成
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
        <!--分类标注-->
        <div class="flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.CLASSIFY)">
          <ClassifyBoard
              :currect-data="data" :project="project"
          />
        </div>
        <!--实体标注-->
        <div class=" flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.ENTITY)">
          <EntityBoard :currect-data="data" :project="project" :project-mark-type="projectMarkType"
                       @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--关系标注-->
        <div class="flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.RELATION)">
          <RelationBoard :currect-data="data" :project="project" :project-relation-type="projectRelationType"
                         @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!-- 对话标注 -->
        <div class="flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.DIALOGUE)">
          <DialogueBoard :currect-data="data" :project="project" :project-dialogue-type="projectDialogueType"
                         @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--  文本翻译-->
        <div class="flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.TRANSLATION)">
          <TranslationBoard
              :currect-data="data" :project="project"
              @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--  语义解析-->
        <div class="flex_col flex_1 overflow_auto" v-if="doCheckMarkTypeIsActived(WorkingType.TEXT2SQL)">
          <Text2sqlBoard
              :currect-data="data" :project="project"
              @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
      </div>
      <!--右侧操作区-->
      <div class="main_right_warp">
        <!--头部标注类型选择-->
        <el-card shadow="never" style="margin-bottom: 10px">
          <div slot="header" class="clearfix" style="text-align: left">
            <span>
              <i class="el-icon-news"></i>
              标注类型
            </span>
          </div>
          <div>
            <el-radio-group class="marktype_checkbox_container"
                            v-model="marktypeCheckedType"
                            size="medium"
                            @change="onMarkTypeChanged">
              <el-radio class="marktype_checkbox"
                        v-for="type in userMarkTypes"
                        :key="type"
                        :label="type"
                        border>{{WorkingTypeName[type]}}
              </el-radio>
            </el-radio-group>
          </div>
        </el-card>
        <!--分类标签选择-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.CLASSIFY && doCheckMarkTypeIsActived(WorkingType.CLASSIFY)">
        <ClassifyOpthon
                        :currect-data="data"
                        :project-global-type="projectGlobalType"
                        @doUpdateCurrectData="doUpdateCurrectData"/>
        </div>
        <!--实体标注状态下-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.ENTITY && doCheckMarkTypeIsActived(WorkingType.ENTITY)">
          <!--实体标注数据-->
          <EntityOption
                        :currect-data="data"
                        :project-mark-type="projectMarkType"
                        @doUpdateCurrectData="doUpdateCurrectData"/>
        </div>
        <!--关系标注状态下-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.RELATION && doCheckMarkTypeIsActived(WorkingType.RELATION)">
          <RelationOption :currect-data="data"
                          :project-relation-type="projectRelationType"
                          @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--对话标注状态下-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.DIALOGUE && doCheckMarkTypeIsActived(WorkingType.DIALOGUE)">
          <DialogueOption :currect-data="data"
                          :project-dialogue-type="projectDialogueType"
                          @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--翻译-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.TRANSLATION && doCheckMarkTypeIsActived(WorkingType.TRANSLATION)">
          <TranslationOpthon
              :currect-data="data"
              @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
        <!--语义解析-->
        <div class="flex_col flex_1 overflow_auto"
             v-if="marktypeCheckedType === WorkingType.TEXT2SQL && doCheckMarkTypeIsActived(WorkingType.TEXT2SQL)">
          <Text2sqlOption
              :currect-data="data"
              @doUpdateCurrectData="doUpdateCurrectData"
          />
        </div>
      </div>
      <!--  底部区域,句法分析-->
      <BaiduWords
          v-if="marktypeCheckedType === WorkingType.ENTITY && booleanShowBaiduWord"
          :currect-data="data"
          :project-mark-type="projectMarkType"
          :booleanShowBaiduWord.sync="booleanShowBaiduWord"
      />
    </div>
    <el-empty v-else description="稍等...数据准备中...">
      <el-button v-if="!project ||!project.working" type="primary" @click="openProjectView">激活工程</el-button>
      <el-button v-else-if="!isReady" type="warning" @click="openProjectView">数据异常，修复工程信息</el-button>
      <el-button v-else type="danger" @click="openProjectView">错误,请修复工程!</el-button>
    </el-empty>
  </div>
</template>
<script>
import db_utils               from '../libs/db_utils'
import SeparatorTestComponent from '../components/SeparatorTestComponent'
import BaiduWords             from '../components/BaiduWords'
import {Cons}                 from '../Constant'
import DialogueBoard     from '../components/mark_board/dialogue/DialogueBoard'
import DialogueOption    from '../components/mark_board/dialogue/DialogueOption'
import ClassifyOpthon    from '../components/mark_board/classify/ClassifyOpthon'
import BoardHeader                                                                                                                              from '../components/mark_board/BoardHeader'
import RelationOption                                                                                                                           from '../components/mark_board/relation/RelationOption'
import RelationBoard                                                                                                                            from '../components/mark_board/relation/RelationBoard'
import EntityOption                                                                                                                             from '../components/mark_board/entity/EntityOption'
import EntityBoard                                                                                                                              from '../components/mark_board/entity/EntityBoard'
import ClassifyBoard                                                                                                                            from '../components/mark_board/classify/ClassifyBoard'
import TranslationBoard                                                                                                                         from '../components/mark_board/translation/TranslationBoard'
import TranslationOpthon                                                                                                                        from '../components/mark_board/translation/TranslationOpthon'
import {fetchGet}                                                                                                                               from '../libs/axiosService'
import date_utils                                                                                                                               from '../libs/date_utils'
import {doDownloadProjectBasic, doDownloadProjectData, doDownloadProjectLabel, doUploadProjectBasic, doUploadProjectData, doUploadProjectLabel} from '../libs/sync_utils'
import {getCloudProjectLabels, getNumFromProject}                                                                                               from '../libs/project_utils'
import Text2sql                                                                                                                                 from '../components/mark_board/text2sql/Text2sqlBoard'
import Text2sqlOption                                                                                                                           from '../components/mark_board/text2sql/Text2sqlOpthon'
import Text2sqlBoard                                                                                                                            from '../components/mark_board/text2sql/Text2sqlBoard'

export default {
  name: 'Dashboard',
  components: {
    Text2sqlBoard,
    Text2sqlOption,
    Text2sql,
    TranslationOpthon,
    TranslationBoard,
    ClassifyBoard,
    EntityBoard,
    EntityOption,
    RelationBoard,
    RelationOption,
    BoardHeader,
    ClassifyOpthon,
    DialogueOption,
    DialogueBoard,
    BaiduWords,
    SeparatorTestComponent
  },
  data() {
    return {
      marktypeCheckedType: 0,
      //=========================== 本地数据库 ===========================
      isReady: false,
      isDbIniting: true, //数据库是否通知初始化完毕
      // ────────────────────────── 工程信息  ──────────────────────────
      // 当前工程信息,从数据库中加载
      project: JSON.parse(JSON.stringify(Cons.PROJECT_TEMPLATE)),
      // 当前文本信息,从数据库中加载
      data: JSON.parse(JSON.stringify(Cons.DATA_TEMPLATE)),
      // 解析project获取用户选择的标注类型列表
      userMarkTypes: [],
      // 工程所用的一种实体标注标签组,从数据库中加载
      projectMarkType: Object.freeze({datas: []}),
      // 工程所用的一种分类标签标签组,从数据库中加载
      projectGlobalType: Object.freeze({datas: []}),
      // 工程所用的一种关系标注标签组,从数据库中加载
      projectRelationType: Object.freeze({datas: []}),
      // 工程所用的一种对话标注标签组,从数据库中加载
      projectDialogueType: Object.freeze({datas: []}),
      // ────────────────────────── 其他信息  ──────────────────────────
      DataType: Cons.DataType,
      WorkingType: Cons.WorkingType,
      WorkingTypeName: Cons.WorkingTypeName,
      inputDataIndex: 0,
      showLoading:false,
      //=========================== 全局变量 ===========================
      booleanAutoFinish: true, //是否自动保存
      booleanShowBaiduWord: false,// 是否显示百度分词插件
      booleanShowProjectInfo: false,//是否显示更多工程信息
      isMouseSelectFinished: false,//是否鼠标选中结束,此时可以用快捷键标注
      //----------------------------------------------------
      Listeners:[]
    }
  },
  mounted() {
    console.log('Dashboard mounted')
    this.initEvent()
    this.initView()
    this.initData()

    /*db_utils.find(db_utils.PROJECTS_DB,{},(err,documents)=>{
      console.log(documents);
    })
    db_utils.find(db_utils.LABELS_DB,{},(err,documents)=>{
      console.log(documents);
    })
    db_utils.find(db_utils.DATAS_DB,{},(err,documents)=>{
      console.log(documents);
    })*/
  },
  destroyed() {
    console.log('Dashboard destroyed')
    if (this.project&&this.project.cloud){
      this.$events.emit('PROJECT_CLOSED',this.project.project_id,this.project.user_id,this.user_id)
    }
    this.removeEventListener(this.Listeners)

  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      const project_actived_listener = (project_id,project_owner_id,user_id) => {
        const request_param = {project_id,project_owner_id,user_id}
        // 检查是否有数据更新,本地同步记录与线上同步记录进行对比
        if (this.is_online){
          // 作业数据同步
          db_utils.pureFindOne(db_utils.SYNCLOGS_DB,{type:Cons.SyncLogType.PROJECT_DATAS,project_id:project_id,user_id:this.user_id}).sort({'updated_at':-1}).exec( (err, doc)=> {
            // 最新的本地作业数据变更记录
            if (!err && doc) {
              const local_setting_history = doc
              // 对比服务器,查询是否需要更新
              // 2.获取线上记录
              fetchGet('/api/data/history',request_param)
                  .then(
                      res => {
                        const sync_setting_history = res.data
                        // 判断是否应该自动同步
                        if (date_utils.isBefore(sync_setting_history.updated_at,local_setting_history.updated_at)){
                          // 服务器时间落后本地,即本地有新内容,要覆盖服务器
                          console.log('服务器时间落后本地,即本地有新内容,要覆盖服务器')
                          doUploadProjectData(request_param)
                        }else if (date_utils.isAfter(sync_setting_history.updated_at,local_setting_history.updated_at)){
                          // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                          console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                          doDownloadProjectData(request_param,this.showLoading)
                        }else {
                          console.log('data-无需变更')
                        }
                      })
            }
          })
          // 工程信息同步(只有管理员可以上传)
          db_utils.pureFindOne(db_utils.SYNCLOGS_DB,{type:Cons.SyncLogType.PROJECT_BASIC,project_id:project_id,user_id:this.user_id}).sort({'updated_at':-1}).exec( (err, doc)=> {
            // 最新的本地作业数据变更记录
            if (!err && doc) {
              const local_setting_history = doc
              // 对比服务器,查询是否需要更新
              // 2.获取线上记录
              fetchGet('/api/project/history',request_param)
                  .then(
                      res => {
                        const sync_setting_history = res.data
                        //判断是否管理员,可以上传和下载
                        if (this.user_id === project_owner_id){
                          // 判断是否应该自动同步
                          if (date_utils.isBefore(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间落后本地,即本地有新内容,要覆盖服务器
                            console.log('服务器时间落后本地,即本地有新内容,要覆盖服务器')
                            doUploadProjectBasic(request_param,this.showLoading)

                          }else if (date_utils.isAfter(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                            console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                            doDownloadProjectBasic(request_param,this.showLoading)
                          }else {
                            console.log('管理员-project-无需变更')
                          }
                        }else {
                          // 判断是否需要下载
                          if (date_utils.isAfter(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                            console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                            doDownloadProjectBasic(request_param,this.showLoading)
                          }else {
                            console.log('project-无需变更')
                          }
                        }

                      })
            }
          })
          // 工程标注同步(只有管理员可以上传)
          db_utils.pureFindOne(db_utils.SYNCLOGS_DB,{type:Cons.SyncLogType.PROJECT_LABEL,project_id:project_id,user_id:this.user_id}).sort({'updated_at':-1}).exec( (err, doc)=> {
            // 最新的本地作业数据变更记录
            if (!err && doc) {
              const local_setting_history = doc
              // 对比服务器,查询是否需要更新
              // 2.获取线上记录
              fetchGet('/api/label/history',request_param)
                  .then(
                      res => {
                        const sync_setting_history = res.data
                        //判断是否管理员,可以上传和下载
                        if (this.user_id === project_owner_id){
                          // 判断是否应该自动同步
                          if (date_utils.isBefore(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间落后本地,即本地有新内容,要覆盖服务器
                            console.log('服务器时间落后本地,即本地有新内容,要覆盖服务器')
                            doUploadProjectLabel(request_param)
                          }else if (date_utils.isAfter(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                            console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                            doDownloadProjectLabel(request_param,this.showLoading)
                          }else {
                            console.log('管理员-label-无需变更')
                          }
                        }else {
                          // 判断是否需要下载
                          if (date_utils.isAfter(sync_setting_history.updated_at,local_setting_history.updated_at)){
                            // 服务器时间超前本地,即服务器有新内容,要覆盖本地
                            console.log('服务器时间超前本地,即服务器有新内容,要覆盖本地')
                            doDownloadProjectLabel(request_param,this.showLoading)
                          }else {
                            console.log('label-无需变更')
                          }
                        }

                      })
            }
          })
        }
      }
      const ws_connect_success_listener = (text) => {
        // 连上了ws服务,并且是云服务
        if (this.project&&this.project.cloud){
          // 发送项目信息,加入聊天群组
          this.$events.emit('PROJECT_ACTIVED',this.project.project_id,this.project.project_owner_id,this.user_id)
        }
      }
      const db_init_finish_listener = (text) => {
        this.isDbIniting = true
        this.initData()
      }
      const NEWDATA_FROM_OTHER_listener = (data)=>{
        this.doUpdateCurrectData(data)
        // 如果是当前编辑页，就弹出提示
        if (data.index === this.data.index){
          this.data = data
          db_utils.findOne(db_utils.MEMBERS_DB,{project_id:this.project.project_id,user_id:data.editor_id}, (err, document) => {
            if (!err && document){
              this.showLocalNotification(document.name+':更新了前数据')

            }
          })
        }
      }

      this.Listeners = [
        ['PROJECT_ACTIVED',project_actived_listener],
        ['WS_CONNECT_SUCCESS',ws_connect_success_listener],
        ['DB_INIT_FINISH',db_init_finish_listener],
        ['NEWDATA_FROM_OTHER',NEWDATA_FROM_OTHER_listener]
      ]
      this.addEventListener(this.Listeners)
      // 按键事件监听
      document.onkeydown = (e) => {
        //事件对象兼容
        let evn = e || event || window.event
        let key = evn.keyCode || evn.which || evn.charCode
        //console.log(evn);
        //console.log(key);
        // 当前处于实体标注情况
        // 48:0,49:1...57:9
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        if ((evn.ctrlKey || evn.metaKey) && (key === 37 || key === 38)) {
          // 按下方向左/上键
          this.getLastData(e)
        }
        else if ((evn.ctrlKey || evn.metaKey) && (key === 39 || key === 40)) {
          //按下方向右/下键
          this.getNextData(e)
        }
        else if ((evn.ctrlKey || evn.metaKey) && key === 13) {
          // 按下回车
          this.onFinishButtonClick(e)
        }
      }
    },

    initView() {
      // 是否显示百度分词
      this.booleanShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1'
      // 是否自动保存
      this.booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1'
    },
    initData() {
      this.doLoadProject()
    },
    // ────────────────────────── 初始化 ──────────────────────────
    // 加载项目信息
    doLoadProject(){
      // 从数据库读取工程信息,工程数据信息,工程标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, {working: true}, (err, document) => {
        if (!err && document) {
          // 保存项目信息
          document.project_id = document._id
          this.project = document
          // 读取项目进度
          getNumFromProject(this.project).then(num=>{
            this.$set(this.project,'num',num)
          })
          // 加载项目下标注类型数据
          this.initMarkTypes(this.project)
          // 加载当前项目索引标注数据
          this.doLoadDataByIndex(this.project)
          // 发送项目信息,加入聊天群组
          if (this.project&&this.project.cloud){
            this.$events.emit('PROJECT_ACTIVED',this.project.project_id,this.project.project_owner_id,this.user_id)
          }

        }
      })
    },
    // 加载标注类型数据
    initMarkTypes(project) {
      this.userMarkTypes = []
      // 判断是否云服务
      if (project.cloud) {

        // 格式化，本地转云标签
        getCloudProjectLabels(project.project_id).then(({projectForm})=>{
          this.$set(this,'project',{...project,...projectForm})
        })

        // 按照云服务读取规则,从数据库中检索出标签
        db_utils.find(db_utils.LABELS_DB,{project_id:project.project_id},(err,docs)=>{
          //
          for (const doc of docs) {
            // 是否需要加载了文本翻译
            if (doc.type === Cons.WorkingType.TRANSLATION){
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.TRANSLATION)
              // 文本翻译没有标注组
              this.marktypeCheckedType = this.WorkingType.TRANSLATION

            }
            // 是否需要加载了语义解析
            if (doc.type === Cons.WorkingType.TEXT2SQL){
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.TEXT2SQL)
              // 文本翻译没有标注组
              this.marktypeCheckedType = this.WorkingType.TEXT2SQL

            }
            // 是否需要加载了分类标签组
            if (doc.type === Cons.WorkingType.CLASSIFY) {
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.CLASSIFY)
              // 获取数据库中对应标注组
              this.projectGlobalType = Object.freeze(doc)
              this.marktypeCheckedType = this.WorkingType.CLASSIFY
            }
            // 是否需要加载了对话标签组
            if (doc.type === Cons.WorkingType.DIALOGUE) {
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.DIALOGUE)
              // 获取数据库中对应标注组
                this.projectDialogueType = Object.freeze(doc)
                this.marktypeCheckedType = this.WorkingType.DIALOGUE
            }
            // 是否需要加载了关系标注标签组
            if (doc.type === Cons.WorkingType.RELATION) {
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.RELATION)
              // 获取数据库中对应标注组
                this.projectRelationType = Object.freeze(doc)
                this.marktypeCheckedType = this.WorkingType.RELATION
            }
            // 是否需要加载了实体标注标签组
            if (doc.type === Cons.WorkingType.ENTITY) {
              // 标记用户加载了此类标注
              this.userMarkTypes.push(this.WorkingType.ENTITY)
              // 获取数据库中对应标注组
                this.projectMarkType = Object.freeze(doc)
                this.marktypeCheckedType = this.WorkingType.ENTITY
            }
          }
          // 优先显示实体标注
          if (this.userMarkTypes.indexOf( Cons.WorkingType.ENTITY)!==-1) {
            this.marktypeCheckedType = this.WorkingType.ENTITY
          }
        })
      }
      else {
        // 是本地服务
      // 是否需要加载了文本翻译
      if (project.translationId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.TRANSLATION)
        // 文本翻译没有标注组
        this.marktypeCheckedType = this.WorkingType.TRANSLATION

      }
      // 是否需要加载了语义解析
      if (project.text2sqlId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.TEXT2SQL)
        // 文本翻译没有标注组
        this.marktypeCheckedType = this.WorkingType.TEXT2SQL

      }
      // 是否需要加载了分类标签组
      if (project.globalTypeId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.CLASSIFY)
        // 获取数据库中对应标注组
        db_utils.findOne(db_utils.LABELS_DB, {_id: this.project.globalTypeId}, (err, document) => {
          this.projectGlobalType = Object.freeze(document)
          this.marktypeCheckedType = this.WorkingType.CLASSIFY
        })
      }
      // 是否需要加载了对话标签组
      if (project.dialogueTypeId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.DIALOGUE)
        // 获取数据库中对应标注组
        db_utils.findOne(db_utils.LABELS_DB, {_id: this.project.dialogueTypeId}, (err, document) => {
          this.projectDialogueType = Object.freeze(document)
          this.marktypeCheckedType = this.WorkingType.DIALOGUE
        })
      }
      // 是否需要加载了关系标注标签组
      if (project.relationTypeId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.RELATION)
        // 获取数据库中对应标注组
        db_utils.findOne(db_utils.LABELS_DB, {_id: this.project.relationTypeId}, (err, document) => {
          this.projectRelationType = Object.freeze(document)
          this.marktypeCheckedType = this.WorkingType.RELATION
        })
      }
      // 是否需要加载了实体标注标签组
      if (project.markTypeId) {
        // 标记用户加载了此类标注
        this.userMarkTypes.push(this.WorkingType.ENTITY)
        // 获取数据库中对应标注组
        db_utils.findOne(db_utils.LABELS_DB, {_id: this.project.markTypeId}, (err, document) => {
          this.projectMarkType = Object.freeze(document)
          this.marktypeCheckedType = this.WorkingType.ENTITY
        })
      }
    }
    },
    // 通过索引加载标注数据
    doLoadDataByIndex(project) {
      if (project && project.project_id) {
        db_utils.findOne(db_utils.DATAS_DB, {
          project_id: project.project_id,
          index: project.currectDataIndex || 0
        }, (err, document) => {
          if (!err && document) {
            this.data = document
            this.isReady = true
            // 更新当前索引
            this.doUpdateCurrectProject(project.project_id, project.currectDataIndex,null)
          }
          else {
            this.isReady = false
            this.$message.error('作业数据读取错误')
          }
        })
      }
      else {
        this.isReady = false
        this.$message.error('项目错误,无法找到id')
      }
    },
    // ────────────────────────── 更新数据库  ──────────────────────────
    // 更新当前数据信息
    doUpdateCurrectData(data) {
      db_utils.update(db_utils.DATAS_DB, {
        project_id: data.project_id,
        index: data.index
      }, data)
      // 云服务才有待同步作业数据
      if (this.project.cloud){
        db_utils.insert(db_utils.DATALOGS_DB,{
          user_id:this.user_id,
          project_id:this.project.project_id,
          project_owner_id:this.project.user_id,
          data:data
        },(err)=>{
          if (!err){
            // 插入一条同步记录
            this.doLocalSync(Cons.SyncLogType.PROJECT_DATAS,this.project.project_owner_id,this.project.project_id)
          }
        })
      }

    },
    // 更新当前项目信息
    doUpdateCurrectProject(_id, _index) {
      // 更新当前索引
      if (_index){
        db_utils.update(db_utils.PROJECTS_DB, {_id: _id}, {
          $set: {'currectDataIndex': _index || 0}
        }, true)
      }
    },
    // ────────────────────────── UI操作  ──────────────────────────
    // ────────────────────────── header 导航  ──────────────────────────
    // 是否标记为无效数据
    onWrongCheckboxChange(_status, event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      // 当前状态是标注中,才修改两个数据库
      this.data.wrong = _status ? 1 : 0
      this.doUpdateCurrectData(this.data)
    },
    //点击编辑按钮
    onModifyButtonClick() {
      this.$prompt('注意!注意!注意!\n修改文本内容,可能影响已标注结果!', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            roundButton: true,
            inputType: 'textarea',
            inputValue: this.data.content
          })
          .then(({value}) => {
            //console.log(value)
            this.data.content = value
            this.doUpdateCurrectData(this.data)
            //this.$emit('doUpdateCurrectData',this.data)
            // 重新读取数据
            this.doLoadDataByIndex(this.project)
            //this.$emit('doLoadDataByIndex',this.project.currectDataIndex)
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消修改'
            })
          })
    },
    // 点击激活按钮
    onActiveButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === this.DataType.FINISHED) {
        this.data.status = this.DataType.MARKING
        this.doUpdateCurrectData(this.data)
        this.$events.emit('onActiveButtonClick', '')
      }
    },
    // 点击保存按钮,修改数据库状态和工程记录
    onFinishButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === this.DataType.MARKING) {
        this.data.status = this.DataType.FINISHED
        this.doUpdateCurrectData(this.data)
        this.$events.emit('onFinishButtonClick', '')
      }
    },
    // 用户手动输入页码索引
    doChangeInputDataIndex(inputDataIndex) {
      if (inputDataIndex > 0 && inputDataIndex <= this.project.num.total) {
        // 判断是否需要自动保存
        if (this.booleanAutoFinish) {
          // 自动保存
          this.onFinishButtonClick({isTrusted: true})
        }
        this.project.currectDataIndex = inputDataIndex - 1
        this.doLoadDataByIndex(this.project)
        // 当前状态是标注中,提示保存
        if (this.data.status === this.DataType.MARKING) {
          this.$message.info('您有数据未保存,建议在偏好设置中开启自动保存')
        }
      }
      else {
        this.$message.error('错误位置')
      }
    },
    // 上一条
    getLastData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === 0) {
        //防止点击两次
        return
      }
      // 判断是否需要自动保存
      if (this.booleanAutoFinish) {
        // 自动保存
        this.onFinishButtonClick({isTrusted: true})
      }
      // 读取数据
      this.project.currectDataIndex = this.project.currectDataIndex - 1
      this.doLoadDataByIndex(this.project)
      // 当前状态是标注中,提示保存
      if (this.data.status === this.DataType.MARKING) {
        this.$message.info('您有数据未保存,建议在偏好设置中开启自动保存')
      }
    },
    // 下一条
    getNextData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === this.project.num.total - 1) {
        //防止点击两次
        return
      }
      // 判断是否需要自动保存
      if (this.booleanAutoFinish) {
        // 自动保存
        this.onFinishButtonClick({isTrusted: true})
      }
      // 读取数据
      this.project.currectDataIndex = this.project.currectDataIndex + 1
      this.doLoadDataByIndex(this.project)
      // 当前状态是标注中,提示保存
      if (this.data.status === this.DataType.MARKING) {
        this.$message.info('您有数据未保存,建议在偏好设置中开启自动保存')
      }
    },
    // 下拉选择某一条
    onCurrentPageChange(index) {
      this.project.currectDataIndex = index - 1
      this.doLoadDataByIndex(this.project)
    },
    // ────────────────────────── 分割线  ──────────────────────────
    // 打开工程工程页面
    openProjectView() {
      this.$events.emit('OPEN_PROJECT')
    },
    // 判断当前标注类型是否激活
    doCheckMarkTypeIsActived(_type) {
      return this.marktypeCheckedType === _type
    },
    // 用户切换标注类型
    onMarkTypeChanged(_type) {
      // 判断是否可以标注
      if (this.data.status !== this.DataType.MARKING) {
        this.$message({
          type: 'error',
          message: '当前数据已保存,请点击[激活按钮]解除锁定'
        })
      }
    },
  }
}
</script>
<style lang="scss">
@import '../globals.scss';

#content{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content-fixed-header {
  left: 0;
  right: 0;
  position: fixed;
  z-index: 99;
  background-color: #ffffff;
}

.main_container{
  height: 100%;
  width: 100%;
}


.main_left_warp {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 150px;
  left: 10px;
  bottom: 10px;
  right: 370px;

  .main_left_warp_header {
    .el-checkbox__label {
      font-size: 12px !important;
    }

    .status_tips {
      margin-left: 10px;

      .el-link--inner {
        font-size: 12px !important;
      }
    }


  }


}

.main_right_warp {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 150px;
  bottom: 10px;
  right: 10px;
  width: 350px;

  .marktype_checkbox_container {
    width: 98%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .marktype_checkbox {
    flex: 1;
    margin: 0 10px 10px 0;
    width: calc((100% - 10px) / 2);
    min-width: calc((100% - 10px) / 2);
    max-width: calc((100% - 10px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
  }


}


.mark_page_button {
  border: none;
}

.element::-webkit-scrollbar {
  width: 0 !important;
}

.element {
  -ms-overflow-style: none;
}

.element {
  overflow: auto;
}


.el-collapse-item__header {
  height: auto;
  line-height: initial;
  padding: 5px;
}

.selectedEntitys {
  display: flex;
  flex-wrap: wrap;
}

.el-dropdown-menu {
  max-width: 243px;
  max-height: 500px;
  overflow-y: scroll;
}

.el-dropdown-menu__item {
  display: inline-block;
}

.el-dropdown-menu__item span {
  min-width: 205px;
  display: inline-block;
}


.el-tag {
  border: none !important;
  white-space: normal;
  height: auto;
}

.el-radio {
  margin-right: 0;
}

.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
</style>