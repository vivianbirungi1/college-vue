//importing Vue and vue-router components
//important that component names match the ones used below in routes.
import Vue from 'vue'
import Router from 'vue-router'

//home, login, register components and views
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

//course components and views
import CoursesIndex from './views/courses/index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

//enrolments components and views
import EnrolmentsIndex from './views/enrolments/index'
import EnrolmentShow from './views/enrolments/Show'
import EnrolmentCreate from './views/enrolments/Create'
import EnrolmentsEdit from './views/enrolments/Edit'

//Lecturers components and views
import LecturersIndex from './views/lecturers/index'
import LecturerShow from './views/lecturers/Show'
import LecturerCreate from './views/lecturers/Create'
import LecturersEdit from './views/lecturers/Edit'

//installing VueRouter within the app
Vue.use(Router)

//storing route, components. paths and names below
//important to have in correct order i.e. Create before Show to not have the route redirecting to the wrong page.
export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    //login and register path, names and components

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

    //courses path, name and components

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

    //enrolments path, name and components

    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },

    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentCreate
    },

    {
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentShow
    },


    {
      path: '/enrolments/:id/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit
    },

    //lecturers path, name and components

    {
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },

    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturerCreate
    },

    {
      path: '/lecturers/:id',
      name: 'lecturers_show',
      component: LecturerShow
    },


    {
      path: '/lecturers/:id/edit',
      name: 'lecturers_edit',
      component: LecturersEdit
    },


  ]
});
