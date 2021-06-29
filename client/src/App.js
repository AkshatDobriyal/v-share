import React, { Component } from "react";
import DVideo from "./contracts/DVideo.json";
import getWeb3 from "./getWeb3";
import Navbar from "./Navbar";
import Main from "./Main";
import ipfsClient from 'ipfs-http-client';

import "./App.css";

// Declare IPFS
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});
//const {create} = require('ipfs-http-client');
//const ipfs = ipfsClient.create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

//const ipfsClient = require('ipfs-http-client')

/*const projectId = '0c5867a6257c459daf419fdd0d30cd4b'
const projectSecret = '40fac51c5da94e4e919548431849c900'
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      buffer: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
      account: '',
      web3: null,
      accounts: null,
      contract: null 
    };
    this.uploadVideo = this.uploadVideo.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      this.setState({ account: accounts[0] });

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const networkData = DVideo.networks[networkId];
      const contract = new web3.eth.Contract(DVideo.abi, '0xB61d32C9DC8Be21B589BAb8AF67FfC6723c597C6');

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract });

      const videoCount = await contract.methods.videoCount().call();
      this.setState({ videoCount });

      // load videos, sort by newest
      for(var i=videoCount; i>0; i--){
        const video = await contract.methods.videos(i).call();
        this.setState({ 
          videos: [...this.state.videos, video]
         })
      }
      // set the latest video with title to view as default
      const latest = await contract.methods.videos(videoCount).call();
      this.setState({
        currentHash: latest.videoHash,
        currentTitle: latest.videoTitle
      })
      this.setState({ loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)});
      console.log('buffer', this.state.buffer);
    }
  }

  uploadVideo = title => {
    console.log("Submitting file to IPFS...");

    //adding file to the IPFS
    ipfs.files.add(this.state.buffer, (error, result) => {
      console.log("IPFS result", result);
      if(error){
        console.log(error);
        return;
      }
      //this.state({loading: true});
      this.state.contract.methods.uploadVideo(result[0].hash, title).send({from: this.state.account}).on('transactionHash', (hash) => {
        //this.state({loading: false});
      })
    });
  }

  changeVideo = (hash, title) => {
    this.setState({currentHash: hash});
    this.setState({currentTitle: title});
  }

  /*runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };
  */

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>DVIDEO</h1>
        <Navbar account={this.state.account} />
        <Main
          videos={this.state.videos}
          captureFile={this.captureFile}
          changeVideo={this.changeVideo}
          uploadVideo={this.uploadVideo}
          currentHash={this.state.curremtHash}
          currentTitle={this.state.currentTitle}  
        />   
      </div>
    );
  }
}

export default App;
