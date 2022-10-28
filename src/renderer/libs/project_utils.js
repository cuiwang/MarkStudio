import db_utils from './db_utils'
import {Cons}   from '../Constant'

/**
 * 项目相关方法
 */

// 获取工程标注进度
export function getNumFromProject(project){
  let num = {
    total:0,
    marked:0,
    wrong:0
  }
  // 读取datas库
  return new Promise((resolve, reject) => {
    project.project_id = project.project_id || project._id
    db_utils.count(db_utils.DATAS_DB,{project_id:project.project_id},(err, count) => {
      if (count){
        num.total = count
        db_utils.count(db_utils.DATAS_DB,{project_id:project.project_id,status:1},(err2, count2) => {
          num.marked = count2
          db_utils.count(db_utils.DATAS_DB,{project_id:project.project_id,wrong:1},(err3, count3) => {
            num.wrong = count3
            resolve(num)
          })
        })
      }else {
        reject('DATAS_DB count :'+project.name+':'+project.project_id+':0')
      }
    })
  })
}

/**
 * 获取云项目标签组
  */
export function getCloudProjectLabels(project_id){
    // 按照云服务读取规则,从数据库中检索出标签
    return new Promise((resolve, reject) => {
      db_utils.find(db_utils.LABELS_DB,{project_id:project_id},(err,docs)=>{
        //
        if (!err){
          let projectForm = {}
          let checkList = []
          for (const doc of docs) {
            // 是否需要加载了文本翻译
            if (doc.type === Cons.WorkingType.TRANSLATION){
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.TRANSLATION])
              projectForm.translationId = doc._id
              projectForm.translationName = doc.name
              projectForm.TranslationLabelData = doc
            }
            // 是否需要加载了语义解析
            if (doc.type === Cons.WorkingType.TEXT2SQL){
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.TEXT2SQL])
              projectForm.text2sqlId = doc._id
              projectForm.text2sqName = doc.name
              projectForm.Text2sqlLabelData = doc
            }
            // 是否需要加载了分类标签组
            if (doc.type === Cons.WorkingType.CLASSIFY) {
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.CLASSIFY])
              projectForm.globalTypeId = doc._id
              projectForm.globalTypeName = doc.name
              projectForm.GlobalLabelData = doc
            }
            // 是否需要加载了对话标签组
            if (doc.type === Cons.WorkingType.DIALOGUE) {
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.DIALOGUE])
              projectForm.dialogueTypeId = doc._id
              projectForm.dialogueTypeName = doc.name
              projectForm.DialogueLabelData = doc
            }
            // 是否需要加载了关系标注标签组
            if (doc.type === Cons.WorkingType.RELATION) {
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.RELATION])
              projectForm.relationTypeId = doc._id
              projectForm.relationTypeName = doc.name
              projectForm.RelationLabelData = doc
            }
            // 是否需要加载了实体标注标签组
            if (doc.type === Cons.WorkingType.ENTITY) {
              checkList.push(Cons.WorkingTypeName[Cons.WorkingType.ENTITY])
              projectForm.markTypeId = doc._id
              projectForm.markTypeName = doc.name
              projectForm.EntityLabelData = doc
            }
          }
          resolve({projectForm,checkList})
        }else {
          reject(err)
        }
      })
    })
}

/**
 * 获取云项目成员组
 */
export function getCloudProjectMembers(project_id){
  // 按照云服务读取规则,从数据库中检索出标签
  return new Promise((resolve, reject) => {
    db_utils.find(db_utils.MEMBERS_DB,{project_id:project_id},(err,docs)=>{
      if (!err){
        resolve(docs)
      }else {
        reject(err)
      }
    })
  })
}