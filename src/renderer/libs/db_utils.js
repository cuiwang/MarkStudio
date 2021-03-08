/**
 * 数据库二次封装
 */

import db from './datastore.js';
import date_utils from './date_utils';

// ────────────────────────── consts ──────────────────────────
const MARK_TYPES_DB = 'MARK_TYPES_DB';
const PROJECTS_DB = 'PROJECTS_DB';
const DATAS_DB = 'DATAS_DB';

// ────────────────────────── global ──────────────────────────
function addTimeProperty(newDoc, isCreate = true) {
  const now = date_utils.dateStr(new Date(), 'yyyy-MM-dd HH:mm:ss');
  if (Array.isArray(newDoc)) {
    newDoc.forEach((data) => {
      data.updated_at = now;
      if (isCreate) {
        data.created_at = now;
      }
    });
  } else {
    newDoc.updated_at = now;
    if (isCreate) {
      newDoc.created_at = now;
    }
  }
  return newDoc;
}

// ────────────────────────── methods ──────────────────────────
function insert(dbname, newDoc, cb) {
  newDoc = addTimeProperty(newDoc, true);
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.insert(newDoc, cb);
      break;
    case PROJECTS_DB:
      db.projects.insert(newDoc, cb);
      break;
    case DATAS_DB:
      db.datas.insert(newDoc, cb);
      break;
    default:
      break;
  }
}

function update(dbname, query, updateQuery, options, cb) {
  updateQuery = addTimeProperty(updateQuery, false);
  options = options || { multi: false, upsert: false };
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.update(query, updateQuery, options, cb);
      break;
    case PROJECTS_DB:
      db.projects.update(query, updateQuery, options, cb);
      break;
    case DATAS_DB:
      db.datas.update(query, updateQuery, options, cb);
      break;
    default:
      break;
  }
}

function update_set(dbname, query, updateQuery, options, cb) {
  updateQuery.$set.updated_at = date_utils.dateStr(new Date(), 'yyyy-MM-dd HH:mm:ss');
  options = options || { multi: false, upsert: false };
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.update(query, updateQuery, options, cb);
      break;
    case PROJECTS_DB:
      db.projects.update(query, updateQuery, options, cb);
      break;
    case DATAS_DB:
      db.datas.update(query, updateQuery, options, cb);
      break;
    default:
      break;
  }
}

function remove(dbname, query, options, cb) {
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.remove(query, options, cb);
      break;
    case PROJECTS_DB:
      db.projects.remove(query, options, cb);
      break;
    case DATAS_DB:
      db.datas.remove(query, options, cb);
      break;
    default:
      break;
  }
}

function find(dbname, query, cb) {
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.find(query, cb);
      break;
    case PROJECTS_DB:
      db.projects.find(query, cb);
      break;
    case DATAS_DB:
      db.datas.find(query, cb);
      break;
    default:
      break;
  }
}

function findOne(dbname, query, cb) {
  switch (dbname) {
    case MARK_TYPES_DB:
      db.marktypes.findOne(query, cb);
      break;
    case PROJECTS_DB:
      db.projects.findOne(query, cb);
      break;
    case DATAS_DB:
      db.datas.findOne(query, cb);
      break;
    default:
      break;
  }
}

function generate_find(dbname, query) {
  switch (dbname) {
    case MARK_TYPES_DB:
      return db.marktypes.find(query);
    case PROJECTS_DB:
      return db.projects.find(query);
    case DATAS_DB:
      return db.datas.find(query);
    default:
      break;
  }
}

export default {
  MARK_TYPES_DB,
  PROJECTS_DB,
  DATAS_DB,
  insert,
  remove,
  update,
  update_set,
  find,
  findOne,
  generate_find,
};
