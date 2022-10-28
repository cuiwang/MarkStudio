<template>
  <div class="tags_input flex_row align_center">
    <div class="tags_in_input" style="margin-bottom: -8px">
      <el-tag
          v-for="(tag,index) in list"
          :key="index"
          type="primary"
          effect="plain"
          size="medium"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
        {{tag}}
      </el-tag>
    </div>
    <el-input
        class="flex_1 no_boarder_input"
        type="text"
        clearable
        :placeholder="placeholder"
        v-model="value"
        @keyup.delete.native="remove"
        @keyup.space.native="add"
        @keyup.enter.native="add"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name:'TagsInput',
  props: {
    listFilter: Boolean, // 是否去重
    placeholder: null, // 占位文字
  },
  data() {
    return {
      value: '',
      list: [],
      isNeedWait:true
    }
  },
  watch:{
  },
  mounted() {
    this.$emit('input', this.list)  // 发送给父级的tagslist
  },
  methods: {
    add() {
      let self = this
      self.value = self.value.trim()
      if (self.value) {
        self.list.push(self.value)
        if (self.listFilter) {
          let arr = self.list
          let set = new Set(arr)
          self.list = Array.from(set)
        }
      }
      self.value = ''
      self.$emit('input', self.list)
    },
    remove(){
      if (!this.value){
        if (!this.isNeedWait){
      this.list.pop()
          this.isNeedWait = true
        }else {
          this.isNeedWait = false
        }
      }
    },
    handleClose(tag) {
      let self = this
      self.$emit('tagClose', tag)
      self.list.splice(self.list.indexOf(tag), 1);
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';


.el-tag{
  margin-bottom: 8px;
  margin-left: 8px;
}
.el-button--primary{
  background-color: #6594EF;
  border-color: #6594EF;
}



</style>