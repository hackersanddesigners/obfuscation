<template>
  <div id="tourContainer">
    <v-tour 
      name="myTour" 
      :steps="steps"
      :options="options"
      :callbcks="callbacks"
    ></v-tour>
  </div>
</template>

<script>
export default {

  name: 'Tour',
  
  data() {
    return {
      options: {
        useKeyboardNavigation: false,
        startTimeout: 0,
        // debug: true,
        highlight: true,
        labels: {
          buttonSkip: 'Skip tour',
          buttonPrevious: 'Previous',
          buttonNext: 'Next',
          buttonStop: 'Finish'
        }
      },
      callbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback(),
        onNextStep: this.myCustomNextStepCallback()
      }, 
      steps: [
        {
          target: '#reception',  // We're using document.querySelector() under the hood
          content: `This website is spacially organized and divided into so-called regions.`,
          params: {
            enableScrolling: true,
            highlight: false,
            placement: 'bottom'
          },
          // offset: 500,
        },
        {
          target: '#registerIsland',  // We're using document.querySelector() under the hood
          content: `This website is spacially organized and divided into so-called regions.`,
          params: {
            enableScrolling: true,
            highlight: false,
            placement: 'bottom'
          },
          // offset: 500,
        },
        {
          target: '#location div',
          content: 'An awesome plugin made with Vue.js!',
          params: {
            // enableScrolling: false,
            placement: 'right-end'
          }
        },
        {
          target: '#list',
          content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
          params: {
            enableScrolling: false,
            placement: 'right-start'
          },
        }
      ]
    }
  },

  mounted() {
    this.$tours['myTour'].start()
  },
  methods: {
    goToRegion() {
      let tour = this.$tours['myTour']
      console.log(tour)
      if (tour) {
        let 
          index = tour.currentStep,
          currentStep = tour.steps[index]
        console.log(currentStep)
        console.log('[Vue Tour] A custom previousStep callback has been called on step ' + (index + 1))
      }
    },

    myCustomPreviousStepCallback() {
      this.goToRegion()
    },
    myCustomNextStepCallback() {
      this.goToRegion()
    }


  }
}
</script>
<style>

#tourContainer {
  /* position: absolute; */
  /* top: 0; left: 0; */
  /* height: 100%; width: 100%; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* z-index: 100; */
}

.v-step {
  box-sizing: border-box;
  padding: var(--ui-padding) !important;
  background: var(--ui-back) !important;
  color: var(--ui-front) !important;
  font-size: var(--ui-font-size) !important;
  border: var(--ui-border) !important;
  border-radius: var(--ui-border-radius) !important;
  box-shadow: var(--ui-box-shadow) !important;
  transition: opacity 0.2s ease;
  line-height: 1.2;
}

.v-step__button {
  box-sizing: border-box;
  padding: var(--ui-padding) !important;
  background: var(--ui-front) !important;
  color: var(--ui-back) !important;
  font-size: var(--ui-font-size) !important;
  border: var(--ui-border) !important;
  border-radius: var(--ui-border-radius) !important;
  box-shadow: var(--ui-box-shadow) !important;
  transition: opacity 0.2s ease;
  line-height: 1.2;
}

.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4) !important;
}

</style>