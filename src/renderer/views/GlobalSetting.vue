<template>
  <div id="content">
    <div class="marktype-header">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div style="font-size: 20px; color: #303133; text-align: left">文本分类标注组管理</div>
            <div class="h10"></div>
            <div style="font-size: 14px; color: #909399; text-align: left">通常用来分类(标注)整条数据的情感、观点等.类似于标注,只不过此处标注的是整条数据.</div>
          </div>
          <div class="w10"></div>
          <div>
            <el-button type="primary" @click="needShowNewMarkTypeView = true">新建标签组</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!--已有实体标注标签组列表-->
    <div class="marktype-table-warp">
      <el-table
        :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.content.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="预览:">
                <span v-for="(data, index) in props.row.datas" :key="index" class="margin_0_10">
                  <el-tooltip effect="dark" :content="data.name" placement="top">
                    <el-tag effect="dark">{{ data.tag }}</el-tag>
                  </el-tooltip>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="250"></el-table-column>
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
    <el-dialog title="新建文本分类标注类型" :visible.sync="needShowNewMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="newMarkTypeForm" label-position="left" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="newMarkTypeForm.name" clearable placeholder="请填写名称" maxlength="30" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="内容" required>
          <div class="padding_10" style="background-color: #fefefe">
            <div v-show="newMarkTypeForm.datas.length > 0">
              <div class="tag-warp">
                <div v-for="(data, index) in newMarkTypeForm.datas" :key="index" class="tag-warp-item">
                  <el-tag effect="dark" closable @close="handleNewMarkTypeTagClose(data, index)">{{ `${data.tag}-${data.name}` }}</el-tag>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
            <el-form :inline="true" :model="newMarkTypeTagForm">
              <el-form-item label="标记">
                <el-input v-model="newMarkTypeTagForm.tag" placeholder="Positive/Opposite..." show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="newMarkTypeTagForm.name" placeholder="正面/反面..." show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="handleNewMarkTypeTag">点击新增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" clearable v-model="newMarkTypeForm.description" placeholder="请填写描述,方便理解和解释" maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div class="separate_line"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="needShowNewMarkTypeView = false">取 消</el-button>
        <el-button type="primary" @click="saveMarkType">保 存</el-button>
      </div>
    </el-dialog>
    <!--修改实体标注标签组-->
    <el-dialog title="修改文本分类标注组" :visible.sync="needShowEditMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="editMarkTypeForm" label-position="left" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="editMarkTypeForm.name" clearable placeholder="请填写名称" maxlength="30" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="内容" required>
          <div class="padding_10" style="background-color: #fefefe">
            <div v-show="editMarkTypeForm.datas.length > 0">
              <div class="tag-warp">
                <div v-for="(data, index) in editMarkTypeForm.datas" :key="index" class="tag-warp-item">
                  <el-tag effect="dark" closable @close="handleEditMarkTypeTagClose(data, index)">{{ `${data.tag}-${data.name}` }}</el-tag>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
            <el-form :inline="true" :model="editMarkTypeTagForm">
              <el-form-item label="标记">
                <el-input v-model="editMarkTypeTagForm.tag" placeholder="Positive/Opposite..." show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="editMarkTypeTagForm.name" placeholder="正面/反面/..." show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="handleEditMarkTypeTag">点击新增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" clearable v-model="editMarkTypeForm.description" placeholder="请填写描述,方便理解和解释" maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="needShowEditMarkTypeView = false">取 消</el-button>
        <el-button type="primary" @click="saveEditMarkType">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import db_utils from '../libs/db_utils';

export default {
  name: 'GloablSetting',
  data() {
    return {
      tableData: [],
      search: '',
      needShowNewMarkTypeView: false, //是否显示新建标注页面
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
    };
  },
  mounted() {
    console.log('GlobalSetting mounted');

    this.initData();
  },
  methods: {
    initData() {
      db_utils
        .generate_find(db_utils.GLOBAL_TYPES_DB, {})
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
      if (this.newMarkTypeTagForm.tag && this.newMarkTypeTagForm.name) {
        this.newMarkTypeForm.datas.push({
          tag: this.newMarkTypeTagForm.tag,
          name: this.newMarkTypeTagForm.name,
        });
        this.newMarkTypeTagForm.tag = '';
        this.newMarkTypeTagForm.name = '';
      } else {
        this.$message({
          message: '请填写名称及标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }
    },
    handleEditMarkTypeTag() {
      if (this.editMarkTypeTagForm.tag && this.editMarkTypeTagForm.name) {
        this.editMarkTypeForm.datas.push({
          tag: this.editMarkTypeTagForm.tag,
          name: this.editMarkTypeTagForm.name,
        });
        this.editMarkTypeTagForm.tag = '';
        this.editMarkTypeTagForm.name = '';
      } else {
        this.$message({
          message: '请填写名称及标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }
    },

    // 保存,写入文件或数据库
    saveMarkType() {
      if (this.needShowNewMarkTypeView && this.newMarkTypeForm.name && this.newMarkTypeForm.datas.length > 0) {
        this.needShowNewMarkTypeView = false;
        this.newMarkTypeForm.content = this.newMarkTypeForm.datas
          .reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue.tag}-${currentValue.name}`);
          }, [])
          .toString();
        this.tableData.unshift(this.newMarkTypeForm); //添加到开头
        // 保存到数据库
        db_utils.insert(db_utils.GLOBAL_TYPES_DB, this.newMarkTypeForm, (err, newDoc) => {
          //console.log('marktype new:' + newDoc);
        });
        this.clearNewMarkTypeForm();
        this.$events.emit('GLOBALTYPE_CHANGED', 'MARKTYPE');
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
      if (this.needShowEditMarkTypeView && this.editMarkTypeForm.name && this.editMarkTypeForm.datas.length > 0) {
        this.needShowEditMarkTypeView = false;
        this.editMarkTypeForm.content = this.editMarkTypeForm.datas
          .reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue.tag}-${currentValue.name}`);
          }, [])
          .toString();
        this.tableData.splice(this.editMarkTypeForm._index, 1, this.editMarkTypeForm); //添加到开头
        // 保存到数据库
        db_utils.update(db_utils.GLOBAL_TYPES_DB, { _id: this.editMarkTypeForm._id }, this.editMarkTypeForm, {
          upsert: false,
        });
        this.clearEditMarkTypeForm();
        this.$events.emit('GLOBALTYPE_CHANGED', 'MARKTYPE');
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
          db_utils.remove(db_utils.GLOBAL_TYPES_DB, { _id: row._id }, {}, (err, n) => {
            //console.log('marktype delete:' + n);
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 70,
          });
          this.$events.emit('GLOBALTYPE_CHANGED', 'MARKTYPE');
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

.tag-warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .tag-warp-item {
    margin: 5px 5px 0 0;
  }
}

.el-tag {
  border: none !important;
}
</style>
