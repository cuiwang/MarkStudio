<template>
  <div class="container">
    <div class="header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div class="bigtitle_text_size main_text_color text_left">标签组管理</div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button type=""  icon="el-icon-upload2" @click="onImportMarksClick">导入标签组</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="content">

      <div class="flex_row">

        <div class="left_menu flex_col align_center">
          <span :class="menu===WorkingType.ENTITY?'menu-active':'menu'" @click="onMenuClick(WorkingType.ENTITY)"><i class="el-icon-coin"/> 实体标签</span>
          <span class="h10"/>
          <span :class="menu===WorkingType.RELATION?'menu-active':'menu'" @click="onMenuClick(WorkingType.RELATION)"><i class="el-icon-attract"/> 关系标签</span>
          <span class="h10"/>
          <span :class="menu===WorkingType.DIALOGUE?'menu-active':'menu'" @click="onMenuClick(WorkingType.DIALOGUE)"><i class="el-icon-headset"/> 对话标签</span>
          <span class="h10"/>
          <span :class="menu===WorkingType.CLASSIFY?'menu-active':'menu'" @click="onMenuClick(WorkingType.CLASSIFY)"><i class="el-icon-c-scale-to-original"/> 分类标签</span>

        </div>
        <div class="el-card right_content">
          <LabelSetting :type="menu"/>
        </div>

      </div>


    </div>
    <ImportMarks :show-dialog="boolShowImportMarksDialog" @cancelButtonClick="boolShowImportMarksDialog = false"></ImportMarks>
   </div>
</template>
<script>
import ImportMarks  from '../components/ImportMarks'
import LabelSetting from '../components/LabelSetting'
import {Cons}       from '../Constant'

export default {
  name: 'Label',
  components: {
    LabelSetting
    , ImportMarks },

  data() {
    return {
      menu:Cons.WorkingType.ENTITY,
      boolShowImportMarksDialog: false,
      WorkingType:Cons.WorkingType
    }
  },

  methods: {
    onImportMarksClick() {
      this.boolShowImportMarksDialog = true;

    },
    onMenuClick(menu) {
      this.menu = menu
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../globals';

/deep/.el-card__body{
  background: #f8f9fa;
}

.container{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.content{
  flex: 1;
  overflow: auto;
  background-color: #ffffff;

  .left_menu{
    margin-top: 50px;
    margin-left: 50px;
    width: 180px;

    .menu-active {
      width: 80px;
      user-select: none;
      cursor: pointer;
      color: #515764;
      font-size: 14px;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
      background: #f3f4f8;
      padding: 3px 15px;
      border-radius: 3px;
    }


    .menu {
      width: 80px;
      user-select: none;
      cursor: pointer;
      color: #757980;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      padding: 3px 15px;
      border-radius: 3px;
    }

  }

  .right_content{
    flex: 1;
    margin: 50px;
  }
}
</style>