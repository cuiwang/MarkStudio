<template>
  <div id="content">
    <div style="margin: 20px; text-align: left">
      <el-card>
        <div class="title_text_size main_text_color">高频问题整理</div>
        <el-divider></el-divider>
        <div class="smalltitle_text_size main_text_color padding_10">如何高效使用工具?</div>
        <div class="normal_text_size normal_text_color padding_10">
          在工作台中,使用
          <span class="warning_color bold_text">[CTRL(苹果电脑对应command)+方向键]</span>
          上下翻页.
          <span class="warning_color bold_text">[CTRL+回车键]</span>
          提交完成.
          <span class="warning_color bold_text">[[数字1-9]</span>
          选中文本，按下标注类型对应数字，快速标注，例如选择的标注类型里面有3种，那么就对应数字1-3.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">如何自定义实体标注标签组?</div>
        <div class="normal_text_size normal_text_color padding_10">
          切换到实体标注标签组管理页面,点击新增按钮,按照一定的格式要求填写/插入内容.新增标记需要
          <span class="danger_color bold_text">点击红色新增按钮</span>
          才能正确添加上.点击列表左侧箭头,可以展开预览页面.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">新增工程没有实体标注标签组选择?</div>
        <div class="normal_text_size normal_text_color padding_10">
          首次打开需要初始化本地数据库,如果没有实体标注标签组,可以尝试
          <span class="maincolor bold_text">切换一下页面</span>
          (如切换到工程管理页面),或重启应用试试.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">怎样使用自己的工程</div>
        <div class="normal_text_size normal_text_color padding_10">
          在工作台或者工程管理页面,新增工程后再对话框中点击
          <span class="maincolor bold_text">确定按钮</span>
          ,激活工程.如果不小心点击了取消,可以切换到工程管理页面中,找到刚刚创建的工程,点击标题旁边的
          <span class="maincolor bold_text">激活按钮</span>
          即可激活成功,切换回工作台页面将使用您自己的数据展开工作.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">标注进度如何计算?</div>
        <div class="normal_text_size normal_text_color padding_10">
          标注进度 = ( 已标注 + 无效数据 ) / 总数 (注意:标注工作完成后,请点击完成按钮或者快捷键[CTRL+回车],否则
          <span class="danger_color bold_text">无法计算进度</span>
          )
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">8.如何分组?</div>
        <div class="normal_text_size normal_text_color padding_10">
          定义一个 <span class="danger_color bold_text">Group_</span> 开头的标签，在标记完实体以后，将整句再标记为Group_*.这样虽然Group和Entity是平级，但是可以通过position判断出哪些Entity是在Group中。
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">是否开源?</div>
        <div class="normal_text_size normal_text_color padding_10">
          <span class="main_text_color bold_text">
            <el-link href="https://cuiwang.github.io/MarkStudio/" target="_blank">https://cuiwang.github.io/MarkStudio/</el-link>
          </span>
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">联系作者?</div>
        <div class="normal_text_size normal_text_color padding_10">
          微信搜 "
          <span class="main_text_color bold_text">heiscuiwang</span>
          " 或 "
          <span class="main_text_color bold_text">15399909477</span>
          "
        </div>
      </el-card>
      <div class="h20"/>
      <el-card>
        <div class="title_text_size main_text_color">MySQL、MongoDB双向同步说明</div>
        <el-divider></el-divider>
        <div class="smalltitle_text_size main_text_color padding_10">为什么要用MySQL、MongoDB双向同步?</div>
        <div class="normal_text_size normal_text_color padding_10">
          在针对数据源进行管理时，我们发现经常有修改数据的需求。然而基于本地数据库进行修改会产生奇怪的BUG（索引异常等）。
          经过初步研究，采用远程数据库（关系型、非关系型）对数据源和标注结果进行管理可以改善这一体验。
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">如何使用双向同步?</div>
        <div class="normal_text_size normal_text_color padding_10">
          <p> 首先，您需要自建MySQL（5.7及以上）或MongoDB，配置好 <span class="warning_color">连接参数</span>（主机地址、端口号、用户名、密码等）。如果不在局域网内使用，还需要 <span class="warning_color bold_text">开放外网权限</span>。
          </p>
          <p>其次，在 <span class="success_color bold_text">新建工程</span> 配置数据源时，需要您提前在MySQL、MongoDB中 <span  class="warning_color bold_text">预制原始数据</span>。此处需要您核对好数据所在的<span  class="danger_color bold_text">数据库、表（集合）、字段</span>。</p>
          <p>最后，点击工程管理中的开启数据同步按钮（只有数据源是MySQL、MongoDB才有），选择同步到本地或上传到远端。</p>
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">同步到本地?</div>
        <div class="normal_text_size normal_text_color padding_10">
          同步到本地，是指从MySQL、MongoDB数据库中 <span class="warning_color">下载数据</span> 到本地，此操作要求数据库中字段 <span class="danger_color">完全对应</span> 。
          因此，需要您先将本地数据 <span class="success_color bold_text">上传到远端一次</span> ，用来 <span class="bold_text">重建数据结构</span> ，此操作将 <span class="danger_color">清洗原数据源</span>，建议在上传前 <span class="danger_color bold_text">修改表、集合名</span>，
          这样标注数据将会保存到 <span class="success_color bold_text">新配置的表、集合</span> 中，不会影响原数据源。
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">上传到远端?</div>
        <div class="normal_text_size normal_text_color padding_10">
          上传到远端，是指从本地数据库中 <span class="warning_color">上传数据</span> 到MySQL、MongoDB，此操作 <span class="danger_color">完全覆盖</span> 远端数据库，执行流程大概是  <el-tag>准备本地数据</el-tag> -> <el-tag>测试数据库连通性</el-tag> -> <el-tag>清空表、集合</el-tag> -> <el-tag>插入新数据</el-tag>。
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">注意事项</div>
        <div class="normal_text_size normal_text_color padding_10">
          <p> 1.同步前请务必进行 <span class="bold_text">连接测试、数据读取测试</span> ，以防数据出现异常。</p>
          <p> 2.默认情况下，原始数据源和同步数据用的是同一表、集合，如果不进行修改，可能会出现数据覆盖问题。</p>
          <p>3. <span class="warning_color">首次使用</span> 同步功能，务必 <span class="success_color">先将本地数据上传到远端数据库</span>，否则可能出现远程数据库为空的情况下，将本地数据清空的问题。</p>
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">Mysql示例</div>
        <div class="normal_text_size normal_text_color padding_10">
          <img src="../assets/mysql_table.png">
          <img src="../assets/mysql_config.png">
          </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data() {
    return {
    };
  },
  mounted() {
    console.log('help mounted');
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';

img{
  width: 80%;
}
</style>
