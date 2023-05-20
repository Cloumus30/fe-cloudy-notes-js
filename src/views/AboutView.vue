<script>
import Navbar from '../components/Navbar.vue';
import Navside from '../components/Navside.vue';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';


export default defineComponent({
    mounted() {
        document.title = "About Page";
    },
    computed:{
      user(){
        return store.state.auth.user;
      }
    },
    components: { Navbar, RouterView, Navside }
})
</script>

<template>
  <header>
      <Navbar />
  </header>

  <!-- Password Not set -->
  <AlertCustom v-if="!user.isPassword" message="Update Your Password" link="profile"/>
    <!-- Password Not set -->

  <main class="flex">
    
    <div class="w-1/6">
      <Navside />
    </div>
    <div class="w-5/6 p-4">
      
    </div>
    
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
