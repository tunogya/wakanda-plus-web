import { send, decode, script, args, arg, cdc } from "@onflow/fcl"
import * as t from "@onflow/types"

const CODE = cdc`
`

const tokenURI = (address: string | null, id: Number) => {
  if (address == null) return Promise.resolve(null)

  return send([script(CODE), args([arg(address, t.Address), arg(id, t.UInt64)])]).then(decode)
}

export default tokenURI