import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import CoursesIndex from './views/courses/index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

Vue.use(Router)

export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },

    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },

    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },

    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
  ]
});
