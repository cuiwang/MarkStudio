<template>
  <el-card class="relationMarkItems" shadow="never" body-style="overflow:auto">
    <div slot="header" class="clearfix" style="text-align: left">
      <span>
        <i class="el-icon-connection"></i>
        关系标注
      </span>
    </div>
    <el-collapse v-model="relationActiveNames">
      <el-collapse-item v-for="item in relationTags" :key="item.id" :title="item.text" :name="item.id">
        <el-row :gutter="10">
          <el-col style="margin-bottom: 10px" :span="24" v-for="(tag, index) in item.tags" :key="index">
            <el-tag
                @click.prevent="onChangeLineStatusClick(tag)"
                size="medium"
                effect="dark"
                :closable="data.status === DataType.MARKING"
                :disable-transitions="false"
                @close="removeRelationMarkItem(tag)"
                :color="tag.show ? tag.selectedRelationType.color : '#999999'"
            >
              {{`${tag.start.content} —— ${tag.selectedRelationType.tag} —— ${tag.end.content}`}}
            </el-tag>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script>
import {Cons} from '../../../Constant'

export default {
  name: 'RelationOption',
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
    projectRelationType:{
      type: Object,
      required: true,
    }
  },
  watch: {
    currectData(val) {
      this.data = val
    },
    projectRelationType(){
      // 默认展开已标注数据
      this.projectRelationType.datas.forEach((_, index) => {
        this.relationActiveNames.push(index + 1)
      })
    }

  },
  data() {
    return {
      relationActiveNames: [],
      data:this.currectData,
      DataType: Cons.DataType,

    }
  },
  computed: {
    relationTags() {
      let relationTags = []
      this.projectRelationType.datas.forEach((data, index) => {
        relationTags.push({
          id: index + 1,
          text: data.tag,
          tags: []
        })
      })
      if (this.data.relations) {
        this.data.relations.forEach((data) => {
          relationTags.forEach((relationTag) => {
            if (data.selectedRelationType.tag === relationTag.text) {
              relationTag.tags.push(data)
            }
          })
        })
      }
      return relationTags
    }
  },
  mounted() {
    // 默认展开已标注数据
    this.projectRelationType.datas.forEach((_, index) => {
      this.relationActiveNames.push(index + 1)
    })
  },
  methods: {
    // 修改当前线显示状态
    onChangeLineStatusClick(item) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === item.id
      })
      if (item.show) {
        item.show = false
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item)
        // 2.更新
        this.$emit('doUpdateCurrectData',this.data)

        this.$events.emit('doHideRelationLine', _index);

        //this.doHideRelationLine(_index)
      }
      else {
        item.show = true
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item)
        // 2.更新
        this.$emit('doUpdateCurrectData',this.data)
        this.$events.emit('doShowRelationLine', _index);

        //this.doShowRelationLine(_index)
      }
    },
    // 关系标注页面中,从右侧栏点击移除一个关系标注
    removeRelationMarkItem(tag) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === tag.id
      })
      if (_index !== -1) {
        // 1.删除
        this.data.relations.splice(_index, 1)
        // 2.更新
        this.$emit('doUpdateCurrectData',this.data)

        // 3.删除连线
        this.$events.emit('doDeleteOneRelationLine', _index);

        //this.doDeleteOneRelationLine(_index)
      }
    },
  }
}
</script>
<style scoped lang="scss">
//解决标题栏滚动问题
.relationMarkItems {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}
</style>