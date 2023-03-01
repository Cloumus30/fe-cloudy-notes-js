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
})

onMounted(()=>{
  initDropdowns();
})
</script>

<template>
  <RouterView />
</template>

