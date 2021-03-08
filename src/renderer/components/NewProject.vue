<template>
  <div>
    <el-dialog
      title="新建项目"
      :visible.sync="showDialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="projectForm" :model="projectForm" label-width="100px">
        <el-form-item label="项目名称" required>
          <el-input
            v-model="projectForm.name"
            clearable
            :maxlength="10"
            show-word-limit
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            clearable
            v-model="projectForm.description"
            placeholder="请填写描述,方便理解和解释"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="标注类型" required>
          <el-select
            v-model="projectForm.markTypeId"
            @change="onMarkTypeChanged"
            placeholder="请选择标注类型,自定义标注请在对应管理页面配置"
          >
            <el-option
              v-for="(markType, index) in markTypeDatas"
              :key="index"
              :label="`${markType.name} : ${markType.content}`"
              :value="markType._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据文件" required v-loading="isReadingFile">
          <el-upload
            action="/"
            :file-list="fileList"
            :on-change="handleChange"
            :limit="1"
            accept=".txt,.TXT"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :multiple="false"
          >
            <div class="flex_row align_center">
              <el-button size="small" type="danger">点击上传txt数据</el-button>
              <span class="w20"></span>
              <span slot="tip" class="el-upload__tip"
                >只能上传txt文件，<span style="font-weight: bold">按utf-8编码格式,按行</span>读取txt数据</span
              >
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="uploadOriginalDatas.length" label="数据预览">
          <div class="file_upload_tips">
            解析成功!总共 <span style="font-weight: bold">{{ uploadOriginalDatas.length }}</span>
            条数据.前5条:
          </div>
          <div style="overflow:hidden;text-overflow:ellipsis;" v-for="(item, index) in uploadOriginalDatas.slice(0, 5)">
            {{ index + 1 }} . {{ item }}
          </div>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="primary" :loading="isReadingFile" @click="saveNewProjectClick">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';
import fs from 'fs';
import readline from 'readline';

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
      projectForm: {
        name: '',
        dataFilePath: '',
        currectDataIndex: 0,
        num: {
          total: 0,
          marked: 0,
          marking: 0,
          wrong: 0,
        },
        markTypeId: '',
        markTypeName: '',
        description: '',
        working: false, //当前状态是否工作中/
      },
      fileList: [], //上传组件,文件预览
      isReadingFile: false, //是否正在解析文件
      markTypeDatas: [], //从数据库中读取的标注类型列表
      uploadOriginalDatas: [], // 按行解析完,存入数组,准备处理
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
    },
    beforeAvatarUpload(file) {
      const isTxt = file.type === 'txt';
      const isLt500M = file.size / 1024 / 1024 < 500;

      if (!isTxt) {
        this.$message.error('上传文件只能是 txt 格式!');
      }
      if (!isLt500M) {
        this.$message.error('上传文件大小不能超过 500MB!');
      }
      return isTxt && isLt500M;
    },
    checkedNewProjectItems() {
      if (!this.projectForm.name) {
        this.showMessageWithText('请填写项目名称');
        return false;
      } else if (!this.projectForm.markTypeId) {
        this.showMessageWithText('请选择标注类型');
        return false;
      } else if (!this.projectForm.dataFilePath && this.uploadOriginalDatas.length <= 0) {
        this.showMessageWithText('请按要求上传数据文件');
        return false;
      }
      return true;
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      const path = file.raw.path;
      if (path) {
        this.isReadingFile = true;
        // 保存文件路径到项目form,用于后续存储
        this.projectForm.dataFilePath = path;
        //用来存储结果的变量
        this.uploadOriginalDatas = [];

        //创建文件流
        const readstream = fs.createReadStream(path);
        //创建逐行读取
        const rl = readline.createInterface({
          input: readstream,
        });

        rl.on('line', (data) => {
          this.uploadOriginalDatas.push(data);
        }).on('close', () => {
          //结束后调用的
          this.isReadingFile = false;
        });
      }
    },
    // ────────────────────────── 选择文件上传组件 ──────────────────────────
    handleExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`,
        type: 'warning',
        offset: 70,
      });
    },
    handleRemove(files, fileList) {
      this.isReadingFile = false;
      this.uploadOriginalDatas = [];
    },
    initData() {
      db_utils.find(db_utils.MARK_TYPES_DB, {}, (err, documents) => {
        this.markTypeDatas = [];
        for (const document of documents) {
          this.markTypeDatas.unshift(document);
        }
      });
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // 选择标注类型
    onMarkTypeChanged(_markTypeId) {
      // 通过id获取name
      db_utils.findOne(db_utils.MARK_TYPES_DB, { _id: _markTypeId }, (err, document) => {
        if (document) {
          this.projectForm.markTypeName = document.name;
        }
      });
    },

    // 保存数据到数据库
    saveDatas(project_id) {
      // 字段: _id,content,status,project_id,tags[{name,tag,start,end}]
      let datas = [];
      this.uploadOriginalDatas.forEach((content, index) => {
        datas.push({
          project_id: project_id,
          index: index,
          content: content,
          status: 0,
          tags: [],
        });
      });
      db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
        this.showMessageWithText('保存成功!', 'success');
        this.$events.emit('NEW_PROJECT_SUCESS', project_id);
        this.$emit('cancelButtonClick');
      });
    },
    // ────────────────────────── 新建项目 ──────────────────────────
    // 保存按钮点击
    saveNewProjectClick() {
      // 1.校验 2.保存数据库 3通知更新
      if (this.checkedNewProjectItems()) {
        // save to db
        // 保存到数据库

        // 1.保存数据 得到项目id , 得到标注类型名称 2.保存项目
        this.projectForm.num.total = this.uploadOriginalDatas.length; // 设置总数
        db_utils.insert(db_utils.PROJECTS_DB, this.projectForm, (err, newDoc) => {
          //console.log('project new:');
          //console.log(newDoc);
          this.saveDatas(newDoc._id);
        });
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
