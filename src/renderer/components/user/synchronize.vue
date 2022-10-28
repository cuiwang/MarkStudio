<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix flex_col">
      <span>数据同步</span>
      <span class="h5"/>
      <span class="description_text_color description_text_size">数据同步功能将您的偏好设置(字体大小等)、工程数据同步保存到网络上。不仅可以防止数据丢失，而且可以方便的与Web端共享标注数据。</span>
    </div>
    <!--偏好同步-->
    <Preference/>
    <!--项目同步-->
    <!--<el-divider/>-->
    <!--<div>工程数据</div>-->
  </el-card>
</template>
<script>
import Preference from './synchronize/preference'

export default {
  name: 'synchronize',
  components: {Preference},
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>