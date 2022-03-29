<template>
  <div id="content" :loading="isDbIniting">
    <div class="content-fixed-header">
      <div class="content-infobar">
        <el-collapse-transition>
          <el-card v-if="booleanShowProjectInfo" style="height: 99px" shadow="never">
            <div class="flex_row align_center">
              <div class="flex_1 flex_row align_center">
                <div class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">标注进度</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ `${project.num.marked}/${project.num.total}` }}
                    <el-tooltip class="item" effect="dark" content="已保存/总数" placement="top">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </div>
                </div>
                <div class="flex_1">
                  <el-progress :percentage="onGetPercentage(project)"></el-progress>
                </div>
                <el-divider direction="vertical"></el-divider>

                <div class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">项目名称</span>
                  <span class="h5"></span>
                  <span class="description_text_color description_text_size">{{ project.name }}</span>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">实体标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ project.markTypeName }}
                  </div>
                </div>
                <el-divider v-if="project.relationTypeName" direction="vertical"></el-divider>
                <div v-if="project.relationTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">关系标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ project.relationTypeName }}
                  </div>
                </div>
                <el-divider v-if="project.dialogueTypeName" direction="vertical"></el-divider>
                <div v-if="project.dialogueTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">对话标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ project.dialogueTypeName }}
                  </div>
                </div>
                <el-divider v-if="project.globalTypeName" direction="vertical"></el-divider>
                <div v-if="project.globalTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">全局标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ project.globalTypeName }}
                  </div>
                </div>
                <el-divider direction="vertical"></el-divider>
              </div>
              <div>
                <i class="el-icon-arrow-up" @click="onShowProjectInfo('0')"></i>
              </div>
            </div>
          </el-card>
        </el-collapse-transition>
        <el-collapse-transition>
          <el-card v-if="!booleanShowProjectInfo" class="projectInfo_less" shadow="never">
            <div class="flex_row align_center">
              <div class="flex_1 flex_row align_center">
                <div class="flex_1">
                  <el-progress :percentage="onGetPercentage(project)"></el-progress>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div>
                  <i class="el-icon-arrow-down" @click="onShowProjectInfo('1')"></i>
                </div>
              </div>
            </div>
          </el-card>
        </el-collapse-transition>
      </div>
    </div>
    <!--中间操作区-->
    <div v-if="project.name" class="main_container">
      <!--左侧标记区-->
      <div class="main_left_warp" v-bind:class="{ main_warp_bottom80: !booleanShowBaiduWord }">
        <!--实体标注-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.ENTITY">
          <el-card class="mark_card" shadow="never">
            <div slot="header" class="clearfix">
              <div style="height: 22px"></div>
              <div class="main-mark-toolbar">
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-start">
                  <div class="mark-tip">
                    <el-link type="success" v-if="data.status === DataType.FINISHED">已保存</el-link>
                    <el-link type="primary" v-else-if="data.status === DataType.MARKING">标注中......</el-link>
                    <el-link type="danger" v-if="data.wrong === 1">无效数据</el-link>
                  </div>
                </div>
                <el-button-group>
                  <el-button class="mark_page_button" icon="el-icon-arrow-left" :disabled="this.project.currectDataIndex === 0" @click="getLastData">上一条</el-button>

                  <el-button class="mark_page_button">
                    <el-popover trigger="hover" placement="bottom">
                      <div class="flex_col_allcenter">
                        <el-input size="mini" v-model="inputDataIndex" type="number" placeholder="请输入数字">
                          <el-button slot="append" icon="el-icon-search" @click="doChangeInputDataIndex"></el-button>
                        </el-input>
                        <div class="h5"></div>
                        <el-pagination
                          :current-page="project.currectDataIndex + 1"
                          :page-size="1"
                          small
                          layout="prev, pager, next"
                          :total="project.num.total"
                          @current-change="onCurrentPageChange"
                        ></el-pagination>
                      </div>
                      <span slot="reference">
                        <span class="w15"></span>
                        {{ project.currectDataIndex + 1 }} / {{ project.num.total }}
                        <i class="el-icon-caret-bottom"></i>
                      </span>
                    </el-popover>
                  </el-button>
                  <!---->

                  <el-button class="mark_page_button" :disabled="this.project.currectDataIndex === this.project.num.total - 1" @click="getNextData">
                    下一条
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </el-button-group>
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
                  <el-divider direction="vertical"></el-divider>
                  <el-checkbox :disabled="data.status === DataType.FINISHED" @change="onWrongCheckboxChange" v-model="data.wrong === 1">无效数据?</el-checkbox>
                  <el-divider direction="vertical"></el-divider>
                  <el-checkbox @change="onAutoFinishCheckboxChange" v-model="booleanAutoFinish">自动保存?</el-checkbox>
                  <div class="w10"></div>
                  <el-divider direction="vertical"></el-divider>
                  <el-button v-if="data.status === DataType.FINISHED" size="mini" type="warning" @click="onModifyButtonClick">修改</el-button>
                  <el-button v-if="data.status === DataType.MARKING" size="mini" type="success" @click="onFinishButtonClick">保存</el-button>
                </div>
              </div>
            </div>
            <div class="main_mark flex_1">
              <!--开启行内标注,默认换行分割符"\n"   -->
              <div class="mark_data" id="data_0" v-text="data.content" />
            </div>
          </el-card>
        </div>
        <!--关系标注-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.RELATION">
          <el-card class="relationMark_card" shadow="never">
            <div slot="header" class="clearfix">
              <div class="flex_row align_center">
                <div v-if="!selectedRelationType || !selectedRelationType.tag" class="flex_row relationMark_tips">
                  <el-alert effect="dark" title="请从右侧选择关系标签" type="error" :closable="false" show-icon></el-alert>
                </div>
                <div v-else-if="!booleanRelationMarkFinish" class="flex_row relationMark_tips">
                  <el-alert effect="dark" title="请点击第一个" type="info" :closable="false" show-icon></el-alert>
                </div>
                <div v-else class="flex_row relationMark_tips">
                  <el-alert effect="dark" title="请点击第一个" type="success" :closable="false" show-icon></el-alert>
                  <div class="w10"></div>
                  <el-alert effect="dark" title="请点击第二个" type="info" :closable="false" show-icon></el-alert>
                </div>
                <div class="w30"></div>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ selectedRelationType ? selectedRelationType.tag : '点击选择关系标签' }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="onRelationTypeClick(item)" v-for="(item, index) in projectRelationType.datas" :key="`projectRelationType_${index}`">
                      <el-tag :color="item.color" size="medium" effect="dark">
                        {{ item.tag }}
                      </el-tag>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="mark_relation_data">
              <span v-for="(item, index) in relationItems" :key="`relationItems_${index}`">
                <el-tag :color="item.data.color" v-if="item.type === 'mark'" effect="dark" @click="onRelationItemClick(item, index)" :id="`mark_index_${index}`" type="primary">
                  {{ item.content }}
                  <span style="font-size: 9px; letter-spacing: 0px">({{ item.data.name }})</span>
                </el-tag>
                <span v-else v-text="item.content" />
              </span>
            </div>
          </el-card>
        </div>
        <!-- 对话标注 -->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.DIALOGUE">
          <el-card class="dialogueMark_card" shadow="never">
            <div slot="header" class="clearfix">
              <div style="height: 22px"></div>
              <div class="main-mark-toolbar">
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-start">
                  <div class="mark-tip">
                    <el-link type="success" v-if="data.status === DataType.FINISHED">已保存</el-link>
                    <el-link type="primary" v-else-if="data.status === DataType.MARKING">标注中......</el-link>
                    <el-link type="danger" v-if="data.wrong === 1">无效数据</el-link>
                  </div>
                </div>
                <el-button-group>
                  <el-button class="mark_page_button" icon="el-icon-arrow-left" :disabled="this.project.currectDataIndex === 0" @click="getLastData">上一条</el-button>
                  <el-button class="mark_page_button">
                    <el-popover trigger="hover" placement="bottom">
                      <div class="flex_col_allcenter">
                        <el-input size="mini" v-model="inputDataIndex" type="number" placeholder="请输入数字">
                          <el-button slot="append" icon="el-icon-search" @click="doChangeInputDataIndex"></el-button>
                        </el-input>
                        <div class="h5"></div>
                        <el-pagination
                          :current-page="project.currectDataIndex + 1"
                          :page-size="1"
                          small
                          layout="prev, pager, next"
                          :total="project.num.total"
                          @current-change="onCurrentPageChange"
                        ></el-pagination>
                      </div>
                      <span slot="reference">
                        <span class="w15"></span>
                        {{ project.currectDataIndex + 1 }} / {{ project.num.total }}
                        <i class="el-icon-caret-bottom"></i>
                      </span>
                    </el-popover>
                  </el-button>
                  <el-button class="mark_page_button" :disabled="this.project.currectDataIndex === this.project.num.total - 1" @click="getNextData">
                    下一条
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </el-button-group>
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
                  <el-divider direction="vertical"></el-divider>
                  <el-checkbox :disabled="data.status === DataType.FINISHED" @change="onWrongCheckboxChange" v-model="data.wrong === 1">无效数据?</el-checkbox>
                  <el-divider direction="vertical"></el-divider>
                  <el-checkbox @change="onAutoFinishCheckboxChange" v-model="booleanAutoFinish">自动保存?</el-checkbox>
                  <div class="w10"></div>
                  <el-divider direction="vertical"></el-divider>
                  <el-button v-if="data.status === DataType.FINISHED" size="mini" type="warning" @click="onModifyButtonClick">修改</el-button>
                  <el-button v-if="data.status === DataType.MARKING" size="mini" type="success" @click="onFinishButtonClick">保存</el-button>
                </div>
              </div>
            </div>
            <div class="mark_relation_data">
              <div v-if="data.dialogue && data.dialogue.datas.length">
                <div v-for="(item, item_index) in data.dialogue.datas" :key="item_index">
                  <el-row :gutter="18">
                    <el-col :span="18">{{ `${item_index + 1}.${item.content}` }}</el-col>
                    <el-col :span="6">
                      <div class="flex_col_allcenter">
                        <el-dropdown :disabled="data.status !== DataType.MARKING" @command="handleDialogueItemTagAdd">
                          <el-button type="primary">
                            下拉选择
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, dropdown_index) in projectDialogueType.datas" :key="dropdown_index" :command="`${item.tag}__${item_index}`">
                              {{ `${item.name} - ${item.tag}` }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <div>
                          <el-tag
                            :closable="data.status === DataType.MARKING"
                            v-for="(tag, tag_index) in item.tags"
                            :key="tag_index"
                            :disable-transitions="false"
                            @close="handleDialogueItemTagClose(tag, tag_index, item_index)"
                          >
                            {{ tag }}
                          </el-tag>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                </div>
              </div>
              <div v-else>
                <el-empty description="分割异常,请检查后重试!">
                  <span style="font-size: 10px; color: #999999">{{ data.content }}</span>
                </el-empty>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <!--右侧操作区-->
      <div class="main_right_warp flex_col" v-bind:class="{ main_warp_bottom80: !booleanShowBaiduWord }">
        <!--实体标注状态下-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.ENTITY">
          <!--全局标签选择-->
          <el-card v-if="project.globalTypeName" style="height: 122px" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-s-order"></i>
                全局标签
              </span>
            </div>
            <el-radio-group :disabled="data.status !== DataType.MARKING" v-model="data.globalTypeId" @change="onGlobalTypeChange">
              <el-radio v-for="(item, index) in projectGlobalType.datas" :key="`projectGlobalType_${index}`" :label="item.tag">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-card>
          <div v-if="project.globalTypeName" class="h10"></div>
          <!--开启对话标注-->
          <el-card v-if="project.relationTypeName" style="height: 60px" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-chat-line-round"></i>
                对话标注
              </span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="onStartDialogueMarkClick">开始标注</el-button>
            </div>
          </el-card>
          <div v-if="project.relationTypeName" class="h10"></div>
          <!--开启关系标注-->
          <el-card v-if="project.relationTypeName" style="height: 60px" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-s-help"></i>
                关系标注
              </span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="onStartRelationMarkClick">开始标注</el-button>
            </div>
          </el-card>
          <div v-if="project.relationTypeName" class="h10"></div>
          <!--实体标注数据-->
          <el-card class="entityMarkItems" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-s-flag"></i>
                实体标注
              </span>
              <el-button :disabled="data.status === DataType.FINISHED" style="float: right; padding: 3px 0" type="text" @click="onCloseAllTagClick">清空</el-button>
            </div>

            <el-collapse v-model="entityActiveNames">
              <el-collapse-item v-for="item in entityTags" :key="item.id" :title="item.text" :name="item.id">
                <div class="selectedEntitys">
                  <div v-for="(tag, index) in item.tags" :key="index" style="margin-bottom: 10px">
                    <el-tag :color="tag.color" effect="dark" :closable="data.status === DataType.MARKING" @close="onCloseTagClick(tag)">
                      {{ tag.content.length > 20 ? tag.content.substr(0, 20) + '...' : tag.content }}
                    </el-tag>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
        <!--关系标注状态下-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.RELATION">
          <el-card class="relationMarkItems" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-s-help"></i>
                关系标注
              </span>
              <el-button style="float: right; padding: 3px 0; color: #f56c6c" type="text" @click="onEndRelationMarkClick">结束标注</el-button>
            </div>

            <el-collapse v-model="relationActiveNames">
              <el-collapse-item v-for="item in relationTags" :key="item.id" :title="item.text" :name="item.id">
                <el-row :gutter="10">
                  <el-col style="margin-bottom: 10px" :span="24" v-for="(tag, index) in item.tags" :key="index">
                    <el-tag
                      @click.prevent="onChangeLineStatusClick(tag)"
                      size="medium"
                      effect="dark"
                      closable
                      :disable-transitions="false"
                      @close="removeRelationMarkItem(tag)"
                      :color="tag.show ? tag.selectedRelationType.color : '#999999'"
                    >
                      {{ `${tag.start.content} - ${tag.selectedRelationType.tag} - ${tag.end.content}` }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
        <!--对话标注状态下-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.DIALOGUE">
          <el-card class="relationMarkItems" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-chat-line-round"></i>
                对话标注
              </span>
              <el-button style="float: right; padding: 3px 0; color: #f56c6c" type="text" @click="onEndDialogueMarkClick">结束标注</el-button>
            </div>
            <div class="dialogue_setting">
              <h3>对话分割符配置</h3>
              <div style="font-size: 14px; color: #666666; margin-bottom: 5px">* 将文本分割成数组,再分别标注</div>
              <el-form :inline="true">
                <el-form-item label="分割符:">
                  <el-input size="small" placeholder="请填写用于切分对话的分割符" v-model="dialogueRegExp" />
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="data.status !== DataType.MARKING" type="danger" size="small" @click="onSeparatorChangeClick">修改</el-button>
                </el-form-item>
              </el-form>
              <SeparatorTestComponent :separator="dialogueRegExp"></SeparatorTestComponent>
            </div>
          </el-card>
        </div>
      </div>

      <!--  底部区域,句法分析-->
      <el-card class="main_bottom_warp" v-bind:class="booleanShowBaiduWord ? '' : 'main_bottom_warp_height60'" shadow="never" v-loading="isGettingBaiduWords">
        <div class="flex_row height_100 width_100">
          <div class="baidu_word_items flex_1">
            <div class="baidu_word_header flex_row align_center">
              <div class="main_text_color flex_row align_center">
                分词词性
                <span class="w10"></span>
                <el-switch :disabled="currectWorkingType !== WorkingType.ENTITY" :loading="isGettingBaiduWords" v-model="booleanShowBaiduWord" @change="onIsNeedBaiduWordChange"></el-switch>
              </div>
              <div class="flex_1"></div>
              <div>
                <el-popover placement="top" width="320" v-model="visibleBaiduWordConfig">
                  <p>请从百度官网上找到相关参数进行配置</p>
                  <div>
                    <div>
                      APP_ID
                      <el-input v-model="inputAPP_ID" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="h5"></div>
                    <div>
                      API_KEY
                      <el-input v-model="inputAPI_KEY" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="h5"></div>
                    <div>
                      SECRET_KEY
                      <el-input v-model="inputSECRET_KEY" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class="h20"></div>
                  <div style="display: flex; align-items: center; margin: 0">
                    <el-button size="mini" type="warning" @click="onBaiduWordRestoreConfigClick">还原默认</el-button>
                    <div class="flex_1"></div>
                    <el-button size="mini" type="text" @click="visibleBaiduWordConfig = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="onBaiduWordConfigClick">确定</el-button>
                  </div>
                  <el-button size="mini" slot="reference" :type="isBaiduWordInit ? '' : 'danger'">SDK配置</el-button>
                </el-popover>
              </div>
            </div>
            <el-collapse-transition>
              <div v-if="booleanShowBaiduWord">
                <div v-if="isBaiduWordInit" style="height: 230px; overflow: auto; padding-top: 10px">
                  <div class="flex_row" style="flex-wrap: wrap; justify-content: flex-start">
                    <div v-for="(item, index) in baiduWordItems" :key="index" style="margin-left: 10px; margin-bottom: 10px">
                      <el-popover :offset="-10" placement="top" width="300" trigger="hover" @show="onSelectBaiduWord(item, index)">
                        <el-table stripe :data="projectMarkType.datas">
                          <el-table-column width="100" property="name" label="名称"></el-table-column>
                          <el-table-column width="100" property="tag" label="标签"></el-table-column>
                          <el-table-column width="100" label="操作">
                            <template slot-scope="scope">
                              <el-button size="mini" @click="onMarkSelectedBaiduWord(item, scope.row)" type="primary">标注</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <el-button slot="reference" plain :type="item.highlighted ? 'primary' : ''" @click="onSelectBaiduWord(item, index)">
                          <div class="normal_text_size">{{ item.item }}</div>
                          <div class="h5"></div>
                          <div class="description_text_size" v-bind:class="item.highlighted ? '' : 'description_text_color'">
                            {{ item.ne || item.pos }}
                          </div>
                        </el-button>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div v-else class="flex_col_allcenter width_100 height_100">
                  <div>请先配置百度分词相关KEY</div>
                  <div class="h10"></div>
                  <el-link>https://cloud.baidu.com/doc/NLP/s/ak3pmn40n</el-link>
                  <div class="h10"></div>
                  <el-button :type="isBaiduWordInit ? '' : 'danger'">SDK配置</el-button>
                </div>
              </div>
            </el-collapse-transition>
          </div>
          <div style="width: 1px; height: 300px; background-color: #eeeeee"></div>
          <el-collapse-transition>
            <div v-if="booleanShowBaiduWord" class="baidu_word_option">
              <div class="flex_row align_center" style="height: 39px; padding: 10px 20px; border-bottom: 1px solid #dcdfe6">
                <div class="main_text_color">词性详情</div>
              </div>
              <div style="height: 230px; overflow: auto">
                <div style="padding: 20px 20px; text-align: left">
                  <div class="flex_row align_center">
                    <span>词汇 :</span>
                    <span class="w10"></span>
                    <el-link type="primary">{{ selectedBaiduWord.item }}</el-link>
                  </div>
                  <div class="h10"></div>
                  <div class="flex_row align_center">
                    <span>词性 :</span>
                    <span class="w10"></span>
                    <el-link type="info">{{ selectedBaiduWord.pos }}{{ doFilterBaiduWord(selectedBaiduWord.pos) }}</el-link>
                  </div>
                  <div class="h10"></div>
                  <div class="flex_row align_center">
                    <span>实体识别 :</span>
                    <span class="w10"></span>
                    <el-link type="success">{{ selectedBaiduWord.ne }}{{ doFilterBaiduWord(selectedBaiduWord.ne) }}</el-link>
                  </div>
                </div>
                <div class="separate_line"></div>

                <div class="main_text_color" style="padding: 10px 20px; text-align: left">
                  <div class="flex_row align_center">
                    <div>高亮所有名词/实体</div>
                    <div class="w10"></div>
                    <el-switch @change="onHighlightAllNChange" v-model="highlightAllN"></el-switch>
                  </div>
                  <div class="h10"></div>

                  <div>
                    选择高亮词性:
                    <el-select @change="onBaiduWordTypeSelectChange" v-model="baiduWordTypeOptionValue" placeholder="请选择">
                      <el-option-group v-for="group in baiduWordTypeOptions" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-option-group>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </el-card>
    </div>
    <el-empty v-else>
      <el-button type="primary" @click="openProjectView">打开项目工程</el-button>
    </el-empty>
  </div>
</template>

<script>
//import EasyMarker from '../libs/easy-marker';
import EasyMarker from '../libs/easy-marker.esm';
import db_utils from '../libs/db_utils';
import LeaderLine from 'leader-line-new';
import SeparatorTestComponent from '../components/SeparatorTestComponent';

export default {
  name: 'Dashboard',
  components: { SeparatorTestComponent },
  data() {
    return {
      em: null, // 标注插件
      //=========================== 本地数据库 ===========================
      inputDataIndex: 1, //用户手动跳转索引
      booleanAutoFinish: true, //是否自动保存
      isDbIniting: true, //数据库是否通知初始化完毕
      // 当前项目信息,从数据库中加载
      project: {
        name: '',
        dataFilePath: '',
        num: {
          total: 0,
          marked: 0,
        },
        markTypeId: '',
        markTypeName: '',
        globalTypeId: '',
        globalTypeName: '',
        relationTypeId: '',
        relationTypeName: '',
        dialogueTypeId: '',
        dialogueTypeName: '',
        description: '',
      },
      // 当前文本信息,从数据库中加载
      data: {
        project_id: -1,
        index: 1,
        content: '',
        wrong: 0,
        status: 0,
        tags: [],
        relations: [],
        dialogue: {
          separator: '',
          datas: [],
        },
        globalTypeId: '',
      },
      DataType: {
        MARKING: 0, //标注中,未结束
        FINISHED: 1, //已结束/保存
      },
      // 项目所用的一种实体标注标签组,从数据库中加载
      projectMarkType: Object.freeze({ datas: [] }),
      // 项目所用的一种全局标签标签组,从数据库中加载
      projectGlobalType: Object.freeze({ datas: [] }),
      // 项目所用的一种关系标注标签组,从数据库中加载
      projectRelationType: Object.freeze({ datas: [] }),
      // 项目所用的一种对话标注标签组,从数据库中加载
      projectDialogueType: Object.freeze({ datas: [] }),
      //
      currectWorkingType: 0, // 工作模式 0:实体标注 1:关系标注 2:对话标注
      WorkingType: {
        ENTITY: 0, //实体标注
        RELATION: 1, //关系标注
        DIALOGUE: 2, //对话标注
      },
      //=========================== 对话标注 ===========================
      dialogueRegExp: '', //用户输入的分隔符正则
      //=========================== 实体标注 ===========================
      entityActiveNames: [],
      relationActiveNames: [],
      //=========================== 关系标注 ===========================
      selectedRelationType: null, //下拉选中的关系标注
      selectedMenuItemId: 0, //当前标注框选中的索引
      relationLines: [], //Lines实例列表，用于统一销毁
      relationItems: [], //处理后的关系标注数据
      booleanRelationMarkFinish: false, //标识是否标记关系完成，需要成对标记
      tmpSelectedRelationItem: null, //第一次选择的标注，缓存一下
      //=========================== 百度分词 ===========================
      booleanShowBaiduWord: false,
      isBaiduWordInit: false,
      inputAPP_ID: '',
      inputAPI_KEY: '',
      inputSECRET_KEY: '',
      visibleBaiduWordConfig: false,
      APP_ID: '11657400',
      API_KEY: 'wfWeTDO9XmjUKHfs2r3vhv7b',
      SECRET_KEY: '37AIYZr6Gg8NvDPMou6teYWvz5ZLEFic',
      isGettingBaiduWords: false,
      canSearchBaiduWord: false,
      isSearchBaiduWord: false,
      baiduWordTypes: Object.freeze([
        ['n', '普通名词'],
        ['f', '方位名词'],
        ['s', '处所名词'],
        ['t', '时间名词'],
        ['nr', '人名'],
        ['ns', '地名'],
        ['nt', '机构团体名'],
        ['nw', '作品名'],
        ['nz', '其他专名'],
        ['v', '普通动词'],
        ['vd', '动副词'],
        ['vn', '名动词'],
        ['a', '形容词'],
        ['ad', '副形词'],
        ['an', '名形词'],
        ['d', '副词'],
        ['m', '数量词'],
        ['q', '量词'],
        ['r', '代词'],
        ['p', '介词'],
        ['c', '连词'],
        ['u', '助词'],
        ['xc', '其他虚词'],
        ['w', '标点符号'],
        ['PER', '人名'],
        ['LOC', '地名'],
        ['ORG', '机构名'],
        ['TIME', '时间'],
      ]),
      baiduWordTypesMap: null,
      baiduWordItems: [],
      selectedWordIndexArray: [],
      selectedBaiduWord: {},
      baiduWordTypeOptions: Object.freeze([
        {
          label: '词性',
          options: [
            { value: 'n', label: 'n / 普通名词' },
            { value: 'f', label: 'f / 方位名词' },
            { value: 's', label: 's / 处所名词' },
            { value: 't', label: 't / 时间名词' },
            { value: 'nr', label: 'nr / 人名' },
            { value: 'ns', label: 'ns / 地名' },
            { value: 'nt', label: 'nt / 机构团体名' },
            { value: 'nw', label: 'nw / 作品名' },
            { value: 'nz', label: 'nz / 其他专名' },
            { value: 'v', label: 'v / 普通动词' },
            { value: 'vd', label: 'vd / 动副词' },
            { value: 'vn', label: 'vn / 名动词' },
            { value: 'a', label: 'a / 形容词' },
            { value: 'ad', label: 'ad / 副形词' },
            { value: 'an', label: 'an / 名形词' },
            { value: 'd', label: 'd / 副词' },
            { value: 'm', label: 'm / 数量词' },
            { value: 'q', label: 'q / 量词' },
            { value: 'r', label: 'r / 代词' },
            { value: 'p', label: 'p / 介词' },
            { value: 'c', label: 'c / 连词' },
            { value: 'u', label: 'u / 助词' },
            { value: 'xc', label: 'xc / 其他虚词' },
            { value: 'w', label: 'w / 标点符号' },
          ],
        },
        {
          label: '实体',
          options: [
            {
              value: 'PER',
              label: 'PER / 人名',
            },
            {
              value: 'LOC',
              label: 'LOC / 地名',
            },
            {
              value: 'ORG',
              label: 'ORG / 机构名',
            },
            {
              value: 'TIME',
              label: 'TIME / 时间',
            },
          ],
        },
      ]),
      baiduWordTypeOptionValue: '',
      highlightAllN: false,
      //=========================== 全局变量 ===========================
      //是否显示更多项目信息
      booleanShowProjectInfo: false,
      //是否鼠标选中结束,此时可以用快捷键标注
      isMouseSelectFinished: false,
      //是否百度选中结束,此时可以用快捷键标注
      isBaiduWordSelectFinished: false,
    };
  },
  computed: {
    entityTags() {
      let entityTags = [];
      this.entityActiveNames = [];
      this.projectMarkType.datas.forEach((data, index) => {
        entityTags.push({
          id: index + 1,
          text: data.tag,
          tags: [],
        });
        this.entityActiveNames.push(index + 1);
      });
      this.data.tags.forEach((data) => {
        entityTags.forEach((entityTag) => {
          if (data.tag === entityTag.text) {
            entityTag.tags.push(data);
          }
        });
      });
      return entityTags;
    },
    relationTags() {
      let relationTags = [];
      this.relationActiveNames = [];
      this.projectRelationType.datas.forEach((data, index) => {
        relationTags.push({
          id: index + 1,
          text: data.tag,
          tags: [],
        });
        this.relationActiveNames.push(index + 1);
      });

      if (this.data.relations) {
        this.data.relations.forEach((data) => {
          relationTags.forEach((relationTag) => {
            if (data.selectedRelationType.tag === relationTag.text) {
              relationTag.tags.push(data);
            }
          });
        });
      }

      return relationTags;
    },
  },
  watch: {
    relationItems() {
      this.$nextTick(() => {
        //等待渲染完毕
        for (const relation of this.data.relations) {
          this.doAddRelationLine(`mark_index_${relation.start.index}`, `mark_index_${relation.end.index}`, relation.selectedRelationType);
          if (relation.show) {
            this.doShowRelationLine(this.relationLines.length - 1);
          }
        }
      });
    },
  },
  mounted() {
    console.log('Dashboard mounted');

    this.initEvent();
    this.initView();
    this.initData();
  },

  destroyed() {
    this.doDeleteAllRelationLines();
  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // 数据库初始化完毕,一般在mounted后
      this.$events.on('DB_INIT_FINISH', (text) => {
        this.isDbIniting = true;
        this.initData();
      });
      // 按键事件监听
      document.onkeydown = (e) => {
        //事件对象兼容
        let evn = e || event || window.event;
        let key = evn.keyCode || evn.which || evn.charCode;
        //console.log(evn);
        //console.log(key);
        // 当前处于实体标注情况
        if (this.currectWorkingType === this.WorkingType.ENTITY) {
          // 48:0,49:1...57:9
          //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
          if ((evn.ctrlKey || evn.metaKey) && (key === 37 || key === 38)) {
            // 按下方向左/上键
            //this.decrease()
            this.getLastData(e);
          } else if ((evn.ctrlKey || evn.metaKey) && (key === 39 || key === 40)) {
            //按下方向右/下键
            this.getNextData(e);
            //this.increase()
          } else if ((evn.ctrlKey || evn.metaKey) && key === 13) {
            // 按下回车
            this.onFinishButtonClick(e);
            //do something
          } else if ((evn.ctrlKey || evn.metaKey) && key === 90) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下CTRL+Z撤销键
            //删除最后一个标注
            if (this.data.tags.length > 0) {
              const tag = this.data.tags[this.data.tags.length - 1];
              this.onCloseTagClick(tag);
            }
          } else if ((evn.ctrlKey || evn.metaKey) && key === 49) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字1
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 50) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字2
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 51) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字3
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 52) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字4
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 53) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字5
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 54) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字6
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 55) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字7
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 56) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字8
            const index = key - 49;
            this.doNumKeyEvent(index);
          } else if ((evn.ctrlKey || evn.metaKey) && key === 57) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return;
            }
            // 按下数字9
            const index = key - 49;
            this.doNumKeyEvent(index);
          }
        }
      };
    },
    initView() {
      if (this.em) {
        this.em.destroy();
        this.em = null;
      }
      //new LeaderLine(document.getElementById('start'), document.getElementById('end'));
    },
    initData() {
      // 百度分词配置
      this.baiduWordTypesMap = new Map(this.baiduWordTypes);
      this.booleanShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1';
      this.booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1';
      this.APP_ID = localStorage.getItem('APP_ID') || this.APP_ID;
      this.API_KEY = localStorage.getItem('API_KEY') || this.API_KEY;
      this.SECRET_KEY = localStorage.getItem('SECRET_KEY') || this.SECRET_KEY;
      if (this.APP_ID && this.API_KEY && this.SECRET_KEY) {
        this.isBaiduWordInit = true;
      }
      // 从数据库读取项目信息,项目数据信息,项目标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, { working: true }, (err, document) => {
        if (document) {
          this.project = document;
          this.doLoadDataByIndex(this.project.currectDataIndex);
        }
      });
    },
    // ────────────────────────── 页面操作 ──────────────────────────
    // 打开项目工程页面
    openProjectView() {
      this.$events.emit('PROJECT_VIEW', '');
    },
    // 通过索引加载文本数据
    doLoadDataByIndex(index) {
      if (this.project && this.project._id) {
        this.getCurrectProjectDataByIndex(this.project._id, index);
        // 保存索引记录
        db_utils.update(db_utils.PROJECTS_DB, { _id: this.project._id }, this.project);
      } else {
        this.$message.error('数据错误');
      }
    },
    // 从数据库读取文本信息数据
    getCurrectProjectDataByIndex(_id, _index) {
      db_utils.findOne(db_utils.DATAS_DB, { project_id: _id, index: _index }, (err, document) => {
        this.data = document;
        // 是否需要加载了实体标注标签组
        if (this.project.markTypeName) {
          db_utils.findOne(db_utils.MARK_TYPES_DB, { _id: this.project.markTypeId }, (err, document) => {
            if (document) {
              this.projectMarkType = Object.freeze(document);
              // 生成EasyMarker menuItems
              let menuItems = [];
              this.projectMarkType.datas.forEach((data, index) => {
                menuItems.push({
                  id: index + 1,
                  text: data.tag,
                  type: 'select',
                  style: {
                    width: 'auto',
                    color: '#FFFFFF',
                    background: data.color,
                    boxSizing: 'border-box',
                    borderTopLeftRadius: index === 0 ? '4px' : '0px',
                    borderBottomLeftRadius: index === 0 ? '4px' : '0px',
                    borderTopRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                    borderBottomRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                    borderLeft: '#DCDFE6 1px solid',
                    borderRight: '#DCDFE6 1px solid',
                    fontSize: '1.0rem',
                    fontWeight: 'bold',
                    padding: '0.9rem 1.8rem',
                  },
                  //iconName:'iconfont icon-heartxin'
                });
              });

              // 配置显示菜单
              this.newEasyMarker(menuItems);
              this.doHighlightEasyMarkerMarkedDatas();
              if (this.booleanShowBaiduWord) {
                this.getBaiduWords(this.data.content);
              }
            }
          });
        }
        // 是否需要加载了关系标注标签组
        if (this.project.relationTypeName) {
          db_utils.findOne(db_utils.RELATION_TYPES_DB, { _id: this.project.relationTypeId }, (err, document) => {
            this.projectRelationType = Object.freeze(document);
          });
        }
        // 是否需要加载了全局标签组
        if (this.project.globalTypeName) {
          db_utils.findOne(db_utils.GLOBAL_TYPES_DB, { _id: this.project.globalTypeId }, (err, document) => {
            this.projectGlobalType = Object.freeze(document);
          });
        }
        // 是否需要加载了对话标签组
        if (this.project.dialogueTypeName) {
          db_utils.findOne(db_utils.DIALOGUE_TYPES_DB, { _id: this.project.dialogueTypeId }, (err, document) => {
            this.projectDialogueType = Object.freeze(document);
            this.dialogueRegExp = this.data.dialogue ? this.data.dialogue.separator : this.projectDialogueType.separator;
            // 判断是否对话标注模式,生成对话标注数据
            if (this.currectWorkingType === this.WorkingType.DIALOGUE) {
              this.onStartDialogueMarkClick();
            }
          });
        }
      });
    },
    // 更新当前数据信息
    doUpdateCurrectData() {
      db_utils.update(db_utils.DATAS_DB, { project_id: this.project._id, index: this.project.currectDataIndex }, this.data);
    },
    // 用户手动输入页码索引
    doChangeInputDataIndex() {
      if (this.inputDataIndex > 0 && this.inputDataIndex <= this.project.num.total) {
        this.project.currectDataIndex = this.inputDataIndex - 1;
        this.doLoadDataByIndex(this.project.currectDataIndex);
      } else {
        this.$message.error('错误位置');
      }
    },
    // 上一条
    getLastData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === 0) {
        //防止点击两次
        return;
      }
      this.project.currectDataIndex = this.project.currectDataIndex - 1;
      this.doLoadDataByIndex(this.project.currectDataIndex);
    },
    // 下一条
    getNextData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === this.project.num.total - 1) {
        //防止点击两次
        return;
      }

      // 判断是否需要自动保存
      if (this.booleanAutoFinish) {
        this.onFinishButtonClick({ isTrusted: true });
        // 读取数据
        this.project.currectDataIndex = this.project.currectDataIndex + 1;
        this.doLoadDataByIndex(this.project.currectDataIndex);
      } else {
        // 提示是否需要自动保存
        // 判断是否有标记
        if (this.data.tags.length > 0) {
          // 弹出对话框
          this.$confirm('是否保存本次操作,并打开自动保存?\n(下次不再弹出)', '操作提示', {
            confirmButtonText: '确定并自动保存',
            cancelButtonText: '取 消',
            type: 'warning',
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '设置成功!',
              });
              // 自动保存
              this.onFinishButtonClick({ isTrusted: true });
              // 状态保存到本地
              this.booleanAutoFinish = true;
              localStorage.setItem('booleanAutoFinish', this.booleanAutoFinish ? '1' : '0');
              // 读取数据
              this.project.currectDataIndex = this.project.currectDataIndex + 1;
              this.doLoadDataByIndex(this.project.currectDataIndex);
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消保存!',
              });
              // 读取数据
              this.project.currectDataIndex = this.project.currectDataIndex + 1;
              this.doLoadDataByIndex(this.project.currectDataIndex);
            });
        } else {
          // 读取数据
          this.project.currectDataIndex = this.project.currectDataIndex + 1;
          this.doLoadDataByIndex(this.project.currectDataIndex);
        }
      }
    },

    // 下拉选择某一条
    onCurrentPageChange(index) {
      this.project.currectDataIndex = index - 1;
      this.doLoadDataByIndex(this.project.currectDataIndex);
    },
    // 点击修改按钮
    onModifyButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      this.data.status = this.DataType.MARKING;
      this.doUpdateCurrectData();
      this.project.num.marked = parseInt(this.project.num.marked) - 1;
      db_utils.update_set(db_utils.PROJECTS_DB, { working: true }, { $set: { num: { total: this.project.num.total, marked: this.project.num.marked } } });
      this.em.enable();
    },
    // 点击保存按钮,修改数据库状态和工程记录
    onFinishButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === this.DataType.MARKING) {
        this.data.status = this.DataType.FINISHED;
        this.doUpdateCurrectData();
        this.project.num.marked = parseInt(this.project.num.marked) + 1;

        db_utils.update_set(db_utils.PROJECTS_DB, { working: true }, { $set: { num: { total: this.project.num.total, marked: this.project.num.marked } } });
        this.em.disable();
      }
    },
    // 是否标记为无效数据
    onWrongCheckboxChange(_status, event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      // 当前状态是标注中,才修改两个数据库
      this.data.wrong = _status ? 1 : 0;
      this.doUpdateCurrectData();
    },
    // 是否标记为自动保存
    onAutoFinishCheckboxChange(_status, event) {
      if (!event.isTrusted) {
        //防止点击两次
        return;
      }
      // 当前状态是标注中,才修改两个数据库
      this.booleanAutoFinish = _status;
      localStorage.setItem('booleanAutoFinish', this.booleanAutoFinish ? '1' : '0');
    },
    // 是否显示顶部项目信息
    onShowProjectInfo(value) {
      this.booleanShowProjectInfo = value === '1';
    },
    // 分割对话,重置属性
    doDialogueSeparator() {
      console.log(this.dialogueRegExp);
      // 分割文本成数组
      // datas : [content:'',tags:{}]
      this.$set(this.data, 'dialogue', {
        separator: this.dialogueRegExp,
        datas: this.data.content.split(RegExp(this.dialogueRegExp)).map((value) => {
          return {
            content: value,
            tags: [],
          };
        }),
      });
      this.doUpdateCurrectData();
    },

    // ────────────────────────── EasyMarker ──────────────────────────
    newEasyMarker(menuItems) {
      if (this.em) {
        this.em.destroy();
        this.em = null;
      }
      this.em = new EasyMarker({
        menuTopOffset: '10px',
        mask: {
          margin: '5px',
          color: '#DCDFE6',
        },
        highlight: {
          margin: '5px',
          opacity: 0.5,
          //color: '#F2F1D7',//米白色 **
          //color: '#E8E8FF',//淡蓝色 *
          //color: '#D7FFF0',//淡绿色 **
          //color: '#F0DAD2',//淡红紫色 ***
          color: '#5EABFC', //淡红紫色
          tagBackground: 'transparent',
          tagColor: '#909399',
        },
        menuStyle: {
          menu: {
            borderRadius: '4px',
            padding: '0',
            backgroundColor: '#409EFF',
          },
          triangle: {
            borderTop: '0.4rem solid #409EFF',
            borderRight: '0.4rem solid transparent',
            borderLeft: '0.4rem solid transparent',
          },
        },
        menuItems: menuItems,
      });
      this.em.create(document.querySelector('.main_mark'), document.querySelector('.main_mark'), {
        excludeElements: document.querySelectorAll('.excludeElements'),
      });
      this.doEasyMarkerEvent();
      // 判断是否需要禁止编辑
      if (this.data.status === this.DataType.FINISHED) {
        this.em.disable();
      } else if (this.data.status === this.DataType.MARKING) {
        this.em.enable();
      } else {
        this.em.enable();
      }
    },
    // 设置EasyMarker事件
    doEasyMarkerEvent() {
      // 菜单点击行为
      this.em.onMenuClick((item_id, node_info) => {
        this.selectedMenuItemId = item_id;
        //this.doChangeMenuItemBackgroud();
        console.log(item_id);
        const _tag = this.projectMarkType.datas[item_id - 1];
        // 添加到数据库
        this.doAddMarkData(_tag, this.em.getSelectText(), node_info.anchorOffset, node_info.focusOffset);
      });
      // 点击高亮的文本,此处应该加个删除处理
      this.em.onHighlightLineClick((_id, _meta, _selection) => {
        this.em.cancelHighlightLine(_id);
        // 删除标记数据
        this.doRemoveMarkData(_id);
      });
      // onSelectStatusChange
      this.em.onSelectStatusChange((val) => {
        this.isMouseSelectFinished = val === 'finish';
      });
    },
    // 高亮标注了的数据
    doHighlightEasyMarkerMarkedDatas() {
      if (this.em && this.data.tags.length > 0) {
        //
        // { name: '人名', tag: 'Person', content: '李明', start: 27, end: 29 }
        let highlightOptions = [];
        this.data.tags.forEach((data) => {
          highlightOptions.push({
            id: data.line_id,
            meta: { type: 'highlight', tag: data.tag, fillColor: data.color || '' },
            selection: {
              anchorNode: document.getElementById('data_0').firstChild,
              anchorOffset: data.start,
              focusNode: document.getElementById('data_0').firstChild,
              focusOffset: data.end,
            },
          });
        });
        this.em.highlightLines(highlightOptions);
      }
    },
    /* // 修改菜单背景,当前选中菜单背景加深
    doChangeMenuItemBackgroud() {
      const list = this.em.menu.menuElement.children;
      for (let i = 0; i < list.length; i++) {
        list[i].style.background = this.doFilterEasyMarkerMenuItemBackgroud(i + 1);
      }
    },
    // 判断背景颜色
    doFilterEasyMarkerMenuItemBackgroud(_id) {
      //return this.selectedMenuItemId === _id ? '#2A93FE' : '#4EA4FF';
      return this.selectedMenuItemId === _id ? 'linear-gradient(rgba(0,0,0,0.9) 0%,rgba(33,33,33,1)) 100%' : 'linear-gradient(rgba(42,42,42,0.9) 0%,rgba(36,36,36,1)) 100%';
    },*/
    // ────────────────────────── 百度分词词性 ──────────────────────────
    getBaiduWords(text) {
      if (this.data.status === this.DataType.MARKING) {
        // 是否初始化成功
        if (!this.isBaiduWordInit) {
          return;
        }
        this.baiduWordItems = [];

        // 设置APPID/AK/SK
        const APP_ID = this.APP_ID;
        const API_KEY = this.API_KEY;
        const SECRET_KEY = this.SECRET_KEY;

        this.isGettingBaiduWords = true;
        const AipNlpClient = require('baidu-aip-sdk').nlp;

        // 新建一个对象，建议只保存一个对象调用服务接口
        const client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);
        // 调用词法分析
        client
          .lexer(text, {})
          .then((result) => {
            this.baiduWordItems = result.items;
            this.isGettingBaiduWords = false;
          })
          .catch((err) => {
            // 如果发生网络错误
            console.log(err);
            this.baiduWordItems = [];
            this.isGettingBaiduWords = false;
          });
      }
    },
    // 获取词性/实体对应的中文
    doFilterBaiduWord(value) {
      if (!value) return '';
      value = value.toString();
      return ' / ' + this.baiduWordTypesMap.get(value);
    },
    // 选中一个词
    onSelectBaiduWord(word, index) {
      if (word.selected) {
        return;
      } else {
        // 将之前的高亮去掉
        this.selectedWordIndexArray.forEach((_index) => {
          this.$set(this.baiduWordItems[_index], 'selected', false);
        });
        // 高亮当前的
        this.selectedWordIndexArray.push(index);
        this.$set(this.baiduWordItems[index], 'selected', true);
      }
      this.selectedBaiduWord = word;
      this.isBaiduWordSelectFinished = true;
    },
    // 选择词性/实体 value 选中的key
    onBaiduWordTypeSelectChange(value) {
      // 将之前的高亮去掉
      this.selectedWordIndexArray.forEach((index) => {
        this.$set(this.baiduWordItems[index], 'highlighted', false);
      });
      this.baiduWordItems.forEach((item, index) => {
        if (item.pos === value || item.ne === value) {
          this.selectedWordIndexArray.push(index);
          this.$set(this.baiduWordItems[index], 'highlighted', true);
        }
      });
    },
    // 高亮所有名词和实体
    onHighlightAllNChange() {
      if (this.highlightAllN) {
        this.baiduWordItems.forEach((item, index) => {
          if (item.pos.substr(0, 1) === 'n' || item.ne.length > 0) {
            this.selectedWordIndexArray.push(index);
            this.$set(this.baiduWordItems[index], 'highlighted', true);
          }
        });
      } else {
        // 将之前的高亮去掉
        this.selectedWordIndexArray.forEach((index) => {
          this.$set(this.baiduWordItems[index], 'highlighted', false);
        });
      }
    },
    // 标注选择的类型
    onMarkSelectedBaiduWord(item, _tag) {
      let fixed_offset = 0;
      for (let i = 0; i < this.baiduWordItems.length; i++) {
        const data = this.baiduWordItems[i];
        if (data.byte_offset == item.byte_offset) {
          break;
        }
        if (data.byte_length % 2 !== 0) {
          fixed_offset++;
        }
      }
      const start = Math.round((item.byte_offset + fixed_offset) / 2);
      const end = start + Math.round(item.byte_length / 2);
      this.doAddMarkData(_tag, item.item, start, end);
    },
    // 点击配置百度SDK
    onBaiduWordConfigClick() {
      this.APP_ID = this.inputAPP_ID;
      this.API_KEY = this.inputAPI_KEY;
      this.SECRET_KEY = this.inputSECRET_KEY;
      localStorage.setItem('APP_ID', this.APP_ID);
      localStorage.setItem('API_KEY', this.API_KEY);
      localStorage.setItem('SECRET_KEY', this.SECRET_KEY);
      this.visibleBaiduWordConfig = false;
      this.$notify({
        title: '分词配置',
        message: '自定义配置成功',
        type: 'success',
      });
    },
    // 还原默认配置
    onBaiduWordRestoreConfigClick() {
      this.APP_ID = '11657400';
      this.API_KEY = 'wfWeTDO9XmjUKHfs2r3vhv7b';
      this.SECRET_KEY = '37AIYZr6Gg8NvDPMou6teYWvz5ZLEFic';
      localStorage.setItem('APP_ID', this.APP_ID);
      localStorage.setItem('API_KEY', this.API_KEY);
      localStorage.setItem('SECRET_KEY', this.SECRET_KEY);
      this.visibleBaiduWordConfig = false;
      this.$notify({
        title: '分词配置',
        message: '使用默认配置',
        type: 'success',
      });
    },
    // 是否打开百度分词
    onIsNeedBaiduWordChange() {
      localStorage.setItem('booleanShowBaiduWord', this.booleanShowBaiduWord ? '1' : '0');
      if (this.booleanShowBaiduWord && this.data.content) {
        this.getBaiduWords(this.data.content);
      }
    },
    // ────────────────────────── 实体标注 ──────────────────────────
    // 点击关闭标签
    onCloseTagClick(tag) {
      if (this.data.status === this.DataType.MARKING) {
        const _index = this.data.tags.findIndex((data) => {
          return data.line_id === tag.line_id;
        });
        if (_index !== -1) {
          this.em.cancelHighlightLine(tag.line_id);
          // 1.删除数据
          this.data.tags.splice(_index, 1);
          // 2.更新数据库
          this.doUpdateCurrectData();
        }
      }
    },
    // 点击清空标签按钮
    onCloseAllTagClick() {
      if (this.data.status === this.DataType.MARKING) {
        this.data.tags.forEach((data) => {
          this.em.cancelHighlightLine(data.line_id);
        });
        this.data.tags = [];
        this.doUpdateCurrectData();
      }
    },
    // 获取标注进度百分比
    onGetPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor((project.num.marked * 100) / project.num.total);
      } else {
        return 0;
      }
    },
    // 按下数字键后的操作
    doNumKeyEvent(index) {
      // 获取标注属性
      if (this.projectMarkType.datas.length > index) {
        const tag = this.projectMarkType.datas[index];
        this.selectedMenuItemId = index + 1;
        //this.doChangeMenuItemBackgroud();
        // 判断是否可以快捷标注
        if (this.isMouseSelectFinished) {
          const selectText = this.em.getSelectText();
          const start = this.em.textNode.start;
          const end = this.em.textNode.end;
          //console.log({ tag, selectText, start, end });
          if (tag && selectText && start && end) {
            this.doAddMarkData(tag, selectText, start.offset, end.offset);
            this.em.menu.hide();
            this.em.mask.reset();
            this.isMouseSelectFinished = false; //还原初始状态
          }
        } else if (this.isBaiduWordSelectFinished) {
          if (this.selectedBaiduWord.item) {
            this.onMarkSelectedBaiduWord(this.selectedBaiduWord, tag);
            this.isBaiduWordSelectFinished = false; //还原初始状态
          }
        }
      }
    },
    // 添加标注数据
    doAddMarkData(_tag, content, start, end) {
      // 0.高亮
      const _id = new Date().getTime();

      const selection = {
        anchorNode: document.getElementById('data_0').firstChild,
        anchorOffset: start,
        focusNode: document.getElementById('data_0').firstChild,
        focusOffset: end,
      };
      this.em.highlightLine(selection, _id, {
        type: 'highlight',
        tag: _tag.tag,
        fillColor: _tag.color || '',
      });

      // 1.新增数据
      this.data.tags.push({
        name: _tag.tag,
        tag: _tag.tag,
        color: _tag.color,
        content: content,
        line_id: _id,
        start: start,
        end: end,
      });
      // 2.更新数据库
      this.doUpdateCurrectData();
    },
    // 删除标注数据
    doRemoveMarkData(_id) {
      const _index = this.data.tags.findIndex((data) => {
        return data.line_id === _id;
      });
      if (_index !== -1) {
        // 1.删除数据
        this.data.tags.splice(_index, 1);
        // 2.更新数据库
        this.doUpdateCurrectData();
      }
    },
    // ────────────────────────── 全局标签 ──────────────────────────
    // 修改全局标签标签组
    onGlobalTypeChange(_globalTypeId) {
      if (this.data.status === this.DataType.MARKING) {
        this.data.globalTypeId = _globalTypeId;
        this.doUpdateCurrectData();
      }
    },
    // ────────────────────────── 对话标注 ──────────────────────────
    // 开启对话标注
    onStartDialogueMarkClick() {
      // 判断数据是否可标注
      if (this.data.status === this.DataType.MARKING) {
        // 隐藏底部百度分词
        this.booleanShowBaiduWord = false;
        // 标记开始关系标注
        this.currectWorkingType = this.WorkingType.DIALOGUE;
        // 判断是否已经分割
        if (this.data.dialogue) {
          // 未分割,判断是否需要自动分割
          if (this.data.dialogue.datas.length === 0) {
            // 分割文本成数组
            this.doDialogueSeparator();
          }
        } else {
          // 没有分割,尝试使用默认分割
          // 分割文本成数组
          this.doDialogueSeparator();
        }
      } else {
        this.$message({
          type: 'warning',
          message: '当前数据已保存,请点击右上方修改按钮解除锁定',
        });
      }
    },
    // 结束关系标注
    onEndDialogueMarkClick() {
      this.currectWorkingType = this.WorkingType.ENTITY; // 结束关系标注后回到实体标注
    },
    // 修改分隔符
    onSeparatorChangeClick() {
      if (this.dialogueRegExp) {
        this.$confirm('此操作将重构数组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            if (this.data.status === this.DataType.MARKING) {
              this.doDialogueSeparator();
              this.$message({
                type: 'success',
                message: `分割成功:${this.data.dialogue.datas.length}条`,
              });
            } else {
              this.$message({
                type: 'warning',
                message: '当前数据已保存,请点击右上方修改按钮解除锁定',
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      }
    },
    handleDialogueItemTagClose(tag, tag_index, item_index) {
      this.data.dialogue.datas[item_index].tags.splice(tag_index, 1);
      this.doUpdateCurrectData();
    },
    handleDialogueItemTagAdd(value) {
      const _data = value.split('__');
      const tag = _data[0];
      const item_index = _data[1];
      if (!this.data.dialogue.datas[item_index].tags.includes(tag)) {
        this.data.dialogue.datas[item_index].tags.push(tag);
        this.doUpdateCurrectData();
      }
    },
    // ────────────────────────── 关系标注 ──────────────────────────
    // 开启关系标注
    onStartRelationMarkClick() {
      if (this.data.status === this.DataType.MARKING) {
        if (this.data.tags.length < 2) {
          this.$message({
            message: '实体数量少于两个，无法开始标注',
            type: 'warning',
          });
        } else {
          this.relationItems = this.doGetRelationItems();
          // 隐藏底部百度分词
          this.booleanShowBaiduWord = false;
          // 标记开始关系标注
          this.currectWorkingType = this.WorkingType.RELATION;
        }
      } else {
        this.$message({
          type: 'warning',
          message: '当前数据已保存,请点击右上方修改按钮解除锁定',
        });
      }
    },
    // 结束关系标注
    onEndRelationMarkClick() {
      this.doDeleteAllRelationLines();
      this.currectWorkingType = this.WorkingType.ENTITY; // 结束关系标注后回到实体标注
    },
    // 生成已标注的关系数据,按标注位置重新排列
    doGetRelationItems() {
      let markMap = new Map();
      this.data.tags.forEach((value, index) => {
        value.index = index;
        markMap.set(value.start, value);
      });
      // map中 按开始位置从小到大排序
      markMap = this.sortMap(markMap, true);
      let _content = this.data.content;
      let relationItems = [];
      let lastPosition = 0;
      for (let [key, value] of markMap) {
        const text_content = _content.substring(lastPosition, value.start);
        if (text_content) {
          relationItems.push({
            type: 'text',
            content: text_content,
          });
        }
        const mark_content = value.content;
        if (mark_content) {
          relationItems.push({
            type: 'mark',
            content: mark_content,
            data: value,
          });
        }
        lastPosition = value.end;
      }
      const end_content = _content.substring(lastPosition);
      if (end_content) {
        relationItems.push({
          type: 'text',
          content: end_content,
        });
      }
      return relationItems;
    },
    // 下拉选中一个关系标注
    onRelationTypeClick(item) {
      this.selectedRelationType = item;
    },
    // 关系标注页面中,点击选中了一个实体
    onRelationItemClick(relationMarkItem, index) {
      if (this.selectedRelationType && this.selectedRelationType.tag) {
        relationMarkItem.index = index; //记录索引，用于下次进入还原现场

        //标注结束，存到数组，并开启新的标注
        if (this.booleanRelationMarkFinish) {
          // 1.插入数据
          const _id = new Date().getTime();
          this.data.relations.push({
            start: this.tmpSelectedRelationItem,
            end: relationMarkItem,
            selectedRelationType: this.selectedRelationType,
            show: true,
            id: _id,
          });
          // 2.更新数据库
          this.doUpdateCurrectData();
          // 3.添加连线  mark_index_
          this.doAddRelationLine(`mark_index_${this.tmpSelectedRelationItem.index}`, `mark_index_${index}`, this.selectedRelationType);
          // 显示连线,最新添加的是最后一条
          this.doShowRelationLine(this.relationLines.length - 1);

          this.tmpSelectedRelationItem = null;
          this.booleanRelationMarkFinish = false;
        }
        // 标注开始，记录第一个位置
        else {
          this.tmpSelectedRelationItem = relationMarkItem;
          this.booleanRelationMarkFinish = true;
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请从右侧选择待标注的关系类型',
          offset: 70,
        });
      }
    },
    // 关系标注页面中,从右侧栏点击移除一个关系标注
    removeRelationMarkItem(tag) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === tag.id;
      });

      if (_index !== -1) {
        // 1.删除
        this.data.relations.splice(_index, 1);
        // 2.更新
        this.doUpdateCurrectData();
        // 3.删除连线
        this.doDeleteOneRelationLine(_index);
      }
    },
    // 修改当前线显示状态
    onChangeLineStatusClick(item) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === item.id;
      });
      if (item.show) {
        item.show = false;
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item);
        // 2.更新
        this.doUpdateCurrectData();
        this.doHideRelationLine(_index);
      } else {
        item.show = true;
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item);
        // 2.更新
        this.doUpdateCurrectData();
        this.doShowRelationLine(_index);
      }
    },
    // dom渲染结束，画关系线
    doAddRelationLine(start, end, tag) {
      // draw lines
      const l1 = new LeaderLine(document.getElementById(start), document.getElementById(end), {
        color: tag.color,
        middleLabel: tag.tag,
        size: 2,
        startSocket: 'top',
        endSocket: 'top',
        startPlug: 'disc',
        dropShadow: true,
        dash: {
          // 虚线样式
          animation: true, // 让线条滚动起来
        },
        hide: true,
      });

      this.relationLines.push(l1);
    },
    // 隐藏一条线
    doHideRelationLine(index) {
      this.relationLines[index].hide();
    },
    // 显示一条线
    doShowRelationLine(index) {
      this.relationLines[index].show('draw', {
        duration: 2000,
        timing: [0.5, 0, 1, 0.42],
      });
    },
    // 删除一条关系标注线
    doDeleteOneRelationLine(index) {
      this.doHideRelationLine(index);
      this.relationLines.splice(index, 1);
    },
    // 删除所有关系线
    doDeleteAllRelationLines() {
      this.relationLines.forEach((item) => {
        item.hide();
        item = null;
      });
      this.relationLines = [];
    },
    // ────────────────────────── 工具方法 ──────────────────────────
    // map key 排序
    sortMap(map, isKeyUpSort) {
      let keys = [];
      for (var key of map.keys()) {
        keys.push(key);
      }

      if (isKeyUpSort) {
        keys.sort(function (key1, key2) {
          return key1 - key2;
        });
      } else {
        keys.sort(function (key1, key2) {
          return key2 - key1;
        });
      }

      let newMap = new Map();
      keys.forEach((key) => {
        newMap.set(key, map.get(key));
      });

      return newMap;
    },
  },
};
</script>

<style lang="scss">
@import '../globals.scss';

.el-tag {
  border: none !important;
}

.content-fixed-header {
  left: 0;
  right: 0;
  position: fixed;
  z-index: 99;
  background-color: #ffffff;
  margin: 0 10px;
}

.main-mark-toolbar {
  position: fixed;
  top: 100px;
  left: 10px;
  right: 370px;
  height: 60px;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ebeef5;
  display: flex;
  z-index: 99;
  background-color: #ffffff;
  align-items: center;
}

.main_left_warp {
  position: fixed;
  top: 100px;
  left: 10px;
  right: 370px;
  bottom: 320px;
  overflow-y: hidden;

  .mark_data {
    color: #333333;
    padding: 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
    letter-spacing: 10px;
    line-height: 3rem;
  }

  .mark_relation_data {
    color: #333333;
    padding: 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
    letter-spacing: 10px;
    line-height: 3rem;
  }
}

.main_right_warp {
  position: fixed;
  top: 100px;
  right: 10px;
  bottom: 320px;
  width: 350px;
  overflow-y: hidden;
}

.main_warp_bottom80 {
  bottom: 80px;
}

.main_warp_top100 {
  top: 100px;
}

.main_bottom_warp {
  position: fixed;
  height: 300px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  overflow-y: hidden;

  .el-card__body {
    padding: 0;
  }
}

.main_bottom_warp_height60 {
  height: 60px;
}

.baidu_word_option {
  width: 350px;
  height: 300px;

  .el-switch__label * {
    font-size: 16px;
    font-weight: 400;
  }
}

.baidu_word_header {
  height: 39px;
  padding: 10px 20px;
  border-bottom: 1px solid #dcdfe6;
}

.projectInfo_less {
  .el-card__body {
    padding: 5px 20px;
  }
}

//解决标题栏滚动问题
.relationMarkItems {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}

//解决标题栏滚动问题
.entityMarkItems {
  flex: 1;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}

//解决标题栏滚动问题
.mark_card {
  flex: 1;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}

//解决标题栏滚动问题
.relationMark_card {
  flex: 1;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }
}
.dialogueMark_card {
  flex: 1;
  display: flex;
  flex-direction: column;

  .el-card__body {
    flex: 1;
    overflow-y: auto;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
}

.relationMarkedAlert {
  width: 100%;

  .el-alert__content {
    width: 100%;
  }
}

.mark_page_button {
  border: none;
}

.element::-webkit-scrollbar {
  width: 0 !important;
}

.element {
  -ms-overflow-style: none;
}

.element {
  overflow: -moz-scrollbars-none;
}

.el-tag {
  white-space: normal;
  height: auto;
}

.selectedEntitys {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
