import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({


  // strict mode is only enabled for dev environment.

  strict: process.env.NODE_ENV !== 'production',

  state: {


    // initial values for application state.

    version: 8,
    lifecycle: process.env.VUE_APP_LIFECYCLE || 0,
    save: true,

    uid: null,

    registered: false,
    visited: false,
    blocked: false,

    moderator: false,

    // users and messages are populated by a combi-
    // nation of local storage and conflict-free data
    // replication with other peers over the socket.

    users: {},
    messages: {},


    // territories are defined in Strapi.

    territories: {},
    general: {
      name: 'general',
      slug: 'general'
    },
    location: {},


    // livestream

    stream: {
      playbackId: null,
      status: null,
    },


    // ticker

    ticker: {},


    // default vlaues for map position, dimensions, 
    // grid, and scale (zoom).
    
    isMobile: false,
    scale: 10,
    widthFactor: 1,
    grid: false,
    desiresTexture: 
      localStorage.desiresTexture ? 
      JSON.parse(localStorage.desiresTexture) : true,
    desiresContrast: 
      localStorage.desiresContrast ? 
      JSON.parse(localStorage.desiresContrast) : false,
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

    setLifecycle: (state, lifecycle) => state.lifecycle = lifecycle,
    doNotSave: state => state.save = false,
    setUID: (state, uid) => state.uid = uid,

    register: state => state.registered = true,
    deregister: state => state.registered = false,
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
      state.users[position.uid].connected = position.connected
    },
    setUserTyping: (state, text) => {
      state.users[text.uid].typing = text.typing
      // state.users[text.uid].connected = true
    },
    setUserColor: (state, color) => {
      state.users[color.uid].color = color.color
      state.users[color.uid].connected = true
    },
    setUserAppearance: (state, user) => {
      state.users[user.uid].connected = user.connected ? user.connected : true
      state.users[user.uid].name = user.name
      state.users[user.uid].color = user.color
      state.users[user.uid].x = user.x
      state.users[user.uid].y = user.y
      state.users[user.uid].messageLifetime = user.messageLifetime
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
    setUserModerator: (state, user) => {
      state.users[user.uid].moderator = user.moderator
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
      // Vue.delete(state.messages, message.uid)
    },
    setMessageCensored: (state, message) => {
      state.messages[message.uid].censored = !state.messages[message.uid].censored
    },

    setTerritories: (state, regions) => {
      for (let slug in regions) {
        Vue.set(state.territories, slug, regions[slug])
      }
    },
    setTerritoryBorders: (state, terr) => {
      Vue.set(state.territories[terr.slug].borders, 'x', terr.x)
      Vue.set(state.territories[terr.slug].borders, 'y', terr.y)
      Vue.set(state.territories[terr.slug].borders, 'w', terr.w)
      Vue.set(state.territories[terr.slug].borders, 'h', terr.h)
    },
    setLocation: (state, newLocation) => {
      state.location = newLocation
    },


    setStream: (state, playbackId) => {
      Vue.set(state.stream, 'playbackId', playbackId)
    },
    setTicker: (state, ticker) => {
      state.ticker = ticker
    },

    // app interface mutations.

    toggleTexture: state => {
      state.desiresTexture = !state.desiresTexture
      localStorage.desiresTexture = state.desiresTexture
    },
    toggleContrast: state => {
      state.desiresContrast = !state.desiresContrast
      localStorage.desiresContrast = state.desiresContrast
    },

    setScale: (state, scale) => state.scale = scale,
    zoomIn: state => state.scale < 20 ? state.scale += 0.25 : null,
    zoomOut: state  => state.scale > 1 ? state.scale -= 0.25 : null, 
    setWidthFactor: (state, factor) => state.widthFactor = factor,

    makeMobile: state => state.isMobile = true,
    makeDesktop: state => state.isMobile = false,
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
          console.log("you're deleted")
          setTimeout(() => {
            localStorage.clear()
            window.location.reload(true)
          }, 2000)
        }
      }
    },

    socket_message({ commit }, message) {
      commit('setMessage', message)
    },

    socket_position({ state, commit }, position) {
      if (position.uid !== state.uid) {
        if (state.users[position.uid]) {
          commit('setUserPosition', position)
        } else {
          console.log(position.uid, " not found.")
        }
      }
    },

    socket_typing({ state, commit }, text) {
      if (text.uid !== state.uid) {
        if (state.users[text.uid]) {
          commit('setUserTyping', text)
        } else {
          console.log(text.uid, " not found.")
        }
      }
    },

    socket_color({ state, commit }, color) {
      if (color.uid !== state.uid) {
        commit('setUserColor', color)
      }
    },

    socket_moderator({ state, commit }, user) {
      console.log(user.uid)
      if (user.uid !== state.uid) {
        commit('setUserModerator', user)
      }
    },

    socket_appearance({ state, commit, dispatch }, user) {
      if (user.uid !== state.uid) {
        commit('setUserAppearance', user)
      }
      if (user.messageLifetime) {
        const 
          now = (new Date()).getTime(),
          twodays = 172800000 // two days
        for(let uid in state.messages) {
          const message = state.messages[uid]
          if (message.authorUID == user.uid) {
            if (message.time < now - (user.messageLifetime || twodays)) {
              console.log(message.content)
              dispatch('deleteMessage', message)
            } 
          }
        }
      }
    },

    socket_disconnect({ state }) { 
      // dispatch('disconnect')
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


    updateModerator({ state, commit }, moderator) {
      moderator.uid = state.uid
      commit('setUserModerator', moderator)
      this._vm.$socket.client.emit(
        'moderator', moderator
      )
    },


    disconnect({ state, commit }) {
      commit('setUserDisconnected', state.uid)
      this._vm.$socket.client.emit('user', state.users[state.uid])
    },

    blockUser({ state, commit, dispatch }, user ) {
      commit('setUserBlocked', user)
      this._vm.$socket.client.emit('user', user)

      for(let uid in state.messages) {
        const message = state.messages[uid]
        if (message.authorUID == user.uid) {
          dispatch('deleteMessage', message)
        }
      }
    },

    deleteUser({ state, commit, dispatch }, user ) {
      commit('setUserDeleted', user)
      console.log(state.users[user.uid].deleted)
      this._vm.$socket.client.emit('user', user)

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
      let 
        diff = 0.5 / state.scale,
        coords = getters.coordsFrom(pos),
        found = getters.territoriesArray.find((territory) => {
          const 
            borders = {
              x: territory.borders.x * state.widthFactor,
              y: territory.borders.y,
              w: territory.borders.w * state.widthFactor,
              h: territory.borders.h,
            },
            minX = borders.x - diff,
            minY = borders.y - diff,
            maxX = borders.w + borders.x - diff,
            maxY = borders.h + borders.y - diff

          if ( coords.x > minX && coords.x < maxX
            && coords.y > minY && coords.y < maxY ) {
            return territory
          }
          // if (territory.slug === 'glossary') {
          //   console.log('* territory:  ', territory.slug)
          //   console.log('**********************************')
          //   console.log('* minX:       ', minX)
          //   console.log('* borderX:    ', territory.borders.x)
          //   console.log('* maxX:       ', maxX)
          //   console.log('* coordsX:    ', coords.x)
          //   console.log('* minY:       ', minY)
          //   console.log('* borderY:    ', territory.borders.y)
          //   console.log('* maxY:       ', maxY)
          //   console.log('* coordsY:    ', coords.y)
          //   console.log('**********************************')
          // }
        }) 
      return found || state.general
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

    regionColors: state => {
      let regionColors = {}
      for (let slug in state.territories) {
        const terr = state.territories[slug]
        regionColors[`--${slug}`] = terr.color
      }
      return regionColors
    },

    userColors: state => {
      let userColors = {}
      for (let uid in state.users) {
        const user = state.users[uid]
        userColors[`--${uid}`] = 
          state.desiresContrast ? 'black' : 
          user.connected === true ? user.color : 'var(--disconnected)'
      }
      return userColors
    },

    userNames: (state, getters) => {
      return getters.notDeletedUsers.map(user => user.name)
    },

    connectedUsers: (state, getters) => {
      return getters.notBlockedUsers
        .filter(u => (
          ( u.connected === true ) &&
          ( u.isMobile ? u.isMobile === false : true )
        ))
        .sort((a, b) => (
          ( a.moderator || b.moderator ) ?
          ( 
            !a.moderator ? 1 : b.moderator ? -1 :
            b.moderator - a.moderator
          ) : -1
        ))
    },

    connectedUsersFirst: (state, getters) => {
      return getters.notBlockedUsers.sort((a, b) => (
        b.connected - a.connected ||
        ( a.moderator || b.moderator ) ?
        ( 
          !a.moderator ? 1 : b.moderator ? -1 :
          b.moderator - a.moderator
        ) : 0
      ))
    },

    notBlockedUsers: (state, getters) => {
      return getters.notDeletedUsers.filter(u => !u.blocked)
    },

    notDeletedUsers: (state, getters) => {
      return getters.usersArray.filter(u => !u.deleted && !u.isMobile)
    },

    notDeletedMessages: (state, getters) => {
      return getters.messagesArray.filter(m => (
        m.uid && 
        !m.deleted && 
        !m.navigation &&
        !m.stream
      ))
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
          // state.isMobile ? 50 :
          // ((state.windowSize.w - obj.w) / 2) >= 0 ? 
          // ((state.windowSize.w - obj.w) / 2) : 0,
          (state.isMobile || ((state.windowSize.w - obj.w) / 2)) >= 0 ? 
          ((state.windowSize.w - obj.w) / 2) : 0,
        shiftY = 
          state.isMobile ? 50 :
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
        island = document.getElementById(selector)

      if (island) {
        const 
          parent = island.offsetParent,
          grandparent = parent.offsetParent,
          greatgrandparent = grandparent.offsetParent,
          ancestor = greatgrandparent.offsetParent,
          ancestor2 = ancestor.offsetParent,
          buffer = parent.classList.contains('staggered') ? 2000 : 50,
          left = 
            island.offsetLeft <= buffer ?
            island.offsetLeft + parent.offsetLeft + grandparent.offsetLeft + greatgrandparent.offsetLeft + ancestor.offsetLeft + ancestor2.offsetLeft :
            island.offsetLeft + parent.offsetLeft,
          top = 
            island.offsetTop <= buffer ?
            island.offsetTop + parent.offsetTop + grandparent.offsetTop + greatgrandparent.offsetTop + ancestor.offsetTop + ancestor2.offsetTop:
            island.offsetTop + parent.offsetTop,
          centerX = left - (state.windowSize.w - island.offsetWidth) / 2,
          centerY = state.isMobile ? top - 100 : top - 100
        return {
          x: centerX,
          y: centerY
        }
      } else {
        return null
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