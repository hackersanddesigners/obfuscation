<template>
  <div id="home">

    <Nomansland
      v-if="blocked"
    />

    <Mainland 
      v-else
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

  props: {
    slug: String,
  },

  data() {
    return {
      wantsToView: null,
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


    // handle routing.

    if (this.slug) {
      this.handleRouting(this.slug)
    }

  },

  mounted() {


    // set up custom router.

    this.$router.afterEach((to) => {
      const slug = to.fullPath.replace(this.$publicPath, '')
      this.handleRouting(slug)
    })

  },
  methods: {
    handleRouting(slug) {

      let type, name
      if (slug.startsWith("~")) {
        type = 'user'
      } else if (slug.startsWith("#")) {
        type = 'territory'
      } else {
        console.log('not found')
      }

      name = slug.slice(1)
      if (name) {
        console.log(name)
      } else {
        console.log('no username provided')
      }

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
