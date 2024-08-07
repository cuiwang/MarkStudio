<template>
  <div class="home">
    <div class="home_header">
      <div class="flex_row_allcenter height_100" style="padding: 0 20px">
        <div :class="currectItemIndex==='/dashboard'?'menu-active':'menu'" @click="onMenuClick('/dashboard')">工作台</div>
        <div class="w20"/>
        <div :class="currectItemIndex==='/project'?'menu-active':'menu'" @click="onMenuClick('/project')">工程管理</div>
        <div class="w20"/>
        <div :class="currectItemIndex==='/label'?'menu-active':'menu'" @click="onMenuClick('/label')">标签组管理</div>
        <div class="menu" style="color: #cccccc">插件中心</div>
        <div class="flex_1"/>
        <div v-if="notifications.length>0" class="notification cursor_pointer">
          <el-popover
              placement="bottom"
              trigger="click"
              width="320">
            <Notification :notifications.sync="notifications"/>
            <div slot="reference"
                 class="menu"
                 style="font-size: 16px"
            >
              <el-badge :value="notifications.length">
                <i class="el-icon-bell"/>
              </el-badge>
            </div>
          </el-popover>
        </div>
        <div
            v-else
            slot="reference"
            class="menu"
            style="font-size: 16px"
            @click="onMenuClick('/nc')"
        >
          <i class="el-icon-bell"/>
        </div>
        <div class="menu" style="font-size: 16px" @click="onChangeDarkModeClick">
          <i :class="booleanDarkMode?'el-icon-moon':'el-icon-sunny'"/>
        </div>
        <div :class="currectItemIndex==='/setting'?'menu-active':'menu'"
             style="font-size: 16px"
             @click="onMenuClick('/setting')">
          <i class="el-icon-setting"/>
        </div>
        <div class="w20"/>
        <div class="user cursor_pointer">
          <el-popover placement="top-start" title="" trigger="hover" width="100">
            <!--信息展示 头像,昵称,邮箱-->
            <div v-if="userInfo" class="width_100 flex_row_allcenter">
              <div class="cursor_pointer" @click="onAvatorClick">
                <el-avatar :src="userAvatar"></el-avatar>
                <el-badge v-if="is_online" class="badge" is-dot type="success">
                </el-badge>
                <el-badge v-else class="badge" is-dot type="danger">
                </el-badge>
              </div>
              <div class="w5"/>
              <div class="flex_col flex_1">
                <span class="normal_text_size normal_text_color">{{userInfo.name}}</span>
                <span class="minititle_text_size description_text_color">{{userInfo.email}}</span>
              </div>
            </div>
            <!--登录-->
            <el-row v-else>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-truck"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/login')">登录</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <div class="separate_line"/>
            <div class="h10"/>
            <!--我的资料-->
            <el-row v-if="userInfo">
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-user"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/user')">我的资料</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--消息中心-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-bell"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/nc')">消息中心</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--偏好设置-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-setting"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/setting')">偏好设置</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <div class="separate_line"/>
            <div class="h10"/>
            <!--标签组管理-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-monitor"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/label')">标签组管理</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--工程管理-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-files"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/project')">工程管理</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--团队-->
            <el-row v-if="is_online">
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-ship"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/mc')">团队管理</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <div class="separate_line"/>
            <div class="h10"/>
            <!--帮助-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-reading"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/help')">帮助</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--快捷键-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-notebook-2"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/keyboard')">快捷键</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <!--反馈-->
            <el-row>
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-star-off"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onMenuClick('/feedback')">意见反馈</div>
              </el-col>
            </el-row>
            <div class="h10"/>
            <div v-if="userInfo" class="separate_line"/>
            <div v-if="userInfo" class="h10"/>
            <!--退出-->
            <el-row v-if="userInfo">
              <el-col :span="4">
                <div class="cursor_pointer">
                  <i class="el-icon-bicycle"/>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="cursor_pointer" @click="onLogoutClick">退出</div>
              </el-col>
            </el-row>
            <div slot="reference" class="user_avatar">
              <el-avatar :src="userAvatar" size="small"></el-avatar>
              <el-badge v-if="is_online" class="badge" is-dot type="success">
              </el-badge>
              <el-badge  v-else-if="!is_online && userInfo" class="badge" is-dot type="danger">
                <span style="font-size: 8px" @click="doManualConnect">重连</span>
              </el-badge>
              <el-badge  v-else class="badge" is-dot type="warning">
              </el-badge>
            </div>
          </el-popover>
        </div>
        <div class="w20"/>
      </div>
    </div>
    <div class="home_content">
      <!--<keep-alive>-->
      <router-view></router-view>
      <!--</keep-alive>-->
    </div>
    <!--底部说明区-->
    <!-- <el-footer class="footer">
      <div>@heiscuiwang</div>
    </el-footer>-->
  </div>
</template>
<script>
import Darkmode from 'darkmode-js'
import config from '../../../package.json'
import Notification from '../components/Notification'
import {Cons} from '../Constant'
import {fetchGet, fetchPost} from '../libs/axiosService'
// @ is an alias to /src
import db_utils from '../libs/db_utils'
import {doProjectBasicSync, doProjectDataSync, doProjectLabelSync, doSettingSync} from '../libs/sync_utils'

require('electron-disable-file-drop')
export default {
  name: 'Home',
  components: {Notification},
  data() {
    return {
      version: config.version, // 获取包的信息
      currectItemIndex: '/project',
      labelDefaultData: [
        {
          _id: -1,
          type: Cons.WorkingType.ENTITY,
          name: '自定义标注法示例',
          content: 'Nh-人名， Ns-地名， Ni-机构名',
          description: '点击[新建实体标注标签组]按钮,在新建页面中配置实体标注标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '人名',
              tag: 'Nh',
              color: 'rgba(30, 144, 255, 1)'
            },
            {
              name: '地名',
              tag: 'Ns',
              color: 'rgba(255, 69, 0, 1)'
            },
            {
              name: '机构名',
              tag: 'Ni',
              color: 'rgba(255, 140, 0, 1)'
            }
          ]
        },
        {
          _id: -2,
          type: Cons.WorkingType.ENTITY,
          name: '人名、地名、机构名',
          content: 'Person-人名， Location-地名， Organization-机构名',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名',
          datas: [
            {
              name: '人名',
              tag: 'Person',
              color: 'rgba(30, 144, 255, 1)'
            },
            {
              name: '地名',
              tag: 'Location',
              color: 'rgba(255, 69, 0, 1)'
            },
            {
              name: '机构名',
              tag: 'Organization',
              color: 'rgba(255, 140, 0, 1)'
            }
          ]
        },
        {
          _id: -3,
          type: Cons.WorkingType.ENTITY,
          name: '人名、地名、机构名、其他',
          content: 'Person-人名， Location-地名， Organization-机构名, Misc-其他',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名、其他',
          datas: [
            {
              name: '人名',
              tag: 'Person',
              color: 'rgba(30, 144, 255, 1)'
            },
            {
              name: '地名',
              tag: 'Location',
              color: 'rgba(255, 69, 0, 1)'
            },
            {
              name: '机构名',
              tag: 'Organization',
              color: 'rgba(255, 140, 0, 1)'
            },
            {
              name: '其他',
              tag: 'Misc'
            }
          ]
        },
        {
          _id: -4,
          type: Cons.WorkingType.ENTITY,
          name: 'BIO序列标注法',
          content: 'B-begin， I-inside， O-outside',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间或结尾. O-outside，代表不属于实体.',
          datas: [
            {
              name: 'begin',
              tag: 'B'
            },
            {
              name: 'inside',
              tag: 'I'
            },
            {
              name: 'outside',
              tag: 'O'
            }
          ]
        },
        {
          _id: -5,
          type: Cons.WorkingType.ENTITY,
          name: 'BIOES序列标注法',
          content: 'B-begin， I-inside， O-outside， E-end， S-single',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间. O-outside，代表非实体，用于标记无关字符. E-end，代表实体的结尾. S-single，代表单个字符，本身就是一个实体.',
          datas: [
            {
              name: 'begin',
              tag: 'B'
            },
            {
              name: 'inside',
              tag: 'I'
            },
            {
              name: 'outside',
              tag: 'O'
            },
            {
              name: 'end',
              tag: 'E'
            },
            {
              name: 'single',
              tag: 'S'
            }
          ]
        },
        {
          _id: -6,
          type: Cons.WorkingType.CLASSIFY,
          name: '自定义情感分类示例',
          content: 'Positive-正面， Opposite-反面， Neutral-中立',
          description: '点击[新建文本分类标签组]按钮,在新建页面中配置文本分类标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '正面',
              tag: 'Positive',
              color: 'rgba(30, 144, 255, 1)'
            },
            {
              name: '反面',
              tag: 'Opposite',
              color: 'rgba(255, 69, 0, 1)'
            },
            {
              name: '中立',
              tag: 'Neutral',
              color: 'rgba(255, 140, 0, 1)'
            }
          ]
        },
        {
          _id: -7,
          type: Cons.WorkingType.CLASSIFY,
          name: '肯定、否定',
          content: 'A-肯定， B-否定',
          description: '二分类示例',
          datas: [
            {
              name: '肯定',
              tag: 'A'
            },
            {
              name: '否定',
              tag: 'B'
            }
          ]
        },
        {
          _id: -8,
          type: Cons.WorkingType.CLASSIFY,
          name: 'A、B、C、D',
          content: 'A-A， B-B， C-C, D-D',
          description: '多分类示例',
          datas: [
            {
              name: 'A',
              tag: 'A'
            },
            {
              name: 'B',
              tag: 'B'
            },
            {
              name: 'C',
              tag: 'C'
            },
            {
              name: 'D',
              tag: 'D'
            }
          ]
        },
        {
          _id: -9,
          type: Cons.WorkingType.RELATION,
          name: '自定义关系标注示例',
          content: 'A-继承， B-聚合， C-关联, D-依赖',
          description: '点击[新建关系标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '继承',
              tag: 'A',
              color: 'rgba(30, 144, 255, 1)'
            },
            {
              name: '聚合',
              tag: 'B',
              color: 'rgba(255, 69, 0, 1)'
            },
            {
              name: '关联',
              tag: 'C',
              color: 'rgba(255, 140, 0, 1)'
            },
            {
              name: '依赖',
              tag: 'D',
              color: 'rgb(58,147,33)'
            }
          ]
        },
        {
          _id: -10,
          type: Cons.WorkingType.RELATION,
          name: '因果、并列',
          content: 'A-因果， B-并列',
          description: '简单演示两个关系',
          datas: [
            {
              name: '因果',
              tag: 'A'
            },
            {
              name: '并列',
              tag: 'B'
            }
          ]
        },
        {
          _id: -11,
          type: Cons.WorkingType.DIALOGUE,
          name: '自定义对话标注示例',
          content: 'A-支持， B-反对， C-犹豫, D-中立',
          separator: '/#/gi',
          description: '点击[新建对话标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '支持',
              tag: 'A'
            },
            {
              name: '反对',
              tag: 'B'
            },
            {
              name: '犹豫',
              tag: 'C'
            },
            {
              name: '中立',
              tag: 'D'
            }
          ]
        },
        {
          _id: -12,
          type: Cons.WorkingType.DIALOGUE,
          name: '正面、反面',
          content: 'A-正面， B-反面',
          separator: '',
          description: '简单演示',
          datas: [
            {
              name: '正面',
              tag: 'A'
            },
            {
              name: '反面',
              tag: 'B'
            }
          ]
        }
      ],
      markTypeDefaultDatas: [
        {
          _id: -1,
          type: Cons.WorkingType.ENTITY,
          name: '自定义标注法示例',
          content: 'Nh-人名， Ns-地名， Ni-机构名',
          description: '点击[新建实体标注标签组]按钮,在新建页面中配置实体标注标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '人名',
              tag: 'Nh',
              color: ''
            },
            {
              name: '地名',
              tag: 'Ns',
              color: ''
            },
            {
              name: '机构名',
              tag: 'Ni',
              color: ''
            }
          ]
        },
        {
          _id: -2,
          type: Cons.WorkingType.ENTITY,
          name: '人名、地名、机构名',
          content: 'Person-人名， Location-地名， Organization-机构名',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名',
          datas: [
            {
              name: '人名',
              tag: 'Person'
            },
            {
              name: '地名',
              tag: 'Location'
            },
            {
              name: '机构名',
              tag: 'Organization'
            }
          ]
        },
        {
          _id: -3,
          type: Cons.WorkingType.ENTITY,
          name: '人名、地名、机构名、其他',
          content: 'Person-人名， Location-地名， Organization-机构名, Misc-其他',
          description: '命名实体一般指的是文本中具有特定意义或者指代性强的实体,此示例用来标记人名、地名、机构名、其他',
          datas: [
            {
              name: '人名',
              tag: 'Person'
            },
            {
              name: '地名',
              tag: 'Location'
            },
            {
              name: '机构名',
              tag: 'Organization'
            },
            {
              name: '其他',
              tag: 'Misc'
            }
          ]
        },
        {
          _id: -4,
          type: Cons.WorkingType.ENTITY,
          name: 'BIO序列标注法',
          content: 'B-begin， I-inside， O-outside',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间或结尾. O-outside，代表不属于实体.',
          datas: [
            {
              name: 'begin',
              tag: 'B'
            },
            {
              name: 'inside',
              tag: 'I'
            },
            {
              name: 'outside',
              tag: 'O'
            }
          ]
        },
        {
          _id: -5,
          type: Cons.WorkingType.ENTITY,
          name: 'BIOES序列标注法',
          content: 'B-begin， I-inside， O-outside， E-end， S-single',
          description: 'B-begin，代表实体的开头. I-inside，代表实体的中间. O-outside，代表非实体，用于标记无关字符. E-end，代表实体的结尾. S-single，代表单个字符，本身就是一个实体.',
          datas: [
            {
              name: 'begin',
              tag: 'B'
            },
            {
              name: 'inside',
              tag: 'I'
            },
            {
              name: 'outside',
              tag: 'O'
            },
            {
              name: 'end',
              tag: 'E'
            },
            {
              name: 'single',
              tag: 'S'
            }
          ]
        }
      ],
      globalTypeDefaultDatas: [
        {
          _id: -6,
          type: Cons.WorkingType.CLASSIFY,
          name: '自定义情感分类示例',
          content: 'Positive-正面， Opposite-反面， Neutral-中立',
          description: '点击[新建文本分类标签组]按钮,在新建页面中配置文本分类标签组.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '正面',
              tag: 'Positive'
            },
            {
              name: '反面',
              tag: 'Opposite'
            },
            {
              name: '中立',
              tag: 'Neutral'
            }
          ]
        },
        {
          _id: -7,
          type: Cons.WorkingType.CLASSIFY,
          name: '肯定、否定',
          content: 'A-肯定， B-否定',
          description: '二分类示例',
          datas: [
            {
              name: '肯定',
              tag: 'A'
            },
            {
              name: '否定',
              tag: 'B'
            }
          ]
        },
        {
          _id: -8,
          type: Cons.WorkingType.CLASSIFY,
          name: 'A、B、C、D',
          content: 'A-A， B-B， C-C, D-D',
          description: '多分类示例',
          datas: [
            {
              name: 'A',
              tag: 'A'
            },
            {
              name: 'B',
              tag: 'B'
            },
            {
              name: 'C',
              tag: 'C'
            },
            {
              name: 'D',
              tag: 'D'
            }
          ]
        }
      ],
      relationTypeDefaultDatas: [
        {
          _id: -9,
          type: Cons.WorkingType.RELATION,
          name: '自定义关系标注示例',
          content: 'A-继承， B-聚合， C-关联, D-依赖',
          description: '点击[新建关系标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '继承',
              tag: 'A'
            },
            {
              name: '聚合',
              tag: 'B'
            },
            {
              name: '关联',
              tag: 'C'
            },
            {
              name: '依赖',
              tag: 'D'
            }
          ]
        },
        {
          _id: -10,
          type: Cons.WorkingType.RELATION,
          name: '因果、并列',
          content: 'A-因果， B-并列',
          description: '简单演示两个关系',
          datas: [
            {
              name: '因果',
              tag: 'A'
            },
            {
              name: '并列',
              tag: 'B'
            }
          ]
        }
      ],
      dialogueTypeDefaultDatas: [
        {
          _id: -11,
          type: Cons.WorkingType.DIALOGUE,
          name: '自定义对话标注示例',
          content: 'A-支持， B-反对， C-犹豫, D-中立',
          separator: '/#/gi',
          description: '点击[新建对话标注标签组类型]按钮,在新建页面中配置标注关系类型类型.也可直接[编辑]本条进行修改.点击左侧箭头展开预览效果.',
          datas: [
            {
              name: '支持',
              tag: 'A'
            },
            {
              name: '反对',
              tag: 'B'
            },
            {
              name: '犹豫',
              tag: 'C'
            },
            {
              name: '中立',
              tag: 'D'
            }
          ]
        },
        {
          _id: -12,
          type: Cons.WorkingType.DIALOGUE,
          name: '正面、反面',
          content: 'A-正面， B-反面',
          separator: '',
          description: '简单演示',
          datas: [
            {
              name: '正面',
              tag: 'A'
            },
            {
              name: '反面',
              tag: 'B'
            }
          ]
        }
      ],
      projectDefaultData: {
        _id: '-1',
        project_id: '-1',
        name: '示例工程',
        created_at: '2020-03-01 12:00:00',
        updated_at: '2020-03-01 12:00:00',
        datasource_radio: '1',
        datasource_info: {},//数据库等信息
        dataSync: false, //是否数据同步
        dataSyncToLocalTime: '',
        dataSyncToLocalNum: 0,
        dataSyncToRemoteTime: '',
        dataSyncToRemoteNum: 0,
        dataFilePath: '示例工程',
        currectDataIndex: 0,
        markTypeId: -2,
        markTypeName: '人名、地名、机构名',
        globalTypeId: -6,
        globalTypeName: '自定义情感分类示例',
        relationTypeId: -9,
        relationTypeName: '自定义关系标注示例',
        dialogueTypeId: -11,
        dialogueTypeName: '自定义对话标注示例',
        description: '简单演示此工具基本功能,示例如何使用实体标注标签组为[人名、地名、机构名]进行数据标注,其他细节客官请自己发现~',
        working: true //当前状态是否工作中/
      },
      datasDefaultDatas: [
        '如果你想要标注人名、地名、机构名,就需要在文中找出:李明这样的人名,北京市这样的地名以及国家安全局这样的机构名.一旦你找到这些字/词/短语,用鼠标选中,并在文字上方弹出的窗口中选择一个实体标注标签组.一旦完成本条中所有标注工作,点击右上方的[标注完成]按钮标记本条已处理完毕(再次点击[再次标注]按钮,重新标注.),然后点击旁边的[下一条]按钮就可以标注下一条了.',
        '标注完上一条,相信聪明的你已经学会了本工具主要功能!接下来你可以通过切换最上面的[标签组管理]完成实体标注标签组自定义.一旦你完成所有文档的标注后,点击上面[导出数据]按钮,将最终的标注结果用JSON格式存储下来.如果你还想练习一下标注,同样点击[下一条]按钮.当然,聪明的你何不点击上面的[新建工程]按钮,开启你的标注工作吧~',
        '中方赞赏伊姆兰·汗总理对中国脱贫攻坚成就作出的积极评价。我也注意到联合国驻华协调员常启德等国际组织负责人表示，中国的脱贫攻坚成果为世界带来重要启示，习近平主席带领中国政府和人民表现的决心和行动力是首要经验。',
        '锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩。????????鐪犱笉瑙夋檽锛屽???????鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩????????????锘挎槬鐪犱笉瑙夋檽锛屽澶勯椈鍟奸笩'
      ],
      booleanDarkMode: false,
      darkmode: null,
      boolShowImportMarksDialog: false,
      // websocket
      websock: null,
      reconnectData: null,
      reconnectTime: 3,
      lockReconnect: false, // 避免重复连接，因为onerror之后会立即触发 onclose
      timeout: 30000, // 30s一次心跳检测
      timeoutObj: null,
      serverTimeoutObj: null,
      // notification
      notifications: [],
      // ────────────────────────── 分割线  ──────────────────────────
      Listeners: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    userAvatar() {
      if (this.userInfo) {
        return Cons.BASE_URL + '/storage/' + this.userInfo.avatar
      }
      else {
        return 'data:image/png;base64,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'
      }
    }
  },
  mounted() {
    console.log('Home mounted')
    this.initEvent()
    this.initData()
    this.darkmode = new Darkmode({
      bottom: '32px', // default: '32px'
      right: '32px', // default: '32px'
      left: 'unset', // default: 'unset'
      time: '0.3s', // default: '0.3s'
      mixColor: '#e9e9e9', // default: '#fff'
      backgroundColor: '#fff', // default: '#fff'
      buttonColorDark: '#100f2c', // default: '#100f2c'
      buttonColorLight: '#fff', // default: '#fff'
      saveInCookies: false, // default: true,
      label: '', // default: ''
      autoMatchOsTheme: true // default: true
    })
  },
  destroyed() {
    this.doCloseWebsocket()
    this.removeEventListener(this.Listeners)
  },
  methods: {
    initEvent() {
      // 有网的情况下进行同步
      const doNetSync_listener = (doc) => {
        // 按类型,查出最新的一条时间与服务器进行比较
        if (doc.type === Cons.SyncLogType.SETTING) {
          doSettingSync(doc)
        }
        if (doc.type === Cons.SyncLogType.PROJECT_BASIC) {
          doProjectBasicSync(doc)
        }
        if (doc.type === Cons.SyncLogType.PROJECT_LABEL) {
          doProjectLabelSync(doc)
        }
        if (doc.type === Cons.SyncLogType.PROJECT_DATAS) {
          doProjectDataSync(doc)
        }
      }
      // NOTIFICATION_READED
      // 标记通知已读
      const NOTIFICATION_CHANGED_listener = () => {
        // 再次获取数据
        this.getNotifications()
      }
      // WS_CONNECT_SUCCESS
      const WS_CONNECT_SUCCESS_listener = () => {
        // 连上了ws服务
        // 一旦连上了服务,就检查是否要更新和上传
        // 获取最新数据
        this.doUpdateDatas()
      }
      // 打开了工程,需要加入群组
      const PROJECT_ACTIVED_listener = (project_id, project_owner_id, user_id) => {
        this.websocketsend(
            {
              type: 'PROJECT_ACTIVED',
              data: {
                project_id,
                project_owner_id,
                user_id
              }
            }
        )
      }
      // 关闭了工程,需要退出群组
      const PROJECT_CLOSED_listener = (project_id, project_owner_id, user_id) => {
        this.websocketsend(
            {
              type: 'PROJECT_CLOSED',
              data: {
                project_id,
                project_owner_id,
                user_id
              }
            }
        )
      }
      // LOGIN
      const LOGIN_SUCCESS_listener = () => {
        this.currectItemIndex = '/project'
        this.initWebSocket()
      }
      // LOGOUT
      const LOGOUT_SUCCESS_listener = () => {
        this.currectItemIndex = '/'
        // 调用退出登录接口
        fetchGet('/api/logout')
            .then(res => {
              this.doCloseWebsocket()
              localStorage.removeItem('user_id')
              localStorage.removeItem('token')
              localStorage.removeItem('password')
              this.$store.dispatch('user/setIsOnline', false)
              this.$store.dispatch('user/setUserInfo', null)
              this.showMessageWithText('账号已退出','info')
            })
            .catch(err => {
              this.showMessageWithText('账号退出失败'+ err.toLocaleString())
            })
        // 跳转页面
        this.$router.push({
          path: '/login',
          params: {data: 'login'}
        })
      }
      // OPEN_DASHBOARD
      const OPEN_DASHBOARD_listener = () => {
        this.onMenuClick('/dashboard')
      }
      // OPEN_PROJECT
      const OPEN_PROJECT_listener = () => {
        this.onMenuClick('/project')
      }
      this.Listeners = [
        ['doNetSync', doNetSync_listener],
        ['NOTIFICATION_CHANGED', NOTIFICATION_CHANGED_listener],
        ['WS_CONNECT_SUCCESS', WS_CONNECT_SUCCESS_listener],
        ['PROJECT_ACTIVED', PROJECT_ACTIVED_listener],
        ['PROJECT_CLOSED', PROJECT_CLOSED_listener],
        ['LOGIN_SUCCESS', LOGIN_SUCCESS_listener],
        ['LOGOUT_SUCCESS', LOGOUT_SUCCESS_listener],
        ['OPEN_DASHBOARD', OPEN_DASHBOARD_listener],
        ['OPEN_PROJECT', OPEN_PROJECT_listener]
      ]
      this.addEventListener(this.Listeners)
    },
    initData() {
      // 尝试登录
      const username = localStorage.getItem('username') || ''
      const password = localStorage.getItem('password') || ''
      if (username && password) {
        // 请求登录
        fetchPost('/api/login', {
          username: username,
          password: password
        })
            .then(res => {
              // 保存用户token
              localStorage.setItem('user_id', res.data['id'])
              localStorage.setItem('token', res.data['access_token'])
              this.$store.dispatch('user/setUserInfo', res.data)
              // initWebSocket
              this.initWebSocket()
            })
      }
      /*db_utils.remove(db_utils.LABELS_DB, {});
      db_utils.remove(db_utils.PROJECTS_DB, {});
      db_utils.remove(db_utils.MARK_TYPES_DB, {});
      db_utils.remove(db_utils.GLOBAL_TYPES_DB, {});
      db_utils.remove(db_utils.RELATION_TYPES_DB, {});
      db_utils.remove(db_utils.DIALOGUE_TYPES_DB, {});
      db_utils.remove(db_utils.DATAS_DB, {});
      db_utils.remove(db_utils.SYNCLOGS_DB, {});
      db_utils.remove(db_utils.DATALOGS_DB, {});
      db_utils.remove(db_utils.MEMBERS_DB, {});*/
      /*db_utils.find(db_utils.LABELS_DB,{},(err,documents)=>{
        console.log(documents);
      })*/
      /*db_utils.find(db_utils.PROJECTS_DB,{},(err,documents)=>{
        console.log(documents);
      })
      db_utils.find(db_utils.DATAS_DB,{},(err,documents)=>{
        console.log(documents);
      })*/
      // 默认标注组,保存到数据库
      db_utils.find(db_utils.LABELS_DB, {}, (err, documents) => {
        // 判断是否3.0以前的数据,需要迁移,只会迁移这一次.
        if (documents.length <= 0) {
          db_utils.count(db_utils.MARK_TYPES_DB, {}, (err, count) => {
            if (count > 0) {
              // 需要迁移
              // 迁移MARK_TYPES_DB
              db_utils.find(db_utils.MARK_TYPES_DB, {}, (err, documents) => {
                if (documents.length > 0) {
                  documents.forEach(document => {
                    document['type'] = Cons.WorkingType.ENTITY
                    db_utils.insert(db_utils.LABELS_DB, document, (err, newDoc) => {
                    })
                  })
                }
                console.log('迁移MARK_TYPES_DB Finish')
              })
              // 迁移GLOBAL_TYPES_DB
              db_utils.find(db_utils.GLOBAL_TYPES_DB, {}, (err, documents) => {
                if (documents.length > 0) {
                  documents.forEach(document => {
                    document['type'] = Cons.WorkingType.CLASSIFY
                    // 重新分配_id,累计_id.
                    if (document['_id'] < 0) {
                      document['_id'] = document['_id'] - 5
                    }
                    db_utils.insert(db_utils.LABELS_DB, document, (err, newDoc) => {
                    })
                  })
                  console.log('迁移GLOBAL_TYPES_DB Finish')
                }
              })
              // 迁移RELATION_TYPES_DB
              db_utils.find(db_utils.RELATION_TYPES_DB, {}, (err, documents) => {
                if (documents.length > 0) {
                  documents.forEach(document => {
                    document['type'] = Cons.WorkingType.RELATION
                    // 重新分配_id,累计_id.
                    if (document['_id'] < 0) {
                      document['_id'] = document['_id'] - 8
                    }
                    db_utils.insert(db_utils.LABELS_DB, document, (err, newDoc) => {
                    })
                  })
                  console.log('迁移RELATION_TYPES_DB Finish')
                }
              })
              // 迁移DIALOGUE_TYPES_DB
              db_utils.find(db_utils.DIALOGUE_TYPES_DB, {}, (err, documents) => {
                if (documents.length > 0) {
                  documents.forEach(document => {
                    document['type'] = Cons.WorkingType.DIALOGUE
                    // 重新分配_id,累计_id.
                    if (document['_id'] < 0) {
                      document['_id'] = document['_id'] - 10
                    }
                    db_utils.insert(db_utils.LABELS_DB, document, (err, newDoc) => {
                    })
                  })
                  console.log('迁移DIALOGUE_TYPES_DB Finish')
                }
              })
              // 迁移PROJECTS_DB
              // 判断是否3.0以前的数据,需要迁移,只会迁移这一次.
              db_utils.find(db_utils.PROJECTS_DB, {}, (err, documents) => {
                if (documents.length > 0) {
                  documents.forEach(document => {
                    // 重新分配_id,累计_id.
                    if (document['globalTypeId'] && document['globalTypeId'] < 0) {
                      document['globalTypeId'] = document['globalTypeId'] - 5
                    }
                    if (document['relationTypeId'] && document['relationTypeId'] < 0) {
                      document['relationTypeId'] = document['relationTypeId'] - 8
                    }
                    if (document['dialogueTypeId'] && document['dialogueTypeId'] < 0) {
                      document['dialogueTypeId'] = document['dialogueTypeId'] - 10
                    }
                    db_utils.update(db_utils.PROJECTS_DB, {_id: document._id}, document)
                  })
                }
                console.log('迁移PROJECTS_DB Finish')
                this.$events.emit('DB_INIT_FINISH')
              })
            }
            else {
              // 没有记录,不要迁移
              // 默认实体标注标签组,保存到数据库
              db_utils.insert(db_utils.LABELS_DB, this.labelDefaultData, (err, newDoc) => {
              })
            }
          })
        }
      })
      // 默认工程,保存到数据库
      db_utils.find(db_utils.PROJECTS_DB, {}, (err, documents) => {
        if (documents.length <= 0) {
          db_utils.insert(db_utils.PROJECTS_DB, this.projectDefaultData, (err, newDoc) => {
            let datas = []
            this.datasDefaultDatas.forEach((content, index) => {
              let data = JSON.parse(JSON.stringify(Cons.DATA_TEMPLATE))
              data._id = -(index + 1)
              data.project_id = '-1'
              data.index = index
              data.content = content
              if (index === 0) {
                data.tags = [
                  {
                    name: '人名',
                    tag: 'Person',
                    content: '李明',
                    color: '#1e90ff',
                    line_id: -1,
                    start: 26,
                    end: 28
                  },
                  {
                    name: '地名',
                    tag: 'Location',
                    content: '北京市',
                    color: '#ff4500',
                    line_id: -2,
                    start: 34,
                    end: 37
                  },
                  {
                    name: '机构名',
                    tag: 'Organization',
                    content: '国家安全局',
                    color: '#ff8c00',
                    line_id: -3,
                    start: 44,
                    end: 49
                  }
                ]
              }
              if (index === 3) {
                data.wrong = 1
                data.status = 1
              }
              datas.push(data)
            })
            db_utils.insert(db_utils.DATAS_DB, datas, () => {
              console.log('DB_INIT_FINISH')
              this.$events.emit('DB_INIT_FINISH')
            })
          })
        }
      })
    },
    // 更新相关信息
    doUpdateDatas() {
      this.getNotifications()
      this.getProjects()
    },
    // 点击配置中心菜单
    onMenuClick(_index) {
      if (_index.includes('/')) {
        if (this.currectItemIndex === _index) {
          return
        }
        this.currectItemIndex = _index
        this.$router.push({
          path: _index,
          params: {data: 'query'}
        })
      }
    },
    // 点击修改夜间模式
    onChangeDarkModeClick() {
      this.booleanDarkMode = !this.booleanDarkMode
      this.darkmode.toggle()
    },
    // 点击批量导入
    onImportMarksClick() {
      this.boolShowImportMarksDialog = true
    },
    // 点击头像位置,未连接情况下重连
    onAvatorClick() {
      if (!this.is_online && this.userInfo) {
        this.doManualConnect()
      }
    },
    // 点击退出
    onLogoutClick() {
      // 弹框确认
      this.$confirm('退出后,数据无法及时同步,确定退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            // 退出成功,通知刷新页面
            this.$events.emit('LOGOUT_SUCCESS', '')
          })
          .catch(() => {
          })
    },
    // ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽- websocket -▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽
    // 初始化weosocket
    initWebSocket() {
      console.log('启动中')
      const wsurl = 'ws://ms-server.oneoneone.cn'
      this.doCloseWebsocket()
      //const wsurl = 'ws://wxsocket.youdongtai.com'
      // const wsurl = 'ws://server.natappfree.cc:39217'
      this.websock = new WebSocket(wsurl)
      this.websock.onopen = this.websocketonopen // 连接成功
      this.websock.onmessage = this.websocketonmessage // 广播成功
      this.websock.onerror = this.websocketonerror // 连接断开，失败
      this.websock.onclose = this.websocketclose // 连接关闭
    },
    // 连接成功
    websocketonopen() {
      this.$store.dispatch('user/setIsOnline', true)
      this.websocketsend({
        type: 'CLIENT_CONNECT',
        data: {user_id: this.user_id}
      })
      console.log('连接成功..')
      this.showLocalNotification('连接成功,自动数据同步...', 'success', 'bottom-right')
      this.$events.emit('WS_CONNECT_SUCCESS', '')
      //this.$message.success('连接成功,正在获取数据..')
      // this.heatBeat();
    },
    // 连接失败
    websocketonerror() {
      this.$store.dispatch('user/setIsOnline', false)
      //this.$message.warning('连接服务器失败,正在重连..')
      this.showLocalNotification('连接异常,正在重连...', 'warning', 'bottom-right')

      this.reconnect()
      console.log('连接异常,正在重连...')
    },
    // 各种问题导致的 连接关闭
    websocketclose() {
      this.$store.dispatch('user/setIsOnline', false)
      this.$events.emit('WS_CONNECT_FAILED', '')
      //this.$message.error('连接已关闭,正在重新打开...')
      this.reconnect()
      //this.showLocalNotification('连接断开,正在重连...','error','bottom-right')
      console.log('连接已关闭!')
    },
    // 数据接收
    websocketonmessage(data) {
      const msgData = JSON.parse(data.data)
      if (msgData.type === 'SERVER_RESPONSE') {
        // 网页初次链接响应成功
      }
      else if (msgData.type === 'PROJECT_INVITATION') {
        // 邀请加入团队，显示通知，提示用户查看
        this.showLocalNotification('收到了一条团队邀请，请前往通知中心查看详情！', 'info', 'bottom-right')
        // 刷新通知列表
        this.getNotifications()
      }
      else if (msgData.type === 'PROJECT_INVITATION_REJECT') {
        // 移出团队，显示通知，提示用户查看
        this.showLocalNotification('您被移出团队，请前往通知中心查看详情！', 'info', 'bottom-right')
        // 通知刷新项目
        this.$events.emit('EDIT_PROJECT_SUCESS')
      }
      else if (msgData.type === 'DATA_UPDATED') {

        // 其他的人更新，才需要存本地
        if (msgData.user_id !== this.user_id) {
          // 通知更新本地（如果在Dashboard页面）
          for (const data of msgData.sync.datas) {
            this.$events.emit('NEWDATA_FROM_OTHER',data)
          }
        }
      }
      else if (msgData.type === 'SERVER_HEARTBEAT') {
        this.heatBeat() //心跳响应
        console.log('heatBeat')
      }
    },
    // 数据发送
    websocketsend(data) {
      if (this.websock) {
        this.websock.send(JSON.stringify(data))
      }
    },
    // socket重连
    reconnect() {
      if (this.lockReconnect) { // 这里很关键，因为连接失败之后之后会相继触发 连接关闭，不然会连接上两个 WebSocket
        return
      }
      this.lockReconnect = true
      this.reconnectData && clearTimeout(this.reconnectData)
      this.reconnectData = setTimeout(() => {
        if (this.reconnectTime > 1) {
          this.initWebSocket()
          this.lockReconnect = false
          this.reconnectTime = this.reconnectTime - 1
        }else {
          this.showLocalNotification('服务多次连接失败！请检查网络后点击头像重连！','error','bottom-right')
        }
      }, 3 * 1000)
    },
    // 心跳检测
    heatBeat() {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        this.websocketsend(
            {
              type: 'CLIENT_HEARTBEAT',
              data: {
                accessToken: this.token
              }
            }
        ) // 根据后台要求发送
        this.serverTimeoutObj = setTimeout(() => {
          this.websock.close() // 如果  15秒之后我们没有收到 后台返回的心跳检测数据 断开socket，断开后会启动重连机制
        }, 15 * 1000)
      }, this.timeout)
    },
    doCloseWebsocket() {
      if (this.websock) {
        this.lockReconnect = true
        this.websock.close()
      }
    },
    doManualConnect() {
      this.reconnectTime = 3
      this.lockReconnect = false
      this.reconnect()
      this.showLocalNotification('正在发起重新连接...', 'warning', 'bottom-right')
    },
    getNotifications() {
      fetchGet('/api/notification/notifications', {
        status: Cons.NotificationStatus.UNREAD
      })
          .then(res => {
            this.notifications = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    getProjects() {
      fetchGet('/api/project/projects')
          .then(res => {
            let server_projects = res.data
            if (Object.keys(server_projects).length === 0){
              server_projects = null
            }

            // 判断本地是否存在项目（比较project_id）
            db_utils.pureFind(db_utils.PROJECTS_DB, {user_id: this.user_id})
                    .sort({
                      cloud: -1,
                      working: -1,
                      updated_at: -1
                    })
                    .exec((err, documents) => {
                      // 本地数据库
                      const local_projects = documents
                      // 如果远程不存在
                      if (!server_projects) {
                        // 如果本地有数据，就全删
                        if (local_projects) {
                          for (const localProject of local_projects) {
                            //本地云服务应该删除
                            db_utils.remove(db_utils.PROJECTS_DB, {'project_id': localProject.project_id})
                          }
                          // 通知刷新工程管理页面
                          this.$events.emit('EDIT_PROJECT_SUCESS')
                        }
                      }
                      // 如果本地不存在
                      else if (!local_projects) {
                        // 如果远程有数据，就全量同步
                        if (server_projects) {
                          for (const serverProject of server_projects) {
                            let defalut_project = {
                              name: serverProject.project.name,
                              description: serverProject.project.description,
                              project_id: serverProject.project.project_id,
                              project_owner_id: serverProject.project.project_owner_id,
                              currectDataIndex: 0,
                              init: 0,
                              cloud: 1,
                              working: false,
                              user_id: this.user_id
                            }
                            db_utils.insert(db_utils.PROJECTS_DB, defalut_project)
                          }
                          // 通知刷新工程管理页面
                          this.$events.emit('EDIT_PROJECT_SUCESS')
                        }
                      }
                      // 如果都存在，就进行比较
                      else {
                        console.log('如果都存在，就进行比较')
                        // 判断云服务是否存在本地了，不存在就创建
                        for (const serverProject of server_projects) {
                          // 判断本地服务中是否包含云服务
                          const isInited = local_projects.some(localProject => {
                            console.log(localProject.project_id)
                            console.log(serverProject.project_id)
                            if (localProject.project_id === serverProject.project_id) {
                              return true
                            }
                          })
                          if (!isInited) {
                            console.log('un inited' + ':' + serverProject.project_id)
                            let defalut_project = {
                              name: serverProject.project.name,
                              description: serverProject.project.description,
                              project_id: serverProject.project.project_id,
                              project_owner_id: serverProject.project.project_owner_id,
                              currectDataIndex: 0,
                              init: 0,
                              cloud: 1,
                              working: false,
                              user_id: this.user_id
                            }
                            db_utils.insert(db_utils.PROJECTS_DB, defalut_project)
                          }
                        }
                        // 判断本地云服务是否在线上云服务中，不存在就删除
                        for (const localProject of local_projects) {
                          console.log('判断本地云服务是否在线上云服务中，不存在就删除')
                          // 判断云服务中是否包含本地服务
                          const isInited = server_projects.some(serverProject => {
                            console.log(localProject.project_id)
                            console.log(serverProject.project_id)
                            if (localProject.project_id === serverProject.project_id) {
                              return true
                            }
                          })
                          if (!isInited) {
                            //云服务不包含本地云服务了（云服务删除了）
                            //本地云服务应该删除
                            db_utils.remove(db_utils.PROJECTS_DB, {'project_id': localProject.project_id})
                          }
                        }
                        // 通知刷新工程管理页面
                        this.$events.emit('EDIT_PROJECT_SUCESS')
                      }
                    })
          })
          .catch(err => {
            console.log(err)
          })
    },

  }
}
</script>
<style lang="scss" scoped>
@import '../globals';

.darkmode--activated .user_avatar {
  mix-blend-mode: difference;
}

.el-avatar {
  background-color: transparent;
}

.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}


.home_header {
  height: 60px;
  margin-top: 20px;
  left: 0;
  width: 100%;
  z-index: 99;
}

.home_content {
  flex: 1;
  overflow: auto;
}


.menu-active {
  user-select: none;
  cursor: pointer;
  color: #515764;
  font-size: 14px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  background: #f3f4f8;
  padding: 3px 15px;
  border-radius: 3px;
}


.menu {
  user-select: none;
  cursor: pointer;
  color: #757980;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  padding: 3px 15px;
  border-radius: 3px;
}

.badge {
  margin-left: -10px;
  margin-bottom: -5px;
}

img:focus {
  outline: none;
}
</style>
