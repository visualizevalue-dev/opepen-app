<template>
  <nav :class="{ 'scrolled': isScrolled }">
    <NuxtLink to="/" title="Opepen Home Page">
      <Logo />
    </NuxtLink>

    <!-- <Button to="/auctions">
      <Icon type="columns" />
      <span>Auctions</span>
    </Button> -->

    <Button to="/sets">
      <Icon type="grid" />
      <span>Sets</span>
    </Button>

    <CreateLink />

    <Connect />
  </nav>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import pad from '~/helpers/pad'
import { useSets } from '~/helpers/sets'

const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 5)

const { currentSet, fetchSets } = useSets()
const setUrl = computed(() => `/sets/${currentSet.value ? pad(currentSet.value.id) : '003'}`)
onMounted(() => fetchSets())
</script>

<style lang="postcss" scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: var(--navbar-height);
    padding: var(--size-4);
    display: flex;
    align-items: center;
    gap: var(--size-3);
    background-color: var(--semi);
    z-index: 40;
    border-bottom: var(--border);
    border-color: transparent;
    backdrop-filter: var(--blur);
    transition: all var(--speed-fast);

    &.scrolled {
      border-color: var(--gray-z-2);
    }

    :deep(> *) {
      height: var(--size-7);
    }

    > :first-child {
      margin-right: auto;
      display: flex;
      align-items: center;

      :deep(svg:last-child) {
        display: none;

        @media (--sm) {
          display: initial;
        }
      }
    }

    :deep(+ div) {
      position: relative;
      min-height: var(--100vh);
      padding: calc(var(--navbar-height) + var(--size-4)) var(--container-padding-x) var(--size-5);
    }

    :deep(> .button:not(:last-child)) {
      > span {
        display: none;

        @media (--md) {
          display: block;
        }
      }
    }
  }
</style>
