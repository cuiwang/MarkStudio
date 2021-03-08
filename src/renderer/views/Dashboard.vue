<template>
  <div id="content" :loading="isDbIniting">
    <div class="content-fixed-header">
      <div class="content-infobar">
        <el-card v-if="project.name" shadow="never">
          <div class="flex_row align_center">
            <div class="flex_1 flex_row align_center">
              <div class="flex_col padding_0_10">
                <span class="main_text_color normal_text_size">项目名称</span>
                <span class="h5"></span>
                <span class="description_text_color description_text_size">{{ project.name }}</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="flex_col padding_0_10">
                <span class="main_text_color normal_text_size">标注类型</span>
                <span class="h5"></span>
                <div class="description_text_color description_text_size">
                  {{ project.markTypeName }}
                </div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="flex_col padding_0_10">
                <span class="main_text_color normal_text_size">标注进度</span>
                <span class="h5"></span>
                <div class="description_text_color description_text_size">
                  {{ `${project.num.marking}/${project.num.wrong}/${project.num.marked}/${project.num.total}` }}
                  <el-tooltip class="item" effect="dark" content="标注中/无法标注/已完成/总数" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="flex_1">
                <el-progress :percentage="getPercentage(project)"></el-progress>
              </div>
              <el-divider direction="vertical"></el-divider>
            </div>
            <div>
              <el-button @click="needShowExportView = true">导出数据</el-button>
              <el-button type="primary" @click="needShowNewProjectView = true">新建项目</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!--中间操作区-->
    <div class="main_container">
      <!--左侧标记区-->
      <el-card class="main_left_warp">
        <div slot="header" class="clearfix">
          <div style="height: 22px"></div>
          <div class="main-mark-toolbar">
            <div style="flex: 1;display:flex;align-items: center;justify-content: flex-start">
              <div id="mark-tip">
                <el-link type="success" v-if="data.status === 1">已完成</el-link>
                <el-link type="danger" v-else-if="data.status === -1">无法标注</el-link>
                <el-link type="danger" v-else-if="data.status === -1">标注中......</el-link>
              </div>
            </div>
            <el-button-group>
              <el-button icon="el-icon-arrow-left" :disabled="this.project.currectDataIndex === 0" @click="getLastData"
                >上一篇</el-button
              >
              <el-button type="info">
                {{ project.currectDataIndex + 1 }} / {{ project.num.total }} <i class="el-icon-caret-bottom"></i
              ></el-button>
              <el-button :disabled="this.project.currectDataIndex === this.project.num.total - 1" @click="getNextData"
                >下一篇<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
            <div style="flex: 1;display: flex;align-items: center;justify-content: flex-end">
              <el-button
                id="mark-wrong"
                icon="el-icon-document-delete"
                plain
                :disabled="data.status !== 0"
                @click="wrongButtonClick"
                >无法标注</el-button
              >
              <el-button id="mark-finish" type="success" :disabled="data.status !== 0" @click="finishButtonClick"
                >完成(CTRL+回车)</el-button
              >
            </div>
          </div>
        </div>
        <div class="main_mark">
          <div class="mark_data" id="data_0">{{ data.content }}</div>
        </div>
      </el-card>
      <!--右侧操作区-->
      <div class="main_right_warp">
        <!--已标数据-->
        <el-card>
          <div slot="header" class="clearfix">
            <span>已标数据</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="closeAllTagClick">清空</el-button>
          </div>
          <div class="tag-warp">
            <div class="tag-warp-item margin_top_10" v-for="(tag, index) in data.tags" :key="index">
              <el-tag closable @close="closeTagClick(tag)">
                {{ tag.content }}
              </el-tag>
            </div>
          </div>
          <div v-if="data.tags.length === 0" class="flex_col_allcenter padding_30 description_text_color">
            暂无数据
          </div>
        </el-card>
      </div>
    </div>
    <!--新建项目弹框-->
    <NewProject :show-dialog="needShowNewProjectView" @cancelButtonClick="needShowNewProjectView = false"></NewProject>
    <!--  导出项目数据 -->
    <ExprotProject
      v-if="project._id"
      :show-dialog="needShowExportView"
      :project="project"
      @cancelButtonClick="needShowExportView = false"
    ></ExprotProject>
  </div>
</template>

<script>
import EasyMarker from '@/libs/easy-marker';
import db_utils from '../libs/db_utils';
import NewProject from '../components/NewProject';
import ExprotProject from '../components/ExprotProject';

export default {
  name: 'Dashboard',
  components: { ExprotProject, NewProject },
  data() {
    return {
      isDbIniting: true, //数据库是否通知初始化完毕
      project: {
        name: '',
        dataFilePath: '',
        num: {
          total: 0,
          marked: 0,
          marking: 0,
          wrong: 0,
        },
        markTypeId: '',
        markTypeName: '',
        description: '',
      },
      needShowNewProjectView: false, //是否打开新建项目页面
      projectForm: {
        name: '',
        dataFilePath: '',
        num: {
          total: 0,
          marked: 0,
          marking: 0,
          wrong: 0,
        },
        markTypeId: '',
        markTypeName: '',
        description: '',
        working: true, //当前状态是否工作中/
      },
      data: {
        project_id: -1,
        index: 1,
        content: '',
        status: 0,
        tags: [],
      },
      projectMarkType: [], //项目所用的标注类型
      em: null,
      selectedMenuItemId: 0, //当前标注框选中的索引
      needShowExportView: false, //是否显示导出框
    };
  },
  mounted() {
    console.log('Dashboard mounted');
    this.initEvent();
    //this.initView();
    this.initData();
  },

  destroyed() {},
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // 数据库初始化完毕,一般在mounted后
      this.$events.on('DB_INIT_FINISH', (text) => {
        this.isDbIniting = true;
        this.initData();
      });
      // 新建项目成功
      this.$events.on('NEW_PROJECT_SUCESS', (project_id) => {
        // 自由处理是否激活项目
        this.$confirm('新建项目成功,是否现在激活项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            db_utils.update_set(db_utils.PROJECTS_DB, { _id: this.project._id }, { $set: { working: false } });
            db_utils.update_set(db_utils.PROJECTS_DB, { _id: project_id }, { $set: { working: true } });
            this.initData();
          })
          .catch(() => {});
      });

      document.onkeydown = (e) => {
        //事件对象兼容
        let evn = e || event || window.event || arguments.callee.caller.arguments[0];
        let key = evn.keyCode || evn.which || evn.charCode;
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        //左
        if (evn && key === 37) {
          //this.decrease()
          this.getLastData(e);
        } else if (evn && key === 39) {
          this.getNextData(e);
          //this.increase()
        } else if (evn.ctrlKey && key === 13) {
          this.finishButtonClick(e);
          //do something
        }
      };
    },
    initView() {},
    initData() {
      // 从数据库读取项目信息,项目数据信息,项目标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, { working: true }, (err, document) => {
        if (document) {
          this.project = document;
          this.getCurrectProjectDataByIndex(this.project._id, this.project.currectDataIndex);
        }
      });
    },
    getCurrectProjectDataByIndex(_id, _index) {
      db_utils.findOne(db_utils.DATAS_DB, { project_id: _id, index: _index }, (err, document) => {
        this.data = document;
        // 无法标注,不生成em
        if (this.data.status === -1) {
          return;
        }
        db_utils.findOne(db_utils.MARK_TYPES_DB, { _id: this.project.markTypeId }, (err, document) => {
          this.projectMarkType = document;
          // 生成EasyMarker menuItems
          let menuItems = [];
          this.projectMarkType.datas.forEach((data, index) => {
            menuItems.push({
              id: index + 1,
              text: data.tag,
              type: 'select',
              style: {
                width: 'auto',
                color: '#FFFFFF',
                background: this.filterMenuItemBackgroud(index),
                boxSizing: 'border-box',
                borderTopLeftRadius: index === 0 ? '4px' : '0px',
                borderBottomLeftRadius: index === 0 ? '4px' : '0px',
                borderTopRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                borderBottomRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                borderLeft: '#393939 1px solid',
                borderRight: '#000000 1px solid',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '0.9rem 1.8rem',
              },
              //iconName:'iconfont icon-heartxin'
            });
            /*menuItems.push({
              id: index + 1,
              text: data.tag,
              type: 'highlight',
              style: {
                width: 'auto',
                color: '#FFFFFF',
                background: this.filterMenuItemBackgroud(index),
                boxSizing: 'border-box',
                borderTopLeftRadius: index === 0 ? '4px' : '0px',
                borderBottomLeftRadius: index === 0 ? '4px' : '0px',
                borderTopRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                borderBottomRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                borderLeft: '#393939 1px solid',
                borderRight: '#000000 1px solid',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '0.9rem 1.8rem',
              },
              //iconName:'iconfont icon-heartxin'
            });*/
          });
          this.newEasyMarker(menuItems);
          this.highlightEasyMarker();
        });
      });
    },
    getLastData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === 0) {
        //防止点击两次
        return;
      }
      this.project.currectDataIndex = this.project.currectDataIndex - 1;
      this.getCurrectProjectDataByIndex(this.project._id, this.project.currectDataIndex);
      // 保存索引记录
      db_utils.update(db_utils.PROJECTS_DB, { _id: this.project._id }, this.project);
    },
    getNextData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === this.project.num.total - 1) {
        //防止点击两次
        return;
      }
      this.project.currectDataIndex = this.project.currectDataIndex + 1;
      this.getCurrectProjectDataByIndex(this.project._id, this.project.currectDataIndex);
      // 保存索引记录
      db_utils.update(db_utils.PROJECTS_DB, { _id: this.project._id }, this.project);
    },
    // ────────────────────────── Methods ──────────────────────────
    // 点击完成按钮,修改数据库状态和工程记录
    finishButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === 0) {
        this.data.status = 1;
        db_utils.update(
          db_utils.DATAS_DB,
          { project_id: this.project._id, index: this.project.currectDataIndex },
          this.data,
        );
        this.project.num.marked += 1;
        db_utils.update(db_utils.PROJECTS_DB, { project_id: this.project._id }, this.project);
      }
    },
    // 无法标记复选框点击
    wrongButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === 0) {
        this.data.status = -1;
        db_utils.update(
          db_utils.DATAS_DB,
          { project_id: this.project._id, index: this.project.currectDataIndex },
          this.data,
        );
        this.project.num.marked += 1;
        db_utils.update(db_utils.PROJECTS_DB, { project_id: this.project._id }, this.project);
      }
    },
    // 点击关闭标签
    closeTagClick(tag) {
      const _index = this.data.tags.findIndex((data) => {
        return data.line_id === tag.line_id;
      });
      if (_index !== -1) {
        this.em.cancelHighlightLine(tag.line_id);
        // 1.删除数据
        this.data.tags.splice(_index, 1);
        // 2.更新数据库
        db_utils.update(
          db_utils.DATAS_DB,
          { project_id: this.project._id, index: this.project.currectDataIndex },
          this.data,
        );
      }
    },
    // 点击清空标签按钮
    closeAllTagClick() {
      this.data.tags.forEach((data) => {
        this.em.cancelHighlightLine(data.line_id);
      });
      this.data.tags = [];
      db_utils.update(
        db_utils.DATAS_DB,
        { project_id: this.project._id, index: this.project.currectDataIndex },
        this.data,
      );
    },
    // 获取标注进度百分比
    getPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor(((project.num.marked + project.num.wrong) * 100) / project.num.total);
      } else {
        return 0;
      }
    },
    // ────────────────────────── EasyMarker ──────────────────────────
    newEasyMarker(menuItems) {
      if (this.em) {
        this.em.destroy();
        this.em = null;
      }
      this.em = new EasyMarker({
        menuTopOffset: '10px',
        mask: {
          margin: '5px',
          color: '#5EABFC',
        },
        highlight: {
          margin: '5px',
          opacity: 0.5,
          //color: '#F2F1D7',//米白色 **
          //color: '#E8E8FF',//淡蓝色 *
          //color: '#D7FFF0',//淡绿色 **
          //color: '#F0DAD2',//淡红紫色 ***
          color: '#5EABFC', //淡红紫色
          tagBackground: 'transparent',
          tagColor: '#333333',
        },
        menuStyle: {
          menu: {
            borderRadius: '4px',
            padding: '0',
            backgroundColor: '#409EFF',
          },
          triangle: {
            borderTop: '0.4rem solid #262626',
            borderRight: '0.4rem solid transparent',
            borderLeft: '0.4rem solid transparent',
          },
        },
        menuItems: menuItems,
      });
      this.em.create(document.querySelector('.main_mark'), document.querySelector('.main_mark'), {
        excludeElements: document.querySelectorAll('.excludeElements'),
      });
      // 菜单点击行为
      this.em.onMenuClick((item_id, node_info) => {
        const selection = {
          anchorNode: node_info.anchorNode,
          anchorOffset: node_info.anchorOffset,
          focusNode: node_info.focusNode,
          focusOffset: node_info.focusOffset,
        };
        const _tag = this.projectMarkType.datas[item_id - 1];
        const _id = new Date().getTime();
        this.em.highlightLine(selection, _id, {
          type: 'highlight',
          tag: _tag.name,
        });
        // 判断是否需要改变背景
        if (this.selectedMenuItemId !== item_id) {
          this.selectedMenuItemId = item_id;
          this.changeMenuItemBackgroud();
        }
        // 1.新增数据
        this.data.tags.push({
          name: _tag.name,
          tag: _tag.tag,
          content: this.em.getSelectText(),
          line_id: _id,
          start: node_info.anchorOffset,
          end: node_info.focusOffset,
        });
        // 2.更新数据库
        db_utils.update(
          db_utils.DATAS_DB,
          { project_id: this.project._id, index: this.project.currectDataIndex },
          this.data,
        );
      });
      // 点击高亮的文本,此处应该加个删除处理
      this.em.onHighlightLineClick((_id, _meta, _selection) => {
        //this.em.setSelection(_selection);
        //console.log(this.em.getSelectText());
        this.em.cancelHighlightLine(_id);

        const _index = this.data.tags.findIndex((data) => {
          return data.line_id === _id;
        });
        if (_index !== -1) {
          // 1.删除数据
          this.data.tags.splice(_index, 1);
          // 2.更新数据库
          db_utils.update(
            db_utils.DATAS_DB,
            { project_id: this.project._id, index: this.project.currectDataIndex },
            this.data,
          );
        }
      });

      // 选择状态通知(选择中,选择完,未选择),可以用来提示某些事情
      //this.em.onSelectStatusChange((val) => {
      //  console.log('onSelectStatusChange', val);
      //  /*if (val === 'none') {
      //    // 隐藏区域,开启滚动
      //    document.querySelector('.main_left_warp').style.overflow = 'scroll';
      //  } else {
      //    // 显示区域,禁止滚动
      //    document.querySelector('.main_left_warp').style.overflow = 'visible';
      //  }*/
      //});
    },
    highlightEasyMarker() {
      if (this.em && this.data.tags.length > 0) {
        //
        // { name: '人名', tag: 'Person', content: '李明', start: 27, end: 29 }
        let highlightOptions = [];
        this.data.tags.forEach((data) => {
          highlightOptions.push({
            id: data.line_id,
            meta: { type: 'highlight', tag: data.name },
            selection: {
              anchorNode: document.getElementById('data_0').firstChild,
              anchorOffset: data.start,
              focusNode: document.getElementById('data_0').firstChild,
              focusOffset: data.end,
            },
          });
        });
        this.em.highlightLines(highlightOptions);
      }
    },
    changeMenuItemBackgroud() {
      const list = this.em.menu.menuElement.children;
      for (let i = 0; i < list.length; i++) {
        list[i].style.background = this.filterMenuItemBackgroud(i + 1);
      }
    },
    filterMenuItemBackgroud(_id) {
      //return this.selectedMenuItemId === _id ? '#2A93FE' : '#4EA4FF';
      return this.selectedMenuItemId === _id
        ? 'linear-gradient(rgba(0,0,0,0.9) 0%,rgba(33,33,33,1)) 100%'
        : 'linear-gradient(rgba(42,42,42,0.9) 0%,rgba(36,36,36,1)) 100%';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';

.content-fixed-header {
  height: 100px;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #ffffff;
}

.main-mark-toolbar {
  position: fixed;
  top: 160px;
  left: 10px;
  right: 370px;
  height: 60px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ebeef5;
  display: flex;
  z-index: 99;
  background-color: #ffffff;
  align-items: center;
}

.main_left_warp {
  position: fixed;
  top: 160px;
  left: 10px;
  right: 370px;
  bottom: 10px;
  overflow-y: scroll;

  .mark_data {
    color: #333333;
    padding: 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
    letter-spacing: 10px;
    line-height: 3rem;
  }
}

.main_right_warp {
  width: 350px;
  height: 100%;
  position: fixed;
  top: 160px;
  right: 10px;
  bottom: 10px;
  overflow-y: scroll;
}

.tag-warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &:after {
    content: '';
    width: 32%;
  }

  .tag-warp-item {
    width: 32%;
  }
}
</style>
