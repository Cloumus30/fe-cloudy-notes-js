import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NoteView from '../views/NoteView.vue'
import LoadingPage from '../components/partial/LoadingPage.vue'
import store from '../store/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/note/add',
      name: 'note',
      component: NoteView
    },
    {
      path: '/note/:noteId/edit',
      name: 'note_edit',
      props:true, 
      component: NoteView
    },
    {
      path: '/coba',
      name: 'coba_component',
      props:true, 
      component: LoadingPage
    }
  ]
})

const guestRouter = ['about', 'register', 'login', 'coba_component'];
const forbidLoggedRouter = ['login', 'register'];

router.beforeEach(async(to, from) => {
  if(!store.state.auth.status.isLoggedIn){
    if(!guestRouter.includes(to.name)){
      window.location.href = '/login'
      // return '/login'
    }
  }else{
    if(forbidLoggedRouter.includes(to.name)){
      return '/';
    }
  }
});

export default router
