import { config } from "@onflow/fcl"

config({
  "accessNode.api": "https://flow-mainnet.g.alchemy.com",
  'grpc.metadata': { 'api_key': process.env.ALCHEMY_KEY },
  "app.detail.title": "Wakanda+",
  "app.detail.icon": "https://wakandaplus.wakanda.cn/logo512.png",
  "fcl.limit": "100",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "flow.network": "mainnet",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  // Ledger: 0xe5cd26afebe62781
  "discovery.authn.include": ["0xe5cd26afebe62781"],
})
