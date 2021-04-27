import axios from 'axios'
// import moment from 'moment'


const 
  env     = process.env.NODE_ENV || 'development',
  apiURL  = process.env.VUE_APP_API_URL + '/',
  URL     = process.env.VUE_APP_URL + '/'

const api = {


    getUsers() {
      return new Promise ((resolve, reject) => {
        axios
          .get(URL + 'users')
          .then((response) => { 
            resolve(this.buildObject(response.data)) 
          })
          .catch((error) => { reject(error) })
      })
    },


    getMessages() {
      return new Promise ((resolve, reject) => {
        axios
          .get(URL + 'messages')
          .then((response) => { 
            resolve(this.buildObject(response.data)) 
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
              'schedule': {},
              'exhibition': {},
              'livestream': {},
              'hangout': {},
              'study-room': {},
              'contributors': {},
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
          let content = {}
          axios
            .get(apiURL + query)
            .then((response) => { 
              for (let c = 0; c < response.data.length; c++) {
                const page = response.data[c]
                content[page.slug] = page
              }
              if (slug === 'schedule') {
                this.correctDates(content)
              } else if (slug === 'contributors') {
                content = this.sortNamesAlphabetically(content)
              } else if (slug === 'glossary') {
                content = this.sortTermsAlphabetically(content)
              } else if (slug === 'readme') {
                content = this.sortNumeric(content)
              }
              resolve(content) 
            })
            .catch((error) => { reject(error) })
        } else {
          resolve(null)
        }
      })
    },

    buildObject(arr) {
      const obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i].uid] = arr[i]
      }
      return obj
    },

    filterDeleted(array) {
      for (let key in array) {
        if (array[key].deleted === true) {
          console.log(array[key].uid)
          delete array[key]
        }
      }
      return array
    },

    sortNamesAlphabetically(names) {
      const 
        newNamesObj = {},
        namesArray = Object.values(names).sort((a, b) => {
          const 
            aLastName = a.Name.split(' ')[a.Name.split(' ').length - 1],
            bLastName = b.Name.split(' ')[b.Name.split(' ').length - 1]
          return aLastName.localeCompare(bLastName)
        })
      for (let n = 0; n < namesArray.length; n++) {
        newNamesObj[namesArray[n].slug] = namesArray[n]
      }
      return newNamesObj
    },

    sortTermsAlphabetically(terms) {
      const 
        newTermsObj = {},
        termsArray = Object.values(terms).sort((a, b) => {
          return a.Term.localeCompare(b.Term)
        })
      for (let n = 0; n < termsArray.length; n++) {
        newTermsObj[termsArray[n].slug] = termsArray[n]
      }
      return newTermsObj
    },

    sortNumeric(titles) {
      const 
        newTitlesObj = {},
        titlesArray = Object.values(titles).sort((a, b) => {
          return a.Title.localeCompare(b.Title)
        })
      for (let n = 0; n < titlesArray.length; n++) {
        newTitlesObj[titlesArray[n].slug] = titlesArray[n]
      }
      return newTitlesObj
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
      if (env === 'development') {
        datestring = datestring
          .replace('-05-04T', '-04-29T')
          .replace('-05-07T', '-05-02T')
      }
      // datestring = datestring.replace('Z', '+01:00')
      // datestring = datestring.replace('Z', '+02:00')
      return datestring
    },

    resolveQueryFromRegion(slug) {
      return (
        slug === 'reception' ? 'statics' :
        slug === 'readme' ? 'readmes' :
        slug === 'exhibition' ? 'videos' :
        slug === 'schedule' ? 'sessions' :
        slug === 'contributors' ? 'hosts' :
        slug === 'study-room' ? 'study-sessions' : 
        slug === 'library' ? 'libraries' : 
        slug === 'glossary' ? 'glossaries' :
        null
      )
    } 

  }

export default api