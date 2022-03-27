import type { NextPage } from 'next'
import MetaMaskConnector from "../components/MetaMaskConnector";
import styled from 'styled-components';
import Web3 from "web3";

const HomeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Link = styled.a`
  color: rgb(16, 152, 252);
`

const Home: NextPage = () => {
  return (
    <HomeWrapper>
      {!Web3.givenProvider && <h1>
        Please install <Link href={'https://metamask.io/'}>MetaMask</Link> extension
      </h1>}
      {Web3.givenProvider && <MetaMaskConnector/>}
    </HomeWrapper>
  )
}

export default Home
