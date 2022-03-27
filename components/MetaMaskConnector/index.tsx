import {Connector} from "./styled";
import {useMetamaskConnection} from "../../hooks/useMetamaskConnection";


const MetaMaskConnector = () => {
  const {connect, isConnected, balance, network} = useMetamaskConnection()

  return (
    <Connector.Container>
      <h3>
        {isConnected ? 'Connected' : 'Connect'} Through Metamask!
      </h3>
      {balance &&
        <div>
          Current balance: {balance} {network && network.nativeCurrency.symbol}
        </div>
      }
      <Connector.Button onClick={connect}>
        {isConnected ? 'Reconnect' : 'Connect'}
      </Connector.Button>
    </Connector.Container>
  )
}

export default MetaMaskConnector
