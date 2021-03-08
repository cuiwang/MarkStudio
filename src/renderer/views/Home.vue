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
<template>
  <div class="home">
    <div class="home_header">
      <el-menu
        default-active="/dashboard"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        unique-opened
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/dashboard">工作台</el-menu-item>
        <el-menu-item index="/marktypesetting">标注类型管理</el-menu-item>
        <el-menu-item index="/project">项目管理</el-menu-item>
        <el-menu-item index="/help" style="float: right">帮助中心</el-menu-item>
        <el-menu-item style="float: right"
          ><a href="#" target="_blank">Beta v1.0.1 | WeChat@heiscuiwang</a></el-menu-item
        >
      </el-menu>
    </div>
    <div style="height: 60px;"></div>
    <div>
      <router-view></router-view>
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

require('electron-disable-file-drop');

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      markTypeDefaultDatas: [
        {
          _id: -1,
          editable: true,
          name: '自定义标注法示例',
          content: 'Nh-人名， Ns-地名， Ni-机构名',
          description:
            '点击[新建标注类型]按钮,在新建页面中配置标注类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            { name: '人名', tag: 'Nh' },
            { name: '地名', tag: 'Ns' },
            { name: '机构名', tag: 'Ni' },
          ],
        },
        {
          _id: -2,
          editable: false,
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
          editable: false,
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
          editable: false,
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
          editable: false,
          name: 'BIOES序列标注法',
          content: 'B-begin， I-inside， O-outside， E-end， S-single',
          description:
            'B-begin，代表实体的开头. I-inside，代表实体的中间. O-outside，代表非实体，用于标记无关字符. E-end，代表实体的结尾. S-single，代表单个字符，本身就是一个实体.',
          datas: [
            { name: 'begin', tag: 'B' },
            { name: 'inside', tag: 'I' },
            { name: 'outside', tag: 'O' },
            { name: 'end', tag: 'E' },
            { name: 'single', tag: 'S' },
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
          marking: 1,
          wrong: 1,
        },
        markTypeId: -2,
        markTypeName: '人名、地名、机构名',
        description:
          '简单演示此工具基本功能,示例如何使用标注类型为[人名、地名、机构名]进行数据标注,其他细节客官请自己发现~',
        working: true, //当前状态是否工作中/
      },
      datasDefaultDatas: [
        '如果你想要标注人名、地名、机构名,就需要在文中找出:李明这样的人名,北京市这样的地名以及国家安全局这样的机构名.一旦你找到这些字/词/短语,用鼠标选中,并在文字上方弹出的窗口中选择一个标注类型.一旦完成本篇中所有标注工作,点击右上方的蓝色[完成]按钮标记本篇已处理完毕,然后点击旁边的[下一篇]按钮就可以标注下一篇了.',
        '标注完上一条,相信聪明的你已经学会了本工具主要功能!接下来你可以通过切换最上面的[标注类型管理]完成标注类型自定义.一旦你完成所有文档的标注后,点击上面白色[导出数据]按钮,将最终的标注结果用JSON格式存储下来.如果你还想练习一下标注,同样点击[下一篇]按钮.当然,聪明的你何不点击上面蓝色的[新建项目]按钮,开启你的标注工作吧~',
        '中方赞赏伊姆兰·汗总理对中国脱贫攻坚成就作出的积极评价。我也注意到联合国驻华协调员常启德等国际组织负责人表示，中国的脱贫攻坚成果为世界带来重要启示，习近平主席带领中国政府和人民表现的决心和行动力是首要经验。',
        '锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩。???????????????????????????????????????????????????????????????????????????????????????????????',
      ],
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      //db_utils.remove(db_utils.PROJECTS_DB, {}, { multi: true });
      //db_utils.remove(db_utils.DATAS_DB, {}, { multi: true });
      //db_utils.remove(db_utils.MARK_TYPES_DB, {}, { multi: true });

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

      db_utils.find(db_utils.MARK_TYPES_DB, {}, (err, documents) => {
        // 如果是空,就将默认值设置进去
        if (documents.length <= 0) {
          // 保存到数据库
          db_utils.insert(db_utils.MARK_TYPES_DB, this.markTypeDefaultDatas, (err, newDoc) => {
            //console.log('marktypes init new:');
            //console.log(newDoc);
          });

          db_utils.insert(db_utils.PROJECTS_DB, this.projectDefaultData, (err, newDoc) => {
            //console.log('project init new:');
            //console.log(newDoc);
            let datas = [];

            this.datasDefaultDatas.forEach((content, index) => {
              let data = {
                _id: -(index + 1),
                project_id: -1,
                index: index,
                content: content,
                status: 0,
                tags: [],
              };
              if (index === 0) {
                data.tags = [
                  { name: '人名', tag: 'Person', content: '李明', line_id: -1, start: 26, end: 28 },
                  { name: '地名', tag: 'Location', content: '北京市', line_id: -2, start: 34, end: 37 },
                  { name: '机构名', tag: 'Organization', content: '国家安全局', line_id: -3, start: 44, end: 49 },
                ];
              }
              if (index === 3) {
                data.status = -1;
              }
              datas.push(data);
            });
            db_utils.insert(db_utils.DATAS_DB, datas, (err, documents) => {
              //console.log('datas init new:');
              //console.log(documents);
            });
          });
        }
        this.$events.emit('DB_INIT_FINISH', 'HOME');
      });
    },

    handleSelect(_index) {
      this.$router.push({
        path: _index,
        params: { data: 'query' },
      });
    },
  },
};
</script>
