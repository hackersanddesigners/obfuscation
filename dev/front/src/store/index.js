import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({


  // strict mode is only enabled for dev environment.

  strict: process.env.NODE_ENV !== 'production',

  state: {

    ////////////////////////////////////////////
    //////////////////// UI ////////////////////
    ////////////////////////////////////////////

    // initial values for application state.

    // version: 8,

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


    ////////////////////////////////////////////
    //////////////////// CHAT /////////////////
    ////////////////////////////////////////////

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

    connectedCount: 1,
    maxLiveCount: 250,
    wait: false,
    highCPUNotifiction: {
      time: ((new Date).getTime()),
      author: 'Server',
      content: "The platframe is currently experiencing a high number of concurrent visitors. To remain functional, it will stop displaying the correct positions of participants' cursors. You can still send and receive messages."
    },


    ////////////////////////////////////////////
    //////////////////// REGIONS ///////////////
    ////////////////////////////////////////////


    territories: {},
    location: {},
    general: {
      name: 'general',
      slug: 'general'
    },
    currentLiveSession: null,
    ticker: {},

  },


  mutations: {


    // app state mutations.

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
      state.users[user.uid].typing = user.typing || ''
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
    setConnectedCount: (state, count) => {
      state.connectedCount = count
    },
    setWait: (state, wait) => { state.wait = wait },


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
    setCurrentLiveSession: (state, session) => {
      Vue.set(state, 'currentLiveSession', session)
    },
    setTicker: (state, ticker) => {
      Vue.set(state, 'ticker', ticker)
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


    socket_user({ state, commit }, user) {
      commit('setUser', user)
      const status = 
        user.deleted === true ? 'deleted' :
        user.blocked === true ? 'blocked' :
        'connected'
      console.log('user', user.name, status)
      if (user.uid === state.uid) {
        if (user.blocked) {
          commit('block')
        }
        if (user.deleted) {
          commit('doNotSave')
          console.log("you're deleted")
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
      if (user.uid !== state.uid) {
        commit('setUserModerator', user)
        console.log('user', user.name, 'upgraded to moderator')
      }
    },

    socket_appearance({ state, commit, dispatch }, user) {
      if (user.uid !== state.uid) {
        commit('setUserAppearance', user)
      }
      if (user.connected === false) {
        console.log('user', user.name, 'disconnected')
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
      if (state.save) {
        if (!state.registered) {
          localStorage.uid = state.uid      
        }
      }
    },

    socket_count({ commit }, count) {
      commit('setConnectedCount', count)
    },

    updatePosition({ state, getters, commit, dispatch }, position) {
      position.uid = state.uid
      commit('setUserPosition', position)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit('position', position) 
          dispatch('resetWait')
        }
      }
    },

    updateTyping({ state, getters, commit, dispatch }, text) {
      text.uid = state.uid
      commit('setUserTyping', text)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit('typing', text)
          dispatch('resetWait')
        }
      }
    },

    updateColor({ state, getters, commit, dispatch }, color) {
      color.uid = state.uid
      commit('setUserColor', color)
      if (!getters.networkConservationMode) {
        if (!state.wait) {
          this._vm.$socket.client.emit('color', color)
          dispatch('resetWait')
        }
      }
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


    disconnect({ state, commit, dispatch }) {
      console.log('disconnecting')
      commit('setUserDisconnected', state.uid)
      const me = state.users[state.uid]
      dispatch('updateAppearance', {
        name: me.name,
        color: me.color,
        x: me.x,
        y: me.y,
        messageLifetime: me.messageLifetime,
        connected: false,
        typing: null,
      })
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

    deleteAllUnamed({ state, dispatch }) {
      for (let uid in state.users) {
        const user = state.users[uid] 
        if (user && user.name && user.name.includes(user.uid) && user.connected == false) {
          console.log('deleting ', user.name)
          dispatch('deleteUser', user)
        } 
      }
    },

    resetWait({ commit, getters }) {
      commit('setWait', true)
      setTimeout(() => {
        commit('setWait', false)
      }, 1000 / getters.emitsPerSecond)
    }


  },


  getters: {

    me: state => state.users[state.uid],
    isMe: state => user => user.uid === state.uid,

    networkConservationMode: state => (
      state.connectedCount > state.maxLiveCount
    ),
    emitsPerSecond: state => (
      2 * state.maxLiveCount / state.connectedCount
    ),


    usersArray: state => ( 
      Object.values(
        state.users
      ) 
    ),
    notDeletedUsers: (state, getters) => ( getters
      .usersArray
      .filter(u => 
        !u.deleted && 
        !u.blocked &&
        !u.isMobile
      )
      .sort((a, b) =>
        b.moderator - a.moderator
      )
    ),
    connectedUsers: (state, getters) => ( getters
      .notDeletedUsers
      .filter(u => 
        u.connected
      )
    ),
    connectedUsersFirst: (state, getters) => ( getters
      .notDeletedUsers
      .sort((a, b) => 
        b.connected - a.connected
      )
    ),
    userNames: (state, getters) => ( getters
      .notDeletedUsers
      .map(
        user => user.name
      )
    ),
    userColors: (state, getters) => ( getters
      .usersArray
      .map(u => 
        ({
          [`--${u.uid}`]: ( 
            state.desiresContrast ? 'black' : 
            u.connected ? u.color : 'var(--disconnected)'
          )
        })
      )
    ),

  
    messagesArray: state => ( 
      Object.values(
        state.messages
      ) 
    ),
    notDeletedMessages: (state, getters) => ( getters
      .messagesArray
      .filter(m => (
        state.users[m.authorUID] &&
        m.uid && 
        !m.deleted && 
        !m.navigation &&
        !m.stream &&
        (state.currentLiveSession ? m.location !== 'livestream' : true)
      ))
    ),
    messagesByUser: (state, getters) => user => ( getters
      .messagesArray
      .filter(m => 
        m.authorUID === user.uid
      )
    ),


    territoriesArray: state => ( 
      Object.values(
        state.territories
      )
    ),
    regionColors: (state, getters) => ( getters
      .territoriesArray
      .map(t => 
        ({
          [`--${t.slug}`]: state.scale > 7 ? t.color : null
        })
      )
    ),
    territoryByBorders: (state, getters) => pos => {
      const 
        diff   = 0.5 / state.scale,
        coords = getters.coordsFrom(pos)

      return ( getters
        .territoriesArray
        .find(territory => {
          const 
            bordersX = territory.borders.x * state.widthFactor,
            bordersY = territory.borders.y,
            bordersW = territory.borders.w * state.widthFactor,
            bordersH = territory.borders.h,
            minX     = bordersX - diff,
            minY     = bordersY - diff,
            maxX     = bordersW + bordersX - diff,
            maxY     = bordersH + bordersY - diff

          return ( 
            coords.x > minX && coords.x < maxX && 
            coords.y > minY && coords.y < maxY 
          )
        }) 
      ) || state.general
    },
    positionOfIsland: state => slug => {
      const 
        selector = slug + 'Island',
        island   = document.getElementById(selector)

      if (!island) return

      const 
        parent   = island.offsetParent,
        gParent  = parent.offsetParent,
        ggParent = gParent.offsetParent,
        left     = 
          island.offsetLeft +
          parent.offsetLeft +
          gParent.offsetLeft +
          ggParent.offsetLeft,
        top      = 
          island.offsetTop +
          parent.offsetTop +
          gParent.offsetTop +
          ggParent.offsetTop,
        x        = left - (state.windowSize.w - island.offsetWidth) / 2,
        y        = state.isMobile ? top - 100 : top - 100
        
      return { x, y }
    },


    centerOf: (state, getters) => obj => {
      obj = getters.pixelsFrom(obj)
      const 
        centerX = (state.windowSize.w - obj.w) / 2,
        centerY = (state.windowSize.h - obj.h) / 2,
        shiftX  = (
          state.isMobile || centerX >= 0 ? 
          centerX : 0
        ),
        shiftY  = (
          state.isMobile ? 50 :
          centerY >= 0 ? centerY : 0
        ),
        x       = obj.x - shiftX,
        y       = obj.y - shiftY
      return { x, y }
    },
    pixelsFrom: state => coords => ({
      x: coords.x * state.scale * state.windowSize.w,
      y: coords.y * state.scale * state.windowSize.h,
      w: coords.w * state.scale * state.windowSize.w || 0,
      h: coords.h * state.scale * state.windowSize.h || 0,
    }),
    coordsFrom: state => pixels => ({
      x: pixels.x / (state.scale * state.windowSize.w),
      y: pixels.y / (state.scale * state.windowSize.h),
      w: pixels.w / (state.scale * state.windowSize.w) || 0,
      h: pixels.h / (state.scale * state.windowSize.h) || 0,
    }),

  },


})