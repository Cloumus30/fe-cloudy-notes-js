<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
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
    Editor
},

data(){
  return {
    activeNavsideClass: 'w-full absolute',
    defaultNavsideClass: 'w-1/6 md:w-2/6 xl:w-1/6',
    isModalShow:false,
    unsaved: false,
  }
},

  mounted(){
  },
  async beforeRouteLeave(to, from){
    if(this.unsaved && (!to.query.btn)){
      if(confirm('Unsaved Work, want to Leave without save it?')){
        return true;
      }else{
        return false;
      }
    }
    return true;
    
  },
  computed:{
    navSideActive(){
      return store.state.base.navSideActive;
    }
  },

  methods:{
    keyupHandle(){
      this.unsaved = true;
    }
  }
})

</script>

<template>
  <header>
      <Navbar />
  </header>
  <main class="flex dark:bg-black/90 dark:text-white bg-[#E4E3E5] text-black">

    
    <Navside :class="[navSideActive ? activeNavsideClass : defaultNavsideClass]" />
    
    <div class="w-5/6 md:w-4/6 xl:w-5/6 p-4 z-0">
        <Editor v-if="!navSideActive" @keyup="keyupHandle" ref="editor" />
    
    </div>
    
  </main>
    
</template>
