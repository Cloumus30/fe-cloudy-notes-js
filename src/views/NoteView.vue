<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import Editor from '../components/Editor.vue';
import store from '../store';

export default defineComponent({
  components:{
    HelloWorld,
    Navbar,
    Navside,
    Editor,
},

data(){
  return {
    activeNavsideClass: 'w-full absolute',
    defaultNavsideClass: 'w-1/6 md:w-2/6 xl:w-1/6',
  }
},

  mounted(){
    document.title = 'Note Page';
  },
  computed:{
    navSideActive(){
      return store.state.base.navSideActive;
    }
  }
})

</script>

<template>
  <header>
      <Navbar />
  </header>
  <main class="flex bg-black/90 text-white">

    
    <Navside :class="[navSideActive ? activeNavsideClass : defaultNavsideClass]" />
    
    <div class="w-5/6 md:w-4/6 xl:w-5/6 p-4">
        <Editor v-if="!navSideActive" />
    
    </div>
    
  </main>
</template>
