<template>
  <div>
    <div 
      v-for="(room, name) in rooms"
      :key="name"
      :class="['island', `BBBisland${name}`]"
    >
      <BBBLink 
        :room="room" 
      />
    </div>
    <div id="participantsIndicator"></div>
    <div id="BBBIndicator"></div>
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
          url: 'https://bbb.tbm.tudelft.nl/b/3rd-yns-svo-fbn'        
        },
        '2': {
          name: 'Room 2',
          url: 'https://bbb.tbm.tudelft.nl/b/3rd-qmb-3gn-3ql'        
        },
        '3': {
          name: 'Room 3',
          url: 'https://bbb.tbm.tudelft.nl/b/3rd-scf-jhq-5qv'        
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

.hangout .island,
#participantsIndicator,
#BBBIndicator {
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

.hangout .island {
}

#participantsIndicator {
  top: 50%; left: 50%;
}
#BBBIndicator {
  height: 5%;
  top: 20%; left: 45%;
}


</style>