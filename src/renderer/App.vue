<template>
  <div id="app">
    <!-- 留坑，非常重要 -->
    <router-view></router-view>
    <el-dialog
      title="正在更新新版本,请稍候..."
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div style="width: 100%; height: 20vh; line-height: 20vh; text-align: center">
        <el-progress status="success" :text-inside="true" :stroke-width="20" :percentage="percentage" :width="strokeWidth" :show-text="true"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let ipcRenderer = require('electron').ipcRenderer;

export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: true,
      percentage: 0,
      strokeWidth: 200,
      booleanAutoUpdate: false,
      timeOut: null,
      interval: null,
    };
  },
  mounted() {
    this.booleanAutoUpdate = localStorage.getItem('booleanAutoUpdate') === '1';
    if (this.booleanAutoUpdate) {
      //20秒后开始检测新版本
      this.timeOut = window.setTimeout(() => {
        ipcRenderer.send('checkForUpdate');
      }, 20000);
      //间隔1小时检测一次
      this.interval = window.setInterval(() => {
        ipcRenderer.send('checkForUpdate');
      }, 3600000);
    }

    //接收主进程版本更新消息
    ipcRenderer.on('message', (event, arg) => {
      // for (var i = 0; i < arg.length; i++) {
      console.log(arg);
      //this.$message(JSON.stringify(arg));
      if ('update-available' === arg.cmd) {
        //显示升级对话框
        this.dialogVisible = true;
        this.$message.success('发现新版本,请前往帮助中心手动升级!');
      } else if ('download-progress' === arg.cmd) {
        //更新升级进度
        /**
         *
         * message{bytesPerSecond: 47673
      delta: 48960
      percent: 0.11438799862426002
      total: 42801693
      transferred: 48960
      }
         */
        console.log(arg.message.percent);
        this.percentage = Math.round(parseFloat(arg.message.percent));
      } else if ('error' === arg.cmd) {
        this.dialogVisible = false;
        this.$message.warning('新版本更新失败,请前往获取手动更新地址!');
      }
      // }
    });
  },
  destroyed() {
    window.clearInterval(this.interval);
    window.clearInterval(this.timeOut);
  },
};
</script>
<style>
.darkmode-layer,
.darkmode-toggle {
  z-index: 500;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
