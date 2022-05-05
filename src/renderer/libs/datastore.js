import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

let db = {};
db.marktypes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/marktypes.db'),
});
db.globaltypes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/globaltypes.db'),
});
db.relationtypes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/relationtypes.db'),
});
db.dialoguetypes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/dialoguetypes.db'),
});
db.projects = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/projects.db'),
});
// db.datas 存放工程的源文件数据,工程创建后自动生成,标注处理后自动更新
//[{ project_id:工程序号,marktype_id:实体标注标签组序号,
// data:原始文本内容,index:索引从1开始,
// marks:[标注后生成]标注信息(tag,name,position_range),
// 创建时间,更新时间,状态信息:已完成/标注中/未开始/无效数据}...]
db.datas = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/datas.db'),
});

export default db;
