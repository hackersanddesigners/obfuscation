<template>
  <div 
    id="tour"
    :class="{ navigating: navigating }"  
    :style="{ '--region': $store.state.location.color }"
  >
    <v-tour 
      name="tour" 
      :steps="steps" 
      :callbacks="callbacks" 
      :options="options"
    >
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :step="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :skip="tour.skip"
            :finish="tour.finish"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            :highlight="tour.highlight"
            :class="{ isLast: tour.currentStep == tour.steps.length - 1 }"
          >
            <div slot="actions" class="actions">
              <!-- <input 
                class="ui button"
                type="button" 
                value="previous"
                @click.stop="tour.previousStep" 
              > -->
              <input 
                v-if="isException(tour.steps[tour.currentStep]) || tour.currentStep == 0" 
                class="ui button"
                type="button" 
                value="next"
                @click.stop="tour.nextStep" 
              >
              <input 
                v-if="tour.currentStep !== tour.steps.length - 1"
                class="ui button skip"
                type="button" 
                value="skip tour"
                @click.stop="tour.skip" 
              >
              <input 
                v-else
                class="ui button end"
                type="button" 
                value="end tour"
                @click.stop="tour.skip" 
              >
            </div>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
export default {
  name: 'my-tour',
  props: ['editing'],
  data () {
    return {
      navigating: false,
      exceptions: [
        '.overlayContainer',
        '#overlay .overlay',
        '#addressBar',
        '#participantsIndicator',
        '#register',
        '#options .storage .button',
        '#userlist ul',
        '#userlist ul .userLabel',
        '#BBBIndicator',
        '.BBBisland1'
      ],
      options: {
        useKeyboardNavigation: false,
        debug: false,
        highlight: true,
      },
      steps: [
        {
          target: '#list',
          content: 'This website is spacially organized and divided into so-called regions.',
          params: {
            enableScrolling: false,
            placement: 'right-start',
          },
        },
        {
          target: '#list',
          content: 'To navigate to a region, you can use this list. <br><br> Go to the Schedule to proceed.',
          params: {
            enableScrolling: false,
            placement: 'right-start',
          },
        },
        {
          target: '#navHandle .map',  
          content: `You can also switch to the map view.`,
          params: {
            enableScrolling: false,
            placement: 'right'
          },
          // before: async() => { await this.wait('500') },
          before: () => new Promise(res => {
            setTimeout(() => { 
              if (this.$store.state.location.slug === 'schedule')
              res('1') 
            }, 1000)
          })
        },
        {
          target: '#minimap',  
          content: `Here, you can zoom in or out or pan around.<br><br> Zoom out to proceed.`,
          params: {
            enableScrolling: false,
            placement: 'right-start'
          },
        },
        {
          target: '#minimap .zero',  
          content: `Click the "o" button to zoom back to default.`,
          params: {
            enableScrolling: false,
            placement: 'right'
          },
          before: () => new Promise(res => {
            if (this.$store.state.scale < 7) {
              setTimeout(() => { 
                res('1') 
              }, 700)
            }
          })
        },
        {
          target: '#overlay .overlay',
          content: 'Navigating to a region, a pop-up appears providing more information and region-specific instructions.',
          params: {
            enableScrolling: false,
            placement: 'left'
          },
          before: () => new Promise(res => {
            this.$emit('goTo', '/schedule')
            this.$emit('focusOverlay')
            setTimeout(() => {
              res('1') 
            }, 1000)
          })
        },
        {
          target: '#overlay .hide',
          content: 'You can hide this pop-up.',
          params: {
            enableScrolling: false,
            placement: 'bottom'
          },
        },
        {
          target: '#location .tag',
          content: 'The pop-up can always be brought back using the dynamic location tag.',
          params: {
            enableScrolling: false,
            placement: 'bottom'
          },
          before: () => new Promise(res => {
            this.$emit('unfocusOverlay')
            this.$emit('focusLocation')
            res('1')
          })
        },
        {
          target: '#openingIsland',
          content: 'Regions come with blocks that represent a session, glossary term, article or video. Clicking on these blocks reveals a second-level information in the pop-up.',
          params: {
            enableScrolling: false,
            placement: 'top'
          },
          before: () => new Promise(res => {
            this.$emit('hideNav')
            this.$emit('focusIsland')
            res('1')
            setTimeout(() => { 
              this.$emit('unfocusLocation')
            }, 300)
          })
        },
        {
          target: '#addressBar',
          content: 'You can share the URL to every region or block from the address bar.',
          params: {
            enableScrolling: false,
            placement: 'bottom'
          },
          before: () => new Promise(res => {
            this.$emit('unfocusIsland')
            this.$emit('focusOverlay')
            res('1')
          })
        },
        {
          target: '#list',
          content: 'Navigate to the Cursor Hangout to continue.',
          params: {
            enableScrolling: false,
            placement: 'right-start'
          },
          before: () => new Promise(res => {
            this.$emit('unfocusOverlay')
            this.$emit('showNav')
            setTimeout(() => { 
              res('1') 
            }, 300)
          })
        },
        {
          target: '#participantsIndicator',
          content: 'The platform displays participants and their messages in real time.',
          params: {
            enableScrolling: false,
            placement: 'top',
            highlight: false,
          },
          before: () => new Promise(res => {
            setTimeout(() => {
              if (this.$store.state.location.slug === 'hangout') {
                res('1') 
              }
            }, 1000)
          })
        },
        {
          target: '#options .edituser .button',
          content: 'When you first landed, you were prompted to create a user profile. You can always edit your profile in the "options" dialogue box.',
          params: {
            enableScrolling: false,
            placement: 'right'
          },
        },
        {
          target: '#register',
          content: 'Here, you can change your user name, color and set a duration after which your messages will self-destruct.',
          params: {
            enableScrolling: false,
            placement: 'top',
            highlight: false,
          },
          // before: () => new Promise(res => {
          //   setTimeout(() => { res('1') }, 400)
          // })
        },
        {
          target: '#jsonMe',
          content: 'The information you add in the dialogue box is stored on our server and shared with all other participants. <br><br> Click save to leave the dialogue box.',
          params: {
            enableScrolling: false,
            placement: 'top',
            highlight: false,

          },
        },
        {
          target: '#options .storage .button',
          content: '<strong>Important!</strong> You always have the right to disappear. If you want to delete your user profile and all your messages, you can click this button. <br><br>(If you do this now the page will refresh and the tour will end.) :-)',
          params: {
            enableScrolling: false,
            placement: 'right'
          },
          before: () => new Promise(res => {
            if (!this.editing) {
              res('1') 
            }
          })
        },
        {
          target: '#options .participants .showParticipants',
          content: 'A list of online participants is accessible via the "participants" button.',
          params: {
            enableScrolling: false,
            placement: 'right'
          },
        },
        {
          target: '#userlist ul',
          content: 'Moderators appear at the top, with a dashed-border.',
          params: {
            enableScrolling: false,
            placement: 'right-start'
          },
        },
        {
          target: '#BBBIndicator',
          content: 'If you are registered as participant of the study group or the conference , you will be joining video calls on Big Blue Button, which are accessible in the respective regions.',
          params: {
            enableScrolling: false,
            placement: 'left',
            highlight: false,
          },
          before: () => new Promise(res => {
            let timeout = 0
            if (this.$store.state.location.slug !== 'hangout') {
              this.$emit('goTo', '/hangout')
              timeout = 1000
            }
            setTimeout(() => {
              res('1') 
              this.$emit('hideNav')
              this.$emit('hideOverlay')
            }, timeout)
          })
        },
        {
          target: '.BBBisland1',
          content: 'When you are in a call, your cursor will remain "parked" in a big blue button and be visible to everyone else.<br><br>Big Blue Button offers a multitude of features and takes some getting used to. We recommend to use any of these rooms in the cursor hangout to familiarize yourself with the interface before the conference date takes place.',
          params: {
            enableScrolling: false,
            placement: 'left'
          },
          before: () => new Promise(res => {
            this.$emit('hideParticipants')
            this.$emit('focusBBB')
            res('1')
          })
        },
        {
          target: '#location div',
          content: "You're ready to go! <br><br> Don't forget to read our Code of Conduct. If you have any questions please call on a moderator by mentioning them in a message or /contact the organization/",
          params: {
            enableScrolling: false,
            placement: 'bottom',
            highlight: false,
          },
          before: () => new Promise(res => {
            this.$emit('unfocusBBB')
            this.$emit('goTo', '/readme/tour')
            setTimeout(() => {
              this.$emit('showNav')
              res('1')            
            }, 400)
          })
        },

      ],
      callbacks: {
        // onPreviousStep: this.myCustomPreviousStepCallback,
        // onNextStep: this.myCustomNextStepCallback,
        onFinish: this.end,
        onSkip: this.end,
      }
    }
  },
  created() {
  },
  mounted () {
    this.$tours['tour'].start()
    document.addEventListener('click', this.validate)
  },
  computed: {
    
  },
  methods: {

    validate(e) {
      console.log('click')

      const 
        target = e.target,
        tour = this.$tours['tour'],
        currentStep = tour.currentStep,
        tourTarget = document.querySelector(tour.steps[currentStep].target)
      
      // this.target = target
      
      if (tourTarget == target || this.isDescendant(tourTarget, target) ||
         (target.classList && target.classList.contains('save')) ||
         (target.classList && target.classList.contains('showParticipants'))
          ) {
        console.log('next')
        this.nextStep()
      } else {
        console.log('not valid trget')
      }
    },

    nextStep () { this.$tours['tour'].nextStep() },
    showLastStep () { this.$tours['tour'].currentStep = this.steps.length - 1 },
    myCustomPreviousStepCallback (currentStep) {
      console.log('custom previousStep callback on step ' + (currentStep + 1))
    },
    myCustomNextStepCallback (currentStep) {
      console.log('custom nextStep callback on step ' + (currentStep + 1))
    },

    isDescendant(parent, child) {
      let node = child.parentNode
      while (node != null) {
        if (node == parent) return true
        node = node.parentNode
      }
      return false
    },

    wait(timeout) {
      new Promise(res => {
        setTimeout(() => {
          res('1')
          console.log('resolved')
        }, timeout || 500)
      })
    },

    isException(step) {
      return this.exceptions.indexOf(step.target) > -1
    },
    end() {
      this.$emit('unfocusOverlay')
      this.$emit('unfocusIsland')
      this.$emit('unfocusLocation')
      this.$emit('unfocusBBB')
      this.$emit('end')
      document.removeEventListener('click', this.validate)
      console.log('end tour')
    }
  }
}
</script>

<style>


.v-step {
  box-sizing: border-box;
  padding: var(--ui-padding) !important;
  background: var(--ui-back) !important;
  color: var(--ui-front) !important;
  font-size: 15pt !important;
  max-width: 26vh !important;
  border: var(--ui-border) !important;
  border-radius: var(--ui-border-radius) !important;
  box-shadow: var(--ui-box-shadow) !important;
  transition: opacity 0.2s ease;
  line-height: 1.2;
  z-index: 1;
}
.v-step__content {
  padding: var(--ui-padding) !important;
  text-align: left !important;
}
#tour .actions {
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  text-align: left !important;
  padding: var(--ui-padding) !important;
}
#tour .button,
.v-step__button {
  box-sizing: border-box;
  margin: 0 !important;
  margin-right: var(--ui-padding) !important;
  padding: 2px 5px !important;
  background: var(--ui-back) !important;
  color: var(--ui-front) !important;
  font-size: 15pt !important;
  border: var(--ui-border) !important;
  border-radius: var(--ui-border-radius) !important;
  box-shadow: none !important;
  transition: opacity 0.2s ease;
  cursor: pointer;
}
#tour .button.skip {
  border-color: transparent !important;
  text-decoration: underline;
  margin-left: auto !important;
}
.v-step__arrow {
  /* z-index: 0; */
}
.v-step__arrow::before {
  /* border-left: var(--ui-border) !important; */
  /* border-bottom: var(--ui-border) !important; */
  /* z-index: 0; */
}

/* .navigating .v-tour__target--highlighted {
  box-shadow: none !important;
} */

.v-step.isLast {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4) !important;
}
.v-step.isLast .v-step__arrow {
  /* z-index: 0; */
  display: none !important;
}

.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4) !important;
  z-index: 3 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease, top 0.3s ease;
}

.fade-enter, .fade-leave-to {
  top: 50px;
  opacity: 0;
}
</style>
