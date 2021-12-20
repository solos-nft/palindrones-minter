import axios from 'axios'
import { secrets, etherscanEndpoints } from '../config'
import qs from 'qs'
import { ChainId } from '@usedapp/core'

export async function verifyProxy(address: string, chainId: ChainId) {
  const body = qs.stringify({ address })
  const res = await axios.post(`${etherscanEndpoints[chainId]}api`, body, {
    params: {
      module: 'contract',
      action: 'verifyproxycontract',
      apikey: secrets.etherscanApiKey,
    },
  })

  return {
    success: res.data.status === '1',
    messageOrGuid: res.data.result,
  }
}

export async function checkProxyVerification(guid: string, chainId: ChainId) {
  const res = await axios.get(`${etherscanEndpoints[chainId]}api`, {
    params: {
      module: 'contract',
      action: 'checkproxyverification',
      guid,
      apikey: secrets.etherscanApiKey,
    },
  })

  return {
    success: res.data.status === '1',
    message: res.data.result,
  }
}
