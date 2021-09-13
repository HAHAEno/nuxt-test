import axios from 'axios'
// import Cookies from 'js-cookie'
// import { deletePropety } from '../api/weatherApi'

/*
 * Config for the OpenWeather API
 * @see https://openweathermap.org/
 */
const weatherApiKey = '3978da9f7417a95247e8f31df0cf1f27'
const weatherApiBaselUrl = `http://api.openweathermap.org/data/2.5/weather?q=Basel&appid=${weatherApiKey}`

const state = () => ({
  isWeatherLoading: false, // app starts in loading mode
  currentWeather: {}
})
const mutations = {
  SET_CURRENTWEATHER: (state, data) => {
    state.currentWeather = data
  },
  SET_ISWEATHERLOADING: (state, data) => {
    state.isWeatherLoading = data
  }
}
const getters = {
  isWeatherLoading: state => state.isWeatherLoading,
  currentWeatherData: (state) => {
    return state.currentWeather
  }
}

const actions = {
  async getWeather ({ commit }) {
    // return new Promise((resolve, reject) => {
    //   const params = {
    //     q: 'Basel',
    //     appid: weatherApiKey
    //   }
    //   deletePropety(params).then(
    //     (res) => {
    //       commit('SET_CURRENTWEATHER', res)
    //       commit('SET_ISWEATHERLOADING', true)
    //       Cookies.set('currentWeatherData', JSON.stringify(res))
    //     }
    //   )
    //   resolve()
    // })

    // todo - pull weather data for Basel
    const url = weatherApiBaselUrl
    await axios.get(url)
      .then((response) => {
        this.$toast.success('success')
        commit('SET_CURRENTWEATHER', response.data)
        commit('SET_ISWEATHERLOADING', true)
        this.$cookies.set('currentWeatherData', (response.data))
      })
      .catch(() => {
        this.$toast.error('error')
      })
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
