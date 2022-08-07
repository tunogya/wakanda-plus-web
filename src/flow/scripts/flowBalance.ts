import { account } from "@onflow/fcl"

const flowBalance = (address: string | null) => {
  if (address == null) return Promise.resolve(null)
  // @ts-ignore
  return account(address).then(d => d.balance)
}

export default flowBalance