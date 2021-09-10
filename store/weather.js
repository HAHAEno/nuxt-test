import axios from 'axios'
import Cookies from 'js-cookie'
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
  START_LOADING: (state) => {
    state.loading = true
  },
  SET_ISWEATHERLOADING: (state, data) => {
    state.isWeatherLoading = data
  },
  END_LOADING: (state) => {
    state.loading = false
  }
}
const getters = {
  isLoading: state => state.loading && state.loading === true,

  currentWeatherData: (state) => {
    return state.currentWeather
  }
}

const actions = {
  async getWeather ({ commit }) {
    commit('START_LOADING')

    // todo - pull weather data for Basel
    const url = weatherApiBaselUrl
    console.log(url)
    await axios.get(url)
      .then((response) => {
        console.log(response.data)
        commit('SET_CURRENTWEATHER', response.data)
        commit('SET_ISWEATHERLOADING', true)
        Cookies.set('currentWeatherData', JSON.stringify(response.data))
      })

    // return new Promise((resolve, reject) => {
    //   // todo - pull weather data for Basel
    //   const url = weatherApiBaselUrl
    //   console.log(url)
    //   await axios.get(url)
    //     .then((response) => {
    //       console.log(response.data)
    //       commit('SET_CURRENTWEATHER', response.data)
    //       Cookies.set('currentWeatherData', JSON.stringify(response.data))
    //       resolve()
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    //     .finally(
    //       commit('END_LOADING')
    //     )
    // })
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
