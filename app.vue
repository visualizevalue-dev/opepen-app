<template>
  <main>
    <NavBar />

    <NuxtPage />

    <ToggleDarkMode />
  </main>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { useMetaData } from './helpers/head';

/**
 * Make 100vh CSS variable available (iOS is weird with native vh)
 */
const { height } = useWindowSize()
const setHeight = () => document.documentElement.style.setProperty('--100vh', `${height.value}px`)
watch(height, setHeight)
onMounted(setHeight)

useMetaData({
  title: 'Home',
  description: 'OpepenAI lets you browse and create AI interpretations of the iconic Opepen Edition',
})
</script>

<style lang="postcss" scoped>
  main {
    min-height: var(--100vh);
  }
</style>

<style lang="postcss">
  body {
    min-height: var(--100vh);
  }
</style>
