<template>
  <q-page class="bg-secondary">
    <div class="q-pa-xl text-h3 text-center text-weight-thin">Upload new book</div>
    <q-separator></q-separator>

    <q-form ref="formRef" class="q-px-xl column items-start">
      <q-input maxlength="20" label="title" v-model="newBookData.name"></q-input>
      <q-input maxlength="200" label="description" v-model="newBookData.description"></q-input>
      <q-input maxlength="10" label="author" v-model="newBookData.author"></q-input>
      <q-input maxlength="10" label="publisher" v-model="newBookData.publisher"></q-input>
      <q-input type="date" label="date of publish" v-model="newBookData.releaseDate"></q-input>
      <q-input maxlength="5" type="number" label="number of pages" v-model="newBookData.totalPages"></q-input>
      <q-input maxlength="10" type="text" label="category" v-model="newBookData.category"></q-input>
      <q-input maxlength="10" type="number" label="price" v-model="newBookData.unitPrice"></q-input>
      <q-input maxlength="10" type="number" label="stock" v-model="newBookData.unitsInStock"></q-input>

      <div>
        <q-radio val="new" v-model="newBookData.condition">new</q-radio>
        <q-radio val="secondhand" v-model="newBookData.condition">secondhand</q-radio>
        <q-radio val="ebook" v-model="newBookData.condition">ebook</q-radio>
      </div>

      <q-file
        label="upload book cover"
        outlined
        accept=".jpg, .png, image/*"
        max-files="1"
        max-file-size="300000"
        v-model="bookImageFile"
        @update:model-value="addImageHandler"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <q-img v-if="imagePreviewLink" :src="imagePreviewLink" width="30vw"></q-img>

      <div class="row q-gutter-sm q-py-md">
        <q-btn @click="uploadNewBook()" unelevated class="bg-green-6 text-white">upload</q-btn>
        <q-btn to="/book" unelevated class="bg-grey-6 text-white">cancel</q-btn>
      </div>
    </q-form>


    <q-inner-loading :showing="loadingState" color="primary"/>
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

      loadingState.value = false
      $q.notify({
        message: 'book uploaded successfully',
        color: 'positive'
      })
      $router.push(`/book/info/${res}`);
    }

    function onRejected() {
      $q.notify({
        message: 'file upload error',
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
