import axios from 'axios'
// import moment from 'moment'


const 
  apiURL  = process.env.VUE_APP_API_URL + '/',
  URL     = process.env.VUE_APP_URL + '/'

const api = {


    getUsers() {
      return new Promise ((resolve, reject) => {
        axios
          .get(URL + 'users')
          .then((response) => { resolve(response.data) })
          .catch((error) => { reject(error) })
      })
    },


    getMessages() {
      return new Promise ((resolve, reject) => {
        axios
          .get(URL + 'messages')
          .then((response) => { 
            const messages = this.lastTwoDaysOnly(response.data)
            resolve(messages) 
          })
          .catch((error) => { reject(error) })
      })
    },

    getTicker() {
      return new Promise ((resolve, reject) => {
        axios
          .get(apiURL + 'ticker')
          .then((response) => { resolve(response.data ) })
          .catch((error) => { reject(error) })
      })
    },


    getRegions() {
      return new Promise ((resolve, reject) => {
        axios
          .get(apiURL + 'regions')
          .then(async (response) => { 
            const regions = {
              'reception': {},
              'readme': {},
              'hangout': {},
              'exhibition': {},
              'livestream': {},
              'timetable': {},
              'contributors': {},
              'study-room': {},
              'library': {},
              'glossary': {},
            }

            for (let r = 0; r < response.data.length; r++) {
              const region = response.data[r]
              delete region.id
              region.borders = {
                x: region.borders.x / 100,
                y: region.borders.y / 100,
                w: region.borders.w / 100,
                h: region.borders.h / 100,
              }
              region.content = await this.getRegionContent(region.slug)
              regions[region.slug] = region
            }

            resolve(regions) 
          })
          .catch((error) => { reject(error) })
      })
    },


    getRegionContent(slug) {
      return new Promise ((resolve, reject) => {
        const query = this.resolveQueryFromRegion(slug)
        if (query) {
          const content = {}
          axios
            .get(apiURL + query)
            .then((response) => { 
              for (let c = 0; c < response.data.length; c++) {
                const page = response.data[c]
                content[page.slug] = page
              }
              if (slug === 'timetable') {
                this.correctDates(content)
              }
              resolve(content) 
            })
            .catch((error) => { reject(error) })
        } else {
          resolve(null)
        }
      })
    },

    lastTwoDaysOnly(messages) {
      // const 
      //   now = (new Date()).getTime(),
      //   twodays = 172800000 // two days
      //   // twodays = 28800000 // 8 hours
      // for (let m in messages) {
      //   const message = messages[m]
      //   if (message.time < now - twodays) {
      //     delete messages[m]
      //   }
      // }
      return messages
    },

    correctDates(sessions) {
      for (let key in sessions) {
        const session = sessions[key]
        session.Start = this.correctTimeZone(session.Start)
        session.End = this.correctTimeZone(session.End)
      }
      return sessions
    },

    correctTimeZone(datestring) {
      // datestring = datestring.replace('Z', '+01:00')
      // datestring = datestring.replace('Z', '+02:00')
      return datestring
    },

    resolveQueryFromRegion(slug) {
      return (
        slug === 'reception' ? 'statics' :
        slug === 'exhibition' ? 'videos' :
        slug === 'timetable' ? 'sessions' :
        slug === 'contributors' ? 'hosts' :
        slug === 'glossary' ? 'glossaries' :
        slug === 'library' ? 'libraries' : 
        null
      )
    } 

  }

export default api