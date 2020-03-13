import React, { Component } from "react";

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            clickedImageInfo: {}
        }
    }

    componentDidMount() {
        console.log(this.props.displayImageInfo);

        // const overlay = document.querySelector('.display')
        // console.log(overlay);
        // overlay.classList.add('overlay')
        // console.log(classOverlay);
        // const bodyElement = document.querySelector('body')
        // bodyElement.classList.add('noScroll')
        
        this.setState({
            clickedImageInfo: this.props.displayImageInfo
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.displayImageInfo !== prevProps.displayImageInfo) {
            console.log(`I was different....`);
            
        }
    }

    render() {
        // const name = this.state.clickedImageInfo.urls
        
        // let url;
        // for (let item in name) {
        //     if (item === 'small') {
        //         console.log(name[item]);
        //         url = name[item]
        //     } 
        // }
        
        return (
            <div className="overlay">
                <div className="modalContainer">
                    <div className="modal">
                        <div className="modalImage">
                            <img src={this.props.displayImageInfo.urls.small}></img>
                        </div>
                        <div className="imageInfo">
                            <div className="profileImage">
                                <img src={this.props.displayImageInfo.user.profile_image.medium}></img>
                            </div>
                            <div className="userInfo">
                                <p className="name">{this.props.displayImageInfo.user.name}</p>
                                <p className="social">{`@${this.props.displayImageInfo.user.username}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;