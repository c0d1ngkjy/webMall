<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-thin cursor-pointer" @click="$router.push('/')">
          Home
        </q-toolbar-title>

        <div class="text-caption">2022671067 김주윤</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width=200
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="q-py-">
        <q-item :active="currentLink == nav.link" active-class="bg-grey-3" class="row items-center" :to="nav.link" v-for="nav in navs" :key="nav">
            <img :src="nav.icon" alt="icon" width="15">
            <div class="q-ml-sm">
              {{ nav.label }}
            </div>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer :reveal=true class="bg-grey-3 text-black">
      <div class="q-pa-md">&copy; webMall</div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const $route = useRoute()
    const leftDrawerOpen = ref(false)
    const homeIcon = require('src/assets/home.svg');
    const booksIcon = require('src/assets/book.svg')

    const navs = [
      {label : "Home", link: "/", icon: homeIcon},
      {label : "Books", link: "/book", icon: booksIcon},
    ]

    const currentLink = ref('/');

    watch(
      () => $route.path,
      (newPath, oldPath) => {
        currentLink.value = '/' + newPath.split('/')[1];
        console.log(currentLink.value);
      }
    );

    onMounted(()=> {
      currentLink.value = $route.path
    })

    return {
      leftDrawerOpen,
      navs,
      currentLink,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
