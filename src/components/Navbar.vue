<script lang="ts">
  import {RouterLink} from 'vue-router'
  import IconBell from './icons/navbar/IconBell.vue';
  import IconUser from './icons/navbar/IconUser.vue';
  import IconLogin from './icons/navbar/IconLogin.vue';
  import IconDoc from './icons/navbar/IconDoc.vue';
  import NotifCard from './partial/notifCard.vue';
  import { defineComponent } from 'vue';
  import store from '../store';

  export default defineComponent({
    components:{
      IconBell, IconUser, IconLogin, IconDoc, RouterLink, NotifCard
    },
    data(){
      return {
        bodyNotif:"Notif Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sit quis soluta ipsam est earum voluptates hic provident numquam excepturi.",
        isNotifClicked: false,
        isHiddenProf:true,
        isHiddenNotif: true,
      }
    },

    computed: {
      isLoggedIn(){
        return store.state.auth.status.isLoggedIn;
      },
      user(){
        return store.state.auth.user;
      }
    },
    
    methods:{
      handleClick(type:string){
        if(type === 'profile'){
          this.isHiddenProf = !this.isHiddenProf;
          if(!this.isHiddenNotif && !this.isHiddenProf){
            this.isHiddenNotif = true;
          }
        }
        if(type === 'notif'){
          this.isHiddenNotif = !this.isHiddenNotif;
          if(!this.isHiddenNotif && !this.isHiddenProf){
            this.isHiddenProf = true;
          }
        }
      } ,
      logout(){
        store.dispatch('auth/logout')
        .then((dat) => {
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  })  
</script>

<template>
    <nav class="flex m-0 top-0 justify-between w-screen items-center h-14 text-font-navbar bg-navbar">
        <div class="font-bold text-2xl">
          <p>Cloudy Notes</p>
        </div>
        <div class="flex mr-8">
          <!-- Dropdown Notification -->
          <div class="hidden">
            <button id="dropdownDefaultButton" @click="handleClick('notif')" data-dropdown-toggle="dropdown" class="mx-3 hover:text-white">
              <IconBell/>
            </button>
            <ul id="dropdown" v-bind:class="{hidden:isHiddenNotif}" class=" absolute mt-4 bg-slate-800 drop-shadow rounded-md text-slate-300 right-10 md:w-1/3 2xs:w-full " aria-labelledby="dropdownDefaultButton">
              <li class="py-4 pr-4 pl-2 flex hover:text-white hover:cursor-pointer"> 
                 <NotifCard :body-notif="bodyNotif"/>
              </li>
              <li class="py-4 pr-4 pl-2 flex hover:text-white hover:cursor-pointer"> 
                <NotifCard :body-notif="bodyNotif" />
              </li>
            </ul>
          </div>
          <!-- Dropdown Notification -->

          <!-- Dropdown Profile -->
          <div class="group z-50">
            <button id="dropdownUserButton" @click="handleClick('profile')" data-dropdown-toggle="dropdownUser" class="mx-3 hover:text-white">
              <IconUser />
            </button>
            <ul id="dropdownUser" v-bind:class="{hidden:isHiddenProf}" class=" absolute mt-4 bg-slate-800 drop-shadow rounded-md text-slate-300 right-10 w-40 md:w-52 2xs:w-1/2" aria-labelledby="dropdownUserButton">
              <li v-if="!isLoggedIn" class=" hover:text-white hover:cursor-pointer"> 
                <RouterLink class="py-4 pr-4 pl-2 flex" to="/login">
                  <IconLogin class="mx-2" /> Login
                </RouterLink>
              </li>
              <li v-if="!isLoggedIn" class=" hover:text-white hover:cursor-pointer"> 
                <RouterLink class="py-4 pr-4 pl-2 flex" to="/register">
                  <IconDoc class="mx-2" /> Register
                </RouterLink>
              </li>
              <li v-if="isLoggedIn" class=" hover:text-white hover:cursor-pointer w-full"> 
                <div class="py-4 pr-4 pl-2 flex">
                  <IconUser class="mx-2" /> <span>{{ user.email }}</span>
                </div>
              </li>
              <li v-if="isLoggedIn" @click="logout" class=" hover:text-white hover:cursor-pointer"> 
                <div class="py-4 pr-4 pl-2 flex">
                  <IconDoc class="mx-2" /> Logout
                </div>
              </li>
            </ul>
          </div>
          <!-- DropDown Profile -->
          
          <!-- <RouterLink class="p-2" to="/about">About</RouterLink> -->
        </div>
    </nav>
</template>