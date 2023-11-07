<template>
  <q-page class="bg-white">
    <div :class="isMobile ? 'q-px-sm' : 'q-px-xl'" class="q-py-md q-px-md row justify-between">
      <q-btn @click="$router.push('/book/uploadbook')" unelevated class="bg-primary text-white text-lowercase" size="sm">upload new book</q-btn>
      <div>
        <q-btn dense unelevated @click="handleView">
          <q-icon size="sm" color="primary" :name="listView ? 'grid_view' : 'reorder'" />
        </q-btn>
      </div>
    </div>

    <q-separator color="primary" />

    <q-list v-if="listView == true" separator :class="isMobile ? 'q-px-lg' : 'q-px-xl'">
      <q-item v-for="book in books" :key="book">
        <q-item-section avatar>
          <q-img :width="isMobile ? '10vw' : '3vw'" :src="book.bookData.bookCoverRef ? book.bookData.bookCoverRef : bookCoverPlaceHolderUrl" alt="book cover placeholder img"></q-img>
        </q-item-section>
        <q-item-section>
          <q-item-label overline class="text-bold text-subtitle1" >[{{ book.bookData.name }}]</q-item-label>
          <q-item-label>{{ book.bookData.description }}</q-item-label>
          <q-item-label caption class="row items-center q-gutter-sm">
            <div>
              {{ book.bookData.author }}
            </div>
            <q-separator vertical></q-separator>
            <div>
              {{ book.bookData.publisher }}
            </div>
            <q-separator vertical></q-separator>
            <div>
              {{ book.bookData.unitPrice }}
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section style="max-width: 70px;">
          <q-btn :size="isMobile ? 'xs' : 'sm'" unelevated class="bg-primary text-white text-lowercase" :to="`book/info/${book.bookId}`">info</q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="row justify-start q-gutter-md q-py-md"  v-if="listView == false" :class="isMobile ? 'q-px-sm' : 'q-px-xl'">
      <q-card @click="$router.push(`book/info/${book.bookId}`)" flat :style="isMobile ? 'width:11vw' : 'width: 11vw'" class="column justify-between bg- content-center items-center q-pa-md cursor-pointer" v-for="book in books" :key="book">
        <div>
          <q-img :width="isMobile ? '4vw' : '4vw'" :src="book.bookData.bookCoverRef ? book.bookData.bookCoverRef : bookCoverPlaceHolderUrl" alt="book cover placeholder img"></q-img>
        </div>
        <div class="text-center text-bold" style="font-size: 12px;">
          {{ book.bookData.name }}
        </div>
        <div class="text-caption">
          {{ book.bookData.unitPrice }} won
        </div>
      </q-card>
    </div>

    <q-inner-loading :showing="loadingState" color="primary"/>
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getAllBooks } from '../services/books.js'
import { Screen } from 'quasar';

export default defineComponent({
  name: 'BookPage',

  setup() {
    const books = ref([]);
    const loadingState = ref();
    const isMobile = computed(() => Screen.lt.sm)
    const bookCoverPlaceHolderUrl = require('src/assets/bookCoverPlaceHolder.png');
    const listView = ref(true);

    async function fetchData() {
      loadingState.value = true
      books.value = await getAllBooks();
      loadingState.value = false
      //console.log(books.value)
    }

    function handleView() {
      listView.value = !listView.value
      //console.log(listView.value)
    }


    onMounted(() => {
      fetchData();
    })

    return{
      books,
      loadingState,
      isMobile,
      bookCoverPlaceHolderUrl,
      listView,
      handleView
    }
  }
})
</script>
