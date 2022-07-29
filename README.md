# MarkStudio

#### 介绍

MarkStudio是一款功能丰富的`数据标注工具`，致力于提供给AI从业人员、教师、学生、研究人员最好的标注体验。
MarkStudio已支持`实体标注`、`文本分类`、`文本翻译`、`关系标注`、`对话标注`。后续将持续集成图片标注、图片分类、图片翻译及视频标注等功能。
MarkStudio现提供两个版本：2.x离线版和最新的3.x云服务版。
----
#### 推荐使用3.x云服务版

[http://ms.youdongtai.com/](http://ms.youdongtai.com/)
- 1.支持多人协同标注。
- 2.支持数据备份和恢复。
- 3.支持数据分享和下载。
- ~~4.支持插件开发。~~（开发中）
- ~~5.开发api接口,提供在线学习功能辅助标注~~。开发中）

#### 离线版主要应用架构
* Vue2.x 用于前端渲染
* element 用于UI组件
* Electron 用于跨平台打包
* nedb 用于数据存储

#### 环境说明

1.  node版本:8.9.3 ,14.16.0 ,15.10.0

#### 编译安装

1. npm或yarn install 安装依赖
2. npm或yarn run dev 开发调试
3. npm或yarn run build:dir 生成绿色版本
4. npm或yarn run build 生成完整版本


#### 使用说明

1.  clone 此工程，并进入目录
2.  在目录下运行 `npm install`
3.  在终端中执行 `npm run dev` 启动程序

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 关于我们

此项目是我个人（微信搜索：heiscuiwang）业余时间开发，如果你觉得这个项目有帮助，请给我一个star，我会继续努力的。