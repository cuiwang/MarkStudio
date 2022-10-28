<template>
  <div class="board_header">
    <el-collapse-transition>
      <el-card v-if="booleanShowProjectInfo" style="height: 99px" shadow="never">
        <div class="flex_row align_center">
          <div class="flex_1 flex_row align_center">
            <div class="flex_col padding_0_10">
              <span class="main_text_color normal_text_size">标注进度</span>
              <span class="h5"></span>
              <div class="description_text_color description_text_size">
                {{`${project.num.marked}/${project.num.total}`}}
                <el-tooltip class="item" effect="dark" content="已保存/总数" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="flex_1">
              <el-progress :percentage="onGetPercentage(project)"></el-progress>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="flex_col padding_0_10">
              <span class="main_text_color normal_text_size">工程名称</span>
              <span class="h5"></span>
              <span class="description_text_color description_text_size">{{project.name}}</span>
            </div>

            <el-divider direction="vertical"></el-divider>
          </div>
          <div>
            <i class="el-icon-arrow-up" @click="onShowProjectInfo('0')"></i>
          </div>
        </div>
      </el-card>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-card v-if="!booleanShowProjectInfo" class="projectInfo_less" shadow="never">
        <div class="flex_row align_center">
          <div class="flex_1 flex_row align_center">
            <div class="flex_1">
              <el-progress :percentage="onGetPercentage(project)"></el-progress>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              <i class="el-icon-arrow-down" @click="onShowProjectInfo('1')"></i>
            </div>
          </div>
        </div>
      </el-card>
    </el-collapse-transition>
  </div>
</template>
<script>

import {getNumFromProject} from '../../libs/project_utils'

export default {
  name: 'BoardHeader',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  watch: {
    project(newValue, oldValue) {
      getNumFromProject(this.project).then(res=>{
        this.num = res
      })
    }
  },
  data() {
    return {
      //是否显示更多工程信息
      booleanShowProjectInfo: false,
      num:{},
      Listeners:[]
    }
  },
   mounted() {
    this.initEvent()
  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },
  methods: {
    initEvent(){
      const onActiveButtonClick_listener = async () => {
        getNumFromProject(this.project).then(res=>{
          this.num = res
        })
      }
      const onFinishButtonClick_listener = async () => {
        getNumFromProject(this.project).then(res=>{
          this.num = res
        })
      }
      this.Listeners = [
          ['onActiveButtonClick',onActiveButtonClick_listener],
          ['onFinishButtonClick',onFinishButtonClick_listener],
      ]
      this.addEventListener(this.Listeners)
    },
    // 获取标注进度百分比
    onGetPercentage() {
      if (this.num &&this.num.marked>-1 && this.num.total) {
        return Math.floor((this.num.marked * 100) / this.num.total)
      }
      else {
        return 0
      }
    },
    // 是否显示顶部工程信息
    onShowProjectInfo(value) {
      this.booleanShowProjectInfo = value === '1'
    }
  }
}
</script>
<style scoped lang="scss">

.projectInfo_less {
  .el-card__body {
    padding: 5px 20px;
  }
}
</style>