import Vue from 'vue'

export default {

  namespaced: true,

  state: {

    messages : {},

  },

  mutations: {

    setMessages: (state, messages) => {
      for (let uid in messages) {
        Vue.set(state.messages, uid, messages[uid])
      }
    },
    setMessage: (state, message) => {
      Vue.set(state.messages, message.uid, message)
    },
    setMessageDeleted: (state, message) => {
      state.messages[message.uid].deleted = true
    },
    setMessageCensored: (state, message) => {
      state.messages[message.uid].censored = !state.messages[message.uid].censored
    },

  },

  getters: {

    messagesArray: state => (
      Object.values(
        state.messages
      )
    ),
    notDeletedMessages: (state, getters, rootState) => ( getters
      .messagesArray
      .filter(m => (
        rootState.users.users[m.authorUID] &&
        m.uid &&
        !m.deleted &&
        !m.navigation &&
        !m.stream &&
        (rootState.territories.currentLiveSession ? m.location !== 'livestream' : true)
      ))
    ),
    messagesByUser: (state, getters) => user => ( getters
      .messagesArray
      .filter(m =>
        !m.deleted &&
        m.authorUID === user.uid
      )
    ),


  },

  actions: {

    socket_message({ commit }, message) {
      console.log('* MESSAGE:', message.content)
      commit('setMessage', message)
    },
    deleteMessage({ commit }, message ) {
      commit('setMessageDeleted', message)
      this._vm.$socket.client.emit(
        'message', message
      )
    },
    censorMessage({ commit }, message ) {
      commit('setMessageCensored', message)
      this._vm.$socket.client.emit(
        'message', message
      )
    },

  }

}