import { transaction, limit, proposer, payer, authorizations, authz, cdc } from "@onflow/fcl"
import { invariant } from "@onflow/util-invariant"
import { tx } from "../utils/tx"

const CODE = cdc`
import NonFungibleToken from 0xf5c21ffd3438212b
import WakandaPass from 0xf5c21ffd3438212b

transaction() {
    let minter: &WakandaPass.Collection
    prepare(signer: AuthAccount) {
        self.minter = signer.borrow<&WakandaPass.Collection>(from: WakandaPass.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }
    execute {
        self.minter.initWakandaPass()
    }
}
`

const initPass = (address: string | null, opts = {}) => {
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx([transaction(CODE), limit(1000), proposer(authz), payer(authz), authorizations([authz])], opts)
}

export default initPass