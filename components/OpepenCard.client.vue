<template>
<article class="opepen-card" :style="wrapperStyle">
  <div @click="onClick">
    <OpepenImage :token="token" />

    <div class="text">
      <h1>Opepen {{ id }}</h1>
      <slot name="subline">
        <p>Edition of {{ set }}</p>
      </slot>
    </div>

    <NuxtLink :to="`/opepen/${token.token_id}`"><span>View Opepen #{{ token.token_id }}</span></NuxtLink>
  </div>
</article>
</template>

<script setup>
import { getRandomArbitrary } from '~/helpers/random'
import { delay } from '~/helpers/time'

const {
  token,
  set,
  rotate
} = defineProps({
  token: Object,
  set: [Number, String],
  rotate: {
    type: Boolean,
    default: false,
  }
})

const id = token.token_id

// ==============================================================
// Style & Interaction
// ==============================================================
const rotation = ref(rotate ? getRandomArbitrary(-12, 12) : 0)
const scale = ref(1)
const wrapperStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg) scale(${scale.value})`,
}))

const wiggle = async () => {
  rotation.value += getRandomArbitrary(5, 10)
  scale.value = 1.05
  await delay(100)
  rotation.value -= getRandomArbitrary(10, 20)
  await delay(80)
  rotation.value += getRandomArbitrary(5, 10)
  await delay(50)
  scale.value = 1
  rotation.value = getRandomArbitrary(-5, 5)
}
const onClick = async () => {
  wiggle()
}
</script>

<style lang="postcss" scoped>
.opepen-card {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 125%;
  transition: all var(--speed-fast);
  transform-origin: center;

  /* Inner */
  > div {
    container-type: inline-size;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gray-z-1);
    border: var(--border);
    border-radius: var(--size-4);
    border-top-left-radius: var(--size-0);
    box-shadow: 0 var(--size-2) var(--size-5) 0 var(--semi-shade);
    display: grid;
    grid-template-rows: 4fr 1fr;

    .image {
      border: none !important;
      border-radius: 0;
      border-top-right-radius: var(--size-4);
      border-top-left-radius: var(--size-0);
      border-bottom: var(--border);
      padding-bottom: 100% !important;
    }

    img {
      border-top-right-radius: var(--size-4);
      border-top-left-radius: var(--size-0);
      border-bottom: var(--border);
    }

    .text {
      padding: 0 var(--size-4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-transform: uppercase;
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--letter-spacing-md);
      user-select: none;
      line-height: 1;
      width: 100%;
      overflow: hidden;

      h1 {
        font-size: 6cqw;
        margin-bottom: 2cqw;
      }

      :deep(p) {
        font-size: 4.5cqw;
        color: var(--gray-z-7);
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    a {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.00001;
    }
  }
}
</style>
