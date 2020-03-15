import React, { Component } from "react";

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            clickedImageInfo: {},
            exitModal: false
        }
    }

    componentDidMount() {
        console.log(this.props.displayImageInfo);
        this.setState({
            clickedImageInfo: this.props.displayImageInfo
        })
    }

    handleModalClick = () => {
        console.log("I clicked the modal!!!!!");
        // this.setState({
        //     exitModal: true
        // })
        this.props.closeModal()
    }

    render() {
        return (
            <div className="overlay">
                <div
                    className="modalContainer"
                    onClick={this.handleModalClick}
                >
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