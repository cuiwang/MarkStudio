<template>
  <div>
    <el-dialog :title="`项目 ${project.name} 导出提示`" :visible.sync="showDialog">
      <el-form v-if="project" label-width="100px" :loading="isWorking">
        <el-form-item label="标注进度">
          <div class="flex_col" style="text-align: left">
            <el-progress :percentage="getPercentage(project)"></el-progress>
            <span
              >{{ project.num.marked }}/{{ project.num.marking }}/{{ project.num.wrong }}/{{ project.num.total }}
              <el-tooltip class="item" effect="dark" content="标注中/无法标注/已完成/总数" placement="top">
                <i class="el-icon-question description_text_color"></i> </el-tooltip
            ></span>
          </div>
        </el-form-item>
        <el-form-item label="导出设置">
          <div class="flex_col" style="text-align: left">
            <el-radio-group v-model="isExportAll" @change="onExportSettingChange">
              <el-radio label="1" border>全部导出</el-radio>
              <el-radio label="0" border>仅已完成</el-radio>
            </el-radio-group>
            <div class="h10"></div>
            <el-radio-group v-model="isExportContent" @change="onExportSettingChange">
              <el-radio label="1" border>导出原始文本</el-radio>
              <el-radio label="0" border>不导出原始文本</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="导出预览" v-if="exportData.length > 0">
          <div
            class="description_text_color description_text_size"
            style="background-color: #eeeeee;padding: 10px;box-sizing: border-box;line-height: 20px;text-align: left"
          >
            预览第一条导出数据.字段说明: index:数据序号(从0开始). content:原始文本(截取前30字,可在导出设置中隐藏).
            tags:标记的数组. tags.name:标注名. tags.tag:标注标签. tags.content:标注的内容.
            tags.start:标注的开始(从0开始). tags.end:标注的结束( tags.end- tags.start = 标注长度)
          </div>
          <div style="background-color: #f5f5f5;padding: 10px;box-sizing: border-box;text-align: left">
            [ {{ previewData }} ... ]
          </div>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button type="primary" :loading="isSaving" @click="saveJson">导出JSON</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';
import FileSaver from 'file-saver';

export default {
  name: 'ExprotProject',
  props: {
    project: { type: Object, default: null, required: true },
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
      isExportAll: '1', //是否全部导出
      isExportContent: '1', //是否导出原始文本
      exportData: [],
      isSaving: false,
      isWorking: false,
    };
  },
  computed: {
    previewData() {
      if (this.exportData.length > 0) {
        const _data = this.exportData.slice(0, 1)[0];
        if (this.isExportContent === '1') {
          _data.content = _data.content.slice(0, 30);
        }
        return _data;
      }
      return '';
    },
  },
  watch: {
    project(value) {
      if (this.project._id) {
        this.getCurrectProjectDataByIndex(this.project._id);
      }
    },
  },

  mounted() {},
  methods: {
    cancelButtonClick() {
      this.$emit('cancelButtonClick');
    },
    getCurrectProjectDataByIndex(_id) {
      this.isWorking = true;
      let query = {
        project_id: _id,
      };
      if (this.isExportAll === '0') {
        //仅导出已完成
        query.status = 1;
      }

      const projections = {
        _id: 0,
        index: 1,
        content: 1,
        tags: 1,
      };

      db_utils
        .generate_find(db_utils.DATAS_DB, query)
        .sort({ index: 1 })
        .projection(projections)
        .exec((err, docs) => {
          if (docs) {
            this.exportData = docs.map((doc) => {
              let data = {
                index: doc.index,
                tags: doc.tags.map((tag) => {
                  return { name: tag.name, tag: tag.tag, content: tag.content, start: tag.start, end: tag.end };
                }),
              };
              if (this.isExportContent === '1') {
                data.content = doc.content;
              }
              return data;
            });
          }
          this.isWorking = false;
        });
    },
    // 获取标注进度百分比
    getPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor(((project.num.marked + project.num.wrong) * 100) / project.num.total);
      } else {
        return 0;
      }
    },
    onExportSettingChange(value) {
      this.getCurrectProjectDataByIndex(this.project._id);
    },
    saveJson() {
      if (this.isSaving) {
        this.$notify({
          title: '导出JSON',
          message: '正在导出,请稍后...',
          type: 'success',
        });
        return;
      }
      this.isSaving = true;
      this.$notify({
        title: '导出JSON',
        message: '正在导出,请稍后...',
        type: 'success',
      });
      // 将json转换成字符串
      const data = JSON.stringify(this.exportData);
      const blob = new Blob([data], { type: '' });

      // const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(blob, this.project.name + '.json');
      this.isSaving = false;
      this.$emit('cancelButtonClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';
</style>
