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
    // Redirects to BOOKING_URL; every "Book a demo" CTA links here.
    path: '/book-a-demo',
    name: 'book-a-demo',
    component: () => import('@/pages/BookDemo.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]
