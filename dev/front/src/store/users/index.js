import Vue from 'vue'

export default {
  namespaced: true,

  state: {

    users      : {},

    save       : true,
    uid        : null,
    registered : false,
    visited    : false,
    blocked    : false,
    moderator  : false,

    connectedCount     : 1,
    maxLiveCount       : 250,
    wait               : false,
    highCPUNotifiction : {
      time: new Date().getTime(),
      author: "Server",
      content:
        "The platframe is currently experiencing a high number of concurrent visitors. To remain functional, it will stop displaying the correct positions of participants' cursors. You can still send and receive messages.",
    },

  },

  mutations: {
    doNotSave         : state => state.save = false,
    setUID            : (state, uid) => state.uid = uid,
    register          : state => state.registered = true,
    deregister        : state => state.registered = false,
    visit             : state => state.visited = true,
    block             : state => state.blocked = true,
    setWait           : (state, wait) => state.wait = wait,
    setConnectedCount : (state, count) => state.connectedCount = count,

    setUser: (state, user) => {
      Vue.set(state.users, user.uid, user)
    },
    setUsers: (state, users) => {
      for (let uid in users) {
        Vue.set(state.users, uid, users[uid])
      }
    },
    setUserAppearance: (state, user) => {
      state.users[user.uid].connected = user.connected
      state.users[user.uid].name = user.name
      state.users[user.uid].color = user.color
      state.users[user.uid].x = user.x
      state.users[user.uid].y = user.y
      state.users[user.uid].typing = user.typing || ""
      state.users[user.uid].messageLifetime = user.messageLifetime
    },
    setUserBlocked: (state, user) => {
      state.users[user.uid].blocked = true
    },
    setUserDeleted: (state, user) => {
      state.users[user.uid].deleted = true
    },
    setUserModerator: (state, user) => {
      state.users[user.uid].moderator = user.moderator
    },
    setUserPosition: (state, position) => {
      state.users[position.uid].x = position.x
      state.users[position.uid].y = position.y
      state.users[position.uid].connected = position.connected
    },
    setUserTyping: (state, text) => {
      state.users[text.uid].typing = text.typing
    },
    setUserColor: (state, color) => {
      state.users[color.uid].color = color.color
    },
  },

  getters: {
    me:  state => state.users[state.uid],
    isMe: state => user => user.uid === state.uid,
    networkConservationMode: state =>
      state.connectedCount > state.maxLiveCount,
    emitsPerSecond: state => (2 * state.maxLiveCount) / state.connectedCount,

    usersArray: state => (
      Object.values(
        state.users
      )
    ),
    notDeletedUsers: (state, getters) => ( getters
      .usersArray
      .filter(u => (
        !u.deleted &&
        !u.blocked &&
        !u.isMobile
      ))
      .sort((a, b) => (
        b.moderator - a.moderator
      ))
    ),
    connectedUsers: (state, getters) => ( getters
      .notDeletedUsers
      .filter(u => (
        u.connected
      ))
    ),
    connectedUsersFirst: (state, getters) => ( getters
      .notDeletedUsers
      .sort((a, b) => (
        b.connected - a.connected
      ))
    ),
    userNames: (state, getters) => ( getters
      .notDeletedUsers
      .map(u => (
        u.name
      ))
    ),
    userColors: (state, getters) => ( getters
      .usersArray
      .map(u => ({
        [`--${u.uid}`]: state.desiresContrast ?
          "black" : u.connected ?
          u.color : "var(--disconnected)",
      }))
    ),
  },

  actions: {
    socket_user({ state, commit }, user) {
      commit("setUser", user)
      const status =
        user.deleted === true ? "deleted"
      : user.blocked === true ? "blocked"
      : "connected"
      console.log('* USER:', user.name, status)
      if (user.uid === state.uid) {
        if (user.blocked) {
          commit("block")
        }
        if (user.deleted) {
          commit("doNotSave")
          console.log("You're deleted.")
          localStorage.clear()
          window.location.reload(true)
        }
      }
    },

    socket_appearance({ state, commit, dispatch, rootState }, user) {
      if (user.uid !== state.uid) {
        commit("setUserAppearance", user)
      }
      if (user.connected === false) {
        console.log('* USER:', user.name, "disconnected")
      }
      if (user.messageLifetime) {
        const now = new Date().getTime(),
          twodays = 172800000  // two days
        for (let uid in rootState.messages.messages) {
          const message = rootState.messages.messages[uid]
          if (message.authorUID == user.uid) {
            if (message.time < now - (user.messageLifetime || twodays)) {
              console.log("* MESSAGE DIED:", message.content)
              dispatch("messages/deleteMessage", message, { root: true })
            }
          }
        }
      }
    },

    socket_moderator({ state, commit }, user) {
      if (user.uid !== state.uid) {
        commit("setUserModerator", user)
        console.log("* USER", user.name, "upgraded to moderator")
      }
    },

    socket_position({ state, commit }, position) {
      if (position.uid !== state.uid) {
        if (state.users[position.uid]) {
          commit("setUserPosition", position)
        } else {
          console.log(position.uid, "not found.")
        }
      }
    },

    socket_typing({ state, commit }, text) {
      if (text.uid !== state.uid) {
        if (state.users[text.uid]) {
          commit("setUserTyping", text)
        } else {
          console.log(text.uid, "not found.")
        }
      }
    },

    socket_color({ state, commit }, color) {
      if (color.uid !== state.uid) {
        commit("setUserColor", color)
      }
    },

    socket_count({ commit }, count) {
      commit("setConnectedCount", count)
    },

    socket_disconnect({ state }) {
      if (state.save) {
        if (!state.registered) {
          localStorage.uid = state.uid
        }
      }
    },

    updateAppearance({ state, commit }, user) {
      user.uid = state.uid
      commit("setUserAppearance", user)
      this._vm.$socket.client.emit("appearance", user)
    },

    updateModerator({ state, commit }, moderator) {
      moderator.uid = state.uid
      commit("setUserModerator", moderator)
      this._vm.$socket.client.emit("moderator", moderator)
    },

    blockUser({ commit, dispatch, rootState }, user) {
      commit("setUserBlocked", user)
      this._vm.$socket.client.emit("user", user)

      for (let uid in rootState.messages.messages) {
        const message = rootState.messages.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch("messages/deleteMessage", message, { root: true })
        }
      }
    },

    deleteUser({ commit, dispatch, rootState }, user) {
      commit("setUserDeleted", user)
      this._vm.$socket.client.emit("user", user)

      for (let uid in rootState.messages.messages) {
        const message = rootState.messages.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch("messages/deleteMessage", message, { root: true })
        }
      }
    },

    updatePosition({ state, getters, commit, dispatch }, position) {
      position.uid = state.uid
      commit("setUserPosition", position)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit("position", position)
          dispatch("resetWait")
        }
      }
    },

    updateTyping({ state, getters, commit, dispatch }, text) {
      text.uid = state.uid
      commit("setUserTyping", text)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit("typing", text)
          dispatch("resetWait")
        }
      }
    },

    updateColor({ state, getters, commit, dispatch }, color) {
      color.uid = state.uid
      commit("setUserColor", color)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit("color", color)
          dispatch("resetWait")
        }
      }
    },

    disconnect({ state, dispatch }) {
      console.log("disconnecting")
      const me = state.users[state.uid]
      dispatch("updateAppearance", {
        name: me.name,
        color: me.color,
        x: me.x,
        y: me.y,
        messageLifetime: me.messageLifetime,
        connected: false,
        typing: null,
      })
    },

    deleteAllUnamed({ state, dispatch }) {
      for (let uid in state.users) {
        const user = state.users[uid]
        if (
          user &&
          user.name &&
          user.name.includes(user.uid) &&
          user.connected == false
        ) {
          dispatch("deleteUser", user)
        }
      }
    },

    resetWait({ commit, getters }) {
      commit("setWait", true)
      setTimeout(() => {
        commit("setWait", false)
      }, 1000 / getters.emitsPerSecond)
    },
  },
}