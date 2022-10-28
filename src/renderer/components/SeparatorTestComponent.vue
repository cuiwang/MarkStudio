<template>
  <div>
    <el-divider>
      <el-button type="success" size="mini" @click="onTestSeparatorClick">点击测试分割符</el-button>
    </el-divider>
    <div style="font-size: 14px;color: #999999">JS伪代码(小心转义字符问题):_content.split(RegExp(_separator))</div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input type="textarea" :rows="5" placeholder="请填写测试文本" v-model="test_content"></el-input>
      </el-col>
      <el-col :span="12">
        <div style="height: 117px;border: 1px solid #DCDFE6;padding: 5px 15px;box-sizing: border-box;overflow-y: scroll;">
          <el-row v-for="(item, index) in test_datas" style="line-height: 20px;" :key="index" :gutter="10">
            <el-col :span="2">
              <span style="color: #999999">
                {{ `${index + 1}.` }}
              </span>
            </el-col>
            <el-col :span="20" justify="start">
              <span style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;">{{ item }}</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>

function abc() {
//#82AAFF
}
export default {
  name: 'SeparatorTestComponent',
  props: {
    separator: { type: String, default: '', required: true },
  },
  data() {
    return {
      test_content: '',
      test_datas: [],
    };
  },
  methods: {
    // 测试分隔符
    onTestSeparatorClick() {
      if (this.test_content && this.separator) {
        try {
          this.test_datas = this.test_content.split(RegExp(this.separator));
          this.$message({
            message: `分割完成:${this.test_datas.length}条`,
            type: 'success',
          });
        } catch (e) {
          this.$message({
            message: e,
            type: 'error',
          });
        }
      } else {
        this.$message({
          message: '请检查是否填写分隔符及测试文本',
          type: 'warning',
        });
      }
    },
  },
};
</script>

<style scoped></style>