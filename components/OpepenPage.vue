<template>
  <article class="opepen-page">
    <PageHeader>
      <h1 class="breadcrumb">
        <NuxtLink :to="`/holders/${opepen.owner}`">
          <!-- <Icon type="arrow-left" /> -->
          <span>{{ opepen.ownerAccount.display }}</span>
        </NuxtLink>
        <span class="separator">/</span>
        <span>Opepen #{{opepen.token_id}}</span>
      </h1>
    </PageHeader>

    <div class="image-wrapper">
      <OpepenImage :token="opepen" :embed="animationURI" version="lg" />
    </div>

    <div class="actions">
      <a :href="`https://opensea.io/assets/ethereum/${contract}/${opepen.token_id}`" target="_blank">
        <Icon type="opensea" />
      </a>
      <a :href="`https://etherscan.io/nft/${contract}/${opepen.token_id}`" target="_blank">
        <IconsEtherscan />
      </a>

      <Button @click="download"><Icon type="download" /> <span>Download</span></Button>
    </div>

    <OpepenAttributes :token="opepen" :set="opepen.set?.submission || opepen.set" />

    <OpepenEvents :token="opepen" />
  </article>
</template>

<script setup>
import { useMetaData } from '~/helpers/head'
import { imageURI } from '~/helpers/images'
import downloadImage from '~/helpers/download-image'
import { useOpepenMetadata } from '~/helpers/opepen'
import { normalizeURI } from '~/helpers/urls'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const contract = config.public.opepenContract

if (parseInt(route.params.id) > 16_000) router.replace('/')

const { data: opepen } = await useFetch(`${config.public.opepenApi}/opepen/${route.params.id}`)
if (! opepen.value) router.replace('/')

const metadata = await useOpepenMetadata(route.params.id)
const animationURI = computed(() => {
  if (! metadata?.animation_url) return

  return normalizeURI(metadata.animation_url)
})

const image = computed(() => imageURI(opepen.value.image))
const download = async () => {
  const isStatic = ['png', 'jpg', 'jpeg'].includes(opepen.value.image?.type)

  if (metadata?.download_url) {
    return open(normalizeURI(metadata.download_url), '_blank')
  }

  // Force update the image (in the background)
  fetch(`${config.public.opepenApi}/opepen/${route.params.id}/image`, { method: 'POST' })

  return isStatic
    ? downloadImage(image.value, { property: `Opepen ${opepen.value.token_id}` })
    : open(image.value, '_blank')
}

useMetaData({
  title: `Opepen #${route.params.id}`,
  og: image.value,
  meta: [
    {
      property: 'eth:nft:collection',
      content: `Opepen Edition`
    },
    {
      property: 'eth:nft:mint_status',
      content: `closed`
    },
    {
      property: 'eth:nft:creator_address',
      content: `0xc8f8e2f59dd95ff67c3d39109eca2e2a017d4c8a`
    },
    {
      property: 'eth:nft:contract_address',
      content: contract,
    },
    {
      property: 'eth:nft:schema',
      content: `erc721`
    },
    {
      property: 'eth:nft:chain',
      content: `ethereum`
    },
    {
      property: 'eth:nft:media_url',
      content: image.value,
    },
    {
      property: 'eth:nft:mint_count',
      content: 16000
    },
  ]
})
</script>

<style lang="postcss" scoped>
  article.opepen-page {
    --width-md: min(60vh, 80vw);

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: var(--size-4);
    margin: var(--size-2) auto;

    @media (--md) {
      max-width: var(--width-md);
      gap: var(--size-7);
    }

    .image-wrapper {
      width: 100%;

      @media (--md) {
        max-width: var(--width-md);
        max-height: var(--width-md);
      }

    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--size-4);

      a {
        color: var(--gray-z-5);
        transition: all var(--speed);

        svg {
          width: var(--size-5);
        }

        &:--highlight {
          color: var(--color);
        }
      }

      > *:last-child {
        margin-left: auto;
      }
    }
  }
</style>
