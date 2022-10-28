<template>
  <div id="content">
    <div class="marktype-header">
      <el-card shadow="never">
        <div class="flex_row align_center">
          <div class="flex_1">
            <div style="font-size: 14px; color: #909399; text-align: left">
              {{tips}}
            </div>
          </div>
          <div>
            <el-button size="small"  @click="onExportMarksClick" icon="el-icon-download">导出标签组</el-button>
          </div>
          <div class="w10"></div>
          <div>
            <el-button size="small" type="primary" @click="needShowNewMarkTypeView = true">新建标签组</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!--已有实体标注标签组列表-->
    <div class="marktype-table-warp">
      <el-table :data="tableData.filter((data) => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span v-for="(data, index) in props.row.datas" :key="index" class="margin_0_10">
                  <el-tooltip effect="dark" :content="data.name" placement="top">
                    <el-tag :color="data.color" effect="dark">{{ getMaxString(data.tag) }}</el-tag>
                  </el-tooltip>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <div class="flex_col">
              <span>{{scope.row.name}}</span>
              <span v-if="scope.row.project_id" class="warning_color description_text_size"> <i class="el-icon-star-on"/>(专) {{scope.row.project_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="content" label="内容">
          <template slot-scope="scope">
            <div class="flex_col">
              <span>{{getMaxString(scope.row.content)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope" >
            <div class="flex_row" v-if="!scope.row.user_id || scope.row.user_id === user_id">
              <div class="flex_1"></div>
              <el-button  size="mini" @click="editMarkType(scope.$index, scope.row)">编辑</el-button>
              <el-button  size="mini" type="danger" @click="deleteMarkType(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新建实体标注标签组-->
    <el-dialog width="45%" title="新增-实体标注" :visible.sync="needShowNewMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="newMarkTypeForm" label-position="left" label-width="50px">
        <el-form-item label="类型:">
          <el-radio-group v-model="type">
            <el-radio :label="WorkingType.ENTITY">实体标注</el-radio>
            <el-radio :label="WorkingType.RELATION">关系标注</el-radio>
            <el-radio :label="WorkingType.DIALOGUE">对话标注</el-radio>
            <el-radio :label="WorkingType.CLASSIFY">分类标注</el-radio>
            <el-radio disabled label="">图片标注</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称:">
          <div style="margin-left: 20px">
            <el-input
                v-model="newMarkTypeForm.name"
                clearable
                placeholder="请填写名称"
                maxlength="30"
                show-word-limit
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="描述:">
          <div style="margin-left: 20px">
            <el-input clearable v-model="newMarkTypeForm.description" placeholder="请填写描述,方便理解和解释"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="分隔:" v-if="type===WorkingType.DIALOGUE">
          <div style="margin-left: 20px">
          <el-input clearable v-model="newMarkTypeForm.separator" placeholder="请填写用于切分对话的分割符"></el-input>
          <SeparatorTestComponent :separator="newMarkTypeForm.separator"></SeparatorTestComponent>
          </div>
        </el-form-item>

        <el-form-item label="标签:">
          <div style="margin-left: 20px">
            <div v-show="newMarkTypeForm.datas.length > 0">
              <div class="flex_row flex_warp">
                <div v-for="(data, index) in newMarkTypeForm.datas" :key="index" class="flex_row_allcenter mytag">
                  <el-tag type="info" closable @close="handleNewMarkTypeTagClose(data, index)"
                  >{{ `${data.tag} ${data.name}` }}
                  </el-tag>
                  <el-color-picker size="medium" v-model="data.color" show-alpha :predefine="predefineColors"></el-color-picker>
                </div>
              </div>
            </div>
            <div v-if="newMarkTypeForm.datas.length === 0">
            <el-tag type="info">Empty</el-tag>
              </div>
              <el-divider></el-divider>
            <div class="flex_row  padding_10" style="background-color: #f8f9fa;border-radius: 5px">
              <div class="flex_col_allcenter">
                <span class="w30">标签</span>
                <el-input
                    v-model="newMarkTypeTagForm.tag"
                    placeholder="B/I/E..."
                ></el-input>
              </div>
              <span class="w10"></span>
              <div class="flex_col_allcenter">
              <span>解释</span>
              <el-input
                  v-model="newMarkTypeTagForm.name"
                  placeholder="开头/中间/结尾..."
              ></el-input>
              </div>
              <span class="w10"></span>
              <div class="flex_col_allcenter">
              <span>颜色</span>
              <el-color-picker  v-model="newMarkTypeTagForm.color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
              <span class="w10"></span>
                <el-button  type="primary" @click="handleNewMarkTypeTag">点击新增</el-button>
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="needShowNewMarkTypeView = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveMarkType">保 存</el-button>
      </div>
    </el-dialog>
    <!--修改实体标注标签组-->
    <el-dialog width="45%" title="修改-实体标注" :visible.sync="needShowEditMarkTypeView" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="editMarkTypeForm" label-position="left" label-width="50px">
        <el-form-item label="名称:">
          <div style="margin-left: 20px">
            <el-input
                v-model="editMarkTypeForm.name"
                clearable
                placeholder="请填写名称"
                maxlength="30"
                show-word-limit
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="描述:">
          <div style="margin-left: 20px">
            <el-input clearable v-model="editMarkTypeForm.description" placeholder="请填写描述,方便理解和解释"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="分隔:" v-if="type===WorkingType.DIALOGUE">
          <div style="margin-left: 20px">
          <el-input clearable v-model="editMarkTypeForm.separator" placeholder="请填写用于切分对话的分割符"></el-input>
          <SeparatorTestComponent :separator="editMarkTypeForm.separator"></SeparatorTestComponent>
          </div>
        </el-form-item>

        <el-form-item label="标签:">
          <div style="margin-left: 20px">
            <div v-show="editMarkTypeForm.datas.length > 0">
              <div class="flex_row flex_warp">
                <div v-for="(data, index) in editMarkTypeForm.datas" :key="index" class="flex_row_allcenter mytag">
                  <el-tag type="info" closable @close="handleEditMarkTypeTagClose(data, index)"
                  >{{ `${data.tag} ${data.name}` }}
                  </el-tag>
                  <el-color-picker size="medium" v-model="data.color" show-alpha :predefine="predefineColors"></el-color-picker>
                </div>
              </div>
            </div>
            <div v-if="editMarkTypeForm.datas.length === 0">
              <el-tag type="info">Empty</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="flex_row  padding_10" style="background-color: #f8f9fa;border-radius: 5px">
              <div class="flex_col_allcenter">
                <span class="w30">标签</span>
                <el-input
                    v-model="editMarkTypeTagForm.tag"
                    placeholder="B/I/E..."
                ></el-input>
              </div>
              <span class="w10"></span>
              <div class="flex_col_allcenter">
                <span>解释</span>
                <el-input
                    v-model="editMarkTypeTagForm.name"
                    placeholder="开头/中间/结尾..."
                ></el-input>
              </div>
              <span class="w10"></span>
              <div class="flex_col_allcenter">
                <span>颜色</span>
                <el-color-picker  v-model="editMarkTypeTagForm.color" show-alpha :predefine="predefineColors"></el-color-picker>
              </div>
              <span class="w10"></span>
              <el-button  type="primary" @click="handleEditMarkTypeTag">点击新增</el-button>
            </div>
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
import db_utils               from '../libs/db_utils';
import FileSaver              from 'file-saver';
import {Cons}                 from '../Constant'
import SeparatorTestComponent from './SeparatorTestComponent'

export default {
  name: 'LabelSetting',
  components: {SeparatorTestComponent},
  props: {
    // 当前菜单类型
    type: {
      type: Number,
      required: true,
      default: Cons.WorkingType.ENTITY,
    },
  },
  watch: {
    type(type) {
      // 切换新增的form类型
      this.newMarkTypeForm.type = type
      // 重新拉取数据
      this.initData();
    },
  },
  data() {
    return {
      tableData: [],
      search: '',
      needShowNewMarkTypeView: false, //是否显示新建标注页面
      newMarkTypeForm: {
        type:Cons.WorkingType.ENTITY,
        name: '',
        content: '',
        separator:'',
        description: '',
        datas: [],
      },
      newMarkTypeTagForm: {
        name: '',
        tag: '',
        color:''
      },
      needShowEditMarkTypeView: false, //是否显示编辑标注页面
      editMarkTypeForm: {
        user_id:'',
        project_id:'',
        name: '',
        content: '',
        separator: '',
        description: '',
        datas: [],
      },
      editMarkTypeTagForm: {
        name: '',
        tag: '',
        color:''
      },
      predefineColors: [
        '#1e90ff',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
      isSaving: false,
      WorkingType: Cons.WorkingType,
      Listeners:[]
    };
  },
  computed: {
    tips() {
      let _tip = ''
      switch (this.type) {
        case Cons.WorkingType.ENTITY:
          _tip = '预制了常用的两种序列实体标注标签组：BIO标注法和BIOES标注法。其他类型需要自定义.'
          break;
        case Cons.WorkingType.CLASSIFY:
          _tip = '通常用来分类(标注)整条数据的情感、观点等.类似于标注,只不过此处标注的是整条数据.'
          break;
        case Cons.WorkingType.RELATION:
          _tip = '定义一组关系标签,使用时先开启关系标注, 先后点击两个实体完成连接关系.'
          break;
        case Cons.WorkingType.DIALOGUE:
          _tip = '定义一组对话标签,使用时先开启对话标注, 切分好对话回合后进行标注.'
          break;

      }
      return _tip
    }
  },
  mounted() {
    console.log('LabelSetting nounted');
     this.initEvent()
    this.initData();

  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },
  methods: {
    initEvent(){
      const MARKTYPE_CHANGED_listener = () => {
        this.initData();
      }
      this.Listeners = [
        ['MARKTYPE_CHANGED',MARKTYPE_CHANGED_listener]
      ]
      this.addEventListener(this.Listeners)
    },
    initData() {
      this.tableData = [];
      db_utils
        .pureFind(db_utils.LABELS_DB, {type:this.type})
        .exec((err, documents) => {
          for (const document of documents) {
            this.tableData.unshift(document);
          }
        });
    },

    // ────────────────────────── 分割线 ──────────────────────────

    clearNewMarkTypeForm() {
      this.newMarkTypeForm = {
        name: '',
        content: '',
        separator: '',
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
      if (this.newMarkTypeTagForm.tag) {
        this.newMarkTypeForm.datas.push({
          tag: this.newMarkTypeTagForm.tag,
          name: this.newMarkTypeTagForm.name,
          color:this.newMarkTypeTagForm.color,
        });
        this.newMarkTypeTagForm.tag = '';
        this.newMarkTypeTagForm.name = '';
        this.newMarkTypeTagForm.color = '';
      }else {
        this.$message({
          message: '请至少填写标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }
    },
    handleEditMarkTypeTag() {
      if (this.editMarkTypeTagForm.tag ) {
        this.editMarkTypeForm.datas.push({
          tag: this.editMarkTypeTagForm.tag,
          name: this.editMarkTypeTagForm.name,
          color: this.editMarkTypeTagForm.color,
        });
        this.editMarkTypeTagForm.tag = '';
        this.editMarkTypeTagForm.name = '';
        this.editMarkTypeTagForm.color = '';
      } else {
        this.$message({
          message: '请至少填写标签',
          type: 'error',
          center: true,
          offset: 70,
        });
      }

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
        db_utils.insert(db_utils.LABELS_DB, this.newMarkTypeForm, (err, newDoc) => {
          if (!err){
            this.clearNewMarkTypeForm();
            this.$events.emit('MARKTYPE_CHANGED', 'MARKTYPE');
          }
        });

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
        db_utils.update(db_utils.LABELS_DB, { _id: this.editMarkTypeForm._id }, this.editMarkTypeForm, false,null,(err)=>{
          if (!err){
            // 云服务才需要保存
            if (this.editMarkTypeForm.project_id){
              this.doLocalSync(Cons.SyncLogType.PROJECT_LABEL,this.editMarkTypeForm.project_owner_id,this.editMarkTypeForm.project_id)
            }
            this.$events.emit('MARKTYPE_CHANGED', 'MARKTYPE');
          }
        });

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
          db_utils.remove(db_utils.LABELS_DB, { _id: row._id },  (err, n) => {
            if (!err){
              this.$message({
                type: 'success',
                message: '删除成功!',
                offset: 70,
              });
              // 判断是否云服务
              if (row.project_id){
                this.doLocalSync(Cons.SyncLogType.PROJECT_LABEL,row.project_owner_id,row.project_id)
              }
              this.$events.emit('MARKTYPE_CHANGED', 'MARKTYPE');
            }
          });

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
    // ────────────────────────── 导出 ──────────────────────────
    // 点击导出标签组
    onExportMarksClick() {
      this.saveJson();
    },
    saveJson() {
      this.showLocalNotification('正在导出,请稍后...')
      if (this.isSaving) {
        this.showLocalNotification('正在导出,请稍后...')
        return;
      }
      this.isSaving = true;

      let _jsonData = {
        type: this.type,
        content: [],
      };

      this.tableData.forEach((item) => {
        _jsonData.content.push({
          type:this.type,
          status: '1',
          name: item['name'],
          content: item['content'],
          description: item['description'],
          datas: item['datas'],
        });
      });

      // 将json转换成字符串
      const data = JSON.stringify(_jsonData);
      const blob = new Blob([data], { type: '' });
      this.showLocalNotification('导出成功！')

      FileSaver.saveAs(blob, '刚刚导出的标签组.json');
      this.isSaving = false;

      this.$emit('cancelButtonClick');
    },
    // 自定义表格样式
    tableRowClassName({row}) {
      if (row.user_id && row.user_id === this.user_id){
        // 专属
        return 'project-row'
      }
      return ''
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../globals';

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

.mytag +.mytag{
  margin-left: 10px;
}


</style>

<style lang="scss">
.project-row {
  background-image: url("../assets/curve_bg.png");
}
</style>