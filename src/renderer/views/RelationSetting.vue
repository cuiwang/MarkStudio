<template>
  <div id="content">
    <div class="marktype-header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div style="font-size: 20px;color: #303133;text-align: left">关系标注标签组管理</div>
            <div class="h10"></div>
            <div style="font-size: 14px;color: #909399;text-align: left">
              定义一组关系标签,使用时先开启关系标注, 先后点击两个实体完成连接关系.
            </div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button type="primary" @click="needShowNewMarkTypeView = true">新建关系标注标签组</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!--已有实体标注标签组列表-->
    <div class="marktype-table-warp">
      <el-table :data="tableData.filter((data) => !search || data.content.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="预览:">
                <span v-for="(data, index) in props.row.datas" :key="index" class="margin_0_10">
                  <el-tooltip effect="dark" :content="data.name" placement="top">
                    <el-tag :color="data.color" effect="dark">{{ data.tag }}</el-tag>
                  </el-tooltip>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" width="450"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column width="200">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <div class="flex_row">
              <div class="flex_1"></div>
              <el-button :disabled="scope.row.editable === false" size="mini" @click="editMarkType(scope.$index, scope.row)">编辑</el-button>
              <el-button :disabled="scope.row.editable === false" size="mini" type="danger" @click="deleteMarkType(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新建实体标注标签组-->
    <el-dialog width="45%" title="新建-关系标注" :visible.sync="needShowNewMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="newMarkTypeForm" label-position="left" label-width="50px">
        <el-form-item label="标签:">
          <el-row :gutter="20">
            <el-col :span="8" :key="index" v-for="(tag, index) in newMarkTypeForm.datas">
              <div class="flex_row align_center">
                <el-tag :color="tag.color" size="medium" effect="dark" closable :disable-transitions="false" @close="handleNewMarkTypeTagClose(tag, index)">
                  {{ tag.tag }}
                </el-tag>
                <el-color-picker size="medium" v-model="tag.color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex_row align_center">
                <el-input
                  class="input-new-tag"
                  v-if="inputNewMarkTypeVisible"
                  v-model="inputNewMarkTypeValue"
                  ref="saveNewTagInput"
                  size="small"
                  @keyup.enter.native="handleNewMarkTypeTag"
                  @blur="handleNewMarkTypeTag"
                ></el-input>
                <el-button v-else class="button-new-tag" size="mini" @click="showNewMarkTypeTagInput">+ New Tag</el-button>
                <el-color-picker size="medium" v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述">
          <el-input clearable v-model="newMarkTypeForm.description" placeholder="请填写描述,方便理解和解释"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="needShowNewMarkTypeView = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveMarkType">保 存</el-button>
      </div>
    </el-dialog>
    <!--修改实体标注标签组-->
    <el-dialog width="45%" title="修改-关系标注" :visible.sync="needShowEditMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="editMarkTypeForm" label-position="left" label-width="50px">
        <el-form-item label="标签:">
          <el-row :gutter="20">
            <el-col style="margin-bottom: 20px" :span="8" :key="index" v-for="(tag, index) in editMarkTypeForm.datas">
              <div class="flex_row align_center">
                <el-tag :color="tag.color" size="medium" effect="dark" closable :disable-transitions="false" @close="handleEditMarkTypeTagClose(tag, index)">
                  {{ tag.tag }}
                </el-tag>
                <el-color-picker size="medium" v-model="tag.color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
            </el-col>

            <el-col style="margin-bottom: 20px" :span="8">
              <div class="flex_row align_center">
                <el-input
                  class="input-edit-tag"
                  v-if="inputEditMarkTypeVisible"
                  v-model="inputEditMarkTypeValue"
                  ref="saveEditTagInput"
                  size="small"
                  @keyup.enter.native="handleEditMarkTypeTag"
                  @blur="handleEditMarkTypeTag"
                ></el-input>
                <el-button v-else class="button-edit-tag" size="mini" @click="showEditMarkTypeTagInput">+ New Tag</el-button>
                <el-color-picker size="medium" v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="描述:">
          <div style="margin-left: 20px">
            <el-input clearable v-model="editMarkTypeForm.description" placeholder="请填写描述,方便理解和解释"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="needShowEditMarkTypeView = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveEditMarkType">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';

export default {
  name: 'RelationSetting',
  data() {
    return {
      tableData: [],
      search: '',
      needShowNewMarkTypeView: false, //是否显示新建标注页面
      inputNewMarkTypeVisible: false,
      inputNewMarkTypeValue: '',
      newMarkTypeForm: {
        editable: true,
        name: '',
        content: '',
        description: '',
        datas: [],
      },
      newMarkTypeTagForm: {
        name: '',
        tag: '',
      },
      needShowEditMarkTypeView: false, //是否显示编辑标注页面
      inputEditMarkTypeVisible: false,
      inputEditMarkTypeValue: '',
      editMarkTypeForm: {
        editable: true,
        name: '',
        content: '',
        description: '',
        datas: [],
      },
      editMarkTypeTagForm: {
        name: '',
        tag: '',
      },
      color: 'rgba(255, 69, 0, 0.68)',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
    };
  },
  mounted() {
    console.log('RelationTypeSetting mounted');

    this.initData();
  },
  methods: {
    initData() {
      db_utils
        .generate_find(db_utils.RELATION_TYPES_DB, {})
        .sort({ editable: 1 })
        .exec((err, documents) => {
          for (const document of documents) {
            this.tableData.unshift(document);
          }
        });
    },
    // ────────────────────────── 分割线 ──────────────────────────
    clearNewMarkTypeForm() {
      this.newMarkTypeForm = {
        editable: true,
        name: '',
        content: '',
        description: '',
        datas: [],
      };
    },
    clearEditMarkTypeForm() {
      this.editMarkTypeForm = {
        editable: true,
        name: '',
        content: '',
        description: '',
        datas: [],
      };
    },
    showNewMarkTypeTagInput() {
      this.inputNewMarkTypeVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveNewTagInput.$refs.input.focus();
      });
    },
    showEditMarkTypeTagInput() {
      this.inputEditMarkTypeVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveEditTagInput.$refs.input.focus();
      });
    },
    // 点击移除标记按钮
    handleNewMarkTypeTagClose(data, index) {
      this.newMarkTypeForm.datas.splice(index, 1);
    },
    // 点击移除标记按钮
    handleEditMarkTypeTagClose(data, index) {
      this.editMarkTypeForm.datas.splice(index, 1);
    },
    // 新增标记按钮点击
    handleNewMarkTypeTag() {
      let inputNewMarkTypeValue = this.inputNewMarkTypeValue;
      if (inputNewMarkTypeValue) {
        this.newMarkTypeForm.datas.push({
          tag: inputNewMarkTypeValue,
          name: '',
          color: this.color,
        });
      }
      this.inputNewMarkTypeVisible = false;
      this.inputNewMarkTypeValue = '';
    },
    handleEditMarkTypeTag() {
      let inputEditMarkTypeValue = this.inputEditMarkTypeValue;
      if (inputEditMarkTypeValue) {
        this.editMarkTypeForm.datas.push({
          tag: inputEditMarkTypeValue,
          name: '',
        });
      }
      this.inputEditMarkTypeVisible = false;
      this.inputEditMarkTypeValue = '';
    },

    // 保存,写入文件或数据库
    saveMarkType() {
      if (this.needShowNewMarkTypeView && this.newMarkTypeForm.datas.length > 0) {
        this.needShowNewMarkTypeView = false;
        this.newMarkTypeForm.content = this.newMarkTypeForm.datas
          .reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue.tag}`);
          }, [])
          .toString();
        this.tableData.unshift(this.newMarkTypeForm); //添加到开头
        // 保存到数据库
        db_utils.insert(db_utils.RELATION_TYPES_DB, this.newMarkTypeForm, (err, newDoc) => {
          //console.log('marktype new:' + newDoc);
        });
        this.clearNewMarkTypeForm();
        this.$events.emit('RELATIONTYPE_CHANGED', 'MARKTYPE');
      } else {
        this.$message({
          message: '请至少填写一个标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }
    },
    // 保存,编辑数据入库
    saveEditMarkType() {
      if (this.needShowEditMarkTypeView && this.editMarkTypeForm.datas.length > 0) {
        this.needShowEditMarkTypeView = false;
        this.editMarkTypeForm.content = this.editMarkTypeForm.datas
          .reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue.tag}`);
          }, [])
          .toString();
        this.tableData.splice(this.editMarkTypeForm._index, 1, this.editMarkTypeForm); //添加到开头
        // 保存到数据库
        db_utils.update(db_utils.RELATION_TYPES_DB, { _id: this.editMarkTypeForm._id }, this.editMarkTypeForm, {
          upsert: false,
        });
        this.clearEditMarkTypeForm();
        this.$events.emit('RELATIONTYPE_CHANGED', 'MARKTYPE');
      } else {
        this.$message({
          message: '请至少填写一个标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }
    },
    // 删除,同时删除数据库记录
    deleteMarkType(index, row) {
      this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 从数据库删除
          db_utils.remove(db_utils.RELATION_TYPES_DB, { _id: row._id }, {}, (err, n) => {
            //console.log('marktype delete:' + n);
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 70,
          });
          this.$events.emit('RELATIONTYPE_CHANGED', 'MARKTYPE');
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 70,
          });
        });
    },
    // 修改,同时修改数据库记录
    editMarkType(index, row) {
      this.editMarkTypeForm = JSON.parse(JSON.stringify(row));
      this.editMarkTypeForm._index = index;
      this.needShowEditMarkTypeView = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.button-edit-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-edit-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-row {
  margin: 0 !important;
}

/deep/ .el-color-picker__trigger {
  border: none;
}
/deep/ .el-color-picker__color {
  border: none;
}
.el-tag {
  border: none !important;
}
</style>
