<template>
  <div>
    <el-dialog :title="`项目 ${project.name} 导出提示`" :visible.sync="showDialog">
      <el-form v-if="project && project.num" label-width="100px" :loading="isWorking">
        <el-form-item label="标注进度">
          <div class="flex_col" style="text-align: left">
            <el-progress :percentage="getPercentage(project)"></el-progress>
            <span>
              {{ project.num.marked }}/{{ project.num.total }}
              <el-tooltip class="item" effect="dark" content="已完成/总数" placement="top">
                <i class="el-icon-question description_text_color"></i>
              </el-tooltip>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="导出配置">
          <div class="flex_row align_center">
            <el-radio-group v-model="isExportAll" @change="onExportSettingChange">
              <el-radio-button label="1">导出全部</el-radio-button>
              <el-radio-button label="0">仅导出已完成</el-radio-button>
            </el-radio-group>
            <el-divider direction="vertical"></el-divider>
            <el-radio-group v-model="isExportContent" @change="onExportSettingChange">
              <el-radio-button label="1">导出原文本</el-radio-button>
              <el-radio-button label="0">不导出原文本</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="导出预览" v-if="exportData.length > 0">
          <div class="description_text_color description_text_size" style="background-color: #eeeeee;padding: 10px;box-sizing: border-box;line-height: 20px;text-align: left">
            预览第一条导出数据.字段说明: index:数据序号(从0开始). content:原始文本(截取前30字,可在导出设置中隐藏). tags:标记的数组. tags.name:标注名. tags.tag:标注标签. tags.content:标注的内容.
            tags.start:标注的开始(从0开始). tags.end:标注的结束( tags.end- tags.start = 标注长度)
          </div>
          <div style="background-color: #f5f5f5;padding: 10px;box-sizing: border-box;text-align: left">[ {{ previewData }} ... ]</div>
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
      isExportContent: '0', //是否导出原始文本 1导出 2不导出
      exportData: [],
      isSaving: false,
      isWorking: false,
    };
  },
  computed: {
    previewData() {
      if (this.exportData.length > 0) {
        return this.exportData.slice(0, 1)[0];
      }
      return '';
    },
  },
  watch: {
    project() {
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
        relations: 1,
        globalTypeId: 1,
        dialogue: 1,
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
                globalType: doc.globalTypeId,
                tags: doc.tags
                  ? doc.tags.map((tag) => {
                      return { name: tag.name, tag: tag.tag, content: tag.content, start: tag.start, end: tag.end };
                    })
                  : [],
                relations: doc.relations
                  ? doc.relations.map((relation) => {
                      delete relation.start.data.line_id;
                      delete relation.start.data.index;
                      delete relation.end.data.index;
                      delete relation.end.data.index;
                      return {
                        start: relation.start.data,
                        end: relation.end.data,
                        selectedRelationType: relation.selectedRelationType,
                      };
                    })
                  : [],
                dialogue: doc.dialogue ? doc.dialogue : {},
              };
              // 是否需要导出原文本
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
        return Math.floor((project.num.marked * 100) / project.num.total);
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
      // 将json转换成字符串
      const data = JSON.stringify(this.exportData);
      const blob = new Blob([data], { type: '' });
      this.$notify({
        title: '导出JSON',
        message: '导出成功!',
        type: 'success',
      });
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
