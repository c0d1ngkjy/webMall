<template>
  <q-page class="bg-white">
    <div :class="isMobile ? 'column' : 'row justify-between'" class="items-center">
      <div class="q-pa-xl text-primary text-h3 text-center text-weight-bold">📘 Welcome to BookMall</div>

      <q-card style="border-radius: 20px;" class="column q-pa-sm q-ma-md">
          <div class="shadow-1 q-py-sm q-px-md q-mb-sm text-subtitle2 bg-primary text-white text-bold" style="border-radius: 15px;">Current Time</div>
          <div class="row items-center q-gutter-sm">
            <div class="shadow-1 q-py-sm q-px-md bg-white text-primary text-bold" style="font-size: 14px; border-radius: 15px;">{{ clock.amPm }}</div>
            <div class="shadow-1 q-py-sm q-px-md text-bold" style="font-size: 14px; border-radius: 15px;">{{ clock.h }}</div>
            <div class="text-bold" style="font-size: 14px">:</div>
            <div class="shadow-1 q-py-sm q-px-md text-bold" style="font-size: 14px; border-radius: 15px;">{{ clock.m }}</div>
            <div class="text-bold" style="font-size: 14px">:</div>
            <div class="shadow-1 q-py-sm q-px-md text-bold" style="font-size: 14px; border-radius: 15px;">{{ clock.s }}</div>
          </div>
      </q-card>
    </div>

    <q-separator color="primary"></q-separator>

    <div class="q-px-md q-py-sm">
      Reading books is a fundamental and timeless activity that holds immense significance in our lives. In an age dominated by technology, the importance of reading books cannot be overstated. It is a practice that not only nourishes the mind but also enriches the soul. Books serve as windows into different worlds, offering knowledge, entertainment, and a means of escape. They have the power to educate, inspire, and empower individuals, making them an essential part of personal and intellectual growth.

One of the primary reasons for the importance of reading books is the wealth of knowledge they provide. Books are repositories of information, covering a vast array of topics and subjects. Whether you're interested in science, history, philosophy, or fiction, there is a book out there that can quench your thirst for knowledge. Reading books allows us to delve deep into a subject, gaining insights and expertise that we might not find elsewhere. It fosters critical thinking, expands our horizons, and keeps us informed about the world and its myriad complexities.

Books are also a source of inspiration. They introduce us to characters who overcome challenges, authors who conquer obstacles, and ideas that can change the world. Reading about the accomplishments and struggles of others can motivate us to reach for our own goals and dreams. Literature has the power to ignite our imagination, encouraging creativity and innovation. In the pages of a book, we may find solutions to our own problems, find solace in times of trouble, or simply experience the thrill of discovering new ideas and perspectives.

Furthermore, books have the capacity to empower individuals. They offer a means of self-improvement and personal development. Whether it's a self-help book that imparts valuable life lessons or a biography of a great leader, books can guide us toward self-discovery and growth. They teach us about resilience, empathy, and the human condition. In the face of adversity, books provide the wisdom of those who have faced similar challenges. They show us that we are not alone in our struggles and that there is hope for a brighter future.

Reading books also enhances our cognitive abilities. It improves our vocabulary, comprehension skills, and communication abilities. Regular reading sharpens our intellect and keeps our minds active and engaged. The act of reading, with its focus and concentration, is an exercise for our brain that helps stave off cognitive decline. In an era where distractions abound, reading books provides an opportunity for mental discipline and focus that is increasingly rare.

Additionally, reading books fosters empathy and understanding. When we immerse ourselves in the lives and experiences of fictional characters or learn about different cultures and perspectives, we develop a broader worldview. We gain insight into the struggles and triumphs of others, which can lead to greater tolerance and compassion. By reading diverse literature, we can confront our own biases and prejudices, ultimately becoming more open-minded and accepting of people who are different from us.

Books also play a crucial role in preserving culture and history. They are a means of passing down knowledge, traditions, and stories from one generation to the next. Through books, we connect with the past and understand the evolution of society, technology, and human thought. They are, in essence, a time capsule that allows us to learn from the experiences of those who came before us.

In a world where information is constantly evolving and easily accessible through the internet, books continue to hold their place as reliable sources of knowledge. While digital media offers convenience, books provide a tangible and tactile experience. The smell of the pages, the weight of the book in your hand, and the sound of turning a page all contribute to a unique and immersive reading experience.

In conclusion, the importance of reading books is undeniable. They are the keys to unlocking the vast reservoirs of human knowledge, a source of inspiration, and a means of personal empowerment and growth. Books enhance our cognitive abilities, foster empathy, and connect us to the past. In a rapidly changing world, they remain steadfast as beacons of wisdom and understanding. Reading books is not just a leisure activity; it is a vital and transformative practice that enriches our lives in countless ways. So, whether you're a seasoned reader or just beginning your literary journey, remember that each book you pick up has the potential to change your life and the world around you.
    </div>
  </q-page>
</template>

<script>
import { Screen } from 'quasar';
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const clock = ref({});
    const isMobile = computed(() => Screen.lt.sm)

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
      isMobile
    }
  }
})
</script>
