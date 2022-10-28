<template>
  <div class="container">
    <div class="header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div class="bigtitle_text_size main_text_color text_left">个人中心</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="content">
      <div class="flex_row">
        <div class="left_menu flex_col align_center">
          <span :class="menu==='sync'?'menu-active':'menu'" @click="onMenuClick('sync')">数据同步</span>
          <span class="h10"/>
          <span :class="menu==='detail'?'menu-active':'menu'" @click="onMenuClick('detail')">个人详情</span>
          <span class="h10"/>
          <span :class="menu==='password'?'menu-active':'menu'" @click="onMenuClick('password')">修改密码</span>
          <span class="h10"/>
          <span :class="menu==='update'?'menu-active':'menu'" @click="onMenuClick('update')">其他</span>
        </div>
        <div class="right_content">
          <div class="text_left" v-if="menu==='sync'">
           <Synchronize/>
          </div>
          <div class="text_left" v-if="menu==='detail'">
            <Detail/>
          </div>
          <div class="text_left" v-if="menu==='password'">
            <Password/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Detail      from '../components/user/detail'
import Password    from '../components/user/password'
import Synchronize from '../components/user/synchronize'

export default {
  name: 'User',
  components: {
    Synchronize,
    Password,
    Detail},
  data() {
    return {
      menu: 'sync',
    }
  },

  mounted() {
  },
  methods: {
    onMenuClick(menu) {
      this.menu = menu
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';

/deep/ .el-card__header {
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

.form-inline {
  padding: 10px;
}
</style>