<template>
  <!--分类标签选择-->
  <el-card class="classifyMarkItems" shadow="never" body-style="overflow:auto">
    <div slot="header" class="clearfix" style="text-align: left">
      <span>
        <i class="el-icon-thumb"></i>
        分类标签
      </span>
    </div>
    <el-radio-group
        class="flex_col_allcenter"
        :disabled="data.status !== DataType.MARKING"
                    v-model="data.globalTypeId"
                    @change="onGlobalTypeChange">
      <el-radio
          class="margin_top_10"
          v-for="(item, index) in projectGlobalType.datas"
                :key="`projectGlobalType_${index}`"
                :label="item.tag">{{ item.name }}
      </el-radio>
    </el-radio-group>
  </el-card>
</template>
<script>
import {Cons} from '../../../Constant'

export default {
  name: 'ClassifyOpthon',
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
    // 工程所用的一种对话标注标签组,从数据库中加载
    projectGlobalType:{
      type: Object,
      required: true,
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

    }
  },
  methods: {
    // 修改分类标签标签组
    onGlobalTypeChange(_globalTypeId) {
      if (this.data.status === this.DataType.MARKING) {
        this.data.globalTypeId = _globalTypeId
        this.$emit('doUpdateCurrectData',this.data)
      }
    },
  }
}
</script>
<style scoped lang="scss">
//解决标题栏滚动问题
.classifyMarkItems {
  height: 100%;
  display: flex;
  flex-direction: column;

 /deep/ .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}
</style>