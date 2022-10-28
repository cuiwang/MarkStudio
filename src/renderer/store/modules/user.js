// initial state
// 单一状态树,用一个对象就包含了全部的应用层级状态。
// state 通过 this.$store.state.user.userInfo 方法获取
const state = () => ({
  userInfo: null,
  is_online:false
})

// getters
// getters可以理解为store中的计算属性，对state中的变量在输出前进行处理,如只需要用户的头像信息。
// 使用:store.getters['user/userInfo']
const getters = {
  /*user:  (state) => (id) => {
    return state.userInfo.filter(user => user.id===id)
  },*/
  userInfo:(state)=>{
    return state.userInfo
  },
  is_online:(state)=>{
    return state.is_online

}
}

// actions
// Action 通过 store.dispatch 方法触发
// 支持异步操作,如网络请求成功后再修改mutations
const actions = {
  setUserInfo ({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  },
  setIsOnline({commit},is_online){
    commit('setIsOnline',is_online)
  }
}

// mutations
// mutation 通过 store.commit 方法触发
// 只有通过mutation才能更改state中变量的值。

//要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
//store.commit('setUserInfo',userInfo)
// 当需要在对象上添加新属性时，
// 你应该使用 Vue.set(obj, 'newProp', 123),
// 或者以新对象替换老对象。例如，利用对象展开运算符 (opens new window)我们可以这样写：
//state.obj = { ...state.obj, newProp: 123 }
const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setIsOnline (state, is_online) {
    state.is_online = is_online
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}