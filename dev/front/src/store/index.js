import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const store = new Vuex.Store({


  // strict mode is only enabled for dev environment.

  strict: process.env.NODE_ENV !== 'production',

  state: {


    // initial values for application state.

    version: 3,
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


    // territories are defined in Strapi.

    territories: {},
    location: {},


    // livestream

    stream: {
      playbackId: null,
      status: null,
    },


    // default vlaues for map position, dimensions, 
    // grid, and scale (zoom).

    scale: 5,
    grid: false,
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

    setUsers: (state, users) => { 
      for (let uid in users) {
        Vue.set(state.users, uid, users[uid])
      }
    },
    setUser: (state, user) => { 
      Vue.set(state.users, user.uid, user)
    },
    setUserPosition: (state, position) => {
      state.users[position.uid].x = position.x
      state.users[position.uid].y = position.y
      state.users[position.uid].connected = true
    },
    setUserTyping: (state, text) => {
      state.users[text.uid].typing = text.typing
      state.users[text.uid].connected = true
    },
    setUserColor: (state, color) => {
      state.users[color.uid].color = color.color
      state.users[color.uid].connected = true
    },
    setUserAppearance: (state, user) => {
      state.users[user.uid].name = user.name
      state.users[user.uid].color = user.color
      state.users[user.uid].connected = true
    },
    setUserDisconnected: (state, uid) => {
      state.users[uid].connected = false
    },
    setUserBlocked: (state, user) => {
      state.users[user.uid].blocked = true
    },
    setUserDeleted: (state, user) => {
      state.users[user.uid].deleted = true
    },

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
      state.messages[message.uid].censored = true
    },

    setTerritories: (state, regions) => {
      state.territories = regions
    },
    setTerritorySize: (state, terr) => {
      Vue.set(state.territories[terr.slug].borders, 'w', terr.size.w)
      Vue.set(state.territories[terr.slug].borders, 'h', terr.size.h)
    },
    setLocation: (state, newLocation) => {
      state.location = newLocation
    },


    setStream: (state, playbackId) => {
      Vue.set(state.stream, 'playbackId', playbackId)
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

    socket_user({ state, commit }, user) {
      commit('setUser', user)
      if (user.uid === state.uid) {
        if (user.blocked) {
          commit('block')
        }
        if (user.deleted) {
          commit('doNotSave')
          localStorage.clear()
          window.location.reload(true)
        }
      }
    },

    socket_message({ commit }, message) {
      commit('setMessage', message)
    },

    socket_position({ state, commit }, position) {
      if (position.uid !== state.uid) {
        commit('setUserPosition', position)
      }
    },

    socket_typing({ state, commit }, text) {
      if (text.uid !== state.uid) {
        commit('setUserTyping', text)
      }
    },

    socket_color({ state, commit }, color) {
      if (color.uid !== state.uid) {
        commit('setUserColor', color)
      }
    },

    socket_appearance({ state, commit }, user) {
      if (user.uid !== state.uid) {
        commit('setUserAppearance', user)
      }
    },

    socket_disconnect({ state }) { 
      if (state.save) {
        if (state.registered) {
          // localStorage.me = JSON.stringify(state.users[state.uid])
        } else {
          localStorage.uid = state.uid      
        }
      }
    },

    updatePosition({ state, commit }, position) {
      position.uid = state.uid
      commit('setUserPosition', position)
      this._vm.$socket.client.emit(
        'position', position
      )
    },

    updateTyping({ state, commit }, text) {
      text.uid = state.uid
      commit('setUserTyping', text)
      this._vm.$socket.client.emit(
        'typing', text
      )
    },

    updateColor({ state, commit }, color) {
      color.uid = state.uid
      commit('setUserColor', color)
      this._vm.$socket.client.emit(
        'color', color
      )
    },

    updateAppearance({ state, commit }, user) {
      user.uid = state.uid
      commit('setUserAppearance', user)
      this._vm.$socket.client.emit(
        'appearance', user
      )
    },

    disconnect({ state, commit }) {
      commit('setUserDisconnected', state.uid)
      this._vm.$socket.client.emit('user', state.users[state.uid])
    },

    blockUser({ state, commit, dispatch }, user ) {
      commit('setUserBlocked', user)
      this._vm.$socket.client.emit(
        'user', user
      )

      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch('deleteMessage', message)
        }
      }
    },

    deleteUser({ state, commit, dispatch }, user ) {
      commit('setUserDeleted', user)
      this._vm.$socket.client.emit(
        'user', user
      )

      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch('deleteMessage', message)
        }
      }
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
    

    // exceptional action, triggered for everyone
    // if anyone clicks the 'delete everything'
    // button. Development purposes only.

    socket_clearDBs({ commit }) {
      commit('setUsers', {})
      commit('setMessages', {})
      window.location.reload(true)
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

    territoryByName: getters => name => {
      return getters.territoriesArray.find(t => t.name == name) 
    },


    territoryBySlug: state => slug => {
      return state.territories[slug] 
    },

    territoryByBorders: (state, getters) => pos => {
      let general = {
        name: 'general',
        slug: 'general'
      }
      let 
        coords = getters.coordsFrom(pos),
        diff = 0.5,
        // coords = pos,
        // diff = 0,
        found = getters.territoriesArray.find((territory) => {

        const 
          minX = territory.borders.x - diff / state.scale,
          minY = territory.borders.y - diff / state.scale,
          maxX = territory.borders.w + territory.borders.x - diff / state.scale,
          maxY = territory.borders.h + territory.borders.y - diff / state.scale

          // if (territory.slug === 'glossary') {
          //   console.log('* territory:  ', territory.slug)
          //   console.log('**********************************')
          //   console.log('* realWidth:  ', realWidth)
          //   console.log('* width:      ', width)
          //   console.log('* minX:       ', minX)
          //   console.log('* borderX:    ', territory.borders.x)
          //   console.log('* maxX:       ', maxX)
          //   console.log('* coordsX:    ', coords.x)
          //   console.log('* realHeight: ', realHeight)
          //   console.log('* height:     ', height)
          //   console.log('* minY:       ', minY)
          //   console.log('* borderY:    ', territory.borders.y)
          //   console.log('* maxY:       ', maxY)
          //   console.log('* coordsY:    ', coords.y)
          //   console.log('**********************************')
          // }

        if (coords.x > minX && coords.x < maxX
         && coords.y > minY && coords.y < maxY
         ) {
            return territory
          }

      }) 
      return found || general
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
        userColors[`--${uid}`] = user.connected ? user.color : 'var(--disconnected)'
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
      return getters.notBlockedUsers.sort((a, b) => {
        return a.connected === b.connected ? 0 : a.connected ? -1 : 1
      })
    },

    notBlockedUsers: (state, getters) => {
      return getters.notDeletedUsers.filter(u => u.blocked !== true)
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

    territoriesArray: state => {
      return Object.values(state.territories)
    },

    centerOf: (state, getters) => obj => {
      obj = getters.pixelsFrom(obj)
      const 
        shiftX = 
          ((state.windowSize.w - obj.w) / 2) >= 0 ? 
          ((state.windowSize.w - obj.w) / 2) : 0,
        shiftY = 
          ((state.windowSize.h - obj.h) / 2) >= 0 ? 
          ((state.windowSize.h - obj.h) / 2) : 0,
        x = obj.x - shiftX,
        y = obj.y - shiftY
      return {
        x: x,
        y: y,
      }
    },

    positionOfIsland: state => slug => {
      const 
        selector = slug + 'Island',
        island = document.getElementById(selector),
        left = island.offsetLeft + island.offsetParent.offsetLeft,
        top = island.offsetTop + island.offsetParent.offsetTop,
        centerX = left - (state.windowSize.w - island.offsetWidth) / 2,
        centerY = top - (state.windowSize.h - island.offsetHeight) / 2 

      return {
        x: centerX,
        y: centerY
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
        w: coords.w * state.scale * state.windowSize.w || 0,
        h: coords.h * state.scale * state.windowSize.h || 0,
      }
    },

    coordsFrom: state => pixels => {
      return {
        x: pixels.x / (state.scale * state.windowSize.w),
        y: pixels.y / (state.scale * state.windowSize.h),
        w: pixels.w / (state.scale * state.windowSize.w) || 0,
        h: pixels.h / (state.scale * state.windowSize.h) || 0,
      }
    },
  
  },


})


export default store