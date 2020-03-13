import React, { Component } from "react";
import "./styles/App.css";
import QueryScreen from './QueryScreen';
import Header from './Header';
import Footer from "./Footer.js";
import DisplayScreen from "./DisplayScreen";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userSelectedVariables: false,
      imageUrls: [],
      collectionIds: {},
      imageClickedInfo: {},
      overlayVisible: false
    };
  }

  handleUserSelected = (imagesArray) => {
    console.log(imagesArray);
    console.log(`I was passed!`);
    this.setState({
      userSelectedVariables: true,
      imageUrls: imagesArray
    })    
  }

  handleCollectionIds = (data) => {
    console.log('Collection ids passed');
    this.setState({
      collectionIds: data
    })
  }

  handleImageClick = (data) => {
    console.log('I passed a click');
    console.log(data);
    this.setState({
      imageClickedInfo: data,
      overlayVisible: true
    })
    
  }

  render() {
    return (
      <div className='app'>
        {this.state.userSelectedVariables
        ?
          <Header 
          userSelected={this.handleUserSelected}
          passCollectionIds={this.state.collectionIds}
          passClickedImageInfo={this.state.imageClickedInfo}
          />
        :
          null
        }
        <main>
          {this.state.userSelectedVariables
          ?

          <DisplayScreen 
          imageUrls={this.state.imageUrls}
          passImageClick={this.handleImageClick}
          />

          :

          <QueryScreen 
          userSelected={this.handleUserSelected}
          passCollectionIds={this.handleCollectionIds}
          />

          }

          {/* <QueryScreen userSelected={this.handleUserSelected} /> */}
        </main>  
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
