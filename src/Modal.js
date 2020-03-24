import React from "react";

const Modal = (props) => {
    // Function that gets called when the user clicks anywhere on the modal
    // It calls a function in Header.js that closes the modal
    const handleModalClick = () => {
        props.closeModal()
    }
    
    return (
        <div className="overlay">
            <div
            className="modalContainer"
            onClick={handleModalClick}
            >
                <div className="modal">
                    <div className="modalImage">
                        <img 
                        src={props.displayImageInfo.urls.small}
                        alt={props.displayImageInfo.alt_description}
                        ></img>
                    </div>
                    <div className="imageInfo">
                        <div className="profileImage">
                            <img src={props.displayImageInfo.user.profile_image.medium}
                            alt="Photographer's profile picture"></img>
                        </div>
                        <div className="userInfo">
                            <p className="name">{props.displayImageInfo.user.name}</p>
                            <p className="social">{`@${props.displayImageInfo.user.username}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;