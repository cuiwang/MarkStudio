<template>
  <div>
    <el-dialog title="导入工程" :visible.sync="showDialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="工程文件" required>
          <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
            <el-upload
              action="/"
              :file-list="fileList"
              :on-change="handleChange"
              :limit="1"
              accept=".project,.PROJECT"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :multiple="false"
            >
              <div class="flex_row align_center">
                <el-button size="small" type="info">点击上传工程文件数据</el-button>
                <span class="w20"></span>
                <span slot="tip" class="el-upload__tip">
                  只能上传
                  <span style="font-weight: bold">.project</span>
                  文件
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item v-if="projectDatas.length" label="数据预览">
          <div class="file_upload_tips">
            解析成功!总共
            <span style="font-weight: bold; color: #ff7c00">{{ projectDatas.length }}</span>
            条数据.
          </div>
        </el-form-item>
        <el-divider/>
        <el-form-item label="工程名称" required>
          <el-input v-model="projectForm.name" clearable :maxlength="10" show-word-limit placeholder="请输入工程名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input clearable v-model="projectForm.description" placeholder="请填写描述,方便理解和解释" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-divider/>
        <el-form-item label="标注类型(多选)" required>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="type in Object.values(WorkingTypeName)" :key="type" :label="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item required label="实体标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.ENTITY])">
          <el-select v-model="projectForm.markTypeId" @change="onEntityTypeChanged" placeholder="请选择实体标注标签组,自定义标注请在对应管理页面配置">
            <el-option v-for="(markType, index) in markTypeDatas" :key="index" :label="markType.name" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="文本分类标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.CLASSIFY])">
          <el-select v-model="projectForm.globalTypeId" @change="onGlobalTypeChanged" placeholder="下拉选择需要的文本分类标签组">
            <el-option v-for="(markType, index) in globalTypeDatas" :key="index" :label="markType.name" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="关系标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.RELATION])">
          <el-select v-model="projectForm.relationTypeId" @change="onRelationTypeChanged" placeholder="下拉选择需要的关系标注标签组">
            <el-option v-for="(markType, index) in relationTypeDatas" :key="index" :label="markType.name" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="对话标注标签组" v-if="doCheckMarkTypeIsActived(WorkingTypeName[WorkingType.DIALOGUE])">
          <el-select v-model="projectForm.dialogueTypeId" @change="onDialogueTypeChanged" placeholder="下拉选择需要的对话标注标签组">
            <el-option v-for="(markType, index) in dialogueTypeDatas" :key="index" :label="markType.name" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="primary" :loading="isReadingFile" @click="saveImportProjectClick">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../../libs/db_utils';
import fs       from 'fs';
import readline from 'readline';
import {Cons}   from '../../Constant'

export default {
  name: 'ImportProject',
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
      projectForm: Cons.PROJECT_TEMPLATE,
      projectDatas: [],
      projectMarkType: {},
      projectRelationType: {},
      projectGlobalType: {},
      projectDialogueType: {},
      fileList: [], //上传组件,文件预览
      isReadingFile: false, //是否正在解析文件
      markTypeDatas: [], //从数据库中读取的实体标注标签组列表
      globalTypeDatas: [], //从数据库中读取的文本分类标签组列表
      relationTypeDatas: [], //从数据库中读取的关系标注标签组列表
      dialogueTypeDatas: [], //从数据库中读取的对话标注标签组列表
      uploadOriginalDatas: [], // 按行解析完,存入数组,准备处理
      // ────────────────────────── 分割线  ──────────────────────────
      checkList: [],
      WorkingType: Cons.WorkingType,
      WorkingTypeName: Cons.WorkingTypeName
    };
  },
  mounted() {
    this.initData();
  },
  methods: {

    checkedNewProjectItems() {
      if (!this.projectForm.name) {
        this.showMessageWithText('请填写工程名称');
        return false;
      }else if (this.checkList.length === 0){
        this.showMessageWithText('请选择标注类型')
        return false
      }
      return true;
    },
    // 判断当前标注类型是否激活
    doCheckMarkTypeIsActived(_type) {
      return this.checkList.indexOf(_type) !== -1
    },

    // ────────────────────────── 选择文件上传组件 ──────────────────────────
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.isReadingFile = true
      const path = file.raw.path;
      if (path) {
        var stream = fs.createReadStream(path),
          data = '';
        stream.on('data', (params) => {
          data += params;
        });
        stream.on('end', () => {
          //结束后调用的
          this.projectForm = JSON.parse(data).project;
          this.projectForm.working = false;
          this.projectDatas = JSON.parse(data).datas;
          this.projectMarkType = JSON.parse(data).projectMarkType;
          this.projectRelationType = JSON.parse(data).projectRelationType;
          this.projectGlobalType = JSON.parse(data).projectGlobalType;
          this.projectDialogueType = JSON.parse(data).projectDialogueType;

            // 导入标注信息
            if (this.projectForm.markTypeId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.ENTITY])
              delete this.projectMarkType._id;
              this.projectMarkType.type = Cons.WorkingType.ENTITY
              this.projectMarkType.description = '(工程导入)' + this.projectMarkType.description;
              // 保存到数据库
              db_utils.insert(db_utils.LABELS_DB, this.projectMarkType, (err, newDoc) => {
                this.projectForm.markTypeId = newDoc._id;
              });
            }
            if (this.projectForm.globalTypeId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.CLASSIFY])
              delete this.projectGlobalType._id;
              this.projectGlobalType.type = Cons.WorkingType.CLASSIFY
              this.projectGlobalType.description = '(工程导入)' + this.projectGlobalType.description;
              // 保存到数据库
              db_utils.insert(db_utils.LABELS_DB, this.projectGlobalType, (err, newDoc) => {
                this.projectForm.globalTypeId = newDoc._id;
              });
            }
            if (this.projectForm.relationTypeId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.RELATION])
              delete this.projectRelationType._id;
              this.projectRelationType.type = Cons.WorkingType.RELATION
              this.projectRelationType.description = '(工程导入)' + this.projectRelationType.description;
              // 保存到数据库
              db_utils.insert(db_utils.LABELS_DB, this.projectRelationType, (err, newDoc) => {
                this.projectForm.relationTypeId = newDoc._id;
              });
            }
            if (this.projectForm.dialogueTypeId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.DIALOGUE])
              delete this.projectDialogueType._id;
              this.projectDialogueType.type = Cons.WorkingType.DIALOGUE
              this.projectDialogueType.description = '(工程导入)' + this.projectDialogueType.description;
              // 保存到数据库
              db_utils.insert(db_utils.LABELS_DB, this.projectDialogueType, (err, newDoc) => {
                this.projectForm.dialogueTypeId = newDoc._id;
              });
            }
            if (this.projectForm.translationId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.TRANSLATION])
            }
            if (this.projectForm.text2sqlId) {
              this.checkList.push(this.WorkingTypeName[this.WorkingType.TEXT2SQL])
            }

          this.initData();
        });
      }
      this.isReadingFile = false

    },
    handleExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: 'warning',
        offset: 70,
      });
    },
    handleRemove(files, fileList) {
      this.projectForm = {};
    },
    beforeAvatarUpload(file) {
      const isTxt = file.type === 'project';
      const isLt500M = file.size / 1024 / 1024 < 500;

      if (!isTxt) {
        this.$message.error('上传文件只能是 project 格式!');
      }
      if (!isLt500M) {
        this.$message.error('上传文件大小不能超过 500MB!');
      }
      return isTxt && isLt500M;
    },
    // ›››››››››››››››››››››››››››› 分割线 ‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹

    initData() {
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.ENTITY
      }, (err, documents) => {
        this.markTypeDatas = [];
        for (const document of documents) {
          this.markTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.CLASSIFY
      }, (err, documents) => {
        this.globalTypeDatas = [];
        for (const document of documents) {
          this.globalTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.RELATION
      }, (err, documents) => {
        this.relationTypeDatas = [];
        for (const document of documents) {
          this.relationTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.LABELS_DB, {
        type:Cons.WorkingType.DIALOGUE
      }, (err, documents) => {
        this.dialogueTypeDatas = [];
        for (const document of documents) {
          this.dialogueTypeDatas.unshift(document);
        }
      });
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // 选择实体标注标签组
    onEntityTypeChanged(_markTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, { _id: _markTypeId }, (err, document) => {
        if (document) {
          this.projectForm.markTypeName = document.name;
        }
      });
    },
    onGlobalTypeChanged(_globalTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, { _id: _globalTypeId }, (err, document) => {
        if (document) {
          this.projectForm.globalTypeName = document.name;
        }
      });
    },
    onRelationTypeChanged(_relationTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, { _id: _relationTypeId }, (err, document) => {
        if (document) {
          this.projectForm.relationTypeName = document.name;
        }
      });
    },
    onDialogueTypeChanged(_dialogueTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.LABELS_DB, { _id: _dialogueTypeId }, (err, document) => {
        if (document) {
          this.projectForm.dialogueTypeName = document.name;
        }
      });
    },


    // 保存数据到数据库
    saveDatas(project_id) {
      // 字段: _id,content,status,project_id,tags[{name,tag,start,end}]
      let datas = [];

      this.projectDatas.forEach((data, index) => {
        delete data._id;
        data.project_id = project_id;
        datas.push(data);
      });

      db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
        this.showMessageWithText('保存成功!', 'success');
        this.$events.emit('NEW_PROJECT_SUCESS', project_id);
        this.$emit('cancelButtonClick');
      });
    },
    // ────────────────────────── 新建工程 ──────────────────────────
    // 保存按钮点击
    saveImportProjectClick() {
      // 1.校验 2.保存数据库 3通知更新
      if (this.checkedNewProjectItems()) {
        this.doMarkTypeReform()

        // save to db
        // 保存到数据库
        // 1.保存数据 得到工程id , 得到实体标注标签组名称 2.保存工程
        delete this.projectForm._id;
        delete this.projectForm.created_at;
        delete this.projectForm.updated_at;
        this.projectForm.dataSyncToLocalNum = ''
        this.projectForm.dataSyncToLocalTime = ''
        this.projectForm.dataSyncToRemoteNum = ''
        this.projectForm.dataSyncToRemoteTime = ''

        db_utils.insert(db_utils.PROJECTS_DB, this.projectForm, (err, newDoc) => {
          // console.log('project new:');
          // console.log(newDoc);
          this.saveDatas(newDoc._id);
        });
      }
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
    },
    cancelButtonClick() {
      this.$emit('cancelButtonClick');
    },
  },
};
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
