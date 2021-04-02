<template>
  <div>
    <div 
      class="island"
      v-for="room in rooms"
      :key="room.name"
    >
      <BBBLink 
        :room="room" 
      />
    </div>
  </div>
</template>

<script>
import BBBLink from '../BBBLink'

export default {
  name: 'Hangout',
  components: { BBBLink },
  data() {
    return {
      rooms: {
        '1': {
          name: 'Room 1',
          url: ''        
        },
        '2': {
          name: 'Room 2',
          url: ''        
        },
        '3': {
          name: 'Room 3',
          url: ''        
        },
      
      }
    }
  }
}
</script>

<style scoped>
.hangout {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.hangout .island {
  position: absolute;
}

.hangout .island:nth-of-type(1) {
  top: 20%; left: 50%;
}
.hangout .island:nth-of-type(2) {
  top: 60%; left: 20%;
}
.hangout .island:nth-of-type(3) {
  top: 70%; left: 70%;
}


</style>