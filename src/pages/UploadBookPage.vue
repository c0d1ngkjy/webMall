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

      <q-file
        label="도서 표지 업로드"
        borderless
        accept=".jpg, image/*"
        max-files="1"
        max-file-size="100000"
        v-model="bookImageFile"
        @update:model-value="addImageHandler"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <q-img v-if="imagePreviewLink" :src="imagePreviewLink" width="500px"></q-img>

      <div class="row q-gutter-sm q-py-md">
        <q-btn @click="uploadNewBook()" unelevated class="bg-green-6 text-white">등록</q-btn>
        <q-btn to="/book" unelevated class="bg-grey-6 text-white">취소</q-btn>
      </div>
    </q-form>


    <q-inner-loading :showing="loadingState" color="black"/>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { createBook, getAllBooks } from '../services/books.js'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { storage } from "src/boot/firebase";
import { ref as firebaseStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";

export default defineComponent({
  name: 'BookPage',

  setup() {
    const loadingState = ref();
    const newBookData = ref({})
    const bookImageFile = ref();
    const imagePreviewLink = ref();
    const uploadedImageUrl = ref();
    const storageRef = firebaseStorageRef(storage, "books");
    const formRef = ref()
    const $router = useRouter()
    const $q = useQuasar()

    async function uploadNewBook() {
      loadingState.value = true
      await uploadImage();

      const res = await createBook({
        ...newBookData.value,
        bookCoverRef: uploadedImageUrl.value
      });

      console.log(res)

      loadingState.value = false
      $q.notify({
        message: '도서 등록 완료',
        color: 'positive'
      })
      $router.push(`/book/info/${res}`);
    }

    function onRejected() {
      $q.notify({
        message: '파일 업로드 실패',
        color: 'negative'
      })
    }

    function addImageHandler() {
        imagePreviewLink.value = URL.createObjectURL(bookImageFile.value)
    }

    async function uploadImage() {
      const imageRef = firebaseStorageRef(storageRef, bookImageFile.value.name + v4());
        return uploadBytes(imageRef, bookImageFile.value).then((snapshot) => {
          return getDownloadURL(snapshot.ref).then((url) => {
            uploadedImageUrl.value = url;
            return url;
          });
        });
    }

    return{
      loadingState,
      newBookData,
      uploadNewBook,
      formRef,
      onRejected,
      bookImageFile,
      imagePreviewLink,
      addImageHandler
    }
  }
})
</script>
