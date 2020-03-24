import React, { Component } from "react";
import Loading from './Loading';
import NoResults from './NoResults';
import RateLimitExceeded from './RateLimitExceeded';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class DisplayScreen extends Component {
    constructor() {
        super();
        this.state = {
            imageInfo: [],
            isLoading: true
        }
    }

    componentDidMount() {
        console.log(`I have loaded`);
        
        // When the component mounts, it puts the data that was passed into it from App.js (image info) into state -> this will cause the list to render with the images from imageInfo
        console.log(this.props.imageInfo);
        this.setState({
            imageInfo: this.props.imageInfo,
            // isLoading: false
        })
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.imageInfo);
        console.log(`I have updated`);
        
        // check to see if the incoming props is different from the prevProps, if so the user has chosen a new query/collection, need to set the new imgaeInfo in state (inorder to update the images on the page)
        if (this.props.imageInfo !== prevProps.imageInfo) {
            this.setState({
                imageInfo: this.props.imageInfo,
                // isLoading: false
            })
        }
    }

    handleClick = (event) => {
        // grab the id of the image that was clicked
        const clickedImageId = event.target.id
        console.log(clickedImageId);
        // use that id to get the associated image info
        const clickedImageInfo = this.state.imageInfo[clickedImageId]
        // call fxn to pass the clickedImageInfo to App.js
        this.props.passImageClick(clickedImageInfo)
    }


    render() {
        return (
            <div className="wrapper display">
                    {this.state.imageInfo[0] === "Error"
                    // this.state.imageInfo.length === 0
                    ?
                    <div>
                        {this.state.imageInfo[1] === "Rate Limit Exceeded"
                        ?
                            <RateLimitExceeded />
                        :
                            <NoResults />
                        }
                    </div>
                    
                    :
                    <div className="imageListContainer">
                        <ul className="imageList">
                            {this.state.imageInfo.map((image, id) => {
                                return (
                                    <li className="image">
                                        <img
                                            src={image.urls.small}
                                            id={id}
                                            alt={image.alt_description}
                                        />
                                        <div className="imageOverlay"
                                            id={id}
                                            onClick={this.handleClick}
                                        ></div>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    }
            </div>
        )
    }

}

export default DisplayScreen;