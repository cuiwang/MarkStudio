<template>
  <el-card class="dialogueMark_card" shadow="never" body-style="overflow:auto">
    <div class="mark_dialogue_data" :style="{fontSize:defaultFontSize,lineHeight:defaultFontSize,color:defaultFontColor}">
      <div v-if="data.dialogue && data.dialogue.datas.length">
        <div v-for="(item, item_index) in data.dialogue.datas" :key="item_index">
          <el-row :gutter="18">
            <el-col :span="18">{{ `${item_index + 1}.${item.content}` }}</el-col>
            <el-col :span="6">
              <div class="flex_col_allcenter">
                <el-dropdown :disabled="data.status !== DataType.MARKING" @command="handleDialogueItemTagAdd">
                  <el-button type="primary">
                    下拉选择
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, dropdown_index) in projectDialogueType.datas"
                                      :key="dropdown_index"
                                      :command="`${item.tag}__${item_index}`">
                      {{ `${item.name} - ${item.tag}` }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div>
                  <el-tag
                      :closable="data.status === DataType.MARKING"
                      v-for="(tag, tag_index) in item.tags"
                      :key="tag_index"
                      :disable-transitions="false"
                      @close="handleDialogueItemTagClose(tag, tag_index, item_index)"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </div>
      <div v-else>
        <el-empty description="分割异常,请检查后重试!">
          <span style="font-size: 10px; color: #999999">{{ data.content }}</span>
        </el-empty>
      </div>
    </div>
  </el-card>
</template>
<script>
import {Cons}   from '../../../Constant'

export default {
  name: 'DialogueBoard',
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
    },
    // 工程所用的一种对话标注标签组,从数据库中加载
    projectDialogueType:{
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
      inputDataIndex:0,
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
    // ────────────────────────── 对话标注 ──────────────────────────
    // 处理对话标注标签关闭
    handleDialogueItemTagClose(tag, tag_index, item_index) {
      this.data.dialogue.datas[item_index].tags.splice(tag_index, 1)
      this.$emit('doUpdateCurrectData',this.data)
    },
    // 处理对话标注标签添加
    handleDialogueItemTagAdd(value) {
      const _data = value.split('__')
      const tag = _data[0]
      const item_index = _data[1]
      if (!this.data.dialogue.datas[item_index].tags.includes(tag)) {
        this.data.dialogue.datas[item_index].tags.push(tag)
        this.$emit('doUpdateCurrectData',this.data)
      }
    }
  }
}
</script>
<style scoped lang="scss">

.mark_dialogue_data {
  color: #333333;
  padding: 20px;
  word-wrap: break-word;
  text-align: left;
  font-size: 1.2rem;
}

.dialogueMark_card {
  flex: 1;
  display: flex;
  flex-direction: column;

.el-card__body {
  flex: 1;
  overflow-y: auto;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
}
</style>