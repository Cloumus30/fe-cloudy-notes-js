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
      body: "Body Note Kosong"
    }
  },
  computed:{
    listNotes(){
      return store.state.note.listNote;
    }
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
    <div class="w-5/6 h-fit p-4 grid grid-cols-3 gap-4 place-items-stretch">
      <NoteCard :title="item.title" :body="body" :noteId="item.id" class=" w-full" v-for="item in listNotes"/>
    </div>
    
  </main>
</template>
