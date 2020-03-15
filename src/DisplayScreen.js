import React, { Component } from "react";
import Loading from './Loading';
import NoResults from './NoResults';
import Modal from './Modal';

class DisplayScreen extends Component {
    constructor() {
        super();
        this.state = {
            imageUrls: [],
            isLoading: true,
            overlayVisible: false
        }
    }

    componentDidMount() {
        console.log(this.props.imageUrls);

        this.setState({
            imageUrls: this.props.imageUrls,
            isLoading: false
        })
    }

    componentDidUpdate(prevProps) {
        console.log('I AM UPDATING!!!');
        console.log(this.props.imageUrls);
        // check to see if the incoming props is different from the prevProps, if so the user has chosen a new query/collection, need to set these new urls in state (inorder to update the images on the page)
        if (this.props.imageUrls !== prevProps.imageUrls) {
            this.setState({
                imageUrls: this.props.imageUrls,
                isLoading: false
            })
        }
    }

    handleClick = (event) => {
        console.log(`I was clicked`);
        console.log(event.nativeEvent.path[1]);
        console.log(event.nativeEvent.path[1].id);
        // grab the id of the image that was clicked
        // need to use event.nativeEvent.path[1].id because when you hover on the image the overlay appears, and when clicking on the image the event will be associated with the overlay (since it is the most superficial layer), so you need to make use of propogation -> nativeEvent
        // becasue of React's "SyntheticEvent" wrapper, need the underlying browser event "nativeEvent" to grab the image target that is below the overlay
        const clickedImageId = event.nativeEvent.path[1].id
        // const clickedImageId = event.target.id
        console.log(clickedImageId);
        // // use that id to get the associated image info
        const clickedImageInfo = this.state.imageUrls[clickedImageId]
        // // make modalVisible in state true
        this.setState({
            overlayVisible: true
        })
        // // call fxn to pass info to App.js
        this.props.passImageClick(clickedImageInfo)
    }


    render() {
        return (

            <div className="wrapper display">
                {this.state.imageUrls.length === 0
                    ?
                    <NoResults />
                    :
                    <div className="imageListContainer">
                        <ul className="imageList">
                            {this.state.imageUrls.map((image, id) => {
                                return (
                                    <li 
                                        className="image"
                                        id={id}
                                        onClick={this.handleClick}>
                                        <img
                                            src={image.urls.small}
                                            // onClick={this.handleClick}
                                            id={id}
                                            alt={image.alt_description}
                                        />
                                        <div className="imageOverlay"></div>
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