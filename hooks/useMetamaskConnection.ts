import {useEffect, useState} from "react";
import Web3 from 'web3';


export function useMetamaskConnection(): {
  connect: ()=>void,
  isConnected: boolean,
  balance: string | undefined,
  network: any
} {
  let web3 = new Web3(Web3.givenProvider);
  const [isConnected, setIsConnected] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [balance, setBalance] = useState<string | undefined>(undefined)
  const [network, setNetwork] = useState()
  const [networksData, setNetworksData] = useState<any[]>([])


  const accountsChanged = (accounts: string[]) => {
    getDataFromAccount(accounts)
  }
  const chainChanged = (chainId: string) => {
    window.location.reload()
  }

  const loadNetworksData = async () => {
    let response = await fetch('https://chainid.network/chains.json');
    let responseJson = await response.json()
    setNetworksData(responseJson)
  }

  useEffect(()=> {
    web3.givenProvider.on('accountsChanged', accountsChanged)
    web3.givenProvider.on('chainChanged', chainChanged)
    loadNetworksData()

    return () =>{
      web3.givenProvider.removeListener('accountsChanged', accountsChanged)
      web3.givenProvider.removeListener('chainChanged', chainChanged)

    }
  }, [])

  useEffect(() => {
    getDataFromAccount(accounts)
    getNetwork()
  }, [accounts])

  useEffect(() => {
    getNetwork()
  }, [networksData])

  const getNetwork = async (chainId?: number) => {
    let newChainId: number;
    if(!chainId){
      newChainId = await web3.eth.getChainId()
    }else{
      newChainId = chainId
    }
    const chain = networksData.find((someChain: any) => someChain.chainId === newChainId)
    setNetwork(chain)
  }

  const getDataFromAccount = async (accounts?: string[]) => {
    let newAccounts;
    if(!accounts){
      newAccounts = await web3.eth.requestAccounts();
    }else{
      newAccounts = accounts
    }

    if (!newAccounts.length) {
      setIsConnected(false)
    } else {
      setIsConnected(true)
      const account = newAccounts[0]
      const balance = await web3.eth.getBalance(account)
      setBalance(web3.utils.fromWei(balance))
    }
  }

  const connect = async () => {
    if (web3.givenProvider) {
      const accounts = await web3.eth.requestAccounts();
      setAccounts(accounts)
    }else{
      alert('Could not find Provider')
    }
  }

  return {
    connect,
    isConnected,
    balance,
    network
  }
}