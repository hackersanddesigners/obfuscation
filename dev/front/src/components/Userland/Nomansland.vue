<template>
  <div id="blocked">
    <div class="message">
      <p>You have been removed.</p>
      <p>Please reflect on your behaviour.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Nomansland',
  components: {
  },
  props: [
  ],
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    const main = this.$el

    const rows = window.innerHeight / 14
    const cols = window.innerWidth / 10

    const tbl = this.tableCreate(rows, cols)
    main.appendChild(tbl)

  },
  methods: {
    tableCreate(rows, cols) {
      let tbl  = document.createElement('table')
      for(let i = 0; i < rows; i++){
        let tr = tbl.insertRow()
        for(let j = 0; j < cols; j++){
          let td = tr.insertCell()
          td.innerHTML = '\u00A0'
          td.addEventListener('mouseover', () => {
            this.repeatXI(() => {
              td.innerHTML = this.generate_random_string()
            }, 100, 10)
            setTimeout(() => {
              td.innerHTML = '\u00A0'
            }, 1050)
            setTimeout(() => {
              td.innerHTML = '\u00A0'
            }, 3000)
          })
        }
      }
      return tbl
    },

    generate_random_string() {
      let ascii_low = 39
      let ascii_high = 47
      let random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low)
      let random_string = String.fromCharCode(random_ascii)
      return random_string
    },

    repeatXI(callback, interval, repeats) {
      let timer, trigger
      trigger = function () {
        callback()
        --repeats || clearInterval(timer)
      }
      interval = interval <= 0 ? 1000 : interval  // default: 1000ms
      repeats  = parseInt(repeats, 10) || 0       // default: repeat forever
      timer    = setInterval(trigger, interval)
      return true
    },
  }
}
</script>

<style>
#blocked {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-size: 14px;
  font-family: 'jet';
  cursor: none;
  background: blue;
  color: lime;
}
p {
  margin: 0px;
}
.message  {
  position: absolute;
  top: 0;
  margin: 10px;
  z-index: 1;
}
table {
    height: 100vh;
    width: 100vw;
    margin: 0;
    border-collapse: collapse;
    border-spacing: 0;
}
table tr td {
    text-align: center;
    line-height: 0;
    /* border: 1px solid lightgrey; */
    padding: 0px;
}
.active {
    background: black;
    color: white;
}
    
</style>
