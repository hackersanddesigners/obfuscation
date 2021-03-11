import axios from 'axios'


const 
  apiURL  = 'https://api.obfuscation.karls.computer/',
  URL     = 'https://obfuscation.karls.computer/'

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
          .then((response) => { resolve(response.data) })
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
          axios
            .get(apiURL + query)
            .then((response) => { resolve(response.data) })
            .catch((error) => { reject(error) })
        } else {
          resolve(null)
        }
      })
    },


    resolveQueryFromRegion(slug) {
      return (
        slug === 'reception' ? 'statics' :
        slug === 'exhibition' ? 'videos' :
        slug === 'timetable' ? 'sessions' :
        slug === 'glossary' ? 'glossaries' :
        slug === 'library' ? 'libraries' : 
        null
      )
    } 

  }

export default api