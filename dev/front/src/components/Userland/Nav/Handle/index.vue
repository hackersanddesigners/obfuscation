<template>
  <div id="navHandle">
    <span 
      :class="[
        'ui', 'navToggle', 'hide',
        { hidden: !desiresNav }
      ]"
      @click="$emit('hideNav')"
    > 
      {{ isMobile ? '&lt; nav' : '&lt;' }}
    </span>

    <div 
      v-if="!isMobile"
      class="ui navType"
    >
      <span 
        :class="[
          'map',
          { selected: !desiresList }
        ]"
        @click="$emit('showMap')"
      > 
        map 
      </span>
      <span 
        :class="[
          'list',
          { selected: desiresList }
        ]"
        @click="$emit('showList')"
      > 
        list 
      </span>
    </div>

    <span 
      :class="[
        'ui', 'navToggle', 'show',
        { hidden: desiresNav }
      ]"
      @click="$emit('showNav')"
    >nav &gt;</span>
  </div>
</template>

<script>
export default {

  name: 'Handle',
  props: [ 
    'isMobile',
    'desiresNav',
    'desiresList'
  ], 

}
</script>

<style scoped>

#navHandle {
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  margin-top: 1vh;
  margin-left: 1vh;
  display: flex;
  align-items: stretch;
}

#navHandle span {
  cursor: pointer;
}

.navToggle {
  display: flex;
  align-items: center;
  margin-right: 1vh;
  /* white-space: pre; */
}
.navToggle.hide {
  z-index: 1;
  padding: 0.5vh 1vh;
}
.navToggle.show {
  position: fixed;
  padding: 0.5vh 1vh;
  /* left: calc(100vw + 1vh); */
  left: 1vh;
}
.navToggle.hidden {
  opacity: 0;
}

.navType {
  display: flex;
  align-items: center;
  padding: 0vh 0vh;
  z-index: 1;
}
.navType span {
  padding: 0.5vh 1vh;
}
.navType span.map {
  border-right: 1px solid grey;
  padding-left: 1vh;
}
.navType span.selected {
  text-decoration: line-through;
}

</style>