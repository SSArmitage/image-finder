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
        // grab the id of the image that was clicked
        console.log(event.target.id);
        const clickedImageId = event.target.id 
        // use that id to get the associated image info
        const clickedImageInfo = this.state.imageUrls[clickedImageId]
        console.log(clickedImageInfo);
        
        // make modalVisible in state true
        this.setState({
            overlayVisible: true
        })

       
       

        // call fxn to pass info to App.js
        this.props.passImageClick(clickedImageInfo)
    }
    

    render() {
        return(
            // <div id="display">
                <div className="wrapper display">
                    {this.state.imageUrls.length === 0
                    ?
                        <NoResults />
                    :
                        <div>
                            <ul className="imageList">
                                {this.state.imageUrls.map((image, id) => {
                                    return (
                                        <li>
                                            <img
                                                src={image.urls.small}
                                                onClick={this.handleClick}
                                                id={id}
                                                // id={gifObject.id}
                                                // onClick={this.handleGifClick} 
                                                alt=""
                                            />
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    }
                </div>
            // </div>
        )
    }

}

export default DisplayScreen;