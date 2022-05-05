<template>
  <div id="content">
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
                  <span class="main_text_color normal_text_size">工程名称</span>
                  <span class="h5"></span>
                  <span class="description_text_color description_text_size">{{ project.name }}</span>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">实体标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ getMaxString(project.markTypeName) }}
                  </div>
                </div>
                <el-divider v-if="project.relationTypeName" direction="vertical"></el-divider>
                <div v-if="project.relationTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">关系标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ getMaxString(project.relationTypeName) }}
                  </div>
                </div>
                <el-divider v-if="project.dialogueTypeName" direction="vertical"></el-divider>
                <div v-if="project.dialogueTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">对话标注标签组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ getMaxString(project.dialogueTypeName) }}
                  </div>
                </div>
                <el-divider v-if="project.globalTypeName" direction="vertical"></el-divider>
                <div v-if="project.globalTypeName" class="flex_col padding_0_10">
                  <span class="main_text_color normal_text_size">分类标注组</span>
                  <span class="h5"></span>
                  <div class="description_text_color description_text_size">
                    {{ getMaxString(project.globalTypeName) }}
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
    <div v-if="project.name && isDbIniting && isReady" class="main_container">
      <!--左侧标记区-->
      <div class="main_left_warp"
           v-bind:class="{ main_warp_bottom80: !booleanShowBaiduWord, main_warp_bottom10: currectWorkingType !== WorkingType.ENTITY }">
        <!--实体标注-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.ENTITY">
          <el-card class="mark_card" shadow="never" body-style="padding:0 20px 20px 20px">
            <div slot="header" class="clearfix">
              <div style="height: 22px"></div>
              <div class="main-mark-toolbar">
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-start">
                  <el-checkbox :disabled="data.status === DataType.FINISHED"
                               @change="onWrongCheckboxChange"
                               v-model="data.wrong === 1">无效数据
                  </el-checkbox>
                </div>
                <el-button-group class="hidden-sm-and-down">
                  <el-button class="mark_page_button"
                             icon="el-icon-arrow-left"
                             :disabled="this.project.currectDataIndex === 0"
                             @click="getLastData">上一条
                  </el-button>
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
                        {{ project.currectDataIndex + 1 }} / {{ project.num.total }}
                        <i class="el-icon-caret-bottom"></i>
                      </span>
                    </el-popover>
                  </el-button>
                  <!---->
                  <el-button class="mark_page_button"
                             :disabled="this.project.currectDataIndex === this.project.num.total - 1"
                             @click="getNextData">
                    下一条
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </el-button-group>
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
                  <el-button-group>
                    <el-button :disabled="data.status === DataType.FINISHED"
                               size="mini"
                               icon="el-icon-edit-outline"
                               @click="onModifyButtonClick">编辑
                    </el-button>
                    <el-button v-if="data.status === DataType.FINISHED"
                               size="mini"
                               type="primary"
                               icon="el-icon-refresh-left"
                               @click="onActiveButtonClick">激活
                    </el-button>
                    <el-button v-if="data.status === DataType.MARKING"
                               size="mini"
                               type="success"
                               icon="el-icon-check"
                               @click="onFinishButtonClick">完成
                    </el-button>
                  </el-button-group>
                </div>
              </div>
            </div>
            <div class="main_mark flex_1">
              <div class="mark-tip flex_row align_center">
                <el-link type="danger" v-if="data.wrong === 1">无效数据</el-link>
                <el-link type="success" v-else-if="data.status === DataType.FINISHED">已完成</el-link>
                <el-link type="info" v-else-if="data.status === DataType.MARKING">标注中......</el-link>
                <div class="flex_1"></div>
                <div class="entity_search flex_row_allcenter">
                  <el-input clearable  size="small" placeholder="请输入搜索内容" v-model="entiitySearchContent" @clear="onClearEntitySearchText" @keyup.enter.native='doEntitySearchInText' >
                    <i slot="prefix" class="el-input__icon el-icon-edit"></i>
                    <el-button slot="append" icon="el-icon-search" :loading="isSearchEntity"   @click="doEntitySearchInText"></el-button>
                  </el-input>
                 <template v-if="entiitySearchPositionResult.length > 0">
                   <span class="normal_text_size normal_text_color" style="width: 100px;text-align: center">{{entiitySearchPositionResult.length}} 结果</span>
                   <el-button size="mini"  icon="el-icon-top" circle @click="doScrollToLastSearchData"></el-button>
                   <el-button size="mini" icon="el-icon-bottom" circle @click="doScrollToNextSearchData"></el-button>
                   <el-button size="mini" icon="el-icon-close" circle @click="onClearEntitySearchText"></el-button>
                 </template>
                </div>
              </div>
              <!--开启行内标注,默认换行分割符"\n"   -->
              <div class="mark_data"
                   id="data_0"
                   :style="{fontSize:defaultFontSize,color:defaultFontColor}"
                   v-text="data.content"/>
            </div>
          </el-card>
        </div>
        <!--关系标注-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.RELATION">
          <el-card class="relationMark_card" shadow="never">
            <div ref="relationMark_card_header" slot="header" class="clearfix relationMark_header">
              <div class="flex_row align_center">
                <div v-if="!selectedRelationType || !selectedRelationType.tag"
                     class="flex_row relationMark_tips"
                     style="height: 38px">
                  <el-alert effect="dark" title="没有选中标签" type="error" :closable="false" show-icon></el-alert>
                </div>
                <div v-else-if="!booleanRelationMarkFinish" class="flex_row relationMark_tips">
                  <el-alert effect="dark" title="点击第一个" type="info" :closable="false" show-icon></el-alert>
                </div>
                <div v-else class="flex_row relationMark_tips">
                  <el-alert effect="dark" title="点击第一个" type="success" :closable="false" show-icon></el-alert>
                  <div class="w10"></div>
                  <el-alert effect="dark" title="点击下一个" type="info" :closable="false" show-icon></el-alert>
                </div>
                <div class="w30"></div>
                <el-dropdown :disabled="currectWorkingType !== WorkingType.RELATION || data.status !== DataType.MARKING">
                  <span class="el-dropdown-link">
                    {{ selectedRelationType ? selectedRelationType.tag : '请选择关系标签' }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="onRelationTypeClick(item)"
                                      v-for="(item, index) in projectRelationType.datas"
                                      :key="`projectRelationType_${index}`">
                      <el-tag :color="item.color" size="medium" effect="dark">
                        {{ item.tag }}
                      </el-tag>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="flex_1"></div>
                <div class="hidden-sm-and-down">
                  <el-button-group>
                    <el-button class="mark_page_button"
                               icon="el-icon-arrow-left"
                               :disabled="this.project.currectDataIndex === 0"
                               @click="getLastData">上一条
                    </el-button>
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
                          {{ project.currectDataIndex + 1 }} / {{ project.num.total }}
                          <i class="el-icon-caret-bottom"></i>
                        </span>
                      </el-popover>
                    </el-button>
                    <!---->
                    <el-button class="mark_page_button"
                               :disabled="this.project.currectDataIndex === this.project.num.total - 1"
                               @click="getNextData">
                      下一条
                      <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                  </el-button-group>
                </div>
                <div class="flex_1"></div>
                <el-divider direction="vertical"></el-divider>
                <el-button v-if="data.status === DataType.FINISHED"
                           size="mini"
                           type="warning"
                           @click="onActiveButtonClick">激活
                </el-button>
                <el-button v-if="data.status === DataType.MARKING"
                           size="mini"
                           type="success"
                           @click="onFinishButtonClick">保存
                </el-button>
              </div>
            </div>
            <div class="mark_relation_data" :style="{fontSize:defaultFontSize,color:defaultFontColor}">
              <span v-for="(item, index) in relationItems" :key="`relationItems_${index}`">
                <el-tag :color="item.data.color"
                        v-if="item.type === 'mark'"
                        effect="dark"
                        @click="onRelationItemClick(item, index)"
                        :id="`mark_index_${index}`"
                        type="primary">
                  {{ item.content }}
                  <span style="font-size: 9px">({{ item.data.name }})</span>
                </el-tag>
                <span v-else v-text="item.content"/>
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
                  <el-button class="mark_page_button"
                             icon="el-icon-arrow-left"
                             :disabled="this.project.currectDataIndex === 0"
                             @click="getLastData">上一条
                  </el-button>
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
                  <el-button class="mark_page_button"
                             :disabled="this.project.currectDataIndex === this.project.num.total - 1"
                             @click="getNextData">
                    下一条
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </el-button-group>
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
                  <el-divider direction="vertical"></el-divider>
                  <el-checkbox :disabled="data.status === DataType.FINISHED"
                               @change="onWrongCheckboxChange"
                               v-model="data.wrong === 1">无效数据?
                  </el-checkbox>
                  <el-divider direction="vertical"></el-divider>
                  <div class="w10"></div>
                  <el-divider direction="vertical"></el-divider>
                  <el-button v-if="data.status === DataType.FINISHED"
                             size="mini"
                             type="warning"
                             @click="onActiveButtonClick">激活
                  </el-button>
                  <el-button v-if="data.status === DataType.MARKING"
                             size="mini"
                             type="success"
                             @click="onFinishButtonClick">保存
                  </el-button>
                </div>
              </div>
            </div>
            <div class="mark_dialogue_data" :style="{fontSize:defaultFontSize,color:defaultFontColor}">
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
                            <el-dropdown-item v-for="(item, dropdown_index) in projectDialogueType.datas"
                                              :key="dropdown_index"
                                              :command="`${item.tag}__${item_index}`">
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
      <div class="main_right_warp flex_col"
           v-bind:class="{ main_warp_bottom80: !booleanShowBaiduWord, main_warp_bottom10: currectWorkingType !== WorkingType.ENTITY }">
        <!--实体标注状态下-->
        <div class="height_100 flex_col" v-show="currectWorkingType === WorkingType.ENTITY">
          <!--分类标注选择-->
          <el-card v-if="project.globalTypeName" style="height: 122px" shadow="never">
            <div slot="header" class="clearfix" style="text-align: left">
              <span>
                <i class="el-icon-s-order"></i>
                分类标注
              </span>
            </div>
            <el-radio-group :disabled="data.status !== DataType.MARKING"
                            v-model="data.globalTypeId"
                            @change="onGlobalTypeChange">
              <el-radio v-for="(item, index) in projectGlobalType.datas"
                        :key="`projectGlobalType_${index}`"
                        :label="item.tag">{{ item.name }}
              </el-radio>
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
              <el-button style="float: right; padding: 3px 0"
                         type="text"
                         @click="onStartDialogueMarkClick">开始标注
              </el-button>
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
              <el-button style="float: right; padding: 3px 0"
                         type="text"
                         @click="onStartRelationMarkClick">开始标注
              </el-button>
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
              <el-button :disabled="data.status === DataType.FINISHED"
                         style="float: right; padding: 3px 0"
                         type="text"
                         @click="onCloseAllTagClick">清空
              </el-button>
            </div>
            <el-collapse v-model="entityActiveNames">
              <el-collapse-item v-for="item in entityTags" :key="item.id" :title="item.text" :name="item.id">
                <div class="selectedEntitys">
                  <div v-for="(tag, index) in item.tags" :key="index" style="margin: 10px">
                    <el-tag :color="tag.color"
                            effect="dark"
                            :closable="data.status === DataType.MARKING"
                            @close="onCloseTagClick(tag)">
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
              <el-button style="float: right; padding: 3px 0; color: #f56c6c"
                         type="text"
                         @click="onEndRelationMarkClick">结束标注
              </el-button>
            </div>
            <el-collapse v-model="relationActiveNames">
              <el-collapse-item v-for="item in relationTags" :key="item.id" :title="item.text" :name="item.id">
                <el-row :gutter="10">
                  <el-col style="margin-bottom: 10px" :span="24" v-for="(tag, index) in item.tags" :key="index">
                    <el-tag
                        @click.prevent="onChangeLineStatusClick(tag)"
                        size="medium"
                        effect="dark"
                        :closable="data.status === DataType.MARKING"
                        :disable-transitions="false"
                        @close="removeRelationMarkItem(tag)"
                        :color="tag.show ? tag.selectedRelationType.color : '#999999'"
                    >
                      {{ `${tag.start.content} —— ${tag.selectedRelationType.tag} —— ${tag.end.content}` }}
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
              <el-button style="float: right; padding: 3px 0; color: #f56c6c"
                         type="text"
                         @click="onEndDialogueMarkClick">结束标注
              </el-button>
            </div>
            <div class="dialogue_setting">
              <h3>对话分割符配置</h3>
              <div style="font-size: 14px; color: #666666; margin-bottom: 5px">* 将文本分割成数组,再分别标注</div>
              <el-form :inline="true">
                <el-form-item label="分割符:">
                  <el-input size="small" placeholder="请填写用于切分对话的分割符" v-model="dialogueRegExp"/>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="data.status !== DataType.MARKING"
                             type="danger"
                             size="small"
                             @click="onSeparatorChangeClick">修改
                  </el-button>
                </el-form-item>
              </el-form>
              <SeparatorTestComponent :separator="dialogueRegExp"></SeparatorTestComponent>
            </div>
          </el-card>
        </div>
      </div>
      <!--  底部区域,句法分析-->
      <BaiduWords
          v-show="currectWorkingType === WorkingType.ENTITY"
          ref="BaiduWords"
          @onBaiduWordMarkSelected="doAddMarkData"
          v-bind:currect-data="data"
          :currect-working-type="currectWorkingType"
          :project-mark-type="projectMarkType"
          :getting-baidu-words="isGettingBaiduWords"
          :booleanShowBaiduWord.sync="booleanShowBaiduWord"
          :isBaiduWordSelectFinished.sync="isBaiduWordSelectFinished"
      />
    </div>
    <el-empty v-else description="准备未就绪">
      <el-button v-if="!project.working" type="primary" @click="openProjectView">激活标注工程</el-button>
      <el-button v-else-if="!isReady" type="warning" @click="openProjectView">数据异常，修改工程信息</el-button>
      <el-button v-else type="danger" @click="openProjectView">数据异常,请先修复工程!</el-button>
    </el-empty>
  </div>
</template>
<script>
import EasyMarker from '../libs/easy-marker'
//import EasyMarker from '../libs/easy-marker.esm';
import db_utils from '../libs/db_utils'
import LeaderLine from 'leader-line-new'
import SeparatorTestComponent from '../components/SeparatorTestComponent'
import BaiduWords from '../components/BaiduWords'
import {Cons} from '../Constant'
import MongoHelper from '../libs/mongoHelper'

export default {
  name: 'Dashboard',
  components: {
    BaiduWords,
    SeparatorTestComponent,
  },
  data() {
    return {
      isReady: false,
      defaultFontSize: '1.2rem',
      defaultFontColor: '#333333',
      defaultMarkFontSize: '14px',
      em: null, // 标注插件
      //=========================== 本地数据库 ===========================
      inputDataIndex: 1, //用户手动跳转索引
      booleanAutoFinish: true, //是否自动保存
      isDbIniting: true, //数据库是否通知初始化完毕
      // 当前工程信息,从数据库中加载
      project: JSON.parse(JSON.stringify(Cons.PROJECT_TEMPLATE)),
      // 当前文本信息,从数据库中加载
      data: JSON.parse(JSON.stringify(Cons.DATA_TEMPLATE)),
      DataType: Cons.DataType,
      // 工程所用的一种实体标注标签组,从数据库中加载
      projectMarkType: Object.freeze({datas: []}),
      // 工程所用的一种分类标注标签组,从数据库中加载
      projectGlobalType: Object.freeze({datas: []}),
      // 工程所用的一种关系标注标签组,从数据库中加载
      projectRelationType: Object.freeze({datas: []}),
      // 工程所用的一种对话标注标签组,从数据库中加载
      projectDialogueType: Object.freeze({datas: []}),
      //
      currectWorkingType: 0, // 工作模式 0:实体标注 1:关系标注 2:对话标注
      WorkingType: Cons.WorkingType,
      //=========================== 对话标注 ===========================
      dialogueRegExp: '', //用户输入的分隔符正则
      //=========================== 实体标注 ===========================
      isSearchEntity:false,
      currectSearchResultIndex:-1,
      entiitySearchContent:'',
      entiitySearchPositionResult:[],
      entityActiveNames: [],
      relationActiveNames: [],
      //=========================== 关系标注 ===========================
      booleanCloseLeaderLine: false, //是否关闭连线
      selectedRelationType: null, //下拉选中的关系标注
      selectedMenuItemId: 0, //当前标注框选中的索引
      relationLines: [], //Lines实例列表，用于统一销毁
      relationItems: [], //处理后的关系标注数据
      booleanRelationMarkFinish: false, //标识是否标记关系完成，需要成对标记
      tmpSelectedRelationItem: null, //第一次选择的标注，缓存一下
      //=========================== 百度分词 ===========================
      booleanShowBaiduWord: false,
      isGettingBaiduWords: false,
      //=========================== 全局变量 ===========================
      //是否显示更多工程信息
      booleanShowProjectInfo: false,
      //是否鼠标选中结束,此时可以用快捷键标注
      isMouseSelectFinished: false,
      //是否百度选中结束,此时可以用快捷键标注
      isBaiduWordSelectFinished: false,
      //实体标注显示类型 0高亮 1下划线
      defaultEntityRenderType:0,
    }
  },
  computed: {
    // 根据 数据动态变化
    entityTags() {
      let entityTags = []
      this.projectMarkType.datas.forEach((data, index) => {
        entityTags.push({
          id: index + 1,
          text: data.tag,
          tags: [],
        })
      })
      this.data.tags.forEach((data) => {
        entityTags.forEach((entityTag) => {
          if (data.tag === entityTag.text) {
            entityTag.tags.push(data)
          }
        })
      })
      return entityTags
    },
    relationTags() {
      let relationTags = []
      this.projectRelationType.datas.forEach((data, index) => {
        relationTags.push({
          id: index + 1,
          text: data.tag,
          tags: [],
        })
      })
      if (this.data.relations) {
        this.data.relations.forEach((data) => {
          relationTags.forEach((relationTag) => {
            if (data.selectedRelationType.tag === relationTag.text) {
              relationTag.tags.push(data)
            }
          })
        })
      }
      return relationTags
    },
  },
  watch: {
    relationItems() {
      this.$nextTick(() => {
        //等待渲染完毕,如果没有关闭显示连线
        if (!this.booleanCloseLeaderLine) {
          for (const relation of this.data.relations) {
            this.doAddRelationLine(`mark_index_${relation.start.index}`, `mark_index_${relation.end.index}`, relation.selectedRelationType)
            if (relation.show) {
              this.doShowRelationLine(this.relationLines.length - 1)
            }
          }
        }
      })
    },
  },
  mounted() {
    console.log('Dashboard mounted')
    this.initEvent()
    this.initView()
    this.initData()

  },
  destroyed() {
    this.doDeleteAllRelationLines()
  },
  methods: {
    // ────────────────────────── init ──────────────────────────
    initEvent() {
      // 数据库初始化完毕,一般在mounted后
      this.$events.on('DB_INIT_FINISH', (text) => {
        this.isDbIniting = true
        this.initData()
      })
      // 按键事件监听
      document.onkeydown = (e) => {
        //事件对象兼容
        let evn = e || event || window.event
        let key = evn.keyCode || evn.which || evn.charCode
        //console.log(evn);
        //console.log(key);
        // 当前处于实体标注情况
        // 48:0,49:1...57:9
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        if ((evn.ctrlKey || evn.metaKey) && (key === 37 || key === 38)) {
          // 按下方向左/上键
          //this.decrease()
          this.getLastData(e)
        } else if ((evn.ctrlKey || evn.metaKey) && (key === 39 || key === 40)) {
          //按下方向右/下键
          this.getNextData(e)
          //this.increase()
        } else if ((evn.ctrlKey || evn.metaKey) && key === 13) {
          // 按下回车
          this.onFinishButtonClick(e)
          //do something
        }
        if (this.currectWorkingType === this.WorkingType.ENTITY) {
          if ((evn.ctrlKey || evn.metaKey) && key === 90) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下CTRL+Z撤销键
            //删除最后一个标注
            if (this.data.tags.length > 0) {
              const tag = this.data.tags[this.data.tags.length - 1]
              this.onCloseTagClick(tag)
            }
          } else if ((evn.ctrlKey || evn.metaKey) && key === 49) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字1
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 50) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字2
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 51) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字3
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 52) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字4
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 53) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字5
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 54) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字6
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 55) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字7
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 56) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字8
            const index = key - 49
            this.doNumKeyEvent(index)
          } else if ((evn.ctrlKey || evn.metaKey) && key === 57) {
            // 已完成状态,就不要操作了
            if (this.data.status === this.DataType.FINISHED) {
              return
            }
            // 按下数字9
            const index = key - 49
            this.doNumKeyEvent(index)
          }
        }
      }
      // 关系标注滚动事件
      // 先给页面注册滚动事件
      document.addEventListener('scroll', this.Scroll, true)
    },
    initView() {
      if (this.em) {
        this.em.destroy()
        this.em = null
      }
      this.defaultFontSize = localStorage.getItem('defaultFontSize') || '1.2rem'
      this.defaultFontColor = localStorage.getItem('defaultFontColor') || '#333333'
      this.defaultMarkFontSize = localStorage.getItem('defaultMarkFontSize') || '14px'
    },
    initData() {
      // 是否显示百度分词
      this.booleanShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1'
      // 是否显示对话标注连线
      this.booleanCloseLeaderLine = localStorage.getItem('booleanCloseLeaderLine') === '1'
      // 是否自动保存
      this.booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1'
      // 实体标注显示效果
      this.defaultEntityRenderType = localStorage.getItem('defaultEntityRenderType') || this.defaultEntityRenderType
      // 从数据库读取工程信息,工程数据信息,工程标注集信息
      db_utils.findOne(db_utils.PROJECTS_DB, {working: true}, (err, document) => {
        if (document) {
          this.project = document
          this.doLoadDataByIndex(this.project.currectDataIndex)
        }
      })
    },
    // 按下数字键后的操作
    doNumKeyEvent(index) {
      //console.log(index);
      // 获取标注属性
      if (this.projectMarkType.datas.length > index) {
        const tag = this.projectMarkType.datas[index]
        this.selectedMenuItemId = index + 1
        //this.doChangeMenuItemBackgroud();
        // 判断是否可以快捷标注
        if (this.isMouseSelectFinished) {
          const selectText = this.em.getSelectText()
          const start = this.em.textNode.start
          const end = this.em.textNode.end
          //console.log({ tag, selectText, start, end });
          if (tag && selectText && start && end) {
            this.doAddMarkData(tag, selectText, start.offset, end.offset)
            this.em.menu.hide()
            this.em.mask.reset()
            this.isMouseSelectFinished = false //还原初始状态
          }
        } else if (this.isBaiduWordSelectFinished) {
          this.$refs.BaiduWords.onMarkSelectedBaiduWord(tag)
        }
      }
    },
    // 监听滚动事件
    Scroll() {
      if (this.currectWorkingType === this.WorkingType.RELATION) {
        if (this.relationLines.length > 0) {
          this.relationLines.forEach((line, index) => {
            line.position()
            if (index === 0) {
              if (line.start.getBoundingClientRect().top < 176) {
                this.$refs.relationMark_card_header.style.opacity = '0.5'
              } else {
                this.$refs.relationMark_card_header.style.opacity = '1.0'
              }
            }
          })
        }
      }
    },
    // ────────────────────────── 页面操作 ──────────────────────────
    // 打开工程工程页面
    openProjectView() {
      this.$events.emit('PROJECT_VIEW', '')
    },
    // 从数据库读取文本信息数据
    getCurrectProjectDataByIndex(_id, _index) {
      db_utils.findOne(db_utils.DATAS_DB, {
        project_id: _id,
        index:_index
      }, (err, document) => {
        if (!document){
          this.isReady = false
          return
        }
        this.data = document
        // 是否需要加载了实体标注标签组
        if (this.project.markTypeName) {
          db_utils.findOne(db_utils.MARK_TYPES_DB, {_id: this.project.markTypeId}, (err, document) => {
            if (document) {
              this.projectMarkType = Object.freeze(document)
              // 默认展开已标注数据
              this.projectMarkType.datas.forEach((_, index) => {
                this.entityActiveNames.push(index + 1)
              })
              // 生成EasyMarker menuItems
              let menuItems = []
              this.projectMarkType.datas.forEach((data, index) => {
                menuItems.push({
                  id: index + 1,
                  text: data.tag,
                  type: 'select',
                  style: {
                    width: '1000px',
                    //overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    color: '#FFFFFF',
                    background: data.color,
                    boxSizing: 'border-box',
                    borderTopLeftRadius: index === 0 ? '4px' : '0px',
                    borderBottomLeftRadius: index === 0 ? '4px' : '0px',
                    borderTopRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                    borderBottomRightRadius: index === this.projectMarkType.datas.length - 1 ? '4px' : '0px',
                    borderLeft: '#DCDFE6 1px solid',
                    borderRight: '#DCDFE6 1px solid',
                    fontSize: this.defaultMarkFontSize,
                    fontWeight: 'bold',
                    padding: '10px',
                  },
                  //iconName:'iconfont icon-heartxin'
                })
              })
              // 配置显示菜单
              this.newEasyMarker(menuItems)
              this.doHighlightEasyMarkerMarkedDatas()
              if (this.booleanShowBaiduWord) {
                this.$refs.BaiduWords.getBaiduWords(this.data.content)
              }
            }
          })
        }
        // 是否需要加载了关系标注标签组
        if (this.project.relationTypeName) {
          db_utils.findOne(db_utils.RELATION_TYPES_DB, {_id: this.project.relationTypeId}, (err, document) => {
            this.projectRelationType = Object.freeze(document)
            // 默认展开已标注数据
            this.projectRelationType.datas.forEach((_, index) => {
              this.relationActiveNames.push(index + 1)
            })
          })
        }
        // 是否需要加载了分类标注组
        if (this.project.globalTypeName) {
          db_utils.findOne(db_utils.GLOBAL_TYPES_DB, {_id: this.project.globalTypeId}, (err, document) => {
            this.projectGlobalType = Object.freeze(document)
          })
        }
        // 是否需要加载了对话标签组
        if (this.project.dialogueTypeName) {
          db_utils.findOne(db_utils.DIALOGUE_TYPES_DB, {_id: this.project.dialogueTypeId}, (err, document) => {
            this.projectDialogueType = Object.freeze(document)
            this.dialogueRegExp = this.data.dialogue ? this.data.dialogue.separator : this.projectDialogueType.separator
            // 判断是否对话标注模式,生成对话标注数据
            if (this.currectWorkingType === this.WorkingType.DIALOGUE) {
              this.onStartDialogueMarkClick()
            }
          })
        }
        // 处理对话标注模式下,翻页问题
        if (this.currectWorkingType === this.WorkingType.RELATION) {
          this.onStartRelationMarkClick()
        }
        // 保存索引记录
        db_utils.update(db_utils.PROJECTS_DB, {_id: this.project._id}, this.project)
        this.isReady = true
      })
    },
    // 通过索引加载文本数据
    doLoadDataByIndex(index) {
      if (this.project && this.project._id) {
        db_utils.count(db_utils.DATAS_DB, {project_id: this.project._id}, (err, count) => {
          if (count > 0) {
            this.getCurrectProjectDataByIndex(this.project._id, index)
          } else {
            this.isReady = false
            this.$message.error('数据错误')
          }
        })
      } else {
        this.$message.error('数据错误')
      }
    },
    // 更新当前数据信息
    doUpdateCurrectData(data) {
      db_utils.update(db_utils.DATAS_DB, {
        project_id: this.project._id,
        index: this.project.currectDataIndex,
      }, data)
    },
    // 用户手动输入页码索引
    doChangeInputDataIndex() {
      if (this.inputDataIndex > 0 && this.inputDataIndex <= this.project.num.total) {
        this.project.currectDataIndex = this.inputDataIndex - 1
        this.doLoadDataByIndex(this.project.currectDataIndex)
      } else {
        this.$message.error('错误位置')
      }
    },
    // 上一条
    getLastData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === 0) {
        //防止点击两次
        return
      }
      this.project.currectDataIndex = this.project.currectDataIndex - 1
      this.doLoadDataByIndex(this.project.currectDataIndex)
    },
    // 下一条
    getNextData(event) {
      if (!event.isTrusted || this.project.currectDataIndex === this.project.num.total - 1) {
        //防止点击两次
        return
      }
      // 判断是否需要自动保存
      if (this.booleanAutoFinish) {
        // 自动保存
        this.onFinishButtonClick({isTrusted: true})
        // 读取数据
        this.project.currectDataIndex = this.project.currectDataIndex + 1
        this.doLoadDataByIndex(this.project.currectDataIndex)
      } else {
        // 提示是否需要自动保存
        // 判断是否有标记
        if (this.data.tags.length > 0) {
          // 弹出对话框
          this.$confirm('是否保存本次操作,并打开自动保存?\n(下次不再弹出)', '操作提示', {
            confirmButtonText: '确定并自动保存',
            cancelButtonText: '取 消',
            type: 'warning',
          }).then(() => {
            this.$message({
              type: 'success',
              message: '设置成功!',
            })
            // 状态保存到本地
            this.booleanAutoFinish = true
            localStorage.setItem('booleanAutoFinish', this.booleanAutoFinish ? '1' : '0')
            // 自动保存
            this.onFinishButtonClick({isTrusted: true})
            // 读取数据
            this.project.currectDataIndex = this.project.currectDataIndex + 1
            this.doLoadDataByIndex(this.project.currectDataIndex)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消保存!',
            })
            // 读取数据
            this.project.currectDataIndex = this.project.currectDataIndex + 1
            this.doLoadDataByIndex(this.project.currectDataIndex)
          })
        } else {
          // 读取数据
          this.project.currectDataIndex = this.project.currectDataIndex + 1
          this.doLoadDataByIndex(this.project.currectDataIndex)
        }
      }
    },
    // 下拉选择某一条
    onCurrentPageChange(index) {
      this.project.currectDataIndex = index - 1
      this.doLoadDataByIndex(this.project.currectDataIndex)
    },
    //点击编辑按钮
    onModifyButtonClick(event) {
      this.$prompt('此操作将修改这条记录文本内容,已标注内容可能产生异常!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        roundButton: true,
        inputType: 'textarea',
        inputValue: this.data.content,
      }).then(({value}) => {
        //console.log(value)
        this.data.content = value
        this.doUpdateCurrectData(this.data)
        // 重新读取数据
        this.doLoadDataByIndex(this.project.currectDataIndex)
        this.$message({
          type: 'success',
          message: '修改成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改',
        })
      })
    },
    // 点击激活按钮
    onActiveButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      this.data.status = this.DataType.MARKING
      this.doUpdateCurrectData(this.data)
      this.project.num.marked = parseInt(this.project.num.marked) - 1
      db_utils.update_set(db_utils.PROJECTS_DB, {working: true}, {
        $set: {
          num: {
            total: this.project.num.total,
            marked: this.project.num.marked,
          },
        },
      })
      this.em.enable()
    },
    // 点击保存按钮,修改数据库状态和工程记录
    onFinishButtonClick(event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      // 当前状态是标注中,才修改两个数据库
      if (this.data.status === this.DataType.MARKING) {
        this.data.status = this.DataType.FINISHED
        this.doUpdateCurrectData(this.data)
        this.project.num.marked = parseInt(this.project.num.marked) + 1
        db_utils.update_set(db_utils.PROJECTS_DB, {working: true}, {
          $set: {
            num: {
              total: this.project.num.total,
              marked: this.project.num.marked,
            },
          },
        })
        this.em.disable()
      }
    },
    // 是否标记为无效数据
    onWrongCheckboxChange(_status, event) {
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      // 当前状态是标注中,才修改两个数据库
      this.data.wrong = _status ? 1 : 0
      this.doUpdateCurrectData(this.data)
    },
    // 是否显示顶部工程信息
    onShowProjectInfo(value) {
      this.booleanShowProjectInfo = value === '1'
    },
    // ────────────────────────── EasyMarker ──────────────────────────
    newEasyMarker(menuItems) {
      if (this.em) {
        this.em.destroy()
        this.em = null
      }
      this.em = new EasyMarker({
        menuTopOffset: '10px',
        mask: {
          color: '#DCDFE6',
        },
        highlight: {
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
            backgroundColor: '#5EABFC',
            maxWidth: '749px',
            display: 'flex',
            alignItems:'center',
            overflow: 'auto',
            //height:'40px',
          },
          triangle: {
            borderTop: '0.4rem solid rgb(201, 209, 218)',
            borderRight: '0.4rem solid transparent',
            borderLeft: '0.4rem solid transparent',
            marginTop: '0px',
          },
        },
        menuItems: menuItems,
      })
      this.em.create(document.querySelector('.main_mark'), undefined, {
        excludeElements: document.querySelectorAll('.excludeElements'),
      })
      this.doEasyMarkerEvent()
      this.doEasyMarkerHightlightTapEvent()
      // 判断是否需要禁止编辑
      if (this.data.status === this.DataType.FINISHED) {
        this.em.disable()
      } else if (this.data.status === this.DataType.MARKING) {
        this.em.enable()
      } else {
        this.em.enable()
      }
    },
    //设置点击高亮事件
    doEasyMarkerHightlightTapEvent(){
      this.em.onHighlightLineClick(null)
    },
    // 设置EasyMarker事件
    doEasyMarkerEvent() {
      // 菜单点击行为
      this.em.onMenuClick((item_id, node_info,opthon) => {

        this.selectedMenuItemId = item_id
        //this.doChangeMenuItemBackgroud();
        this.em.cancelHighlightLine(opthon.id)
        this.doRemoveMarkData(opthon.id)
        const _tag = this.projectMarkType.datas[item_id - 1]
        // 添加到数据库
        this.doAddMarkData(_tag, this.em.getSelectText(), node_info.anchorOffset, node_info.focusOffset)
      })
      // onSelectStatusChange
      this.em.onSelectStatusChange((val) => {
        this.isMouseSelectFinished = val === 'finish'
      })
    },
    // 高亮标注了的数据
    doHighlightEasyMarkerMarkedDatas() {
      if (this.em && this.data.tags.length > 0) {
        //
        // { name: '人名', tag: 'Person', content: '李明', start: 27, end: 29 }
        let highlightOptions = []
        this.data.tags.forEach((data) => {
          highlightOptions.push({
            id: data.line_id,
            meta: {
              //type: 'underline',
              type:  this.defaultEntityRenderType===0?'highlight':'underline',
              tag: data.tag,
              fillColor: data.color || '',
              underlineColor:data.color || ''

            },
            selection: {
              anchorNode: document.getElementById('data_0').firstChild,
              anchorOffset: data.start,
              focusNode: document.getElementById('data_0').firstChild,
              focusOffset: data.end,
            },
          })
        })
        this.em.highlightLines(highlightOptions)
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
    // ────────────────────────── 实体标注 ──────────────────────────
    // 清空搜索框
    onClearEntitySearchText(event){
      this.entiitySearchContent = ''
      this.doClearEntityResult()
    },
    // 清空已选搜索高亮
    doClearEntityResult(){
      this.entiitySearchPositionResult.forEach(value => {
        this.em.cancelHighlightLine(value.line_id)
      })
      this.entiitySearchPositionResult = []
      this.currectSearchResultIndex = -1
    },

    // 搜索匹配到的位置
    doEntitySearchInText(event){
      if (!event.isTrusted) {
        //防止点击两次
        return
      }
      this.doClearEntityResult()

      this.isSearchEntity = true
      if (this.entiitySearchContent && this.data.content){
        // 循环查找位置
       this.entiitySearchPositionResult= []
        let pos = this.data.content.indexOf(this.entiitySearchContent) // 返回-1即未找到
        while (pos > -1){
         const _res = {
           line_id:'',
           start:pos,
           end:pos+this.entiitySearchContent.length
         }
          this.entiitySearchPositionResult.push(_res) // 将出现的位置保存起来
          this.doAddSearchHighlightData(_res)
          pos = this.data.content.indexOf(this.entiitySearchContent,pos+1)  // 从给定字符串出现的最后一位，开始继续查找
        }
        //console.log(this.entiitySearchPositionResult)
        this.isSearchEntity = false

      }
    },
    // 添加搜索高亮
    doAddSearchHighlightData(data,isHighlight=false) {
      // 0.高亮
      const _id = new Date().getTime()
      data.line_id = _id
      const selection = {
        anchorNode: document.getElementById('data_0').firstChild,
        anchorOffset: data.start,
        focusNode: document.getElementById('data_0').firstChild,
        focusOffset: data.end,
      }
      this.em.highlightLine(selection, _id, {
        type:  this.defaultEntityRenderType===0?'underline':'highlight',
        tag: '',
        fillColor: isHighlight?'#0eabe7':'#CCCCCC',
        underlineColor:isHighlight?'#0eabe7':'#CCCCCC'
      })

    },

    // 滚动到上一个
    doScrollToLastSearchData(event){
      if (!event.isTrusted) {
        //防止点击两次
        return
      }

      this.currectSearchResultIndex = this.currectSearchResultIndex -1

      if (this.currectSearchResultIndex < 0){
        this.currectSearchResultIndex = 0
        this.$message('已经第一个了');
      }


      const _id = this.entiitySearchPositionResult[this.currectSearchResultIndex]['line_id']
      this.scrollToSearchDataById(_id)
      this.em.cancelHighlightLine(_id)
      this.doAddSearchHighlightData(this.entiitySearchPositionResult[this.currectSearchResultIndex],true)

      // 先判断是否需要取消上一步显示
      if (this.currectSearchResultIndex !== -1){
        // 不是第一个,就需要取消显示上一个
        // todo 取消上一个显示
        const _id = this.entiitySearchPositionResult[this.currectSearchResultIndex+1]['line_id']
        this.em.cancelHighlightLine(_id)
        this.doAddSearchHighlightData(this.entiitySearchPositionResult[this.currectSearchResultIndex+1])
      }





    },
    // 滚动到下一个
    doScrollToNextSearchData(event){
      if (!event.isTrusted) {
        //防止点击两次
        return
      }

      this.currectSearchResultIndex = this.currectSearchResultIndex +1

      if (this.currectSearchResultIndex >  this.entiitySearchPositionResult.length-1){
        this.currectSearchResultIndex =this.entiitySearchPositionResult.length-1
        //console.log('结尾了')
        this.$message('已经最后一个了');
      }

      const _id = this.entiitySearchPositionResult[this.currectSearchResultIndex]['line_id']
      this.scrollToSearchDataById(_id)
      this.em.cancelHighlightLine(_id)
      this.doAddSearchHighlightData(this.entiitySearchPositionResult[this.currectSearchResultIndex],true)

      // 先判断是否需要取消上一步显示
     if (this.currectSearchResultIndex !== 0){
       // 不是第一个,就需要取消显示上一个
       // todo 取消上一个显示
       const _id = this.entiitySearchPositionResult[this.currectSearchResultIndex-1]['line_id']
       this.em.cancelHighlightLine(_id)
       this.doAddSearchHighlightData(this.entiitySearchPositionResult[this.currectSearchResultIndex-1])
     }


    },
    // 滚动到高亮位置
    scrollToSearchDataById(_id){
      const _rect = this.em.highlight.lineMap.get(_id).relativeRects[0]
      this.$el.querySelector('.mark_card .el-card__body').scrollTo({
        top: _rect.top ,
        behavior: "smooth"
      })
    },


    // 点击关闭标签
    onCloseTagClick(tag) {
      if (this.data.status === this.DataType.MARKING) {
        const _index = this.data.tags.findIndex((data) => {
          return data.line_id === tag.line_id
        })
        if (_index !== -1) {
          this.em.cancelHighlightLine(tag.line_id)
          // 1.删除数据
          this.data.tags.splice(_index, 1)
          // 2.更新数据库
          this.doUpdateCurrectData(this.data)
        }
      }
    },
    // 点击清空标签按钮
    onCloseAllTagClick() {
      if (this.data.status === this.DataType.MARKING) {
        this.data.tags.forEach((data) => {
          this.em.cancelHighlightLine(data.line_id)
        })
        this.data.tags = []
        this.doUpdateCurrectData(this.data)
      }
    },
    // 添加标注数据
    doAddMarkData(_tag, content, start, end) {
      // 0.高亮
      const _id = new Date().getTime()
      const selection = {
        anchorNode: document.getElementById('data_0').firstChild,
        anchorOffset: start,
        focusNode: document.getElementById('data_0').firstChild,
        focusOffset: end,
      }
      this.em.highlightLine(selection, _id, {
        type: 'highlight',
        tag: _tag.tag,
        fillColor: _tag.color || '',
      })
      // 1.新增数据
      this.data.tags.push({
        name: _tag.tag,
        tag: _tag.tag,
        color: _tag.color,
        content: content,
        line_id: _id,
        start: start,
        end: end,
      })
      // 2.更新数据库
      this.doUpdateCurrectData(this.data)
    },
    // 删除标注数据
    doRemoveMarkData(_id) {
      const _index = this.data.tags.findIndex((data) => {
        return data.line_id === _id
      })
      if (_index !== -1) {
        // 1.删除数据
        this.data.tags.splice(_index, 1)
        // 2.更新数据库
        this.doUpdateCurrectData(this.data)
      }
    },
    // ────────────────────────── 分类标注 ──────────────────────────
    // 修改分类标注标签组
    onGlobalTypeChange(_globalTypeId) {
      if (this.data.status === this.DataType.MARKING) {
        this.data.globalTypeId = _globalTypeId
        this.doUpdateCurrectData(this.data)
      }
    },
    // ────────────────────────── 对话标注 ──────────────────────────
    // 开启对话标注
    onStartDialogueMarkClick() {
      // 判断数据是否可标注
      if (this.data.status === this.DataType.MARKING) {
        // 隐藏底部百度分词
        this.booleanShowBaiduWord = false
        // 标记开始关系标注
        this.currectWorkingType = this.WorkingType.DIALOGUE
        // 判断是否已经分割
        if (this.data.dialogue) {
          // 未分割,判断是否需要自动分割
          if (this.data.dialogue.datas.length === 0) {
            // 分割文本成数组
            this.doDialogueSeparator()
          }
        } else {
          // 没有分割,尝试使用默认分割
          // 分割文本成数组
          this.doDialogueSeparator()
        }
      }
      else {
        this.$message({
          type: 'warning',
          message: '当前数据已保存,请点击右上方[激活按钮]解除锁定',
        })
      }
    },
    // 结束关系标注
    onEndDialogueMarkClick() {
      this.currectWorkingType = this.WorkingType.ENTITY // 结束关系标注后回到实体标注
    },
    // 修改分隔符
    onSeparatorChangeClick() {
      if (this.dialogueRegExp) {
        this.$confirm('此操作将重构数组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          if (this.data.status === this.DataType.MARKING) {
            this.doDialogueSeparator()
            this.$message({
              type: 'success',
              message: `分割成功:${this.data.dialogue.datas.length}条`,
            })
          } else {
            this.$message({
              type: 'warning',
              message: '当前数据已保存,请点击右[激活按钮]解除锁定',
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      }
    },
    // 分割对话,重置属性
    doDialogueSeparator() {
      //console.log(this.dialogueRegExp)
      // 分割文本成数组
      // datas : [content:'',tags:{}]
      this.$set(this.data, 'dialogue', {
        separator: this.dialogueRegExp,
        datas: this.data.content.split(RegExp(this.dialogueRegExp)).map((value) => {
          return {
            content: value,
            tags: [],
          }
        }),
      })
      this.doUpdateCurrectData(this.data)
    },
    // 处理对话标注标签关闭
    handleDialogueItemTagClose(tag, tag_index, item_index) {
      this.data.dialogue.datas[item_index].tags.splice(tag_index, 1)
      this.doUpdateCurrectData(this.data)
    },
    // 处理对话标注标签添加
    handleDialogueItemTagAdd(value) {
      const _data = value.split('__')
      const tag = _data[0]
      const item_index = _data[1]
      if (!this.data.dialogue.datas[item_index].tags.includes(tag)) {
        this.data.dialogue.datas[item_index].tags.push(tag)
        this.doUpdateCurrectData(this.data)
      }
    },
    // ────────────────────────── 关系标注 ──────────────────────────
    // 开启关系标注
    onStartRelationMarkClick() {
      this.doDeleteAllRelationLines()
      // 标记开始关系标注
      this.currectWorkingType = this.WorkingType.RELATION
      // 隐藏底部百度分词
      this.booleanShowBaiduWord = false
      this.relationItems = this.doGetRelationItems()
      // 判断是否可以标注
      if (this.data.status !== this.DataType.MARKING) {
        this.$message({
          type: 'error',
          message: '当前数据已保存,请点击[激活按钮]解除锁定',
        })
      }
    },
    // 结束关系标注
    onEndRelationMarkClick() {
      this.doDeleteAllRelationLines()
      this.currectWorkingType = this.WorkingType.ENTITY // 结束关系标注后回到实体标注
    },
    // 生成已标注的关系数据,按标注位置重新排列
    doGetRelationItems() {
      let markMap = []
      this.data.tags.forEach((value, index) => {
        value.index = index
        markMap.push(value)
      })
      // map中 按开始位置从小到大排序
      markMap = markMap.sort(this.sortArrayByProp('start'))
      let _content = this.data.content
      let relationItems = []
      let lastPosition = 0
      markMap.reduce((previousValue, currentValue, currentIndex) => {
        // 嵌套
        if (currentValue['start'] >= previousValue['start'] && currentValue['start'] <= previousValue['end']) {
          const mark_content = currentValue.content
          if (mark_content) {
            relationItems.push({
              type: 'mark',
              content: mark_content,
              data: currentValue,
            })
          }
        } else {
          const text_content = _content.substring(lastPosition, currentValue.start)
          if (text_content) {
            relationItems.push({
              type: 'text',
              content: text_content,
            })
          }
          const mark_content = currentValue.content
          if (mark_content) {
            relationItems.push({
              type: 'mark',
              content: mark_content,
              data: currentValue,
            })
          }
        }
        lastPosition = currentValue.end
        return currentValue
      }, {
        'start': -1,
        'end': -1,
      })
      const end_content = _content.substring(lastPosition)
      if (end_content) {
        relationItems.push({
          type: 'text',
          content: end_content,
        })
      }
      return relationItems
    },
    // 下拉选中一个关系标注
    onRelationTypeClick(item) {
      this.selectedRelationType = item
    },
    // 关系标注页面中,点击选中了一个实体
    onRelationItemClick(relationMarkItem, index) {
      if (this.data.status !== this.DataType.MARKING) {
        this.$message({
          type: 'error',
          message: '当前数据已保存,请点击[激活按钮]解除锁定',
        })
      } else {
        if (this.selectedRelationType && this.selectedRelationType.tag) {
          relationMarkItem.index = index //记录索引，用于下次进入还原现场
          //标注结束，存到数组，并开启新的标注
          if (this.booleanRelationMarkFinish) {
            // 1.插入数据
            const _id = new Date().getTime()
            this.data.relations.push({
              start: this.tmpSelectedRelationItem,
              end: relationMarkItem,
              selectedRelationType: this.selectedRelationType,
              show: true,
              id: _id,
            })
            // 2.更新数据库
            this.doUpdateCurrectData(this.data)
            // 判断是否关闭显示连线
            if (!this.booleanCloseLeaderLine) {
              // 3.添加连线  mark_index_
              this.doAddRelationLine(`mark_index_${this.tmpSelectedRelationItem.index}`, `mark_index_${index}`, this.selectedRelationType)
              // 显示连线,最新添加的是最后一条
              this.doShowRelationLine(this.relationLines.length - 1)
            }
            this.tmpSelectedRelationItem = null
            this.booleanRelationMarkFinish = false
          }
          // 标注开始，记录第一个位置
          else {
            this.tmpSelectedRelationItem = relationMarkItem
            this.booleanRelationMarkFinish = true
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请从右侧选择关系标签',
            offset: 70,
          })
        }
      }
    },
    // 关系标注页面中,从右侧栏点击移除一个关系标注
    removeRelationMarkItem(tag) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === tag.id
      })
      if (_index !== -1) {
        // 1.删除
        this.data.relations.splice(_index, 1)
        // 2.更新
        this.doUpdateCurrectData(this.data)
        // 3.删除连线
        this.doDeleteOneRelationLine(_index)
      }
    },
    // 修改当前线显示状态
    onChangeLineStatusClick(item) {
      const _index = this.data.relations.findIndex((data) => {
        return data.id === item.id
      })
      if (item.show) {
        item.show = false
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item)
        // 2.更新
        this.doUpdateCurrectData(this.data)
        this.doHideRelationLine(_index)
      } else {
        item.show = true
        // 1.删除/替换
        this.data.relations.splice(_index, 1, item)
        // 2.更新
        this.doUpdateCurrectData(this.data)
        this.doShowRelationLine(_index)
      }
    },
    // dom渲染结束，画关系线
    doAddRelationLine(start, end, tag) {
      // draw lines
      const l1 = new LeaderLine(document.getElementById(start), document.getElementById(end), {
        color: tag.color,
        middleLabel: localStorage.getItem('booleanCloseLeaderLineTag') === '0' ? tag.tag : '',
        size: parseInt(localStorage.getItem('defaultLeaderLineWidth')) || 2,
        startSocket: 'bottom',
        endSocket: 'bottom',
        startPlug: 'disc',
        dropShadow: localStorage.getItem('booleanCloseLeaderLineShadow') === '0',
        dash: {
          // 虚线样式
          animation: true, // 让线条滚动起来
        },
        hide: true,
      })
      this.relationLines.push(l1)
    },
    // 隐藏一条线
    doHideRelationLine(index) {
      this.relationLines[index].hide()
    },
    // 显示一条线
    doShowRelationLine(index) {
      this.relationLines[index].show('draw', {
        duration: 2000,
        timing: [0.5, 0, 1, 0.42],
      })
    },
    // 删除一条关系标注线
    doDeleteOneRelationLine(index) {
      this.doHideRelationLine(index)
      this.relationLines.splice(index, 1)
    },
    // 删除所有关系线
    doDeleteAllRelationLines() {
      this.relationLines.forEach((item) => {
        item.remove()
      })
      this.relationLines = []
    },
    // ────────────────────────── 工具方法 ──────────────────────────
    // map key 排序
    sortMap(map, isKeyUpSort) {
      let keys = []
      for (var key of map.keys()) {
        keys.push(key)
      }
      if (isKeyUpSort) {
        keys.sort(function(key1, key2) {
          return key1 - key2
        })
      } else {
        keys.sort(function(key1, key2) {
          return key2 - key1
        })
      }
      let newMap = new Map()
      keys.forEach((key) => {
        newMap.set(key, map.get(key))
      })
      return newMap
    },
    sortArrayByProp(prop) {
      return function(obj1, obj2) {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    },
    // 截取文本最大30字符
    getMaxString(str) {
      return str.length > 30 ? str.substring(0, 29) + '...' : str
    },
    // 获取标注进度百分比
    onGetPercentage(project) {
      if (project && project.num && project.num.total) {
        return Math.floor((project.num.marked * 100) / project.num.total)
      } else {
        return 0
      }
    },
  },
}
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
    padding: 40px 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
    line-height: 3rem;
  }

  .mark_relation_data {
    color: #333333;
    padding: 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
    line-height: 3rem;
  }

  .mark_dialogue_data {
    color: #333333;
    padding: 20px;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem;
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

.main_warp_bottom10 {
  bottom: 10px;
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

  .el-card__header {
    position: absolute;
    width: 100%;
  }

  .relationMark_header {
  }

  .el-card__body {
    flex: 1;
    overflow-y: auto;
    padding-top: 75px;
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
  overflow: auto;
}

.el-tag {
  white-space: normal;
  height: auto;
}

.el-collapse-item__header {
  height: auto;
  line-height: initial;
  padding: 5px;
}

.selectedEntitys {
  display: flex;
  flex-wrap: wrap;
}

.el-dropdown-menu {
  max-width: 243px;
  max-height: 500px;
  overflow-y: scroll;
}

.el-dropdown-menu__item {
  display: inline-block;
}

.el-dropdown-menu__item span {
  min-width: 205px;
  display: inline-block;
}

.mark-tip {
  padding-top: 20px;
  z-index: 41 !important;//大于data_0:40
  position: sticky !important;
  position: -webkit-sticky !important;
  background: white;
  top: 0;
  text-align: left;
  width: 100%;
  font-size: 10px;
}

</style>
