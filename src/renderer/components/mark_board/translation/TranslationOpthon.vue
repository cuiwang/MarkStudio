<template>
  <!--分类标签选择-->
  <el-card class="translationMarkItems" shadow="never" body-style="overflow:auto">
    <div slot="header" class="clearfix" style="text-align: left">
      <span>
        <i class="el-icon-mic"></i>
        文本翻译
      </span>
    </div>
    <div class="flex_col" v-if="data['translations']">
      <div class="margin_bottom_10" v-for="(translation,index) in data['translations']" :key="translation">
        <el-tag type="info" :closable="data.status===DataType.MARKING" @close="onCloseTranslation(index)">{{translation}}</el-tag>
      </div>
    </div>
  </el-card>
</template>
<script>
import {Cons} from '../../../Constant'

export default {
  name: 'TranslationOpthon',
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

    }
  },
  methods: {
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
//解决标题栏滚动问题
.translationMarkItems {
  height: 100%;
  display: flex;
  flex-direction: column;

 /deep/ .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}
</style>