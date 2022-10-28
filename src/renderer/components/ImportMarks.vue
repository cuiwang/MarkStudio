<template>
  <div>
    <el-dialog title="导入标签"
               :visible.sync="showDialog"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-form ref="projectForm" :model="markForm" label-width="100px">
        <el-form-item label="提示:">
          <div class="flex_col" style="align-items: flex-start">
            <div>
              请点击下载
              <el-button size="small" type="text" @click="saveJson" style="margin: 0 5px">示例文件</el-button>
              修改配置后上传.
            </div>
            <div style="font-size: 12px; color: #909399">
              <span style="font-weight: bold; color: #ff7c00">"status"</span>
              字段标识为
              <span style="font-weight: bold; color: #ff7c00">"1"</span>
              时才会录入.
            </div>
            <div style="font-size: 12px; color: #909399">
              <span style="font-weight: bold; color: #ff7c00">"type"</span>
              字段目前支持('entity','relation')
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标签文件" required>
          <div class="flex_row align_center" style="height: 40px; justify-content: flex-start">
            <el-upload
                action="/"
                :file-list="fileList"
                :on-change="handleChange"
                :limit="1"
                accept=".json,.JSON"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
                :multiple="false"
            >
              <div class="flex_row align_center">
                <el-button size="small" type="info">点击上传标签文件</el-button>
                <span class="w20"></span>
                <span slot="tip" class="el-upload__tip">
                  只能上传
                  <span style="font-weight: bold">.json</span>
                  文件
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item v-if="markForm.content.length" label="数据预览">
          <div class="file_upload_tips">
            解析成功!总共
            <span style="font-weight: bold; color: #ff7c00">{{markForm.content.length}}</span>
            条数据.
          </div>
        </el-form-item>
        <el-form-item label="标签类型" required>
          <el-radio-group v-model="markTypeRadio">
            <el-radio :label="WorkingType.ENTITY">实体标签</el-radio>
            <el-radio :label="WorkingType.RELATION">关系标签</el-radio>
            <el-radio :label="WorkingType.DIALOGUE">对话标签</el-radio>
            <el-radio :label="WorkingType.CLASSIFY">分类标签</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonClick">取 消</el-button>
        <el-button :disabled="markForm.content.length === 0"
                   type="primary"
                   :loading="isReadingFile"
                   @click="saveMarkType">保 存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import db_utils  from '../libs/db_utils'
import fs        from 'fs'
import FileSaver from 'file-saver'
import {Cons}    from '../Constant'

export default {
  name: 'ImportMarks',
  props: {
    showDialog: {
      // 类型限制
      type: Boolean,
      // 默认值
      default: false,
      required: true
    }
  },
  data() {
    return {
      WorkingType: Cons.WorkingType,
      markTypeRadio: Cons.WorkingType.ENTITY, //0:entity,1:relation
      markForm: {
        content: []
      },
      fileList: [], //上传组件,文件预览
      isReadingFile: false, //是否正在解析文件
      demoJSON: {
        type: 'entity/relation',
        content: [
          {
            name: '给这条标注起个名字',
            status: '1',
            description: 'type选择entity或relation',
            datas: [
              {
                tag: '标签1',
                color: '#333333'
              },
              {
                tag: '标签2',
                color: '#666666'
              }
            ]
          },
          {
            name: 'status为1才会录入',
            status: '1',
            description: 'type选择entity或relation',
            datas: [
              {
                tag: '标签1',
                color: '#333333'
              },
              {
                tag: '标签2',
                color: '#666666'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.initEvent()
    this.initData()
  },
  methods: {
    initEvent() {
    },
    // 保存,写入文件或数据库
    saveMarkType() {
      for (const item of this.markForm.content) {
        // 只有状态为1的才保存
        if (item.status !== '1') {
          continue
        }
        let newMarkTypeForm = {
          type: this.markTypeRadio,
          name: '',
          content: '',
          description: '',
          datas: []
        }
        if (item.datas.length > 0) {
          newMarkTypeForm = item
          newMarkTypeForm.content = item.datas
                                        .reduce((previousValue, currentValue) => {
                                          return previousValue.concat(`${currentValue.tag}`)
                                        }, [])
                                        .toString()
          // 保存到数据库
          db_utils.insert(db_utils.LABELS_DB, newMarkTypeForm, (err, newDoc) => {
            //console.log('marktype new:' + newDoc);
            this.$message({
              message: item.name + ':写入成功!(实体标签)',
              type: 'success',
              center: true,
              offset: 70
            })
          })
        }
        else {
          this.$message({
            message: '请至少填写一个标签',
            type: 'error',
            center: true,
            offset: 70
          })
        }
      }
      // 通知刷新
      this.$events.emit('MARKTYPE_CHANGED', 'MARKTYPE')
      this.$events.emit('RELATIONTYPE_CHANGED', 'MARKTYPE')
      this.$emit('cancelButtonClick')
    },
    // ────────────────────────── 选择文件上传组件 ──────────────────────────
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      const path = file.raw.path
      if (path) {
        var stream = fs.createReadStream(path),
            data = ''
        stream.on('data', (params) => {
          data += params
        })
        stream.on('end', () => {
          console.log('finished!!!!')
          const _data = eval('(' + data + ')')
          this.markForm.content = _data.content
          this.markTypeRadio = _data.type
          if (this.markForm.content.length === 0) {
            this.showMessageWithText('未能解析出\'content\'数组')
          }
        })
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: 'warning',
        offset: 70
      })
    },
    handleRemove(files, fileList) {
      this.projectForm = {}
    },
    beforeAvatarUpload(file) {
      const isTxt = file.type === 'project'
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isTxt) {
        this.$message.error('上传文件只能是 project 格式!')
      }
      if (!isLt500M) {
        this.$message.error('上传文件大小不能超过 500MB!')
      }
      return isTxt && isLt500M
    },
    // ›››››››››››››››››››››››››››› 分割线 ‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹‹
    initData() {
    },
    // ────────────────────────── 分割线 ──────────────────────────
    // ────────────────────────── 新建工程 ──────────────────────────
    cancelButtonClick() {
      this.$emit('cancelButtonClick')
    },
    saveJson() {
      if (this.isSaving) {
        this.showLocalNotification('正在导出,请稍后...')
        return
      }
      this.isSaving = true
      // 将json转换成字符串
      const data = JSON.stringify(this.demoJSON)
      const blob = new Blob([data], {type: ''})
      this.showLocalNotification('导出成功!')

      FileSaver.saveAs(blob, '导入标签示例.json')
      this.isSaving = false
      this.$emit('cancelButtonClick')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../globals.scss';

.el-select {
  width: 100%;
}
</style>