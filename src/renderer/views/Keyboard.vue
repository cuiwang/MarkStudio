<template>
  <div id="content">
    <div style="margin: 20px; text-align: left">
      <el-card>
        <div class="title_text_size main_text_color">常用快捷键</div>
        <div class="h10"/>
        <div class="description_text_size description_text_color">Mac系统:Ctrl键对应成Command键</div>
        <el-divider></el-divider>
        <div>Ctrl+方向左/上键 : 上一条</div>
        <div class="h10"/>
        <div>Ctrl+方向右/下键 : 下一条</div>
        <div class="h10"/>
        <div>Ctrl+回车 : 标记完成</div>
        <div class="h10"/>
        <div>Ctrl+Z : 删除最后一个标注</div>
        <div class="h10"/>
        <div>Ctrl+F : 搜索</div>
        <div class="h10"/>
        <div>Ctrl+E : 编辑数据</div>
        <div class="h10"/>
        <div>Ctrl+A : 激活数据</div>
        <div class="h10"/>
        <div>Ctrl+O : 标记无效数据</div>
        <div class="h10"/>
        <div>数字1-9 : 选中文本，按下标注类型对应数字，快速标注</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  data() {
    return {

    };
  },
  mounted() {
    console.log('keyboard mounted');
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';
</style>