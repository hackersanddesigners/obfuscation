import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({



  state: {
    version: 5,
    doNotSave: false,

    registered: false,
    visited: false,
    blocked: false,

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

  strict: process.env.NODE_ENV !== 'production',



})

export default store