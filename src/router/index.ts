import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/solutions/schools',
    name: 'solutions-schools',
    component: () => import('@/pages/SolutionSchools.vue'),
  },
  {
    path: '/solutions/school-facilities-operations',
    name: 'school-facilities-operations',
    component: () => import('@/pages/SchoolFacilitiesOperations.vue'),
  },
  {
    path: '/solutions/real-estate',
    name: 'solutions-real-estate',
    component: () => import('@/pages/SolutionRealEstate.vue'),
  },
  {
    path: '/solutions/construction',
    name: 'solutions-construction',
    component: () => import('@/pages/SolutionConstruction.vue'),
  },
  {
    path: '/solutions/data-centers',
    name: 'solutions-data-centers',
    component: () => import('@/pages/SolutionDataCenters.vue'),
  },
  {
    path: '/measurement-and-verification',
    name: 'measurement-and-verification',
    component: () => import('@/pages/MeasurementVerification.vue'),
  },
  {
    path: '/capital-planning',
    name: 'capital-planning',
    component: () => import('@/pages/CapitalPlanning.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/FaqPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/book-a-demo',
    name: 'book-a-demo',
    component: () => import('@/pages/BookDemo.vue'),
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/DemoRedirect.vue'),
  },
  {
    path: '/demo-booked',
    name: 'demo-booked',
    component: () => import('@/pages/DemoBooked.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]
