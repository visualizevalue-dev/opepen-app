<template>
  <Button v-if="isConnected" to="/create/sets" @click="onCreateClick" class="create">
    <Icon type="plus" />
    <span>Create</span>
  </Button>
</template>

<script setup>
import { useAccount } from '~/helpers/use-wagmi'

const { isConnected } = useAccount()

const onCreateClick = () => {
  setTimeout(() => {
    nextTick(() => {
      const el = document.querySelector('.prompt-input textarea')

      el?.focus()
    })
  }, 50)
}
</script>
