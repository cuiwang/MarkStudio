<template>
  <el-card class="main_bottom_warp" v-bind:class="isShowBaiduWord ? '' : 'main_bottom_warp_height60'" shadow="never" :loading="isGettingBaiduWords">
    <div class="flex_row height_100 width_100">
      <div class="baidu_word_items flex_1">
        <div class="baidu_word_header flex_row align_center">
          <div class="main_text_color flex_row align_center">
            分词词性
            <span class="w10"></span>
            <el-switch  :loading="isGettingBaiduWords" v-model="isShowBaiduWord" @change="onIsNeedBaiduWordChange"></el-switch>
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
          <div v-if="isShowBaiduWord">
            <div v-if="isBaiduWordInit" style="height: 230px; overflow: auto; padding-top: 10px">
              <div class="flex_row" style="flex-wrap: wrap; justify-content: flex-start">
                <div v-for="(item, index) in baiduWordItems" :key="index" style="margin-left: 10px; margin-bottom: 10px">
                  <el-popover :offset="-10" placement="top" width="300" trigger="hover" @show="onSelectBaiduWord(item, index)">
                    <el-table stripe :data="projectMarkType.datas">
                      <el-table-column width="100" property="name" label="名称"></el-table-column>
                      <el-table-column width="100" property="tag" label="标签"></el-table-column>
                      <el-table-column width="100" label="操作">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="onMarkSelectedBaiduWord(scope.row)" type="primary">标注</el-button>
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
        <div v-if="isShowBaiduWord" class="baidu_word_option">
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
</template>
<script>
import { Cons } from '../Constant';
export default {
  name: 'BaiduWords',
  props: {

    // 是否显示百度分词模块
    booleanShowBaiduWord: {
      type: Boolean,
      required: true,
      default: false,
    },

    // 当前文本信息
    currectData: {
      type: Object,
      required: true,
      default: {
        content: '',
        status: 0,
      },
    },
    // 当前工程标注类型(实体/关系/对话)
    projectMarkType: {
      type: Object,
      required: true,
      default: { datas: [] },
    },
  },
  watch: {
    currectData(val) {
      this.data = val
      this.getBaiduWords(this.data.content)
    },
  },
  data() {
    return {
      data:this.currectData,
      //=========================== 百度分词 ===========================
      isGettingBaiduWords: false,
      isBaiduWordInit: false,
      isShowBaiduWord: this.booleanShowBaiduWord,
      inputAPP_ID: '',
      inputAPI_KEY: '',
      inputSECRET_KEY: '',
      visibleBaiduWordConfig: false,
      APP_ID: '11657400',
      API_KEY: 'wfWeTDO9XmjUKHfs2r3vhv7b',
      SECRET_KEY: '37AIYZr6Gg8NvDPMou6teYWvz5ZLEFic',
      canSearchBaiduWord: false,
      isSearchBaiduWord: false,
      baiduWordTypes: [
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
      ],
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
      Listeners:[]
    };
  },
  mounted() {
    this.initEvent()
    this.initData()
  },
  destroyed() {
    this.removeEventListener(this.Listeners)
  },
  methods: {
    initEvent(){
      const onMarkSelectedBaiduWord_listener = (_tag) => {
        this.onMarkSelectedBaiduWord(_tag)
      }
      this.Listeners = [
        [
          'onMarkSelectedBaiduWord',onMarkSelectedBaiduWord_listener
        ]
      ]
      this.addEventListener(this.Listeners)
    },
    initData(){
      // 百度分词配置
      this.baiduWordTypesMap = new Map(this.baiduWordTypes);
      this.isShowBaiduWord = localStorage.getItem('booleanShowBaiduWord') === '1';
      this.booleanAutoFinish = localStorage.getItem('booleanAutoFinish') === '1';
      this.APP_ID = localStorage.getItem('APP_ID') || this.APP_ID;
      this.API_KEY = localStorage.getItem('API_KEY') || this.API_KEY;
      this.SECRET_KEY = localStorage.getItem('SECRET_KEY') || this.SECRET_KEY;
      if (this.APP_ID && this.API_KEY && this.SECRET_KEY) {
        this.isBaiduWordInit = true;
      }
    },
    // ────────────────────────── 百度分词词性 ──────────────────────────
    //thisIsBaiduWordSelectFinished(val) {
    //  this.$emit('update:isBaiduWordSelectFinished', val);
    //},
    getBaiduWords(text) {
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
      this.$events.emit('isBaiduWordSelectFinished',true);

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
    onMarkSelectedBaiduWord(_tag) {
      const item = this.selectedBaiduWord;
      if (item.item) {
        let fixed_offset = 0;
        for (let i = 0; i < this.baiduWordItems.length; i++) {
          const data = this.baiduWordItems[i];
          if (data['byte_offset'] === item['byte_offset']) {
            break;
          }
          if (data['byte_length'] % 2 !== 0) {
            fixed_offset++;
          }
        }
        const start = Math.round((item['byte_offset'] + fixed_offset) / 2);
        const end = start + Math.round(item['byte_length'] / 2);


        this.$events.emit('doAddMarkData', _tag, item.item, start, end);
        this.$events.emit('isBaiduWordSelectFinished',false);

      }
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
      this.showLocalNotification('自定义配置成功')
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
      this.showLocalNotification('使用默认配置')

    },
    // 是否打开百度分词
    onIsNeedBaiduWordChange() {

      if (this.data.status === Cons.DataType.MARKING){
        if (this.isShowBaiduWord && this.data.content) {
          this.getBaiduWords(this.data.content);
        }
      }else {
        this.isShowBaiduWord = false // 不在工作状态就强制关闭
      }
      localStorage.setItem('booleanShowBaiduWord', this.isShowBaiduWord ? '1' : '0');
      this.$emit('update:booleanShowBaiduWord', this.isShowBaiduWord);

    },
    // ────────────────────────── 实体标注 ──────────────────────────
  },
};
</script>
<style lang="scss">
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
</style>