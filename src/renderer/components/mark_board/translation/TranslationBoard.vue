<template>
  <el-card class="dialogueMark_card" shadow="never" body-style="overflow:auto">
    <div class="mark_global_data" :style="{fontSize:defaultFontSize,color:defaultFontColor}">
      <span>{{data.content}}</span>
      <el-divider/>
      <div class="width_100 flex_row align_center">
            <el-input
                class="flex_1"
                :disabled="data.status===DataType.FINISHED"
                :placeholder="data.status===DataType.FINISHED?'请先激活标注':'请输入文本翻译内容...'"
                suffix-icon="el-icon-edit"
                clearable
                v-model="input"
            >
            </el-input>
            <span class="w10"/>
            <el-button type="primary" @click="onInputEnter">提交</el-button>
      </div>

      <div class="flex_col" v-if="data['translations']">
        <div v-for="(translation,index) in data['translations']" :key="translation">
          <el-tag type="info" :closable="data.status===DataType.MARKING" @close="onCloseTranslation(index)">{{translation}}</el-tag>
        </div>
      </div>

    </div>
  </el-card>
</template>
<script>
import {Cons}   from '../../../Constant'

export default {
  name: 'TranslationBoard',
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
        if (this.data['translations']){
          let _datas = this.data['translations']
          _datas.push(this.input)
          this.$set(this.data, 'translations', _datas)
        }else {
          this.$set(this.data, 'translations', [this.input])
        }
        this.input = ''
        this.$emit('doUpdateCurrectData',this.data)
      }
    },
    onCloseTranslation(_index) {
      let _datas = this.data['translations']
      _datas.splice(_index,1)
      this.$set(this.data, 'translations', _datas)
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