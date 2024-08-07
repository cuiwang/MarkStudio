export const Cons = {
  BASE_URL:'http://ms.oneoneone.cn',
  WorkingType: {
    ENTITY: 0, //实体标注
    RELATION: 1, //关系标注
    DIALOGUE: 2, //对话标注
    CLASSIFY:3, //分类标注
    TRANSLATION:4, //文本翻译
    TEXT2SQL:5, //语义解析
  },
  WorkingTypeName: {
    0: '实体标注',
    1: '关系标注',
    2: '对话标注',
    3:'分类标注',
    4:'文本翻译',
    5:'语义解析',
  },
  DataType: {
    MARKING: 0, //标注中,未结束
    FINISHED: 1, //已结束/保存
  },

  SyncLogType:{
    SETTING:0,
    PROJECT_BASIC:1,
    PROJECT_LABEL:2,
    PROJECT_DATAS:3
  },

  MEMBER_ROLE:{
    MANAGER:1,
    WORKER:2,
    VIEWER:3
  },
  MEMBER_ROLE2Str:{
    1:'管理员',
    2:'开发人员',
    3:'审核人员',
    4:'观众'
  },

  MEMBER_STATUS:{
    WAITING:0,
    NORMAL:1,
    REJECT:2
  },
  MEMBER_STATUS2Str:{
    0:'等待加入',
    1:'已加入',
    2:'已拒绝'
  },
  NotificationType:{
    MESSAGE:1,
    SYSTEM:2,
    MEMBER:3
  },
  NotificationType2Str:{
    1:'普通消息',
    2:'系统消息',
    3:'确认消息'
  },
  NotificationStatus:{
    UNREAD:0,
    READED:1,
    DENY:2
  },
  NotificationStatus2Str:{
    0:'未读',
    1:'已确认',
    2:'已拒绝'
  },

  ENCODINGS: ['utf8', 'utf16le', 'binary', 'base64', 'hex', 'ascii'],

  PROJECT_TEMPLATE: {
    name: '',
    created_at: '',
    updated_at: '',
    datasource_radio:'1',
    datasource_info:{
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      table: '',
      column:'',
      charset: 'UTF8_GENERAL_CI',
    },//数据库等信息
    dataSync:false, //是否数据同步
    dataSyncToLocalTime:'',
    dataSyncToLocalNum:0,
    dataSyncToRemoteTime:'',
    dataSyncToRemoteNum:0,
    dataFilePath: '',
    currectDataIndex: 0,
    markTypeId: '',
    markTypeName: '',
    globalTypeId: '',
    globalTypeName: '',
    relationTypeId: '',
    relationTypeName: '',
    dialogueTypeId: '',
    dialogueTypeName: '',
    description: '',
    working: false, //当前状态是否工作中/
  },

  DATA_TEMPLATE:{
    project_id: -1,
    created_at:'',
    updated_at:'',
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
  }
};
