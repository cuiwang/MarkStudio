<template>
  <div class="container">
    <div class="header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1 flex_row_allcenter">
            <div class="bigtitle_text_size main_text_color text_left">偏好设置</div>
            <span class="flex_1"/>
            <span class="description_text_size description_text_color">注意:修改完毕后,请进入个人中心,同步最新配置到云端!</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="content">
      <div class="flex_row">
        <div class="left_menu flex_col align_center">
          <span :class="menu==='common'?'menu-active':'menu'" @click="onMenuClick('common')">通用设置</span>
          <span class="h10"/>
          <span :class="menu==='entity'?'menu-active':'menu'" @click="onMenuClick('entity')">实体标注设置</span>
          <span class="h10"/>
          <span :class="menu==='relation'?'menu-active':'menu'" @click="onMenuClick('relation')">关系标注设置</span>
          <span class="h10"/>
          <span :class="menu==='update'?'menu-active':'menu'" @click="onMenuClick('update')">更新设置</span>
        </div>
        <div class="right_content">
          <div class="text_left" v-if="menu==='common'">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>通用设置</span>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                标注后自动保存:
                <el-switch v-model="booleanAutoFinish" @change="setBooleanAutoFinish"></el-switch>
              </div>
              <el-divider>字体配置</el-divider>
              <div class="margin_10">
                <el-alert
                    title="请填写CSS5支持的相关字体属性"
                    description="字体大小示例（默认1.2rem): 12px 或 1.2rem 等; 字体颜色示例(默认#333333): #000000 ;"
                    type="info"
                    :closable="false"
                    effect="light">
                </el-alert>
              </div>
              <div class="normal_text_size main_text_color padding_10 flex_row align_center">
                  <el-form :inline="true">
                    <el-form-item label="内容字体大小:">
                  <el-input size="small"   v-model="defaultFontSize" placeholder="16px/1.2rem"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="small"  type="primary" @click="setFontSize(defaultFontSize)">修改</el-button>
                    </el-form-item>
                  </el-form>
              </div>
              <div class="normal_text_size main_text_color padding_10 flex_row align_center">
                <el-form :inline="true">
                  <el-form-item label="内容字体颜色:">
                    <el-input size="small" v-model="defaultFontColor" placeholder="#333333"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"  type="primary" @click="setFontColor(defaultFontColor)">修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="normal_text_size main_text_color padding_10 flex_row align_center">
                <el-form :inline="true">
                  <el-form-item label="标注字体大小:">
                    <el-input size="small"   v-model="defaultMarkFontSize" placeholder="14px/1.2rem"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"  type="primary" @click="setMarkFontSize(defaultMarkFontSize)">修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
          <div class="text_left" v-if="menu==='entity'">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>实体标注设置</span>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                标注效果:
                <el-radio-group v-model="defaultEntityRenderType" @change="onDefaultEntityRenderTypeChange">
                  <el-radio label="highlight">高亮框</el-radio>
                  <el-radio label="underline">下划线</el-radio>
                </el-radio-group>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                显示百度分词:
                <el-switch v-model="booleanShowBaiduWord" @change="setBooleanShowBaiduWord"></el-switch>
              </div>
            </el-card>

          </div>
          <div class="text_left" v-if="menu==='relation'">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>关系标注设置</span>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                关闭关系标注连线:
                <el-switch v-model="booleanCloseLeaderLine" @change="setBooleanCloseLeaderLine"></el-switch>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                关闭关系标注连线-阴影:
                <el-switch v-model="booleanCloseLeaderLineShadow" @change="setBooleanCloseLeaderLineShadow"></el-switch>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                关闭关系标注连线-标签:
                <el-switch v-model="booleanCloseLeaderLineTag" @change="setBooleanCloseLeaderLineTag"></el-switch>
              </div>
              <div class="normal_text_size main_text_color padding_10 flex_row align_center">
                <el-form :inline="true">
                  <el-form-item label="设置标注连线宽度:">
                    <el-input size="small"  type="number" v-model="defaultLeaderLineWidth" placeholder="默认宽度 2"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"  type="primary" @click="setLeaderLineWidth(defaultLeaderLineWidth)">修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
          <div class="text_left" v-if="menu === 'update'">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>更新设置</span>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                检测新版本:
                <el-button size="mini" type="primary" @click="checkUpdate">检测更新</el-button>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                自动更新:
                <el-switch v-model="booleanAutoUpdate" @change="setBooleanAutoUpdate"></el-switch>
              </div>
              <div class="normal_text_size main_text_color padding_10">
                最新安装包地址:
                <el-link href="https://cuiwang.github.io/DatasMark/"
                         target="_blank">https://cuiwang.github.io/DatasMark/
                </el-link>
              </div>
            </el-card>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Cons} from '../Constant'

export default {
  name: 'Setting',
  data() {
    return {
      booleanShowBaiduWord:false,
      booleanAutoUpdate: false,
      booleanCloseLeaderLine: false,
      booleanCloseLeaderLineShadow: false,
      booleanCloseLeaderLineTag: false,
      booleanAutoFinish: true,
      defaultEntityRenderType: 'highlight',
      defaultLeaderLineWidth: 2,
      defaultFontSize: '1.2rem',
      defaultFontColor: '#333333',
      defaultMarkFontSize: '1.2rem',
      menu: 'common'
    }
  },
  mounted() {
    console.log('setting mounted')
    this.booleanShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1'
    this.booleanAutoUpdate = localStorage.getItem('booleanAutoUpdate') === '1'
    this.booleanCloseLeaderLine = localStorage.getItem('booleanCloseLeaderLine') === '1'
    this.booleanCloseLeaderLineShadow = localStorage.getItem('booleanCloseLeaderLineShadow') === '1'
    this.booleanCloseLeaderLineTag = localStorage.getItem('booleanCloseLeaderLineTag') === '1'
    this.booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1'
    this.defaultEntityRenderType = localStorage.getItem('defaultEntityRenderType') || 'highlight'
    this.defaultLeaderLineWidth = localStorage.getItem('defaultLeaderLineWidth') || 2
    this.defaultFontSize = localStorage.getItem('defaultFontSize') || '1.2rem'
    this.defaultFontColor = localStorage.getItem('defaultFontColor') || '#333333'
    this.defaultMarkFontSize = localStorage.getItem('defaultMarkFontSize') || '1.2rem'
  },
  methods: {
    checkUpdate() {
      require('electron')
          .ipcRenderer
          .send('checkForUpdate')
      this.$message.success('请求成功,请稍后!')
    },
    setBooleanShowBaiduWord() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanShowBaiduWord', this.booleanShowBaiduWord ? '1' : '0');
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setBooleanAutoUpdate() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanAutoUpdate', this.booleanAutoUpdate ? '1' : '0')
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setBooleanCloseLeaderLine() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanCloseLeaderLine', this.booleanCloseLeaderLine ? '1' : '0')
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setBooleanCloseLeaderLineShadow() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanCloseLeaderLineShadow', this.booleanCloseLeaderLineShadow ? '1' : '0')
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setBooleanCloseLeaderLineTag() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanCloseLeaderLineTag', this.booleanCloseLeaderLineTag ? '1' : '0')
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setBooleanAutoFinish() {
      this.$message.success('修改成功!')
      localStorage.setItem('booleanAutoFinish', this.booleanAutoFinish ? '1' : '0')
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setLeaderLineWidth(val) {
      this.$message.success('修改成功!')
      localStorage.setItem('defaultLeaderLineWidth', val)
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setFontSize(val) {
      this.$message.success('修改成功!')
      localStorage.setItem('defaultFontSize', val)
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setFontColor(val) {
      this.$message.success('修改成功!')
      localStorage.setItem('defaultFontColor', val)
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    setMarkFontSize(val) {
      this.$message.success('修改成功!')
      localStorage.setItem('defaultMarkFontSize', val)
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    onDefaultEntityRenderTypeChange(val) {
      this.$message.success('修改成功!')
      localStorage.setItem('defaultEntityRenderType', val)
      this.doLocalSync(Cons.SyncLogType.SETTING)
    },
    onMenuClick(menu) {
      this.menu = menu
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';
/deep/.el-card__header{
  background: #f8f9fa;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #ffffff;

  .left_menu {
    margin-top: 50px;
    margin-left: 50px;
    width: 200px;

    .menu-active {
      width: 100px;
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
      width: 100px;
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

  .right_content {
    flex: 1;
    margin: 50px;
  }
}
</style>