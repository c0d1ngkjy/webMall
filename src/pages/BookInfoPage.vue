<template>
  <q-page class="">
    <div class="bg-grey-3 q-pa-xl text-h3 text-center text-weight-thin">Book Info</div>

    <div class="q-px-xl q-py-md">
      <q-img class="q-mb-md" :src="currentBook.data?.bookCoverRef" width="300px" alt="book cover img"></q-img>
      <div class="text-bold text-h6 q-mb-md">[{{ currentBook.data?.name }}]</div>
      <q-separator></q-separator>
      <div class="q-py-md">{{ currentBook.data?.description }}</div>
      <q-separator></q-separator>

      <div class="q-gutter-md q-my-md">
        <div class="row items-center">
          <div>도서코드 : </div>
          <q-chip class="bg-red-6 text-white" size="sm">{{ currentBook.bookId }}</q-chip>
        </div>

        <div>출판사 : {{ currentBook.data?.publisher }}</div>
        <div>재고수 : {{ currentBook.data?.unitsInStock }}</div>
        <div>총 페이지 수 : {{ currentBook.data?.totalPages }}</div>
        <div>출판일 : {{ currentBook.data?.releaseDate }}</div>
      </div>
      <div class="text-bold text-h6">{{ currentBook.data?.unitPrice }} 원</div>
      <div>
        <q-btn unelevated class="bg-green-6 text-white q-mr-sm">도서주문</q-btn>
        <q-btn unelevated class="bg-grey-6 text-white" to="/book">도서목록</q-btn>
      </div>
    </div>
    <q-inner-loading :showing="loadingState"/>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleBook } from '../services/books'

export default defineComponent({
  name: 'BookInfoPage',

  setup() {
    const $route = useRoute();
    const currentBook = ref({});
    const loadingState = ref();

    async function fetchData() {
      loadingState.value = true;
      currentBook.value = await getSingleBook($route.params.bookId)
      loadingState.value = false;
      console.log(currentBook.value)
    }

    onMounted(() => {
      fetchData();
    })

    return{
      currentBook,
      loadingState
    }
  }
})
</script>
