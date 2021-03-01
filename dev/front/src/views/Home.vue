<template>
  <div id="home">

    <Nomansland
      v-if="blocked"
    />

    <Mainland 
      v-else-if="!loading"
      :wantsToView="wantsToView"
    />
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mainland from '../components/Userland/Mainland'
import Nomansland from '../components/Userland/Nomansland'

export default {

  name: 'Home',

  components: {
    Mainland,
    Nomansland
  },

  props: [
    'slug'
  ],

  data() {
    return {
      wantsToView: null,
      loading: true,
    }
  },

  computed: mapState([

    'version',
    'blocked',

  ]),

  created() {

    console.log(`Version: ${ localStorage.version }`)


    // delete everything if local storage version is older than this
    // version. This is to prevent older users' data strutures from
    // conflicting with the most recent structure.

    if (localStorage.version != this.version) {
      console.log('this version is outdated, clearing your storage.')

      localStorage.clear()
      localStorage.version = this.version
    }  

    // get regions from CMS

    this.$http.get(`${ this.$apiURL }/regions`)
      .then((response) => { 
        const regions = {}
        for (let r = 0; r < response.data.length; r++) {
          const region = response.data[r]
          regions[region.slug] = region
        }
        this.$store.commit('setTerritories', regions)
        this.loading = false
      })
      .catch((error) => { 
        console.log(error)
    })


    // handle routing.

    if (this.slug) {
      this.handleRouting(this.slug)
    }

  },

  mounted() {


    // set up custom router.

    // this.$router.beforeEach((to, from, next) => {
    //   console.log(from, to)
    //   next()
    // })

    this.$router.afterEach((to) => {
      const slug = to.fullPath.replace(this.$publicPath, '')
      this.handleRouting(slug)
    })

  },
  methods: {
    handleRouting(slug) {

      let
        type =
          slug.startsWith('~') ? 'user' :
          slug.startsWith('#') ? 'territory' :
          null,

        name = 
          type ? slug.slice(1) : slug

      this.wantsToView = {
        type: type,
        name: name
      }
      
    },
  }
}
</script>

<style scoped>
#home {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
