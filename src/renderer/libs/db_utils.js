/**
 * 数据库二次封装
 */

import db from './datastore.js';
import date_utils from './date_utils';

// ────────────────────────── consts ──────────────────────────
const MARK_TYPES_DB = 'MARK_TYPES_DB';
const GLOBAL_TYPES_DB = 'GLOBAL_TYPES_DB';
const RELATION_TYPES_DB = 'RELATION_TYPES_DB';
const DIALOGUE_TYPES_DB = 'DIALOGUE_TYPES_DB';
const PROJECTS_DB = 'PROJECTS_DB';
const LABELS_DB = 'LABELS_DB';
const DATAS_DB = 'DATAS_DB';
const MEMBERS_DB = 'MEMBERS_DB';
const SYNCLOGS_DB = 'SYNCLOGS_DB';
const DATALOGS_DB = 'DATALOGS_DB';

const DBs = {
  'MARK_TYPES_DB' : db.marktypes,
  'GLOBAL_TYPES_DB' : db.globaltypes,
  'RELATION_TYPES_DB' : db.relationtypes,
  'DIALOGUE_TYPES_DB' : db.dialoguetypes,
  'PROJECTS_DB' : db.projects,
  'LABELS_DB' : db.labels,
  'DATAS_DB' : db.datas,
  'MEMBERS_DB' : db.members,
  'SYNCLOGS_DB' : db.synclogs,
  'DATALOGS_DB' : db.datalogs
}

// ────────────────────────── global ──────────────────────────
function addTimeProperty(newDoc, isCreate = true,isUpdate = false) {
  const now = date_utils.dateNow();
  if (Array.isArray(newDoc)) {
    newDoc.forEach((data) => {
      if (isCreate) {
        data.created_at = now;
      }
      if (isUpdate){
        newDoc.updated_at = now;
      }
    });
  } else {
    if (isCreate) {
      newDoc.created_at = now;
    }
    if (isUpdate){
      newDoc.updated_at = now;
    }
  }
  return newDoc;
}
// https://github.com/louischatriot/nedb
// ────────────────────────── methods ──────────────────────────
/**
 * 插入数据,可以单条对象插入也可以放入数组对象.
 * @param dbname
 * @param newDoc 此操作为原子操作,意味着有一条失败,就全部回退.
 * 唯一索引不要重复,否则无法插入.
 * @param cb (err, doc_docs)=>{}
 */
function insert(dbname, newDoc, cb) {
  newDoc = addTimeProperty(newDoc, true);
  DBs[dbname].insert(newDoc, cb)
}

/**
 * 更新-全量
 * @param dbname
 * @param query
 * @param updateQuery 更新对象,*默认全量更新, 需要完整数据对象,不能单更新某个字段.
 * 如果要更新单个字段需要设置成 {$set: { "data.satellites": 2, "data.red": true }}
 * { $unset: { planet: true } } 用来删除字段
 * 注意:要么全量更新,要么部分更新,不要修改_id字段.
 * @param isPartlyUpdate 是否部分更新
 * @param options
 * 两个可选参数,multi 默认false,用于控制修改多个.
 * upsert 默认 false,用于控制没有匹配到就新增机制.
 * @param cb (err, numAffected, affectedDocuments, upsert)=>{}
 */
function update(dbname, query, updateQuery,isPartlyUpdate=false, options=null, cb) {
  if (isPartlyUpdate){
    updateQuery.$set.updated_at = date_utils.dateNow();
  }else {
    updateQuery = addTimeProperty(updateQuery, false,true);
  }
  options = options || { multi: false, upsert: false };
  DBs[dbname].update(query, updateQuery, options, cb);
}


/**
 * 移除数据
 * @param dbname
 * @param query
 * @param options
 * @param cb (err, n)=>{}
 */
function remove(dbname, query, cb) {
  DBs[dbname].remove(query, {multi: true}, cb);
}

/**
 * 查询多条,返回对应对象数组 [{_id:'xxxxx'}]
 * @param dbname
 * @param query
 * @param cb (err, docs)=>{}
 */
function find(dbname, query, cb) {
  DBs[dbname].find(query, cb);
}

/**
 * 朴素查询,不包含cb,可以进行后续的sort,skip,limit链式操作
 * db.find({}).sort({ planet: 1 }).skip(1).limit(2).exec(function (err, docs) {
 *   // docs is [{_id:'xxxxx'}, {_id:'xxxxx'}]
 * });
 * @param dbname
 * @param query
 */
function pureFind(dbname,query){
  return DBs[dbname].find(query)
}

function find_datas_by_sort(query,  cb) {
  db.datas.find(query).sort({index:-1}).exec(cb);

}

/**
 * 查询单条,返回对应对象 {_id:'xxxxx'}
 * @param dbname
 * @param query
 * @param cb
 */
function findOne(dbname, query, cb) {
  DBs[dbname].findOne(query, cb);
}
/**
 * 朴素查询单条,不包含cb,可以进行后续的sort,skip,limit链式操作
 * db.findOne({}).sort({ planet: 1 }).skip(1).limit(2).exec(function (err, docs) {
 *   // docs is {_id:'xxxxx'}
 * });
 * @param dbname
 * @param query
 */
function pureFindOne(dbname,query){
  return DBs[dbname].findOne(query)
}

function count(dbname,query,cb) {
  DBs[dbname].count(query,cb);
}

export default {
  LABELS_DB,
  MARK_TYPES_DB,
  GLOBAL_TYPES_DB,
  RELATION_TYPES_DB,
  DIALOGUE_TYPES_DB,
  PROJECTS_DB,
  DATAS_DB,
  SYNCLOGS_DB,
  DATALOGS_DB,
  MEMBERS_DB,
  insert,
  remove,
  update,
  find,
  pureFind,
  findOne,
  pureFindOne,
  find_datas_by_sort,
  count
};