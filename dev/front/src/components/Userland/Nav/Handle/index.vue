<template>
  <div id="navHandle">
    <span 
      :class="[
        'ui', 'navToggle', 'hide',
        { hidden: !desiresNav }
      ]"
      @click.stop="$emit('hideNav')"
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
        @click.stop="$emit('showMap')"
      > 
        map 
      </span>
      <span 
        :class="[
          'list',
          { selected: desiresList }
        ]"
        @click.stop="$emit('showList')"
      > 
        list 
      </span>
    </div>

    <span 
      :class="[
        'ui', 'navToggle', 'show',
        { hidden: desiresNav }
      ]"
      @click.stop="$emit('showNav')"
    > 
        nav &gt; 
    </span>
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
}
.navToggle.hide {
  z-index: 1;
  padding: 0.5vh 1vh;
}
.navToggle.show {
  position: fixed;
  padding: 0.5vh 1vh;
  left: 1vh;
}
.navToggle.hidden {
  opacity: 0;
}

.navType {
  display: flex;
  align-items: center;
  padding: 0vh 0.5vh;
  z-index: 1;
}
.navType span {
  padding: 0.5vh;
}
.navType span.map {
  border-right: 1px solid grey;
}
.navType span.selected {
  text-decoration: line-through;
}


</style>