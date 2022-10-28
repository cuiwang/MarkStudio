<template>
  <el-card class="dialogueMark_card" shadow="never" body-style="overflow:auto">
    <div class="mark_global_data" :style="{fontSize:defaultFontSize,color:defaultFontColor}">
      <span>{{data.content}}</span>
      <el-divider/>
      <div class="width_100 flex_row align_center">
            <el-input
                class="flex_1"
                :disabled="data.status===DataType.FINISHED"
                :placeholder="data.status===DataType.FINISHED?'请先激活标注':'请输入语义'"
                suffix-icon="el-icon-edit"
                clearable
                v-model="input"
            >
            </el-input>
            <span class="w10"/>
            <el-button type="primary" @click="onInputEnter">提交</el-button>
      </div>

      <div class="flex_col" v-if="data['text2sqls']">
        <div v-for="(text2sql,index) in data['text2sqls']" :key="text2sql">
          <el-tag type="info" :closable="data.status===DataType.MARKING" @close="onCloseText2sql(index)">{{text2sql}}</el-tag>
        </div>
      </div>

    </div>
  </el-card>
</template>
<script>
import {Cons}   from '../../../Constant'

export default {
  name: 'Text2sqlBoard',
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
      // ────────────────────────── 分割线  ──────────────────────────
      input:'',

    }
  },
  mounted() {
    this.defaultFontSize = localStorage.getItem('defaultFontSize') || '1.2rem'
    this.defaultFontColor = localStorage.getItem('defaultFontColor') || '#333333'
  },
  methods: {
    onInputEnter() {
      if (this.input){
        if (this.data['text2sqls']){
          let _datas = this.data['text2sqls']
          _datas.push(this.input)
          this.$set(this.data, 'text2sqls', _datas)
        }else {
          this.$set(this.data, 'text2sqls', [this.input])
        }
        this.input = ''
        this.$emit('doUpdateCurrectData',this.data)
      }
    },
    onCloseText2sql(_index) {
      let _datas = this.data['text2sqls']
      _datas.splice(_index,1)
      this.$set(this.data, 'text2sqls', _datas)
      this.$emit('doUpdateCurrectData',this.data)
    }
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