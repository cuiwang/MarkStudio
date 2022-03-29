<template>
  <div class="home">
    <div class="home_header">
      <el-menu menu-trigger="click" :default-active="currectItemIndex" mode="horizontal" @select="onMenuClick" unique-opened background-color="#fff" text-color="#000000" active-text-color="#ffd04b">
        <el-menu-item index="/dashboard">工作台</el-menu-item>

        <el-submenu index="">
          <template slot="title">配置中心</template>
          <el-menu-item index="/marksetting">实体标签管理</el-menu-item>
          <el-menu-item index="/relationsetting">关系标签管理</el-menu-item>
          <el-menu-item index="/dialoguesetting">对话标签管理</el-menu-item>
          <el-menu-item index="/globalsetting">全局标签管理</el-menu-item>
          <el-menu-item index="?" disabled>字典管理(开发中)</el-menu-item>
        </el-submenu>

        <el-menu-item index="license" style="float: right">
          <a style="text-decoration: none" href="javascript:void(0);">V{{ version }}_Beta</a>
        </el-menu-item>
        <el-menu-item index="/project">项目管理</el-menu-item>
        <el-menu-item index="darkmode" @click="onChangeDarkModeClick" style="float: right">
          <span class="flex_row align_center">{{ booleanDarkMode ? '日间模式' : '夜间模式' }}</span>
        </el-menu-item>
        <el-menu-item index="/help" style="float: right">
          <span class="flex_row align_center">
            帮助中心
          </span>
        </el-menu-item>
        <el-menu-item index="quick" style="float: right">
          <el-popover placement="top-start" title="快捷键列表" width="200" trigger="hover">
            <div>[CTRL+方向左/上键] : 上一条</div>
            <div>[CTRL+方向右/下键] : 下一条</div>
            <div>[CTRL+回车] : 标记完成</div>
            <div>[CTRL+Z] : 删除最后一个标注</div>
            <div>[数字1-9] : 选中文本，按下标注类型对应数字，快速标注</div>
            <div slot="reference">快捷键</div>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="height: 60px;"></div>
    <div>
      <!--<keep-alive>-->
      <router-view></router-view>
      <!--</keep-alive>-->
    </div>
    <!--底部说明区-->
    <!-- <el-footer class="footer">
      <div>@heiscuiwang</div>
    </el-footer>-->
  </div>
</template>
<script>
// @ is an alias to /src
import db_utils from '../libs/db_utils';
import Darkmode from 'darkmode-js';
import config from '../../../package.json';

require('electron-disable-file-drop');

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      version: config.version, // 获取包的信息
      currectItemIndex: '/dashboard',
      markTypeDefaultDatas: [
        {
          _id: -1,
          editable: true,
          name: '自定义标注法示例',
          content: 'Nh-人名， Ns-地名， Ni-机构名',
          description: '点击[新建实体标注标签组]按钮,在新建页面中配置实体标注标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            { name: '人名', tag: 'Nh' },
            { name: '地名', tag: 'Ns' },
            { name: '机构名', tag: 'Ni' },
          ],
        },
        {
          _id: -2,
          editable: true,
          name: '人名、地名、机构名',
          content: 'Person-人名， Location-地名， Organization-机构名',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名',
          datas: [
            { name: '人名', tag: 'Person' },
            { name: '地名', tag: 'Location' },
            { name: '机构名', tag: 'Organization' },
          ],
        },
        {
          _id: -3,
          editable: true,
          name: '人名、地名、机构名、其他',
          content: 'Person-人名， Location-地名， Organization-机构名, Misc-其他',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名、其他',
          datas: [
            { name: '人名', tag: 'Person' },
            { name: '地名', tag: 'Location' },
            { name: '机构名', tag: 'Organization' },
            { name: '其他', tag: 'Misc' },
          ],
        },
        {
          _id: -4,
          editable: true,
          name: 'BIO序列标注法',
          content: 'B-begin， I-inside， O-outside',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间或结尾. O-outside，代表不属于实体.',
          datas: [
            { name: 'begin', tag: 'B' },
            { name: 'inside', tag: 'I' },
            { name: 'outside', tag: 'O' },
          ],
        },
        {
          _id: -5,
          editable: true,
          name: 'BIOES序列标注法',
          content: 'B-begin， I-inside， O-outside， E-end， S-single',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间. O-outside，代表非实体，用于标记无关字符. E-end，代表实体的结尾. S-single，代表单个字符，本身就是一个实体.',
          datas: [
            { name: 'begin', tag: 'B' },
            { name: 'inside', tag: 'I' },
            { name: 'outside', tag: 'O' },
            { name: 'end', tag: 'E' },
            { name: 'single', tag: 'S' },
          ],
        },
      ],
      globalTypeDefaultDatas: [
        {
          _id: -1,
          editable: true,
          name: '自定义情感分类示例',
          content: 'Positive-正面， Opposite-反面， Neutral-中立',
          description: '点击[新建文本分类标签组]按钮,在新建页面中配置文本分类标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            { name: '正面', tag: 'Positive' },
            { name: '反面', tag: 'Opposite' },
            { name: '中立', tag: 'Neutral' },
          ],
        },
        {
          _id: -2,
          editable: true,
          name: '肯定、否定',
          content: 'A-肯定， B-否定',
          description: '二分类示例',
          datas: [
            { name: '肯定', tag: 'A' },
            { name: '否定', tag: 'B' },
          ],
        },
        {
          _id: -3,
          editable: true,
          name: 'A、B、C、D',
          content: 'A-A， B-B， C-C, D-D',
          description: '多分类示例',
          datas: [
            { name: 'A', tag: 'A' },
            { name: 'B', tag: 'B' },
            { name: 'C', tag: 'C' },
            { name: 'D', tag: 'D' },
          ],
        },
      ],
      relationTypeDefaultDatas: [
        {
          _id: -1,
          editable: true,
          name: '自定义关系标注示例',
          content: 'A-继承， B-聚合， C-关联, D-依赖',
          description: '点击[新建关系标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            { name: '继承', tag: 'A' },
            { name: '聚合', tag: 'B' },
            { name: '关联', tag: 'C' },
            { name: '依赖', tag: 'D' },
          ],
        },
        {
          _id: -2,
          editable: true,
          name: '因果、并列',
          content: 'A-因果， B-并列',
          description: '简单演示两个关系',
          datas: [
            { name: '因果', tag: 'A' },
            { name: '并列', tag: 'B' },
          ],
        },
      ],
      dialogueTypeDefaultDatas: [
        {
          _id: -1,
          editable: true,
          name: '自定义对话标注示例',
          content: 'A-支持， B-反对， C-犹豫, D-中立',
          separator: '/#/gi',
          description: '点击[新建对话标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            { name: '支持', tag: 'A' },
            { name: '反对', tag: 'B' },
            { name: '犹豫', tag: 'C' },
            { name: '中立', tag: 'D' },
          ],
        },
        {
          _id: -2,
          editable: true,
          name: '正面、反面',
          content: 'A-正面， B-反面',
          separator: '',
          description: '简单演示',
          datas: [
            { name: '正面', tag: 'A' },
            { name: '反面', tag: 'B' },
          ],
        },
      ],
      projectDefaultData: {
        _id: -1,
        name: '示例项目',
        created_at: '2020-03-01 12:00:00',
        updated_at: '2020-03-01 12:00:00',
        dataFilePath: '',
        currectDataIndex: 0,
        num: {
          total: 4,
          marked: 0,
        },
        markTypeId: -2,
        markTypeName: '人名、地名、机构名',
        globalTypeId: -1,
        globalTypeName: '自定义情感分类示例',
        relationTypeId: -1,
        relationTypeName: '自定义关系标注示例',
        dialogueTypeId: -1,
        dialogueTypeName: '自定义对话标注示例',
        description: '简单演示此工具基本功能,示例如何使用实体标注标签组为[人名、地名、机构名]进行数据标注,其他细节客官请自己发现~',
        working: true, //当前状态是否工作中/
      },
      datasDefaultDatas: [
        '如果你想要标注人名、地名、机构名,就需要在文中找出:李明这样的人名,北京市这样的地名以及国家安全局这样的机构名.一旦你找到这些字/词/短语,用鼠标选中,并在文字上方弹出的窗口中选择一个实体标注标签组.一旦完成本条中所有标注工作,点击右上方的绿色[保存]按钮标记本条已处理完毕,然后点击旁边的[下一条]按钮就可以标注下一条了.',
        '标注完上一条,相信聪明的你已经学会了本工具主要功能!接下来你可以通过切换最上面的[实体标注标签组管理]完成实体标注标签组自定义.一旦你完成所有文档的标注后,点击上面白色[导出数据]按钮,将最终的标注结果用JSON格式存储下来.如果你还想练习一下标注,同样点击[下一条]按钮.当然,聪明的你何不点击上面蓝色的[新建项目]按钮,开启你的标注工作吧~',
        '中方赞赏伊姆兰·汗总理对中国脱贫攻坚成就作出的积极评价。我也注意到联合国驻华协调员常启德等国际组织负责人表示，中国的脱贫攻坚成果为世界带来重要启示，习近平主席带领中国政府和人民表现的决心和行动力是首要经验。',
        '锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩。????????鐪犱笉瑙夋檽锛屽???????鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩????????????锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩',
      ],
      booleanDarkMode: false,
      darkmode: new Darkmode({
        bottom: '64px', // default: '32px'
        right: 'unset', // default: '32px'
        left: '32px', // default: 'unset'
        time: '0.5s', // default: '0.3s'
        mixColor: '#ffffff', // default: '#fff'
        backgroundColor: '#f7f8fa', // default: '#fff'
        buttonColorDark: '#100f2c', // default: '#100f2c'
        buttonColorLight: '#fff', // default: '#fff'
        saveInCookies: false, // default: true,
        label: '🌓', // default: ''
        autoMatchOsTheme: true, // default: true
      }),
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initEvent();
  },
  methods: {
    initEvent() {
      // PROJECT_ACTIVE
      this.$events.on('PROJECT_ACTIVE', (text) => {
        this.onMenuClick('/dashboard');
      });
      // OPEN_PROJECT_VIEW
      this.$events.on('PROJECT_VIEW', (text) => {
        this.onMenuClick('/project');
      });
    },
    initData() {
      //db_utils.remove(db_utils.MARK_TYPES_DB, {}, { multi: true });
      //db_utils.remove(db_utils.GLOBAL_TYPES_DB, {}, { multi: true });
      //db_utils.remove(db_utils.RELATION_TYPES_DB, {}, { multi: true });
      //db_utils.remove(db_utils.DIALOGUE_TYPES_DB, {}, { multi: true });
      //db_utils.remove(db_utils.DATAS_DB, {}, { multi: true });
      //db_utils.remove(db_utils.PROJECTS_DB, {}, { multi: true });

      /*db_utils.find(db_utils.PROJECTS_DB,{},(err,documents)=>{
        console.log(documents);
      })
      db_utils.find(db_utils.DATAS_DB,{},(err,documents)=>{
        console.log(documents);
      })*/
      /* db_utils.find(db_utils.PROJECTS_DB, {}, (err, documents) => {
        console.log(documents);
      });*/
      // 设定一个已存字段的值
      /*this.$db.projects.update({ working: true }, { $set: { working: false } }, { multi: true }, function(
        err,
        numReplaced,
      ) {
        // numReplaced = 3
        // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
        console.log(err);
        console.log(numReplaced);
      });*/

      /*db_utils.update_set(
        db_utils.PROJECTS_DB,
        { working: true },
        { $set: { working: false } },
        { multi: true },
        function(err, numReplaced) {
          console.log(err);
          console.log(numReplaced);
          // numReplaced = 3
          // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
        },
      );*/

      // 默认实体标注标签组,保存到数据库
      db_utils.find(db_utils.MARK_TYPES_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          // 默认实体标注标签组,保存到数据库
          db_utils.insert(db_utils.MARK_TYPES_DB, this.markTypeDefaultDatas, (err, newDoc) => {});
        }
      });
      // 默认文本分类标签组,保存到数据库
      db_utils.find(db_utils.GLOBAL_TYPES_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          // 默认实体标注标签组,保存到数据库
          db_utils.insert(db_utils.GLOBAL_TYPES_DB, this.globalTypeDefaultDatas, (err, newDoc) => {});
        }
      });
      // 默认关系标注标签组类型,保存到数据库
      db_utils.find(db_utils.RELATION_TYPES_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          // 默认实体标注标签组,保存到数据库
          db_utils.insert(db_utils.RELATION_TYPES_DB, this.relationTypeDefaultDatas, (err, newDoc) => {});
        }
      });
      // 默认关系标注标签组类型,保存到数据库
      db_utils.find(db_utils.DIALOGUE_TYPES_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          // 默认实体标注标签组,保存到数据库
          db_utils.insert(db_utils.DIALOGUE_TYPES_DB, this.dialogueTypeDefaultDatas, (err, newDoc) => {});
        }
      });
      // 默认项目,保存到数据库
      db_utils.find(db_utils.PROJECTS_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          // 默认数据,保存到数据库
          db_utils.insert(db_utils.PROJECTS_DB, this.projectDefaultData, (err, newDoc) => {
            let datas = [];
            this.datasDefaultDatas.forEach((content, index) => {
              let data = {
                _id: -(index + 1),
                project_id: -1,
                index: index,
                content: content,
                wrong: 0,
                status: 0, //0标注中 1已完成
                tags: [],
                relations: [],
                dialogue: {
                  separator: '',
                  datas: [],
                },
                globalTypeId: '',
              };
              if (index === 0) {
                data.tags = [
                  { name: '人名', tag: 'Person', content: '李明', line_id: -1, start: 26, end: 28 },
                  { name: '地名', tag: 'Location', content: '北京市', line_id: -2, start: 34, end: 37 },
                  { name: '机构名', tag: 'Organization', content: '国家安全局', line_id: -3, start: 44, end: 49 },
                ];
              }
              if (index === 3) {
                data.wrong = 1;
              }
              datas.push(data);
            });
            db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {});
          });
        }
      });
    },

    // 点击配置中心菜单
    onMenuClick(_index) {
      if (_index.includes('/')) {
        this.currectItemIndex = _index;
        this.$router.push({
          path: _index,
          params: { data: 'query' },
        });
      }
    },
    // 点击修改夜间模式
    onChangeDarkModeClick() {
      this.booleanDarkMode = !this.booleanDarkMode;
      this.darkmode.toggle();
    },
  },
};
</script>
<style type="text/css">
.home_header {
  position: fixed;
  height: 60px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}

.home_main {
  position: fixed;
  top: 60px;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
