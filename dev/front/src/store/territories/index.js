import Vue from 'vue'

export default {

  namespaced: true,

  state: {

    territories : {},
    location    : {},
    ticker      : {},
    currentLiveSession: null,
    general     : {
      name: 'general',
      slug: 'general'
    },

  },

   mutations: {

    setTerritories: (state, regions) => {
      for (let slug in regions) {
        Vue.set(state.territories, slug, regions[slug])
      }
    },
    setLocation: (state, newLocation) => {
      state.location = newLocation
    },
    setTicker: (state, ticker) => {
      Vue.set(state, 'ticker', ticker)
    },
    setCurrentLiveSession: (state, session) => {
      Vue.set(state, 'currentLiveSession', session)
    },

  },

  getters: {

    territoriesArray: state => (
      Object.values(
        state.territories
      )
    ),

    regionColors: (state, getters, rootState) => ( getters
      .territoriesArray
      .map(t =>
        ({
          [`--${t.slug}`]: rootState.scale > 7 ? t.color : null
        })
      )
    ),

    liveSessions: state => ( Object
      .values(
        state.territories['schedule'].content
      )
      .sort((a, b) => (
        new Date(a.Start) - new Date(b.Start)
      ))
      .filter(s => (
        s.livestream
      ))
    ),

    territoryByBorders: (state, getters, rootState, rootGetters) => pos => {
      const
        diff   = 0.5 / rootState.scale,
        coords = rootGetters.coordsFrom(pos)

      return ( getters
        .territoriesArray
        .find(territory => {
          const
            bordersX = territory.borders.x * rootState.widthFactor,
            bordersY = territory.borders.y,
            bordersW = territory.borders.w * rootState.widthFactor,
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

    positionOfIsland: (state, getters, rootState) => slug => {
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
        x        = left - (rootState.windowSize.w - island.offsetWidth) / 2,
        y        = rootState.isMobile ? top - 100 : top - 100

      return { x, y }
    },

  },

  actions: {


  }

}