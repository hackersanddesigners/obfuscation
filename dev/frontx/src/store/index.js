import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({



  state: {

    version: 5,

    uid: null,

    registered: false,
    visited: false,
    blocked: false,

    users: {},
    messages: {},
    islands: [
      { 
        name: 'center',
        borders: {
          x: 0.4,
          y: 0.4,
        },
      },
    ],

    scale: 5,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    windowLeft: null,
    windowTop: null,
    grid: true,

  },

  mutations: {

    register(state) {
      state.registered = true
    },
    visit(state) {
      state.visited = true
    },
    block(state) {
      state.blocked = true
    },
    setUID(state, uid) {
      state.uid =  uid
    },

    setUsers(state, users) {
      state.users = users
    },
    setUser(state, user) {
      Vue.set(state.users, user.uid, user)
    },
    deleteUser(state, user) {
      user.deleted = true
      Vue.set(state.users, user.uid, user)
    },

    setMessages(state, messages) {
      state.messages = messages
    },
    setMessage(state, message) {
      Vue.set(state.messages, message.uid, message)
    },
    deleteMessage(state, message) {
      message.deleted = true
      Vue.set(state.messages, message.uid, message)
    },
    censorMessage(state, message) {
      state.messages[message.uid].censored = !state.messages[message.uid].censored
    },


    zero(state) {
      state.scale = 5
    },
    zoomIn(state) {
      state.scale += 0.25
    },
    zoomOut(state) {
      if (state.scale > 1) {
        state.scale -= 0.25
      }
    },
    viewerPosition(state, coords) {
      state.windowLeft = coords.x
      state.windowTop = coords.y
    }, 
    resize(state) {
      state.windowWidth = window.innerWidth
      state.windowHeight = window.innerHeight
    },
    toggleGrid(state) {
      state.grid = !state.grid
    }

  },

  getters: {

    me: state => {
      return state.users[state.uid]
    },

    islandByName: state => name => {
      return state.islands.find(u => u.name == name) 
    },

    messagesByUser: state => user => {
      let userMessages = []
      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.author == user.uid && !message.deleted) {
          userMessages.push(message)
        }
      }
      return userMessages
    },

    userByName: (state, getters) => (name) => {
      const found = getters.usersArray.find(u => u.name == name) 
      if (found) {
        return state.users[found.uid] 
      }
    },

    userColors: state => {
      let userColors = {}
      for (let uid in state.users) {
        const user = state.users[uid]
        userColors[`--${uid}`] = user.connected ? user.color : 'lightgrey'
      }
      return userColors
    },

    userNames: (state, getters) => {
      return getters.notDeletedUsers.map(user => user.name)
    },

    connectedUsers: (state, getters) => {
      return getters.notDeletedUsers.filter(u => u.connected === true)
    },

    connectedUsersFirst: (state, getters) => {
      return getters.notDeletedUsers.sort((a, b) => {
        return a.connected === b.connected ? 0 : a.connected ? -1 : 1
      })
    },

    notDeletedUsers: (state, getters) => {
      return getters.usersArray.filter(u => u.deleted !== true)
    },

    notDeletedMessages: (state, getters) => {
      return getters.messagesArray.filter(m => m.deleted !== true) 
    },

    usersArray: state => {
      return Object.values(state.users)
    },

    messagesArray: state => {
      return Object.values(state.messages)
    },

    centerOf: (state, getters) => obj => {
      obj = getters.pixelsFrom(obj)
      return {
        x: obj.x - obj.w / 2,
        y: obj.y - obj.h / 2,
        w: obj.w || 0,
        h: obj.h || 0,
      }
    },

    positionOf: (state, getters) => obj => {
      obj = getters.pixelsFrom(obj)
      return {
        x: obj.x - state.windowWidth / 2,
        y: obj.y - state.windowHeight / 2
      }
    },

    pixelsFrom: state => coords => {
      return {
        x: coords.x * state.scale * state.windowWidth,
        y: coords.y * state.scale * state.windowHeight,
        w: coords.w || 0,
        h: coords.h || 0,
      }
    },
  
  },

  strict: process.env.NODE_ENV !== 'production',



})

export default store