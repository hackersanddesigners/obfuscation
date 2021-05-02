import axios from 'axios'
import {
  toObject,
  sortAlphabetically,
  sortByUpdate
} from '../utils'

const
  ENV = process.env.NODE_ENV || 'development',
  URL = process.env.VUE_APP_API_URL + '/',

  regions = {
    'reception'   : {},
    'readme'      : {},
    'schedule'    : {},
    'exhibition'  : {},
    'livestream'  : {},
    'hangout'     : {},
    'study-room'  : {},
    'contributors': {},
    'library'     : {},
    'glossary'    : {},
  },

  queryFromSlug = slug => (
    slug === 'reception'    ? 'statics' :
    slug === 'readme'       ? 'readmes' :
    slug === 'exhibition'   ? 'videos' :
    slug === 'schedule'     ? 'sessions' :
    slug === 'contributors' ? 'hosts' :
    slug === 'study-room'   ? 'study-sessions' :
    slug === 'library'      ? 'libraries' :
    slug === 'glossary'     ? 'glossaries' :
    null
  ),

  correctTime = datestring => (
    datestring
      .replace('-05-04T', '-04-29T')
      .replace('-05-07T', '-05-02T')
  ),

  correctDates = sessions => {
    for (const key in sessions) {
      sessions[key].Start = correctTime(sessions[key].Start)
      sessions[key].End   = correctTime(sessions[key].End)
    }
    return sessions
  },

  getRegionContent = slug => {
    return new Promise ((resolve, reject) => {
      const query = queryFromSlug(slug)
      if (!query) {
        resolve(null)
        return
      }
      axios
      .get(URL + query)
      .then(response => {
        let content = {}
        for (const page of response.data) {
          content[page.slug] = page
        }
        resolve(
          slug === 'schedule'     ?
            ENV === 'development' ? correctDates(content) : content   :
          slug === 'contributors' ?
            toObject( sortAlphabetically( content, 'Name' ), 'slug' ) :
          slug === 'glossary'     ?
            toObject( sortAlphabetically( content, 'Term' ), 'slug' ) :
          slug === 'readme'       ?
            toObject( sortAlphabetically( content, 'Title'), 'slug' ) :
          slug === 'library'      ?
            toObject( sortByUpdate( content ), 'slug' ) :
          content
        )
      })
      .catch(error => reject(
        error
      ))
    })
  },

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'regions')
      .then(async response => {
        for (const region of response.data) {
          for (const n in region.borders) {
            region.borders[n] = region.borders[n] / 100
          }
          region.content = await getRegionContent(region.slug)
          regions[region.slug] = region
        }
        resolve(
          regions
        )
      })
      .catch(error => reject(
        error
      ))
    )
  },

  getTicker = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'ticker')
      .then(response => resolve(
        response.data
      ))
      .catch(error => reject(
        error
      ))
    )
  }

export default {
  getTicker,
  getAll
}
