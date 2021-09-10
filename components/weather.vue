<template>
  <div v-if="isWeatherLoading">
    <div class="weather">
      <div class="grid grid-cols-3">
        <div class="imgBox" style="width: 120px;">
          <img class="transform skew-y-0" width="“100px”" src="~/static/img/04d@2x.png">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Weather',
  props: {
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {
    currentWeather () {
      return this.$store.state.weather.currentWeather
    },
    isWeatherLoading () {
      return this.$store.state.weather.isWeatherLoading
    }
  },
  created () {
    this.showDetail()
  },
  methods: {
    ...mapActions('weather', [
      'getWeather'
    ]),
    ...mapActions({
      ...mapGetters(['weather/isWeatherLoading'])
    }),
    showDetail () {
      this.getWeather()
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: #e96e50;
}
</style>
