import React, { Component } from "react";
import "./styles/App.css";
import QueryScreen from './QueryScreen';
import Header from './Header';
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
    this.setState({
      userSelectedVariables: true,
      imageUrls: imagesArray
    })
  }

  handleCollectionIds = (data) => {
    this.setState({
      collectionIds: data
    })
  }

  handleImageClick = (data) => {
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
        </main>
      </div>
    );
  }
}

export default App;

