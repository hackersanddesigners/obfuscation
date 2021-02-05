import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

let 
  userDBs = [], 
  largestUserDB = {},
  messagesDBs = [],
  largestMessageDB = {}

const store = new Vuex.Store({


  strict: process.env.NODE_ENV !== 'production',


  state: {

    version: 6,
    save: true,

    uid: null,

    registered: false,
    visited: false,
    blocked: false,

    users: {},

    messages: {},

    territories: [
      { 
        name: 'center',
        borders: {
          x: 0.4,
          y: 0.4,
        },
      },
    ],

    scale: 5,
    grid: true,
    windowSize: {
      w: window.innerWidth,
      h: window.innerHeight,
    },
    windowPos: {
      x: null,
      y: null,
    },

  },


  mutations: {

    doNotSave: state => state.save = false,
    setUID: (state, uid) => state.uid = uid,

    register: state => state.registered = true,
    visit: state => state.visited = true,
    block: state => state.blocked = true,

    setUsers: (state, users) => state.users = users,
    setUser: (state, user) => Vue.set(state.users, user.uid, user),

    setMessages: (state, messages) => state.messages = messages,
    setMessage: (state, message) => Vue.set(state.messages, message.uid, message),

    zero: state => state.scale = 5,
    zoomIn: state => state.scale += 0.25,
    zoomOut: state  => state.scale > 1 ? state.scale -= 0.25 : null, 

    toggleGrid: state => state.grid = !state.grid,
    resize: (state, size) => state.windowSize = size,
    viewerPosition: (state, pos) => state.windowPos = pos,

  },


  actions: {

    socket_connect({ state, commit }) {
      if (!state.users[state.uid].deleted) {
        commit('setUser', state.users[state.uid])
        this._vm.$socket.client.emit('user', state.users[state.uid])
      }
    },

    socket_user({ state, commit, dispatch }, data) {
      const user = JSON.parse(data)

      if (user.uid !== state.uid) {
        commit('setUser', user)

      } else if (user.deleted === true) {
        dispatch('deleteUser', user)
        
        localStorage.me = JSON.stringify(state.users[state.uid])      
        window.location.reload(true)
      }

      this._vm.$socket.client.emit('users', state.users)
      this._vm.$socket.client.emit('messages', state.messages)
    },

    socket_users({ dispatch }, data) {
      const receivedDB = JSON.parse(data)
      // const numberOfUsers = (this.getConnectedUsers()).length
      // if (userDBs.length < numberOfUsers) {
        // console.log(userDBs.length, numberOfUsers)
        userDBs.push(receivedDB)   
      // } else if (userDBs.length == numberOfUsers) {
        // console.log(userDBs.length, numberOfUsers)
        console.log(`Syncing ${userDBs.length} user DBs.`)
        dispatch('userDBsync')
      // } else if (userDBs.length > numberOfUsers) {
        // console.log('too many dbs, you did something wrong')
      // }
    },

    socket_message({ state, commit }, data) {
      const message = JSON.parse(data)
      commit('setMessage', message)
      this._vm.$socket.client.emit('messages', state.messages)
    },

    socket_messages({ dispatch }, data) {
      const receivedDB = JSON.parse(data)
      // const numberOfUsers = (this.getConnectedUsers()).length
      // if (messagesDBs.length < numberOfUsers) {
        messagesDBs.push(receivedDB)      
      // } else if (messagesDBs.length == numberOfUsers) {
        console.log(`Syncing ${messagesDBs.length} message DBs.`)
        dispatch('messageDBsync')
      // } else if (messagesDBs.length > numberOfUsers) {
        // console.log('too many dbs, you did something wrong')
      // }
    },

    socket_appearance({ state, commit }, data) {
      const user = JSON.parse(data)
      if (user.uid !== state.uid) {
        commit('setUser', user)
        localStorage.users = JSON.stringify(state.users)
      }
    },

    socket_clearDBs({ commit }) {
      commit('setUsers', {})
      commit('setMessages', {})
      localStorage.clear()
      window.location.reload(true)
    },

    socket_disconnect({ state, commit }) { 
      if (state.save) {
        localStorage.me = JSON.stringify(state.users[state.uid])
        for (let uid in state.users) {
          if (uid !== state.uid) {
            const user = { ...state.users[uid] }
            user.connected = false
            commit('setUser', user)
          } 
        }
      }
      localStorage.users = JSON.stringify(state.users)
      localStorage.messages = JSON.stringify(state.messages)
    },

    updateSelf({ state, commit }, newSelf) {
      const oldSelf = state.users[state.uid]
      const mergedSelf = { ...oldSelf, ...newSelf }
      commit('setUser', mergedSelf)
      commit('register')
      this._vm.$socket.client.emit('user', mergedSelf)      
      localStorage.me = JSON.stringify(mergedSelf)
    },

    updateSelfAppearance({ state, commit }, newSelf) {
      const oldSelf = state.users[state.uid]
      const mergedSelf = { ...oldSelf, ...newSelf }
      commit('setUser', mergedSelf)
      this._vm.$socket.client.emit('appearance', mergedSelf)
    },

    deleteSelf({ state, commit, dispatch }) {
      commit('doNotSave')
      dispatch('deleteUser', state.users[state.uid])
      localStorage.clear()
      window.location.reload(true)
    },

    deleteUser({ state, commit, dispatch }, user ) {
      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch('deleteMessage', message)
        }
      }
      const cloned = { ...state.users[user.uid] }
      cloned.deleted = true
      commit('setUser', cloned)
      this._vm.$socket.client.emit('user', cloned)
    },

    deleteMessage({ state, commit }, message ) {
      const cloned = { ...state.messages[message.uid] }
      cloned.deleted = true
      commit('setMessage', cloned)
      this._vm.$socket.client.emit('message', cloned)
    },

    censorMessage({ state, commit }, message ) {
      const cloned = { ...state.messages[message.uid] }
      cloned.censored = !state.messages[message.uid].censored
      commit('setMessage', cloned)
      this._vm.$socket.client.emit('message', cloned)
    },

    userDBsync({ state, commit }) {

      // get the DB with the most users
      userDBs.sort((a, b) => Object.keys(b).length - Object.keys(a).length)
      largestUserDB = _.cloneDeep(userDBs[0])

      // iterate through each db to fully merge
      userDBs.forEach(DB => {

        // for every user in every DB
        for (let uid in DB) {

          // if user doesnt exist in your largest db, add them        
          if (!largestUserDB[uid]) {
            largestUserDB[uid] = DB[uid] 
          }

          // if user is marked as deleted, mark them as deleted
          if (DB[uid].deleted) {
            largestUserDB[uid].deleted = true
          }

          // if user has changed their name, inherit it
          if (!DB[uid].name.startsWith('newUser-')) {
            largestUserDB[uid].name = DB[uid].name
          }
        }
      })

      // point your own user DB to the newly merged largest DDB
      for (let uid in largestUserDB) {
        const user = largestUserDB[uid]
        if (uid !== state.uid) {
          commit('setUser', user)
        } 
      }
      localStorage.users = JSON.stringify(state.users)

      // complete sync by clearing carrier variables
      // userDBs = []
      // largestUserDB = {}
    },

    messageDBsync({ state, commit }) {

      // get the DB with the most messagess
      messagesDBs.sort((a, b) => Object.keys(b).length -  Object.keys(a).length)
      largestMessageDB = _.cloneDeep(messagesDBs[0])

      // iterate through each db to fully merge
      messagesDBs.forEach(DB => {

        // for every message in every DB
        for (let uid in DB) {

          // if message doesnt exist in largest db, add it        
          if (!largestMessageDB[uid]) {
            largestMessageDB[uid] = DB[uid]   
          }

          // if message is marked as deleted, mark it as deleted
          if (DB[uid].deleted) {
            largestMessageDB[uid].deleted = true
          }

          // if message is marked as censored, mark it as censored
          if (DB[uid].censored) {
            largestMessageDB[uid].censored = true
          }
        }
      })

      // point your own message DB to the newly merged largest DB
      for (let uid in largestMessageDB) {
        const message = largestMessageDB[uid]
        commit('setMessage', message)
      }
      localStorage.messages = JSON.stringify(state.messages)

      // complete sync by clearing carrier variables
      // messagesDBs = []
      // largestMessageDB = {}
    },
  

  },


  getters: {

    me: state => {
      return state.users[state.uid]
    },

    isMe: state => user => {
      return user.uid === state.uid
    },

    territoryByName: state => name => {
      return state.territories.find(u => u.name == name) 
    },

    messagesByUser: state => user => {
      let userMessages = []
      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid && !message.deleted) {
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
      return getters.messagesArray.filter(m => (m.deleted !== true && m.uid)) 
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
        x: obj.x - state.windowSize.w / 2,
        y: obj.y - state.windowSize.h / 2
      }
    },

    pixelsFrom: state => coords => {
      return {
        x: coords.x * state.scale * state.windowSize.w,
        y: coords.y * state.scale * state.windowSize.h,
        w: coords.w || 0,
        h: coords.h || 0,
      }
    },
  
  },


})


export default store