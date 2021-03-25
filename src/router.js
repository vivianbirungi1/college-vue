import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import CoursesIndex from './views/courses/index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

//enrolments
import EnrolmentsIndex from './views/enrolments/index'
import EnrolmentShow from './views/enrolments/Show'
import EnrolmentCreate from './views/enrolments/Create'

//Lecturer
import LecturersIndex from './views/lecturers/index'
import LecturerShow from './views/lecturers/Show'
import LecturerCreate from './views/lecturers/Create'

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

    //login and register

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

    //courses

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

    //enrolments

    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },

    {
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentShow
    },

    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentCreate
    },

    //lecturers

    {
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },

    {
      path: '/lecturers/:id',
      name: 'lecturers_show',
      component: LecturerShow
    },

    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturerCreate
    },




  ]
});
