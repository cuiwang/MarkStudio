<template>
  <el-card class="dialogueMarkItems" shadow="never" body-style="overflow:auto">
    <div slot="header" class="clearfix" style="text-align: left">
      <span>
        <i class="el-icon-chat-line-square"></i>
        对话标注
      </span>
    </div>
    <div class="dialogue_setting">
      <h3>对话分割符配置</h3>
      <div style="font-size: 14px; color: #666666; margin-bottom: 5px">* 将文本分割成数组,再分别标注</div>
      <el-form :inline="true">
        <el-form-item label="分割符:">
          <el-input size="small" placeholder="请填写用于切分对话的分割符" v-model="dialogueRegExp"/>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="data.status !== DataType.MARKING"
                     type="danger"
                     size="small"
                     @click="onSeparatorChangeClick">{{data.status !== DataType.MARKING?'请先激活数据':'修改'}}
          </el-button>
        </el-form-item>
      </el-form>
      <SeparatorTestComponent :separator="dialogueRegExp"></SeparatorTestComponent>
    </div>
  </el-card>
</template>
<script>
import SeparatorTestComponent from '../../SeparatorTestComponent'
import {Cons}                 from '../../../Constant'
export default {
  name: 'DialogueOption',
  components: {SeparatorTestComponent},

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
      data:this.currectData,
      dialogueRegExp: '', //用户输入的分隔符正则
      DataType: Cons.DataType,

    }
  },
  mounted() {
    this.dialogueRegExp = this.data.dialogue ? this.data.dialogue.separator : this.projectDialogueType.separator
  },
  methods: {
    // 修改分隔符
    onSeparatorChangeClick() {
      if (this.dialogueRegExp) {
        this.$confirm('此操作将重构数组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          if (this.data.status === this.DataType.MARKING) {
            this.doDialogueSeparator()
            this.$message({
              type: 'success',
              message: `分割成功:${this.data.dialogue.datas.length}条`,
            })
          } else {
            this.$message({
              type: 'warning',
              message: '当前数据已保存,请点击右[激活按钮]解除锁定',
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      }
    },
    // 分割对话,重置属性
    doDialogueSeparator() {
      //console.log(this.dialogueRegExp)
      // 分割文本成数组
      // datas : [content:'',tags:{}]
      this.$set(this.data, 'dialogue', {
        separator: this.dialogueRegExp,
        datas: this.data.content.split(RegExp(this.dialogueRegExp)).map((value) => {
          return {
            content: value,
            tags: [],
          }
        }),
      })
      this.$emit('doUpdateCurrectData',this.data)
    },
  }
}
</script>
<style scoped lang="scss">
//解决标题栏滚动问题
.dialogueMarkItems {
  height: 100%;
  display: flex;
  flex-direction: column;

 /deep/ .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}
</style>