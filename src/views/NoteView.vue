<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import Editor from '../components/Editor.vue';

export default defineComponent({
  components:{
    HelloWorld,
    Navbar,
    Navside,
    Editor,
},

  mounted(){
    document.title = 'Note Page';
  }
})

</script>

<template>
  <header>
      <Navbar />
  </header>
  <main class="flex">

    <div class="w-1/6">
      <Navside />
    </div>
    <div class="w-5/6 p-4">
        <Editor />
    
    </div>
    
  </main>
</template>
