<template>
  <q-page class="bg-secondary">
    <div class="q-pa-xl text-h3 text-center text-weight-thin">Welcome to my BookMall</div>
    <q-separator></q-separator>
    <div class="q-pa-md q-mb-md">
      <q-card flat class="flex flex-center bg-secondary">
        <q-card-section class="column">
          <div class="shadow-1 q-py-sm q-px-md q-mb-sm text-h5 bg-deep-orange-5 text-white text-bold" style="border-radius: 15px;">Current Time</div>
          <div class="row items-center q-gutter-sm">
            <div class="shadow-1 q-py-sm q-px-md bg-white text-red-5 text-bold" style="font-size: 18px; border-radius: 15px;">{{ clock.amPm }}</div>
            <div class="shadow-1 q-py-sm q-px-md bg-deep-purple-3 text-white text-bold" style="font-size: 18px; border-radius: 15px;">{{ clock.h }}</div>
            <div class="text-bold" style="font-size: 18px">:</div>
            <div class="shadow-1 q-py-sm q-px-md bg-deep-purple-3 text-white text-bold" style="font-size: 18px; border-radius: 15px;">{{ clock.m }}</div>
            <div class="text-bold" style="font-size: 18px">:</div>
            <div class="shadow-1 q-py-sm q-px-md bg-deep-purple-3 text-white text-bold" style="font-size: 18px; border-radius: 15px;">{{ clock.s }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const clock = ref({});

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

        //clock.value = `${hours} : ${minutes} : ${seconds} ${amPm}`;
        clock.value = {
          h: hours,
          m: minutes,
          s: seconds,
          amPm: amPm
        };
      }, 1000);
    })

    return{
      clock,
    }
  }
})
</script>
