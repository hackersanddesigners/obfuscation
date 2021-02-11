import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)


// we will use the following variables to temporarily
// hold the dictionaries we will regularly use to merge
// and sync databases.

let 
  userDBs = [], 
  largestUserDB = {},
  messagesDBs = [],
  largestMessageDB = {}

const store = new Vuex.Store({


  // strict mode is only enabled for dev environment.

  strict: process.env.NODE_ENV !== 'production',

  state: {


    // initial values for application state.

    version: 6,
    save: true,

    uid: null,

    registered: false,
    visited: false,
    blocked: false,


    // users and messages are populated by a combi-
    // nation of local storage and conflict-free data
    // replication with other peers over the socket.

    users: {},

    messages: {},


    // territories are pre-defined here.

    territories: [
      { 
        name: 'The Reception',
        id: 'readme',
        borders: {
          x: 0.4,
          y: 0.4,
        },
      },
      { 
        name: 'The Exhibition Space',
        id: 'exhibition',
        borders: {
          x: 0,
          y: 0,
        },
      },
      { 
        name: 'The Workshop Space and Time Table',
        id: 'timetable',
        borders: {
          x: 0.5,
          y: 0,
        },
      },
    ],


    // default vlaues for map position, dimensions, 
    // grid, and scale (zoom).

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


    // app state mutations.

    doNotSave: state => state.save = false,
    setUID: (state, uid) => state.uid = uid,

    register: state => state.registered = true,
    visit: state => state.visited = true,
    block: state => state.blocked = true,


    // app database mutations.

    setUsers: (state, users) => state.users = users,
    setUser: (state, user) => { 
      Vue.set(state.users, user.uid, user)
    },

    setMessages: (state, messages) => state.messages = messages,
    setMessage: (state, message) => {
      Vue.set(state.messages, message.uid, message)
    },


    // app interface mutations.

    zero: state => state.scale = 5,
    zoomIn: state => state.scale += 0.25,
    zoomOut: state  => state.scale > 1 ? state.scale -= 0.25 : null, 

    toggleGrid: state => state.grid = !state.grid,
    resize: (state, size) => state.windowSize = size,
    viewerPosition: (state, pos) => state.windowPos = pos,

  },


  actions: {


    // SOCKET actions: all actions preceded with a 
    // 'socket_' describe the client behaviour when
    // recieving a message from other sockets.

    // '$socket.client.emit(...) sends messages of
    // different kinds to ALL other connected peers.

    socket_connect({ state, commit }) {


      // when you connect, if you are not blocked,
      // announce your presence to everyone.

      if (!state.users[state.uid].deleted) {
        commit('setUser', state.users[state.uid])
        this._vm.$socket.client.emit(
          'user', state.users[state.uid]
        )
      }
    },


    // then, the following action will be run by
    // every peer that recieves your announcement,
    // including you.

    socket_user({ state, commit, dispatch }, data) {
      const user = JSON.parse(data)


      // first, if the reccieved user is not you, 
      // they are committed to your local database.

      if (user.uid !== state.uid) {
        commit('setUser', user)


      // else, if they are you and you are 'blocked',
      // you are deleted again as a double-check.

      } else if (user.deleted === true) {
        dispatch('deleteUser', user)
        
        localStorage.me = JSON.stringify(state.users[state.uid])      
        window.location.reload(true)
      }


      // then, you send everyone your databases of  
      // users and messages for a sync round. All of
      // the connected peers do this.

      this._vm.$socket.client.emit(
        'users', state.users
      )
      this._vm.$socket.client.emit(
        'messages', state.messages
      )
    },


    // you will recieve many databases of users; 
    // add them to an array and start syncing.

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


    // commit every recieved message to your
    // database of messages.

    socket_message({ state, commit }, data) {
      const message = JSON.parse(data)
      commit('setMessage', message)


      // then request a messages database sync.

      this._vm.$socket.client.emit(
        'messages', state.messages
      )
    },


    // same as receiving a database of users:
    // when you recieve a databases of messages, 
    // add it to an array and start syncing.

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


    // when a user changes their position, live
    // input or color, you commit them to your
    // database without requiring a sync.

    socket_appearance({ state, commit }, data) {
      const user = JSON.parse(data)
      if (user.uid !== state.uid) {
        commit('setUser', user)
        localStorage.users = JSON.stringify(state.users)
      }
    },


    // when you are disconnected (reloaded page
    // or connection timed-out), mark everyone as 
    // disconnected and save databases locally.

    socket_disconnect({ state, commit }) { 
      if (state.save) {
        localStorage.me = JSON.stringify(state.users[state.uid])
        for (let uid in state.users) {
          // if (uid !== state.uid) {
            const user = { ...state.users[uid] }
            user.connected = false
            commit('setUser', user)
          // } 
        }
      }
      localStorage.users = JSON.stringify(state.users)
      localStorage.messages = JSON.stringify(state.messages)
    },


    // exceptional action, triggered for everyone
    // if anyone clicks the 'delete everything'
    // button. Development purposes only.

    socket_clearDBs({ commit }) {
      commit('setUsers', {})
      commit('setMessages', {})
      localStorage.clear()
      window.location.reload(true)
    },


    // the following actions can only be triggered
    // by the user themselves and not the swarm.

    // the following is for when you change your name.

    updateSelf({ state, commit }, newSelf) {
      const oldSelf = state.users[state.uid]
      const mergedSelf = { ...oldSelf, ...newSelf }
      commit('setUser', mergedSelf)
      commit('register')


      // announce your new self to the swarm and save.

      this._vm.$socket.client.emit(
        'user', mergedSelf
      )      
      localStorage.me = JSON.stringify(mergedSelf)
    },


    // triggered on every position, input, or color
    // change; basically always running.

    updateSelfAppearance({ state, commit }, newSelf) {
      const oldSelf = state.users[state.uid]
      const mergedSelf = { ...oldSelf, ...newSelf }
      commit('setUser', mergedSelf)
      this._vm.$socket.client.emit(
        'appearance', mergedSelf
      )
    },


    // DELETING: nothing is ever actually 'deleted'
    // from any database, only markd as deleted. This
    // is because the database sync/merge logic will
    // always favour the largest database.

    deleteUser({ state, commit, dispatch }, user ) {
      const cloned = { ...state.users[user.uid] }
      cloned.deleted = true
      commit('setUser', cloned)
      this._vm.$socket.client.emit(
        'user', cloned
      )

      // deleting a user == blocking them and then
      // deleting all their messages.

      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch('deleteMessage', message)
        }
      }
    },


    // special treatment for deleting yourself:
    // your local storage is cleared so that you can
    // re-join as a new user that is not marked as
    // deleted / blocked.

    deleteSelf({ state, commit, dispatch }) {
      commit('doNotSave')
      dispatch('deleteUser', state.users[state.uid])
      localStorage.clear()
      window.location.reload(true)
    },


    // deleting a message marks it as deleted.

    deleteMessage({ state, commit }, message ) {
      const cloned = { ...state.messages[message.uid] }
      cloned.deleted = true
      commit('setMessage', cloned)
      this._vm.$socket.client.emit(
        'message', cloned
      )
    },

    // censoring a message marks it as censored.

    censorMessage({ state, commit }, message ) {
      const cloned = { ...state.messages[message.uid] }
      cloned.censored = !state.messages[message.uid].censored
      commit('setMessage', cloned)
      this._vm.$socket.client.emit(
        'message', cloned
      )
    },


    // The database sync and merge logic for users.

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


    // The database sync and merge logic for messages.

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

    me: state => state.users[state.uid],

    isMe: state => user => user.uid === state.uid,

    userByName: (state, getters) => (name) => {
      const found = getters.usersArray.find(u => u.name == name) 
      if (found) {
        return state.users[found.uid] 
      }
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