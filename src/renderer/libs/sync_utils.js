import {fetchGet, fetchPost, HTTP} from './axiosService'
import db_utils                    from './db_utils'
import {Cons}                      from '../Constant'
import date_utils                  from './date_utils'

// 处理本地数据变化事件
export function doLocalSync(type,project_owner_id,project_id,user_id,updated_at,version){
  const newDoc = {
    type:type,
    project_owner_id:project_owner_id,
    project_id:project_id,
    user_id:user_id,
    updated_at:updated_at||date_utils.dateNow(),
    version:version,
  }
  db_utils.insert(db_utils.SYNCLOGS_DB,newDoc)
}

/**
 * 项目基本信息下载
 */
export function doDownloadProjectBasic(request_param,showLoading) {
  return new Promise((resolve, reject) => {
    HTTP.before(() => {
          showLoading = true
        })
        .get('/api/project/download',request_param)
        .then(res => {
          if (res.data) {
            let temp_project = res.data
            delete temp_project._id
            temp_project.currectDataIndex = 0
            temp_project.init = 1
            temp_project.cloud = 1
            temp_project.user_id = request_param.user_id
            db_utils.update(db_utils.PROJECTS_DB, {project_id: request_param.project_id}, temp_project)
            doLocalSync(Cons.SyncLogType.PROJECT_BASIC,request_param.project_owner_id,request_param.project_id,request_param.user_id,res.data.updated_at,res.data.version)
          }
          resolve('ok')
        }).catch(err=>{
          console.log(err)
          reject(err)
        })
        .finally(() => {
          showLoading = false
        })
  })
}
/**
 * 项目作业数据下载
 */
export function doDownloadProjectData(request_param,showLoading) {
  return new Promise((resolve, reject) => {

    HTTP.before(() => {
          showLoading = true
        })
        .get('/api/data/download',request_param)
        .then(res => {
          if (res.data && res.data.datas) {
            // 清理本地datas
            db_utils.remove(db_utils.DATAS_DB,{project_id:request_param.project_id},(err)=>{
              if (!err){
                //设置新的datas
                db_utils.insert(db_utils.DATAS_DB,res.data.datas,(err,docs)=>{
                  if (!err){
                    // 记录本地同步信息
                    doLocalSync(Cons.SyncLogType.PROJECT_DATAS,request_param.project_owner_id,request_param.project_id,request_param.user_id,res.data.sync.updated_at,res.data.sync.version)
                  }
                })
              }
              resolve('ok')
            })
          }
        }).catch(err=>{
          reject(err)
        })
        .finally(() => {
          showLoading = false
        })


  })

}
/**
 * 项目标注组下载
 */
export function doDownloadProjectLabel(request_param,showLoading) {
  return new Promise((resolve, reject) => {
    HTTP.before(() => {
          showLoading = true
        })
        .get('/api/label/download',request_param)
        .then(res => {
          if (res.data && res.data.datas) {
            // 先删除本地,再插入新的
            db_utils.remove(db_utils.LABELS_DB,{project_id:request_param.project_id},(err)=>{
              if (!err){
                for (const label of res.data.datas) {
                  delete label['_id']
                  label.user_id = request_param.user_id
                  db_utils.insert(db_utils.LABELS_DB, label);
                }
                doLocalSync(Cons.SyncLogType.PROJECT_LABEL,request_param.project_owner_id,request_param.project_id,request_param.user_id,res.data.updated_at,res.data.version)
              }
              resolve('ok')
            })
          }

        }).catch(err=>{
          reject(err)
        })
        .finally(() => {
          showLoading = false
        })
  })

}


/**
 * 项目成员信息下载
 */
export function doDownloadProjectMembers(request_param,showLoading){

  return new Promise((resolve, reject) => {
    HTTP.before(() => {
          showLoading = true
        })
        .get('/api/member/download',request_param)
        .then(res => {
          if (res.data) {
            // 先删除本地,再插入新的
            db_utils.remove(db_utils.MEMBERS_DB,{project_id:request_param.project_id},(err)=>{
              if (!err){
                let members = []
                for (const member of res.data) {
                  const owner_member = {
                    project_id:member.project.project_id,
                    project_owner_id:member.project.project_owner_id,
                    user_id:member.user.id,
                    name:member.user.name,
                    avatar:member.user.avatar,
                    role:member.role,
                    status:member.status
                  }
                  members.push(owner_member)
                  db_utils.insert(db_utils.MEMBERS_DB, owner_member);
                }
                resolve(members)
              }else {
                reject(err)
              }

            })

          }
        })
        .catch(err=>{
          reject(err)
        })
        .finally(() => {
          showLoading = false
        })
  })



}

// ────────────────────────── 同步到服务器 请求history 防止重复上传  ──────────────────────────
/**
 * 基础项目信息同步
 */
export function doProjectBasicSync(localData) {
  fetchGet('/api/project/history', localData)
      .then(res => {
        const _data = res.data
        // 两者时间比较
        if (date_utils.isBefore(_data.updated_at, localData.updated_at)) {
          // 服务器时间落后本地,即本地有新内容,要覆盖服务器
          doUploadProjectBasic(localData)
        }
      })
}

/**
 * 项目基本信息上传
 */
export function doUploadProjectBasic(request_param){
  // 获取本地最新的数据
  db_utils.pureFindOne(db_utils.PROJECTS_DB, {project_id: request_param.project_id})
          .sort({'updated_at': -1})
          .exec((err, doc) => {
            if (!err && doc) {
              doc.project_id = request_param.project_id
              doc.project_owner_id = request_param.project_owner_id
              fetchPost('/api/project/upload', doc)
                  .then(res => {
                    // 本地插入同步记录
                    const _data = res.data
                    doLocalSync(Cons.SyncLogType.PROJECT_BASIC, request_param.project_owner_id,request_param.project_id,request_param.user_id, _data.updated_at, _data.version)
                  })
            }
          })

}

/**
 * 标注组信息同步
 */
export function doProjectLabelSync(localData) {
  fetchGet('/api/label/history', localData)
      .then(res => {
        const _data = res.data
        // 两者时间比较
        if (date_utils.isBefore(_data.updated_at, localData.updated_at)) {
          // 服务器时间落后本地,即本地有新内容,要覆盖服务器
          doUploadProjectLabel(localData)
        }
      })
}

export function doUploadProjectLabel(request_param){
  db_utils.find(db_utils.LABELS_DB, {
    project_id: request_param.project_id
  }, (err, documents) => {
    if (!err && documents) {
      fetchPost('/api/label/upload', {
        project_id: request_param.project_id,
        project_owner_id: request_param.project_owner_id,
        datas: documents
      })
          .then(res => {
            // 本地插入同步记录
            const _data = res.data
            doLocalSync(Cons.SyncLogType.PROJECT_LABEL,request_param.project_owner_id, request_param.project_id,request_param.user_id, _data.updated_at, _data.version)
          })
    }
  })

}


/**
 * 项目数据同步
 */
export function doProjectDataSync(localData) {
      fetchGet('/api/data/history',localData)
          .then(
              res => {
                const _data = res.data
                // 两者时间比较
                if (date_utils.isBefore(_data.updated_at, localData.updated_at)) {
                  // 服务器时间落后本地,即本地有新内容,要覆盖服务器
                  doUploadProjectData(localData)
                }
              })
}

export function doUploadProjectData(request_param){
  // 查询其他未同步作业数据
  db_utils.pureFind(db_utils.DATALOGS_DB,{project_id:request_param.project_id,user_id:request_param.user_id}).sort({'updated_at':1}).exec((err,docs)=>{
    if (!err){
      console.log('查询其他未同步作业数据')
      const ids = docs.map(doc=>{
        return doc._id
      })

      const datas = docs.filter(doc=>doc.data).map(doc=>{
        return doc.data
      })

      if (datas.length>0){
        fetchPost('/api/data/update',{
          datas:datas,
          project_id:request_param.project_id,
          project_owner_id:request_param.project_owner_id,
        })
            .then(res => {
              // 清理本地日志
              db_utils.remove(db_utils.DATALOGS_DB,{_id:{$in:ids}})
              // 插入更新日志
              doLocalSync(Cons.SyncLogType.PROJECT_DATAS,request_param.project_owner_id,request_param.project_id,request_param.user_id, res.data.updated_at,res.data.version)
            })
      }

    }
  })
}

/**
 * 用户配置信息同步
 */
export function doSettingSync(localData) {
  fetchGet('/api/setting/history')
      .then(res => {
        const _data = res.data
        // 两者时间比较
        if (date_utils.isBefore(_data.updated_at, localData.updated_at)) {
          // 服务器时间落后本地,即本地有新内容,要覆盖服务器
          const datas = getUserSettingInfo()
          fetchPost('/api/setting/upload', {
            datas: datas
          })
              .then(res => {
                // 上传成功,通知刷新页面
                // 记录本地同步信息
                const _data = res.data
                doLocalSync(Cons.SyncLogType.SETTING, '',localData.user_id, _data.updated_at, _data.version)
              })
        }
      })
}

// 获取用户偏好字段
export function getUserSettingInfo(){
  const booleanShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1'
  const booleanAutoUpdate = localStorage.getItem('booleanAutoUpdate') === '1'
  const booleanCloseLeaderLine = localStorage.getItem('booleanCloseLeaderLine') === '1'
  const booleanCloseLeaderLineShadow = localStorage.getItem('booleanCloseLeaderLineShadow') === '1'
  const booleanCloseLeaderLineTag = localStorage.getItem('booleanCloseLeaderLineTag') === '1'
  const booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1'
  const defaultEntityRenderType = localStorage.getItem('defaultEntityRenderType') || 'highlight'
  const defaultLeaderLineWidth = localStorage.getItem('defaultLeaderLineWidth') || 2
  const defaultFontSize = localStorage.getItem('defaultFontSize') || '1.2rem'
  const defaultFontColor = localStorage.getItem('defaultFontColor') || '#333333'
  const defaultMarkFontSize = localStorage.getItem('defaultMarkFontSize') || '1.2rem'

  return {booleanShowBaiduWord,booleanAutoUpdate,booleanCloseLeaderLine,booleanCloseLeaderLineShadow,booleanCloseLeaderLineTag,booleanAutoFinish,defaultEntityRenderType,
    defaultLeaderLineWidth,defaultFontSize,defaultFontColor,defaultMarkFontSize
  }
}
// 设置用户偏好
export function setUserSettingInfo(datas){
  localStorage.setItem('booleanShowBaiduWord', datas.defaultFontSize)
  localStorage.setItem('booleanAutoUpdate', datas.booleanAutoUpdate)
  localStorage.setItem('booleanCloseLeaderLine', datas.booleanCloseLeaderLine)
  localStorage.setItem('booleanCloseLeaderLineShadow', datas.booleanCloseLeaderLineShadow)
  localStorage.setItem('booleanCloseLeaderLineTag', datas.booleanCloseLeaderLineTag)
  localStorage.setItem('booleanAutoFinish', datas.booleanAutoFinish)
  localStorage.setItem('defaultEntityRenderType', datas.defaultEntityRenderType)
  localStorage.setItem('defaultLeaderLineWidth', datas.defaultLeaderLineWidth)
  localStorage.setItem('defaultFontSize', datas.defaultFontSize)
  localStorage.setItem('defaultFontColor', datas.defaultFontColor)
  localStorage.setItem('defaultMarkFontSize', datas.defaultMarkFontSize)
}