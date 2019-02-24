import Vue from 'vue'
import Router from 'vue-router'
import LocalMultiplayer from './components/LocalMultiplayer'
import SinglePlayer from './components/SinglePlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LocalMultiplayer',
      component: LocalMultiplayer
    },
    {
      path: '/single-player',
      name: 'SinglePlayer',
      component: SinglePlayer
    }
  ]
})
