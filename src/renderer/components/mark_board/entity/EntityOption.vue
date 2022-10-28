<template>
  <el-card class="entityMarkItems" shadow="never" body-style="overflow:auto">
    <div slot="header" class="clearfix" style="text-align: left">
      <span>
        <i class="el-icon-coffee-cup"></i>
        实体标注
      </span>
      <el-button :disabled="data.status === DataType.FINISHED"
                 style="float: right; padding: 3px 0"
                 type="text"
                 @click="onCloseAllTagClick">清空
      </el-button>
    </div>
    <el-collapse v-model="entityActiveNames">
      <el-collapse-item v-for="item in entityTags" :key="item.id" :title="item.text" :name="item.id">
        <div class="selectedEntitys">
          <div v-for="(tag, index) in item.tags" :key="index" style="margin: 10px">
            <el-tag :color="tag.color"
                    effect="dark"
                    :closable="data.status === DataType.MARKING"
                    @close="onCloseTagClick(tag)">
              {{tag.content.length > 20 ? tag.content.substr(0, 20) + '...' : tag.content}}
            </el-tag>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
import {Cons} from '../../../Constant'

export default {
  name: 'EntityOption',
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
    // 工程所用的一种标注标签组,从数据库中加载
    projectMarkType:{
      type: Object,
      required: true,
    }
  },
  computed: {
    // 根据 数据动态变化
    entityTags() {
      let entityTags = []
      this.projectMarkType.datas.forEach((data, index) => {
        entityTags.push({
          id: index + 1,
          text: data.tag,
          tags: []
        })
      })
      this.data.tags.forEach((data) => {
        entityTags.forEach((entityTag) => {
          if (data.tag === entityTag.text) {
            entityTag.tags.push(data)
          }
        })
      })
      return entityTags
    }
  },
  watch: {
    currectData(val) {
      this.data = val
    },
    projectMarkType(){
      // 默认展开已标注数据
      this.projectMarkType.datas.forEach((_, index) => {
        this.entityActiveNames.push(index + 1)
      })
    }

  },
  data() {
    return {
      entityActiveNames: [],
      data: this.currectData,
      DataType: Cons.DataType,
      Listeners:[]
    }
  },
  mounted() {
   this.initEvent()
    this.initData()
  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },

  methods: {
    initEvent(){
      const onCloseTagClick_listener = (_data) => {
        this.onCloseTagClick(_data)
      }
      this.Listeners = [
        ['onCloseTagClick',onCloseTagClick_listener]
      ]
      this.addEventListener(this.Listeners)
    },
    initData(){
      // 默认展开已标注数据
      this.projectMarkType.datas.forEach((_, index) => {
        this.entityActiveNames.push(index + 1)
      })

    },
    // 点击清空标签按钮
    onCloseAllTagClick() {
      if (this.data.status === this.DataType.MARKING) {
        this.data.tags.forEach((_data) => {
          //this.em.cancelHighlightLine(data.line_id)
          this.$events.emit('cancelHighlightLine', _data.line_id);

        })
        this.data.tags = []
        this.$emit('doUpdateCurrectData',this.data)
      }
    },
    // 点击关闭标签
    onCloseTagClick(_data) {
      if (this.data.status === this.DataType.MARKING) {
        const _index = this.data.tags.findIndex((tag) => {
          return _data.line_id === tag.line_id
        })
        if (_index !== -1) {
          //this.em.cancelHighlightLine(tag.line_id)
          this.$events.emit('cancelHighlightLine', _data.line_id);

          // 1.删除数据
          this.data.tags.splice(_index, 1)
          // 2.更新数据库
          this.$emit('doUpdateCurrectData',this.data)
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.entityMarkItems {
  display: flex;
  flex-direction: column;
}
</style>