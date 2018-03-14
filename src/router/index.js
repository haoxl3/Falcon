import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/Login'
import home from '@/pages/Home'
import projects from '@/pages/projects'
import contacts from '@/pages/contacts'
import library from '@/pages/library'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/login',
      component: login
    },{
      path: '/home',
      name: 'home',
      redirect:'/projects',
      component: home,
      children: [
        {
          path: '/',
          component: projects
        },{
          path: '/projects',
          component: projects
        },{
          path: '/contacts',
          component: contacts
        },{
          path: '/library',
          component: library
        }
      ]
    }
  ]
})