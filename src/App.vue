<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { initDropdowns } from 'flowbite'
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components:{
    Navbar,
    RouterView,
  },

  mounted(){
    const htmDom = document.documentElement;
    htmDom.classList.add('dark');
  }
})

onMounted(()=>{
  initDropdowns();
})
</script>

<template>
  <RouterView />
</template>

