<template>
  <div>
    <div v-if="isLoading">
      Loading app...
    </div>
    <div v-else>
      <weather :search-data="searchdata" />
      <h1>Welcome</h1>
      <p>
        You have reached the landing page of the Logoipsum company. Now, let's get started!
      </p>
      <p>
        The manager of the company thinks that the website homepage is boring. Because he likes golfing in his free time, the
        designer has suggested connecting the frontend to a weather API and pull the current weather from an API and to display
        current general weather condition and temperature on the website (the company is located in Basel, Switzerland).
      </p>
      <p>
        A colleague from the IT department has already kindly prepared the API configuration in the store module of the web
        application. However, he did not have time to finish the work before holiday. You are now asked to complete the
        colleague's task. In particular, the store action needs to be finished and called, data committed to the application
        state and bind the state to the UI. As for displaying the current weather conditions in the UI, the designer has notß
        given any particular instructions (you are free to design it). However, he thought that it would be nice to have an icon
        to depict the current weather condition.
      </p>
      <p>
        The company's Software Architect has given three key advices: he wants to keep the application modular and thus work
        with components. He also insists on using proper state management with Vuex. As for styling the application, we should
        use tailwindCSS as much as possible so that we can update the corporate design system anytime.
      </p>
      <p>
        Some links to get you started with the API (OpenWeatherMap):
        <ul>
          <li><a target="_blank" href="http://api.openweathermap.org/data/2.5/weather?q=Basel&appid=3978da9f7417a95247e8f31df0cf1f27">Example API response</a></li>
          <li><a target="_blank" href="https://openweathermap.org/current">API endpoint documentation</a></li>
          <li><a target="_blank" href="https://openweathermap.org/weather-conditions">Weather condition icons</a></li>
        </ul>
      </p>

      <h2>Bonus Tasks</h2>
      <p>
        <ol>
          <li>
            API error handling: use the included <a target="_blank" href="https://github.com/shakee93/vue-toasted">vue-toasted</a>
            to show a toast notification if the API call fails (available as <code>this.$toast</code>).
          </li>
          <li>
            Move all weather state data and related methods into a separate store module weather.js
            (<a target="_blank" href="https://nuxtjs.org/docs/2.x/directory-structure/store">namespaced store</a>).
          </li>
          <li>
            Store the weather data into a cookie to reduce initial page load time (retrieve data from cookie on
            opening the web application and async overwrite with the latest data from the API).
          </li>
        </ol>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import weather from '~/components/weather.vue'

export default {
  components: { weather },
  layout: 'default',
  data () {
    return {
      searchdata: {
        name: 'basel'
      }
    }
  },
  computed: {
    isLoading () {
      // return this.$store.state.weather.isLoading
      return false
    }
  },
  mounted () {
    this.END_LOADING()
  },
  methods: {
    ...mapMutations([
      'END_LOADING'
    ])
  }
}
</script>

<style lang="scss" scoped>
h1 {
  @apply text-2xl font-bold pt-4 pb-8;
}

h2 {
  @apply text-lg text-gray-700 font-bold pt-4 pb-4;
}

p {
  @apply max-w-4xl pb-4;
}

ul {
  @apply list-disc ml-4;
}

ol {
  @apply list-decimal ml-4;
}

a {
  @apply text-blue-800;
}

code {
  @apply font-mono text-xs bg-gray-700 text-gray-100 p-0.5 rounded;
}
</style>
