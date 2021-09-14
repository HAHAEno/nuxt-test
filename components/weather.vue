<template>
  <div v-if="isWeatherLoading" class="weather">
    <div class="weather-wrap">
      <div v-if="imgUrl" class="weather-text">
        <img class="weather-img" :src="imgUrl">
      </div>
      <div>
        <p class="weather-fontleft">
          <span class="weather-fontleft-red">{{ currentWeather.name }},{{ currentWeather.sys.country }}</span>
          <span>{{ currentWeather.weather[0].description }}</span>
        </p>
        <p class="weather-fontleft">
          <span>
            {{ currentWeather.main.temp }} temperature from
            {{ currentWeather.main.temp_min }} to
            {{ currentWeather.main.temp_max }}, wind
            {{ currentWeather.wind.speed }} m/s. clouds
            {{ currentWeather.clouds.all }} %,{{ currentWeather.main.pressure }}hpa</span>
        </p>
        <p class="weather-fontleft">
          Geo coord
          <span class="weather-fontleft-red">[{{ currentWeather.coord.lon }}, {{ currentWeather.coord.lat }}]</span>
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
  &-wrap {
    @apply flex justify-around;
  }

  &-text {
    @apply w-24 md:w-36 flex items-center;
  }

  &-img {
    @apply skew-y-0 w-28;
  }

  &-fontleft {
    @apply text-left;

    &-red {
      @apply text-red-300;
    }
  }
}

</style>
