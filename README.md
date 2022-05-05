# 数据标注工具

#### 介绍
本工具主要用来进行**`中文`**数据`离线`标注。

工具当前支持：实体标注、关系标注、对话标注、分类标注。

其他功能：MySQL/MongoDB 数据库双向同步 | 工程导入导出 | 标签导入导出 | 自定义字体等。

注：本工具**源码尚未重构**，仍处于`内部测试`阶段，**不建议**用于生产环境。

#### 软件架构

应用程序使用`Electron`打包而成，感谢大神提供的多平台打包工具。

主要使用Vue 2.0.js 业务开发。

UI组件主要感谢 eleme 提供的 `element`，mark 组件感谢 `easy-marker`,  连线组件感谢`LeaderLine`。

数据库主要使用 `nedb` `MySQL` `MongoDB`

#### 环境说明

1.  node版本:8.9.3 ,14.16.0 ,15.10.0
2.  vue版本: 2.5.16
3. electron版本: 2.0.4

#### 编译安装

1.  npm或yarn 安装依赖
2.  npm或yarn run build:dir 生成绿色版本
3.  npm或yarn run build 生成完整版本

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 联系我

微信搜索：heiscuiwang