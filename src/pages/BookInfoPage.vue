<template>
  <q-page class="bg-secondary">
    <div class="q-pa-xl text-h3 text-center text-weight-thin">Book Info</div>
    <q-separator></q-separator>


    <div class="q-px-xl q-py-md">
      <div v-if="currentBook.data?.bookCoverRef != undefined">
        <q-img class="q-mb-md" :src="currentBook.data?.bookCoverRef" width="30vw" alt="book cover img"></q-img>
      </div>
      <div class="text-bold text-h6 q-mb-md">[{{ currentBook.data?.name }}]</div>
      <q-separator></q-separator>
      <div class="q-py-md">{{ currentBook.data?.description }}</div>
      <q-separator></q-separator>

      <div class="q-gutter-md q-my-md">
        <div class="row items-center">
          <div>book code : </div>
          <q-chip class="bg-green-6 text-white" size="sm">{{ currentBook.bookId }}</q-chip>
        </div>

        <div>publisher : {{ currentBook.data?.publisher }}</div>
        <div>remaining stock : {{ currentBook.data?.unitsInStock }}</div>
        <div>pages: {{ currentBook.data?.totalPages }}</div>
        <div>publish date : {{ currentBook.data?.releaseDate }}</div>
      </div>
      <div class="text-bold text-h6 q-my-md q-py-sm q-px-md bg-accent" style="max-width: 200px; border-radius: 15px;">{{ currentBook.data?.unitPrice }} won</div>
      <div>
        <q-btn unelevated class="bg-green-6 text-white q-mr-sm">purchase</q-btn>
        <q-btn unelevated class="bg-grey-6 text-white" to="/book">list</q-btn>
      </div>
    </div>
    <q-inner-loading :showing="loadingState" color="primary"/>
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
      //console.log(currentBook.value)
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
