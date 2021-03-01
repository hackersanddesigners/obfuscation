import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const store = new Vuex.Store({


  // strict mode is only enabled for dev environment.

  strict: process.env.NODE_ENV !== 'production',

  state: {


    // initial values for application state.

    version: 2,
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
    setUserName: (state, name) => {
      state.users[name.uid].name = name.name
      state.users[name.uid].connected = true
    },
    setUserBlocked: (state, user) => {
      state.users[user.uid].blocked = true
    },

    setMessages: (state, messages) => {
      for (let uid in messages) {
        Vue.set(state.messages, uid, messages[uid])
      }
    },
    setMessage: (state, message) => {
      Vue.set(state.messages, message.uid, message)
    },

    setTerritories: (state, regions) => {
      state.territories = regions
    },
    setTerritorySize: (state, terr) => {
      Vue.set(state.territories[terr.slug].borders, 'w', terr.size.w)
      Vue.set(state.territories[terr.slug].borders, 'h', terr.size.h)
    },


    // app interface mutations.

    setLocation: (state, newLocation) => {
      state.location = newLocation
    },
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

      // first, if the reccieved user is not you, 
      // they are committed to your local database.

      if (user.uid !== state.uid) {
        console.log('its not you, its ', user.uid)
        commit('setUser', user)


      // else, if they are you and you are 'blocked',
      // you are blocked again as a double-check.

      } else if (user.uid === state.uid) {
        console.log('its you: ', user.uid)
        // commit('setUser', user)
        // if (user.blocked) {
          // dispatch('blockUser', user)
          
          // localStorage.me = JSON.stringify(state.users[state.uid])      
          // window.location.reload(true)
        // }
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

    socket_name({ state, commit }, name) {
      if (name.uid !== state.uid) {
        commit('setUserName', name)
      }
    },


    // when you are disconnected (reloaded page
    // or connection timed-out), mark everyone as 
    // disconnected and save databases locally.

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

    updateName({ state, commit }, name) {
      name.uid = state.uid
      commit('setUserName', name)
      this._vm.$socket.client.emit(
        'name', name
      )
    },


    // DELETING: nothing is ever actually 'blocked'
    // from any database, only markd as blocked. This
    // is because the database sync/merge logic will
    // always favour the largest database.

    blockUser({ state, commit, dispatch }, user ) {
      commit('setUserBlocked', user)
      this._vm.$socket.client.emit(
        'block', user
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
    // blocked / blocked.

    deleteSelf({ state, commit, dispatch }) {
      commit('doNotSave')
      dispatch('blockUser', state.users[state.uid])
      localStorage.clear()
      window.location.reload(true)
    },


    // deleting a message marks it as blocked.

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
      return getters.notDeletedUsers.sort((a, b) => {
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