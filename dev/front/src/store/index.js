import Vue from 'vue'
import Vuex from 'vuex'

import territories from './territories'
import users from './users'
import messages from './messages'

Vue.use(Vuex)

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',

  modules: {
    territories,
    users,
    messages,
  },

  state: {

    isMobile      : false,
    isCompatible  : true,
    scale         : 10,
    widthFactor   : 1,
    windowSize    : {
      w: window.innerWidth,
      h: window.innerHeight,
    },
    windowPos     : {
      x: null,
      y: null,
    },
    desiresTexture:
      localStorage.desiresTexture ?
      JSON.parse(localStorage.desiresTexture) : true,
    desiresContrast:
      localStorage.desiresContrast ?
      JSON.parse(localStorage.desiresContrast) : false,

  },

  mutations: {

    setScale         : (state, scale)  => state.scale = scale,
    setWidthFactor   : (state, factor) => state.widthFactor = factor,
    zoomIn           : state           => state.scale < 20 ? state.scale += 0.25 : null,
    zoomOut          : state           => state.scale >  1 ? state.scale -= 0.25 : null,
    setMobile        : (state, mobile) => state.isMobile = mobile,
    setCompatibility : (state, ua)     => state.isCompatible = ua,
    toggleGrid       : state           => state.grid = !state.grid,
    resize           : (state, size)   => state.windowSize = size,
    viewerPosition   : (state, pos)    => state.windowPos = pos,
    toggleTexture    : state => {
      state.desiresTexture =
      localStorage.desiresTexture =
      !state.desiresTexture
    },
    toggleContrast  : state => {
      state.desiresContrast =
      localStorage.desiresContrast =
      !state.desiresContrast
    },

  },

  actions: {

  },

  getters: {

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