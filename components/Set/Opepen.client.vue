<template>
  <section v-if="revealed" class="set-opepen">
    <Loading v-if="pending" />
    <div v-else class="list">
      <div
        v-for="token in opepen"
        :key="token.token_id"
      >
        <OpepenCard
          :token="token"
          :set="token.data?.edition || 40"
        >
          <template #subline>
            <p>owned by <NuxtLink :to="`/holders/${token.owner}`" @click.stop="() => null">{{ token.ownerAccount?.display }}</NuxtLink></p>
          </template>
        </OpepenCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { DateTime } from 'luxon'

const { data } = defineProps({
  data: Object,
})

const config = useRuntimeConfig()
const url = `${config.public.opepenApi}/opepen/sets/${data.set_id}/opepen`
const { data: opepen, pending } = await useLazyFetch(url, { key: 'revealed-opepen' })

const revealsAt = ref(DateTime.fromISO(data.reveals_at).toUnixInteger())
const revealed = ref(revealsAt.value <= DateTime.now().toUnixInteger() && data.set_id)
</script>

<style lang="postcss" scoped>
  .list {
    display: flex;
    justify-content: center;
    container-type: inline-size;
    flex-wrap: wrap;
    max-width: var(--content-width);
    width: 100%;
    margin: 0 auto;
    gap: var(--size-4);

    > div {
      width: 100%;
      max-width: min(50vw, calc(50vh / 1.5));
    }

    > div {
      @container (width > 20rem) {
        max-width: min(50cqw, calc(50cqh / 1.5));
      }
      @container (width > 30rem) {
        max-width: calc(25cqw - var(--size-4));
      }
    }
  }
</style>
