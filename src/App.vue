<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { initDropdowns } from 'flowbite'
import { defineComponent, onMounted } from 'vue';
import store from './store';

export default defineComponent({
  components:{
    Navbar,
    RouterView,
  },

  mounted(){
    const htmDom = document.documentElement;
    if(this.isDarkTheme){
      htmDom.classList.add('dark');
    }else{
      htmDom.classList.remove('dark');
    }
  },
  computed:{
    isDarkTheme(){
      return store.state.base.isDarkTheme;
    }
  }
})

onMounted(()=>{
  initDropdowns();
})
</script>

<template>
  <RouterView />
</template>

