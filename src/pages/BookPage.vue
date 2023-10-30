<template>
  <q-page class="">
    <div class="bg-grey-3 q-pa-xl text-h3 text-center text-weight-thin">Books for sale</div>

    <div :class="isMobile ? 'q-px-sm' : 'q-px-xl'" class="q-py-md">
      <q-btn @click="$router.push('/book/uploadbook')" unelevated class="q-ml-md bg-green-6 text-white" size="sm">새로운 도서 업로드</q-btn>
    </div>

    <q-list separator :class="isMobile ? 'q-px-sm' : 'q-px-xl'" class="q-py-md">
      <q-item v-for="book in books" :key="book">
        <!-- <q-item-section avatar>
          <q-img alt="book image"></q-img>
        </q-item-section> -->
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

        <q-item-section class="col-1">
          <q-btn size="sm" unelevated class="bg-grey-6 text-white" :to="`book/info/${book.bookId}`">상세정보</q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-inner-loading :showing="loadingState"/>
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

    async function fetchData() {
      loadingState.value = true
      books.value = await getAllBooks();
      loadingState.value = false
      console.log(books.value)
    }

    onMounted(() => {
      fetchData();
    })

    return{
      books,
      loadingState,
      isMobile
    }
  }
})
</script>
