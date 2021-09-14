<template>
  <div v-if="isWeatherLoading" class="weather">
    <div class="flex justify-around ">
      <div v-if="imgUrl" class="weather-text">
        <img class="skew-y-0" width="“100px”" :src="imgUrl">
      </div>
      <div>
        <p class="text-left">
          <span class="red">{{ currentWeather.name }},{{ currentWeather.sys.country }}</span>
          <span>{{ currentWeather.weather[0].description }}</span>
        </p>
        <p class="text-left">
          <span>
            {{ currentWeather.main.temp }} temperature from
            {{ currentWeather.main.temp_min }} to
            {{ currentWeather.main.temp_max }}, wind
            {{ currentWeather.wind.speed }} m/s. clouds
            {{ currentWeather.clouds.all }} %,{{ currentWeather.main.pressure }}hpa</span>
        </p>
        <p class="text-left">
          Geo coord
          <span class="red">[{{ currentWeather.coord.lon }}, {{ currentWeather.coord.lat }}]</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Weather',
  props: {
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      imgUrl: '',
      currentWeather: {}
    }
  },
  computed: {
    isWeatherLoading () {
      return this.$store.state.weather.isWeatherLoading
    }
  },
  watch: {
    currentWeather () {
      return this.$store.state.weather.currentWeather
    }
  },
  mounted () {
    let currentWeatherData = this.$cookies.get('currentWeatherData')
    if (currentWeatherData) {
      this.currentWeather = currentWeatherData
      this.SET_ISWEATHERLOADING(true)
    } else {
      currentWeatherData = {}
      this.getWeather()
    }
    if (this.currentWeather.weather) {
      this.imgUrl = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`
    }
  },
  methods: {
    ...mapActions('weather', ['getWeather']),
    ...mapActions({
      ...mapGetters(['weather/isWeatherLoading']),
      ...mapMutations('weather', ['SET_ISWEATHERLOADING'])
    })
  }
}
</script>

<style lang="scss" scoped>
.weather {
  &-text {
    @apply w-24 md:w-36 flex items-center;
  }

  .red {
    @apply text-red-300;
  }
}

</style>
