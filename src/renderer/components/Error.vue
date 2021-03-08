<template>
  <div>
    <el-page-header @back="goBack" content="错误">
      <h2>{{ msg }}</h2>
    </el-page-header>
  </div>
</template>

<script>
export default {
name: "Error",
  data() {
    return {
      msg: "Error:404"
    }
  },
  methods: {
    goBack() {
      this.$router.replace({name:'dashboard'})
    }
  }
}
</script>

<style scoped>

</style>