import { send, decode, script, cdc, args } from "@onflow/fcl"

const CODE = cdc`
`

const totalSupply = () => {
  return send([script(CODE), args([])]).then(decode)
}

export default totalSupply