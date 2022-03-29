<template>
  <div>
    <el-dialog title="修改项目" :visible.sync="showDialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="projectForm" :model="projectForm" label-width="140px">
        <el-form-item label="项目名称" required>
          <el-input v-model="projectForm.name" clearable :maxlength="10" show-word-limit placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="实体标注标签组" required>
          <el-select v-model="projectForm.markTypeId" @change="onMarkTypeChanged" placeholder="请选择实体标注标签组,自定义标注请在对应管理页面配置">
            <el-option v-for="(markType, index) in markTypeDatas" :key="index" :label="`${markType.content}`" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input clearable v-model="projectForm.description" placeholder="请填写描述,方便理解和解释" maxlength="80" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="文本分类标签组">
          <el-select v-model="projectForm.globalTypeId" @change="onGlobalTypeChanged" placeholder="下拉选择需要的文本分类标签组">
            <el-option v-for="(markType, index) in globalTypeDatas" :key="index" :label="`${markType.content}`" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关系标注标签组">
          <el-select v-model="projectForm.relationTypeId" @change="onRelationTypeChanged" placeholder="下拉选择需要的关系标注标签组">
            <el-option v-for="(markType, index) in relationTypeDatas" :key="index" :label="`${markType.content}`" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对话标注标签组">
          <el-select v-model="projectForm.dialogueTypeId" @change="onDialogueTypeChanged" placeholder="下拉选择需要的对话标注标签组">
            <el-option v-for="(markType, index) in dialogueTypeDatas" :key="index" :label="`${markType.content}`" :value="markType._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="warning" @click="saveNewProjectClick">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';
import fs from 'fs';
import readline from 'readline';

export default {
  name: 'EditProject',
  props: {
    showDialog: {
      // 类型限制
      type: Boolean,
      // 默认值
      default: false,
      required: true,
    },
    projectForm: {
      _id: '',
      name: '',
      markTypeId: '',
      markTypeName: '',
      globalTypeId: '',
      globalTypeName: '',
      relationTypeId: '',
      relationTypeName: '',
      dialogueTypeId: '',
      dialogueTypeName: '',
      description: '',
    },
  },
  data() {
    return {
      markTypeDatas: [], //从数据库中读取的实体标注标签组列表
      globalTypeDatas: [], //从数据库中读取的文本分类标签组列表
      relationTypeDatas: [], //从数据库中读取的关系标注标签组列表
      dialogueTypeDatas: [], //从数据库中读取的对话标注标签组列表
    };
  },
  mounted() {
    this.initEvent();
    this.initData();
  },
  methods: {
    initEvent() {
      this.$events.on('MARKTYPE_CHANGED', (text) => {
        this.initData();
      });
      this.$events.on('GLOBALTYPE_CHANGED', (text) => {
        this.initData();
      });
      this.$events.on('RELATIONTYPE_CHANGED', (text) => {
        this.initData();
      });
      this.$events.on('DIALOGUESETTING_CHANGED', (text) => {
        this.initData();
      });
    },
    checkedNewProjectItems() {
      if (!this.projectForm.name) {
        this.showMessageWithText('请填写项目名称');
        return false;
      }
      return true;
    },
    // ────────────────────────── 选择文件上传组件 ──────────────────────────
    initData() {
      db_utils.find(db_utils.MARK_TYPES_DB, {}, (err, documents) => {
        this.markTypeDatas = [];
        for (const document of documents) {
          this.markTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.GLOBAL_TYPES_DB, {}, (err, documents) => {
        this.globalTypeDatas = [];
        for (const document of documents) {
          this.globalTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.RELATION_TYPES_DB, {}, (err, documents) => {
        this.relationTypeDatas = [];
        for (const document of documents) {
          this.relationTypeDatas.unshift(document);
        }
      });
      db_utils.find(db_utils.DIALOGUE_TYPES_DB, {}, (err, documents) => {
        this.dialogueTypeDatas = [];
        for (const document of documents) {
          this.dialogueTypeDatas.unshift(document);
        }
      });
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // 选择实体标注标签组
    onMarkTypeChanged(_markTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.MARK_TYPES_DB, { _id: _markTypeId }, (err, document) => {
        if (document) {
          this.projectForm.markTypeName = document.content;
        }
      });
    },
    onGlobalTypeChanged(_globalTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.GLOBAL_TYPES_DB, { _id: _globalTypeId }, (err, document) => {
        if (document) {
          this.projectForm.globalTypeName = document.content;
        }
      });
    },
    onRelationTypeChanged(_relationTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.RELATION_TYPES_DB, { _id: _relationTypeId }, (err, document) => {
        if (document) {
          this.projectForm.relationTypeName = document.content;
        }
      });
    },
    onDialogueTypeChanged(_dialogueTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.DIALOGUE_TYPES_DB, { _id: _dialogueTypeId }, (err, document) => {
        if (document) {
          this.projectForm.dialogueTypeName = document.content;
        }
      });
    },

    // ────────────────────────── 新建项目 ──────────────────────────
    // 保存按钮点击
    saveNewProjectClick() {
      // 1.校验 2.保存数据库 3通知更新
      if (this.checkedNewProjectItems()) {
        // save to db
        // 保存到数据库
        db_utils.update(db_utils.PROJECTS_DB, { _id: this.projectForm._id }, this.projectForm);
        this.showMessageWithText('修改成功!', 'success');
        this.$events.emit('EDIT_PROJECT_SUCESS', this.projectForm._id);
        this.$emit('cancelButtonClick');
      }
    },
    showMessageWithText(text, type = 'error') {
      this.$message({
        message: text,
        type: type,
        center: true,
        offset: 70,
      });
    },
    cancelButtonClick() {
      this.$emit('cancelButtonClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';
.el-select {
  width: 100%;
}
</style>
