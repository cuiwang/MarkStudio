<template>
  <div id="content">
    <div class="content-fixed-header" style="height: 100px;width: 100%;position:fixed;z-index: 99;">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div style="font-size: 20px;color: #303133;text-align: left">项目管理</div>
            <div class="h10"></div>
            <div style="font-size: 14px;color: #909399;text-align: left">
              以项目的形式组织标注工作,让标注工作更加系统化,组织化,实际工作中也会更加有条理.
            </div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button @click="needShowImportProjectView = true">导入项目</el-button>
            <el-button type="primary" @click="needShowNewProjectView = true">新建项目</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div style="height: 100px"></div>
    <!--  项目列表  -->
    <div class="project-warp margin_bottom_10 padding_0_10">
      <div class="project-warp-item margin_top_10" v-for="(project, index) in projects" :key="index">
        <el-card :shadow="project.working ? 'always' : 'hover'">
          <div slot="header" class="clearfix">
            <div style="float: left">{{ project.name }}</div>
            <el-button @click="activeProject(project._id)" style="float: right; padding: 3px 0" type="text" :disabled="project.working">{{ project.working ? '工作中' : '激活项目' }}</el-button>
          </div>
          <div class="project_info flex_col">
            <el-row>
              <el-col>
                <el-progress v-if="project.working" :percentage="getPercentage(project)"></el-progress>
                <el-progress v-else color="#999999" :percentage="getPercentage(project)"></el-progress>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>标注总进度:</div>
              </el-col>
              <el-col :span="14">
                <div>
                  <span>{{ project.num.marked }}/{{ project.num.total }}</span>
                  <el-tooltip class="item" effect="dark" content="已完成/总数" placement="top">
                    <i class="el-icon-question description_text_color"></i>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>实体标签组:</div>
              </el-col>
              <el-col :span="14">
                <el-tag v-if="!project.working" type="info" effect="dark">{{ project.markTypeName }}</el-tag>
                <el-tag v-else effect="dark">{{ project.markTypeName }}</el-tag>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>全局标签组:</div>
              </el-col>
              <el-col :span="14">
                <el-tag v-if="!project.working" type="info" effect="dark">{{ project.globalTypeName || '-' }}</el-tag>
                <el-tag v-else effect="dark">{{ project.globalTypeName || '-' }}</el-tag>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>关系标签组:</div>
              </el-col>
              <el-col :span="14">
                <el-tag v-if="!project.working" type="info" effect="dark">{{ project.relationTypeName || '-' }}</el-tag>
                <el-tag v-else effect="dark">{{ project.relationTypeName || '-' }}</el-tag>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>对话标签组:</div>
              </el-col>
              <el-col :span="14">
                <el-tag v-if="!project.working" type="info" effect="dark">{{ project.dialogueTypeName || '-' }}</el-tag>
                <el-tag v-else effect="dark">{{ project.dialogueTypeName || '-' }}</el-tag>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>数据来源:</div>
              </el-col>
              <el-col :span="14">
                <div style="word-break: break-all;white-space: normal;">{{ project.dataFilePath }}</div>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>创建时间:</div>
              </el-col>
              <el-col :span="14">
                <div>{{ project.created_at }}</div>
              </el-col>
            </el-row>
            <div class="h10"></div>
            <el-row>
              <el-col :span="8">
                <div>修改时间:</div>
              </el-col>
              <el-col :span="14">
                <div>{{ project.updated_at }}</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="flex_row">
              <el-button type="warning" @click="editProject(project)">编辑</el-button>
              <el-button type="danger" @click="deleteProject(project)">删 除</el-button>
              <div class="flex_1"></div>
              <el-button :loading="isSaving" @click="exportProject(project)">导出工程</el-button>
              <el-button type="primary" @click="exportResult(project)">导出结果</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!--新建项目弹框-->
    <NewProject :show-dialog="needShowNewProjectView" @cancelButtonClick="(needShowNewProjectView = false) && (project = {})"></NewProject>
    <!--导入项目弹框-->
    <ImportProject :show-dialog="needShowImportProjectView" @cancelButtonClick="(needShowImportProjectView = false) && (project = {})"></ImportProject>
    <!--编辑项目弹框-->
    <EditProject :project-form="project" :show-dialog="needShowEditProjectView" @cancelButtonClick="(needShowEditProjectView = false) && (project = {})"></EditProject>
    <!--  导出项目数据 -->
    <ExprotProject v-show="project._id" :show-dialog="needShowExportView" :project="project" @cancelButtonClick="needShowExportView = false"></ExprotProject>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';
import NewProject from '../components/NewProject';
import ExprotProject from '../components/ExprotProject';
import FileSaver from 'file-saver';
import EditProject from '../components/EditProject';
import ImportProject from '../components/ImportProject';

export default {
  name: 'Project',
  components: { ImportProject, EditProject, ExprotProject, NewProject },
  data() {
    return {
      projects: [],
      project: {},
      search: '',
      needShowNewProjectView: false,
      needShowEditProjectView: false,
      needShowImportProjectView: false,
      needShowExportView: false,
      isSaving: false,
    };
  },
  mounted() {
    console.log('Project mounted');
    this.initEvent();
    this.initData();
  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // 新建项目成功
      this.$events.on('NEW_PROJECT_SUCESS', (project_id) => {
        // 刷新项目列表
        this.initData();
        // 自由处理是否激活项目
        this.$confirm('新建项目成功,是否现在激活项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.activeProject(project_id);
          })
          .catch(() => {});
      });
      // 修改项目成功
      this.$events.on('EDIT_PROJECT_SUCESS', (project_id) => {
        this.initData();
      });
    },
    initData() {
      db_utils
        .generate_find(db_utils.PROJECTS_DB)
        .sort({ working: -1, updated_at: -1 })
        .exec((err, documents) => {
          this.projects = documents;
        });
    },
    // 获取进度百分比
    getPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor((project.num.marked * 100) / project.num.total);
      } else {
        return 0;
      }
    },
    // 激活项目
    activeProject(project_id) {
      db_utils.update_set(db_utils.PROJECTS_DB, { working: true }, { $set: { working: false } });
      db_utils.update_set(db_utils.PROJECTS_DB, { _id: project_id }, { $set: { working: true } });
      this.initData();
      // 激活成功,通知工作台刷新页面
      this.$events.emit('PROJECT_ACTIVE', '');

      this.$notify({
        title: '提示',
        message: '项目激活成功!',
        type: 'success',
      });
    },
    // 导出工程
    exportProject(project) {
      // 从数据库读取项目信息,项目数据信息,项目标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, { _id: project._id }, (err, document) => {
        if (document) {
          let projectMarkType, projectRelationType, projectGlobalType, projectDialogueType;
          // 是否需要加载了实体标注标签组
          if (project.markTypeName) {
            db_utils.findOne(db_utils.MARK_TYPES_DB, { _id: project.markTypeId }, (err, document) => {
              projectMarkType = Object.freeze(document);
            });
          }
          // 是否需要加载了关系标注标签组
          if (project.relationTypeName) {
            db_utils.findOne(db_utils.RELATION_TYPES_DB, { _id: project.relationTypeId }, (err, document) => {
              projectRelationType = Object.freeze(document);
            });
          }
          // 是否需要加载了全局标签组
          if (project.globalTypeName) {
            db_utils.findOne(db_utils.GLOBAL_TYPES_DB, { _id: project.globalTypeId }, (err, document) => {
              projectGlobalType = Object.freeze(document);
            });
          }
          // 是否需要加载了对话标签组
          if (project.dialogueTypeName) {
            db_utils.findOne(db_utils.DIALOGUE_TYPES_DB, { _id: project.dialogueTypeId }, (err, document) => {
              projectDialogueType = Object.freeze(document);
            });
          }

          db_utils.find(db_utils.DATAS_DB, { project_id: project._id }, (err, documents) => {
            let exportData = {
              project: document,
              datas: documents,
              projectMarkType,
              projectRelationType,
              projectGlobalType,
              projectDialogueType,
            };
            this.saveProjectJson(exportData);
          });
        }
      });
    },
    saveProjectJson(exportData) {
      if (this.isSaving) {
        this.$notify({
          title: '导出工程',
          message: '正在导出,请稍后...',
          type: 'success',
        });
        return;
      }
      this.isSaving = true;
      // 将json转换成字符串
      const data = JSON.stringify(exportData);

      const blob = new Blob([data], { type: '' });
      this.$notify({
        title: '导出工程',
        message: '导出成功!',
        type: 'success',
      });
      FileSaver.saveAs(blob, exportData.project.name + '.project');
      this.isSaving = false;
    },
    // 编辑工程
    editProject(project) {
      this.project = project;
      this.needShowEditProjectView = true;
    },
    // 导出结果
    exportResult(project) {
      this.project = project;
      this.needShowExportView = true;
    },
    // 删除项目
    deleteProject(project) {
      this.$confirm('此操作将永久删除该项目及其数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      })
        .then(() => {
          db_utils.remove(db_utils.PROJECTS_DB, { _id: project._id }, { multi: true });
          db_utils.remove(db_utils.DATAS_DB, { project_id: project._id }, { multi: true });
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 70,
          });
          this.initData();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 70,
          });
        });
    },
  },
};
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
}
</style>
