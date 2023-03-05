<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import NoteCard from '../components/partial/NoteCard.vue';
import store from '../store';
import PopModal from '../components/partial/PopModal.vue';

export default defineComponent({
  components:{
    HelloWorld,
    Navbar,
    Navside,
    NoteCard,
    PopModal
},

  mounted(){
    document.title = 'List Notes';
    this.listDatNote();
  },
  
  data(){
    return {
      title: "Judul Kosong",
      body: "Body Note Kosong",
      activeNavsideClass: 'w-full absolute',
      defaultNavsideClass: 'w-1/6 md:w-2/6 xl:w-1/6',
      idNote:null,
      isModalShow:false,
    }
  },
  computed:{
    listNotes(){
      return store.state.note.listNote;
    },
    navSideActive(){
      return store.state.base.navSideActive;
    }
  },

  methods:{
    showPopDelete(idNote){
      this.isModalShow = true;
      this.idNote = idNote;
    },
    closePopDelete(){
      this.isModalShow = false;
    },
    listDatNote(){
      store.dispatch('note/listNote').then(dat=>{
      });
    }
  }

})

</script>

<template>
  <div class="w-full h-full">
    <div v-if="isModalShow" class="absolute bg-black/50 w-full h-full">
      <PopModal :idNote="idNote" class="absolute top-1/3 left-10 md:top-1/4 md:left-[18rem] lg:top-1/4 lg:left-[34rem]" @closeModalEvent="closePopDelete" @listNoteEvent="listDatNote"  />
    </div>
    
    <header>
        <Navbar />
    </header>
    <main class="flex">
      
      <Navside :class="[navSideActive ? activeNavsideClass : defaultNavsideClass]" />
      
      <div class="w-5/6 md:w-4/6 xl:w-5/6 h-fit p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gird gap-4 place-items-stretch">
        <NoteCard :title="item.title" :body="body" :noteId="item.id" @deleteEvent="showPopDelete" class=" w-full" v-for="item in listNotes"/>
      </div>
      
    </main>
  </div>
  
</template>
