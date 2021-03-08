<template>
  <div id="content">
    <div class="content-fixed-header" style="height: 100px;width: 100%;position:fixed;z-index: 99;">
      <el-card shadow="never">
        <div class="flex_row">
          <div class="flex_1">
            <div style="font-size: 20px;color: #303133;text-align: left">帮助中心</div>
            <div class="h10"></div>
            <div style="font-size: 14px;color: #909399;text-align: left">
              整理了关于本标注工具的一些解释和提示.目前只支持Windows/MacOS/Linux三种系统,后续开发计划待定.
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div style="height: 100px"></div>
    <div style="margin: 20px;text-align: left">
      <el-card>
        <div class="title_text_size main_text_color">高频问题整理</div>
        <el-divider></el-divider>
        <div class="smalltitle_text_size main_text_color padding_10">
          如何高效使用工具?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          在工作台中,使用 <span class="warning_color bold_text">[方向键]</span> 上下翻页.
          <span class="warning_color bold_text">[CTRL+回车键]</span>
          提交完成.再次点击已标注文本将执行删除标注,在工作台右侧可以批量清空标注,也可单独删除标注.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          如何自定义标注类型?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          切换到标注类型管理页面,点击新增按钮,按照一定的格式要求填写/插入内容.新增标记需要<span
            class="danger_color bold_text"
            >点击红色新增按钮</span
          >才能正确添加上.点击列表左侧箭头,可以展开预览页面.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          新增项目没有标注类型选择?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          首次打开需要初始化本地数据库,如果没有标注类型,可以尝试<span class="maincolor bold_text">切换一下页面</span
          >(如切换到项目管理页面),或重启应用试试.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          怎样使用自己的项目
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          在工作台或者项目管理页面,新增项目后再对话框中点击<span class="maincolor bold_text">确定按钮</span
          >,激活项目.如果不小心点击了取消,可以切换到项目管理页面中,找到刚刚创建的项目,点击标题旁边的<span
            class="maincolor bold_text"
            >激活按钮</span
          >即可激活成功,切换回工作台页面将使用您自己的数据展开工作.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          标注进度如何计算?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          标注进度 = ( 已标注 + 无法标注 ) / 总数 (注意:标注工作完成后,请点击完成按钮或者快捷键[CTRL+回车],否则<span
            class="danger_color bold_text"
            >无法计算进度</span
          >)
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          是否开源?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          <span class="main_text_color bold_text">开源</span>,本应用也是基于开源代码编写而成.
        </div>
        <div class="separate_line"></div>
        <div class="smalltitle_text_size main_text_color padding_10">
          联系作者?
        </div>
        <div class="normal_text_size normal_text_color padding_10">
          微信搜 "<span class="main_text_color bold_text">heiscuiwang</span>" 或 "<span
            class="main_text_color bold_text"
            >15399909477</span
          >"
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
      data1: null,
    };
  },
  mounted() {
    console.log('help mounted');
  },
  methods: {
    method1() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../globals.scss';
</style>
