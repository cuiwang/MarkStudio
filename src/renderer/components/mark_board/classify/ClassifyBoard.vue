<template>
  <el-card class="dialogueMark_card" shadow="never" body-style="overflow:auto">
    <div class="mark_global_data" :style="{fontSize:defaultFontSize,color:defaultFontColor}">
      {{data.content}}
    </div>
  </el-card>
</template>
<script>
import {Cons}   from '../../../Constant'

export default {
  name: 'ClassifyBoard',
  props: {
    // 当前data
    currectData: {
      type: Object,
      required: true,
      default: {
        content: '',
        status: 0,
        wrong: 0,
        dialogue:{
          datas:[]
        }
      },
    },
    project: {
      type: Object,
      required: true
    }
  },
  watch: {
    currectData(val) {
      this.data = val
    },
  },
  data() {
    return {
      data:this.currectData,
      DataType: Cons.DataType,
      defaultFontSize: '1.2rem',
      defaultFontColor: '#333333',

    }
  },
  mounted() {
    this.defaultFontSize = localStorage.getItem('defaultFontSize') || '1.2rem'
    this.defaultFontColor = localStorage.getItem('defaultFontColor') || '#333333'
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.mark_global_data {
  color: #333333;
  padding:20px;
  word-wrap: break-word;
  text-align: left;
  font-size: 1.2rem;
}
</style>