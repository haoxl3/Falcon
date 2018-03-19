import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/Login'
import home from '@/pages/Home'
import projects from '@/pages/projects'
import contacts from '@/pages/contacts'
import library from '@/pages/library'

import midSurvey from '@/pages/midSurvey'
import survey from '@/pages/survey'
import distribution from '@/pages/distribution'
import analysis from '@/pages/analysis'
import report from '@/pages/report'

Vue.use(Router)

export default new Router({
  routes: [
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
            },{
                path: '/survey', 
                component: midSurvey,
                children: [
                    {
                        path: '/survey',
                        component: survey
                    },{
                        path: '/distribution',
                        component: distribution
                    },{
                        path: '/analysis',
                        component: analysis
                    },{
                        path: '/report',
                        component: report
                    }
                ]
            }
        ]
    }
  ]
})