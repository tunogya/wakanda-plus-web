import {useEffect, useState} from "react";
import * as fcl from "@onflow/fcl";

interface Provider {
  address: string
  name: string
  icon: string
  description: string
  color: string
  supportEmail: string
  authn_endpoint: string
  website: string
}

export const useActiveFlowReact = () => {
  const [user, setUser] = useState({loggedIn: null})
  const [services, setServices] = useState<Provider[]>([])

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  useEffect(() => fcl.discovery.authn.subscribe((res: any) => setServices(res.results)), [])

  return {
    user,
    services,
  }
}