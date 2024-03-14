type Auction = {
  id: string
  description: string
  image: string
  title: string
  completes_at: string
}

type KeyedAuctions = {
  [key: string]: Auction
}

const auctions: Ref<Auction[]> = ref([
  {
    id: 'status',
    image: 'https://visualizevalue.nyc3.cdn.digitaloceanspaces.com/visuals/status.png',
    title: 'Status: Eternal',
    description: 'Handshake bid on this VV 1/1 with your unrevealed Opepen 40 Editions',
    completes_at: '2024-03-15',
  }
])
const auctionsById: ComputedRef<KeyedAuctions> = computed(() => auctions.value?.reduce((obj: KeyedAuctions, auction) => {
  obj[auction.id] = auction
  return obj
}, {}))
const loaded = ref(false)

export function useAuctions() {
  loaded.value = true

  return {
    auctions,
    auctionsById,
    loaded,
  }
}