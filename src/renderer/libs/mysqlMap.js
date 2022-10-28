// sql语句
const sqlMap = {
  /*
  *
        _id: -1,
        name: '示例工程',
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
  * */
  project: {
    drop: 'DROP TABLE IF EXISTS projects',
    create: 'CREATE TABLE IF NOT EXISTS projects (_id INT PRIMARY KEY AUTO_INCREMENT, name text, created_at text, updated_at text,' +
        'dataFilePath text,currectDataIndex int DEFAULT 0,num_total int DEFAULT 0,num_marked int DEFAULT 0,markTypeId text,markTypeName text,' +
        'globalTypeId text,globalTypeName text,relationTypeId text,relationTypeName text,dialogueTypeId text,dialogueTypeName text,description text, working BOOLEAN)' +
        ' engine=InnoDB',
    insert: 'insert into projects(_id, name, created_at,updated_at,dataFilePath,currectDataIndex,num_total,num_marked,markTypeId,markTypeName,globalTypeId,globalTypeName,relationTypeId,relationTypeName,dialogueTypeId,dialogueTypeName,description,working) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    select: 'select * from projects"'
  },
  /*
   project_id: -1,
    index: '',
    content: '',
    wrong: 0, //是否无法标注
    status: 0, //0标注中 1已完成
    tags: [], //实体标注
    relations: [], //关系标注
    dialogue: {
      separator: '',
      datas: [],
    }, //对话标注
    globalTypeId: '', //全局标注
  * */

  datas: {
    drop: `DROP TABLE datas`,
    create: `CREATE TABLE IF NOT EXISTS datas (_id INT PRIMARY KEY AUTO_INCREMENT, project_id int, _index text NOT NULL, content text NOT NULL,' +
        'wrong int DEFAULT 0,status int DEFAULT 0,tags json,relations json,dialogue json, globalTypeId text)' +
        ' engine=InnoDB`,
    insert: `insert into datas(project_id,_index, content,wrong,status,tags,relations,dialogue,globalTypeId) values (?,?,?,?,?,?,?,?,?)`,
    select: `select * from datas`,
    //update:'UPDATE datas SET name = ?,url = ? WHERE Id = ?'
    update:`UPDATE datas SET `
  },
}
module.exports = sqlMap