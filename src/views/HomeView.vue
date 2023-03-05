<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import NoteCard from '../components/partial/NoteCard.vue';
import store from '../store';

export default defineComponent({
  components:{
    HelloWorld,
    Navbar,
    Navside,
    NoteCard
},

  mounted(){
    document.title = 'List Notes';
    store.dispatch('note/listNote').then(dat=>{
      
    });
  },
  
  data(){
    return {
      title: "Judul Kosong",
      body: "Body Note Kosong",
      activeNavsideClass: 'w-full absolute',
      defaultNavsideClass: 'w-1/6 md:w-2/6 xl:w-1/6',
    }
  },
  computed:{
    listNotes(){
      return store.state.note.listNote;
    },
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
  <main class="flex">
    
    <Navside :class="[navSideActive ? activeNavsideClass : defaultNavsideClass]" />
    
    <div class="w-5/6 md:w-4/6 xl:w-5/6 h-fit p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gird gap-4 place-items-stretch">
      <NoteCard :title="item.title" :body="body" :noteId="item.id" class=" w-full" v-for="item in listNotes"/>
    </div>
    
  </main>
</template>
