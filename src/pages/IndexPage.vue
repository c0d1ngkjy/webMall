<template>
  <q-page class="">
    <div class="bg-grey-3 q-pa-xl text-h3 text-center text-weight-thin">Welcome to myMall</div>
    <div class="q-pa-md q-mb-md">
      <div class="text-center q-pa-lg">welcome to webmarket!</div>
      <div class="text-center q-py-sm">
        현잭시각 : {{ clock }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const clock = ref();

    onMounted(() => {
      setInterval(() => {
        const currentTime = new Date();
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        let amPm = "AM";

        if (hours >= 12) {
          amPm = "PM";
          if (hours > 12) {
            hours -= 12;
          }
        }

        clock.value = `${hours} : ${minutes} : ${seconds} ${amPm}`;
      }, 1000);
    })

    return{
      clock,
    }
  }
})
</script>
