<template>
  <q-page class="">
    <div class="bg-grey-3 q-pa-xl text-h3 text-center text-weight-thin">Upload new book</div>

    <q-form ref="formRef" class="q-px-xl column items-start">
      <q-input label="도서명" v-model="newBookData.name"></q-input>
      <q-input label="도서 설명" v-model="newBookData.description"></q-input>
      <q-input label="저자" v-model="newBookData.author"></q-input>
      <q-input label="출판사" v-model="newBookData.publisher"></q-input>
      <q-input type="date" label="출간일" v-model="newBookData.releaseDate"></q-input>
      <q-input type="number" label="총 페이지수" v-model="newBookData.totalPages"></q-input>
      <q-input type="text" label="카테고리" v-model="newBookData.category"></q-input>
      <q-input type="number" label="가격" v-model="newBookData.unitPrice"></q-input>
      <q-input type="number" label="재고" v-model="newBookData.unitsInStock"></q-input>

      <div>
        <q-radio val="new" v-model="newBookData.condition">new</q-radio>
        <q-radio val="secondhand" v-model="newBookData.condition">secondhand</q-radio>
        <q-radio val="ebook" v-model="newBookData.condition">ebook</q-radio>
      </div>

      <q-file></q-file>

      <div class="row q-gutter-sm q-py-md">
        <q-btn @click="uploadNewBook()" unelevated class="bg-green-6 text-white">등록</q-btn>
        <q-btn to="/book" unelevated class="bg-grey-6 text-white">취소</q-btn>
      </div>
    </q-form>


    <q-inner-loading :showing="loadingState"/>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { createBook, getAllBooks } from '../services/books.js'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'BookPage',

  setup() {
    const loadingState = ref();
    const newBookData = ref({})
    const formRef = ref()
    const $router = useRouter()
    const $q = useQuasar()

    async function uploadNewBook() {
      loadingState.value = true
      //console.log(newBookData.value)
      const res = await createBook(newBookData.value);
      console.log(res)

      loadingState.value = false
      $q.notify({
        message: '도서 등록 완료',
        color: 'positive'
      })
      $router.push(`/book/info/${res}`);
    }

    onMounted(() => {

    })

    return{
      loadingState,
      newBookData,
      uploadNewBook,
      formRef
    }
  }
})
</script>
