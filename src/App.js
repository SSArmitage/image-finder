import React, { Component } from "react";
import "./styles/App.css";
import QueryScreen from './QueryScreen';
import Header from './Header';
import DisplayScreen from "./DisplayScreen";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userSelectedVariables: false,
      imageInfo: [],
      collectionIds: {},
      imageClickedInfo: {},
      overlayVisible: false,
      isLoading: true
    };
  }

  // Function that is called when the user selects the desired keyword/collection to search for images
  // Can be called from QueryScreen.js OR Header.js
  // The above componenets call this function and pass the image info for all the images associated with the search, this info is then put in state
  handleUserSelected = (imagesArray) => {
    this.setState({
      userSelectedVariables: true,
      imageInfo: imagesArray, 
      // isLoading: false
    })
  }

  // Function that is called when the Query.js component mounts -> when the coponent mounts it makes an API call to grab the collection IDs associated with the displayed collections, when it gets them it calls this function to put those IDs in App.js state so that it can be passed down to Display.js
  // Is called from QueryScreen.js
  handleCollectionIds = (data) => {
    this.setState({
      collectionIds: data,
      // isLoading: false
    })
  }

  // Function that is called when an image is clicked in Display.js. It puts the clicked image info in state so that it can be passed to Modal.js
  // This function also changes the overlayVisible boolean to true so that the overlay will apear when the modal pops up
  handleImageClick = (data) => {
    this.setState({
      imageClickedInfo: data,
      overlayVisible: true
    })
  }

  loading = (instruction) => {
  
    if (instruction === "start") {
      console.log(`I am loading`);
      this.setState({
        isLoading: true
      })
    } else {
      // this.setState({
      //   isLoading: false
      // })

      setTimeout(() => {
        console.log(`I am done loading`);
        this.setState({
          isLoading: false
        }) 
      }, 1000);
    }
    
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
            loading={this.loading}
          />
          :
          null
        }
        <main>
          {this.state.userSelectedVariables
            ?
            <div className="mainContainer">
              {this.state.isLoading
              ?
                <div>
                  <Loader
                    type="ThreeDots"
                    color="#2A2B8D"
                    height={100}
                    width={100}
                    timeout={2000} //3 secs
                  />
                </div>
              :
                <DisplayScreen
                  imageInfo={this.state.imageInfo}
                  passImageClick={this.handleImageClick}
                  // loading={this.state.isLoading}
                />
              }
            </div>
            :
            <QueryScreen
              userSelected={this.handleUserSelected}
              passCollectionIds={this.handleCollectionIds}
              loading={this.loading}
            />
          }
        </main>
      </div>
    );
  }
}

export default App;

