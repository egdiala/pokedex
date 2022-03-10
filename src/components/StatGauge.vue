<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatGauge',
  props: {
      baseStat: {
          type: [String, Number],
          default: 0,
      }
  },
  methods: {
      beforeEnter (el) {
          el.style.width = 0
      },
      enter (el) {
          el.style.width = `${this.baseStat}px`
          el.style.transition = `width 1.4s linear`
      }
  }
})
</script>

<template>
  <div class="w-36 bg-yellow-100 h-5" role="progressbar" :aria-valuenow="baseStat" aria-valuemin="0" aria-valuemax="140">
      <transition appear @before-appear="beforeEnter" @after-appear="enter">
          <div class="bg-yellow-400 h-5 gauge flex items-center px-2 text-yellow-900"><span>{{baseStat}}</span></div>
      </transition>
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
.progressbar {
  transition: width 0.25s ease;
  animation: progress-indeterminate 1.4s ease;
}
</style>
