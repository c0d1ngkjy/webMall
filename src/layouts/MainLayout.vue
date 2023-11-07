<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="column content-center">
        <q-toolbar-title class="text-weight-bold q-pt-md q-pb-sm text-h4 cursor-pointer" @click="$router.push('/')">
          Book Mall
        </q-toolbar-title>

        <q-tabs dense v-model="currentLink" active-color="white" indicator-color="white" class="text-white">
          <q-route-tab no-caps v-for="nav in navs" :key="nav" :name="nav.label" :label="nav.label" :to="nav.link" />
        </q-tabs>

      </q-toolbar>
    </q-header>

    <q-footer :reveal=true class="bg-grey-2 text-black q-pa-md row justify-between">
      <div class="text-caption">&copy; 인터넷보안공학과 2022671067 김주윤</div>
      <div class="text-caption">pre-alpha0.0.1</div>
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

    const navs = [
      {label : "Home", link: "/"},
      {label : "Books", link: "/book"},
    ]

    const currentLink = ref('/');

    watch(
      () => $route.path,
      (newPath) => {
        currentLink.value = '/' + newPath.split('/')[1];
      }
    );

    onMounted(()=> {
      currentLink.value = $route.path
    })

    return {
      navs,
      currentLink,
    }
  }
})
</script>
