import { transaction, limit, proposer, payer, authorizations, authz, cdc } from "@onflow/fcl"
import { invariant } from "@onflow/util-invariant"
import { tx } from "../utils/tx"

const CODE = cdc`
`

const txSetupCogito = (address: string | null, opts = {}) => {
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx([transaction(CODE), limit(70), proposer(authz), payer(authz), authorizations([authz])], opts)
}

export default txSetupCogito