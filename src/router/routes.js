
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'book', component: () => import('pages/BookPage.vue') },
      { path: 'book/info/:bookId', component: () => import('pages/BookInfoPage.vue') },
      { path: 'book/uploadbook', component: () => import('pages/UploadBookPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
