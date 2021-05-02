<template>
  <div>
    <Island
      v-for="artwork in content"
      :id="artwork.slug + 'Island'"
      :style="{ left: artwork.x + '%', top: artwork.y + '%' }"
      :key="artwork.slug"
      :artwork="artwork"
      @moreInfo="$emit('moreInfo', `/exhibition/${artwork.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Exhibition',
  components: { Island },
  props: [ 'content' ],
  mounted() {
    setTimeout(() => {
      this.handleLinks()
    }, 2000)
  },
  methods: {
    handleLinks() {
      setTimeout(() => {
        Array
        .from(document.querySelectorAll(`#exhibition a`))
        .forEach(a => {
          const href = a.attributes.href.value 
          if (href && (href.startsWith('/') || href.startsWith(this.$appURL))) {
            a.addEventListener('click', (e) => {
              const newhref = href.replace(this.$appURL, '/')
              this.$router.push(newhref)
              e.preventDefault()
            })
          }
        })
      }, 500)
    }
  
  }
}
</script>

<style scoped>

.exhibition {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  /* margin: calc(2.5 * var(--one)); */
}




</style>