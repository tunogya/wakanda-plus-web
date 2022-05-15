import {useCallback, useEffect} from "react";
import qs from "qs";
import {useActiveWeb3React} from "./web3";
import {atom, useRecoilState} from "recoil";

type PETINFO = {
  id: number,
  username: string,
  location: {
    latitude: number | null,
    longitude: number | null,
  } | null
}

type USERINFO = {
  email: string | null,
  id: number,
  pets: PETINFO[],
  phone: string | null,
  telegram: string | null,
  twitter: string | null,
  wallet: string | null,
}

const defaultUserInfo: USERINFO = {
  id: 0,
  email: null,
  pets: [],
  phone: null,
  telegram: null,
  twitter: null,
  wallet: null
}

export const userInfoAtom = atom({
  key: "user:info",
  default: defaultUserInfo
})

export const strapi_key = process.env.REACT_APP_STRAPI_KEY

const useUserInfo = () => {
  const {account} = useActiveWeb3React()
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom)

  const fetchPets = useCallback(async () => {
    if (strapi_key && account) {
      const query = qs.stringify({
        filters: {
          wallet: {
            $eq: account,
          },
        },
        populate: "*"
      }, {
        encodeValuesOnly: true,
      });
      const res = await fetch(
        `https://wkd-strapi.herokuapp.com/api/wakanda-users?${query}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${strapi_key}`,
          }
        }).then((res) => res.json())
        .catch((err) => console.log(err))

      if (res && res.data.length === 0 ) {
        await register()
      } else {
        setUserInfo(res.data[0])
      }
    }
  }, [account, strapi_key])

  const register = async () => {
    if (account) {
      const res = await fetch(
        'https://wkd-strapi.herokuapp.com/api/wakanda-users', {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${strapi_key}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              wallet: account
            }
          })
        }
      ).then((res)=> res.json())
        .catch((err)=> console.log(err))
      if (res.data){
        setUserInfo({...userInfo, id: res.data.id})
      }
    }
  }

  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  return {
    userInfo
  }

}

export default useUserInfo