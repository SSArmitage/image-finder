import React, { Component } from "react";
import logo from './assets/amphibian-chameleon.png';
import axios from 'axios';
import Modal from './Modal';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            dropDownOpen: false,
            userQuery: "",
            selectedCollection: "",
            userChoseCollection: false,
            unsplashURL: "https://api.unsplash.com/",
            unsplashKey: "SrDYW1BbGH_3MeKS7LBS8RT9tLwCRk5ZFF7XxN2XwqU",
            collections: ["Featured", "Wallpapers", "Nature", "Textures & Patterns", "Architecture"],
            collectionIds: {},
            imageUrls: [],
            modalVisible: false,
            clickedImageInfo: {},
            imageObjectLength: 0,
            hamburgerNav: false,
            hamburgerMenuVisible: false,
            hamburgerMenuInitialized: false
        };
    }

    componentDidMount() {
        this.setState({
            collectionIds: this.props.passCollectionIds
        })

        // when header component mounts, check the screen size to determine if the mobile header should be rendered
        const screenSize = window.innerWidth
        console.log(screenSize);
        if (screenSize < 700) {
            this.setState({
                hamburgerNav: true,
                hamburgerMenuInitialized: true
            }, () => {
                // after the hamburger nav is rendered...
                // 1. create hamburger menu (will appear/disappear on click)
                
                // const header = document.querySelector(".header")
                // console.log(header);
                // const hamburgerMenu = document.createElement("div")
                // hamburgerMenu.classList.add("hamburgerMenu notVisible")
                // header.append(hamburgerMenu)

                document.querySelector(".logoContainer").classList.add("hamburgerLogoContainer")


                // grab the queryForm and remove the "queryForm" class and add the "hamburgerQueryForm" & "notVisible" class
                const hamburgerMenu = document.querySelector(".queryForm")
                console.log(hamburgerMenu);
                // hamburgerMenu.classList.add("hamburgerQueryForm")
                hamburgerMenu.classList.add("notVisible")
                hamburgerMenu.classList.add("hamburger")
                hamburgerMenu.classList.remove("queryForm")
                

                // 2. add event listener for click on hamburger icon
                const icon = document.querySelector("#hamburgerIcon")
                console.log(icon);
                icon.addEventListener("click", () => {
                    console.log("I was clicked");
                    this.handleHamburgerClick()
                })
                
            })
            
        }
        // event listener for change in screen size
        window.addEventListener("resize", (event) => {
            let browserWidth = event.target.window.innerWidth;
            // if the browser width is increased past 700px, the desktop nav is rendered, else the hamburger nav is rendered
            if (browserWidth > 700) {
                // the browser width is > 700px
                // convert hamburgerLogo to logo
                document.querySelector(".logoContainer").classList.remove("hamburgerLogoContainer")

                
                if (this.state.hamburgerMenuInitialized) {
                    const hamburgerMenu = document.querySelector(".hamburger")
                    hamburgerMenu.classList.add("queryForm")
                    hamburgerMenu.classList.remove("hamburgerQueryForm")
                    hamburgerMenu.classList.remove("notVisible")
                }

                // if the hamburgerMen is open, make sure to close it
                // if (this.state.hamburgerMenuVisible) {
                //     const hamburgerMenu = document.querySelector(".hamburger")
                //     hamburgerMenu.classList.add("notVisible")
                // }

                // set hamburgerMenuVisible to be false
                // set hamburgerNav to be false
                this.setState({
                    hamburgerNav: false,
                    hamburgerMenuVisible: false
                })
            } else {
                // the browser width is < 700px
                // check to see if there is already a hamburgerMenu (if component mounted when on a larger screen size there would not be one, so when you go down to a smaller size, need to create one)
                // const menu = document.querySelector(".hamburgerMenu")
                if (!this.state.hamburgerMenuInitialized) {
                    // if the hamburgerMenu did not already exist
                    console.log('I did not exist');
                    // 1. create hamburger menu (will appear/disappear on click)

                    // const header = document.querySelector(".header")
                    // console.log(header);

                    // const hamburgerMenu = document.createElement("div")
                    // hamburgerMenu.className = "hamburgerMenu notVisible"
                    // header.append(hamburgerMenu)

                    const hamburgerMenu = document.querySelector(".queryForm")
                    console.log(hamburgerMenu);
                    // hamburgerMenu.classList.add("hamburgerQueryForm")
                    hamburgerMenu.classList.add("notVisible")
                    hamburgerMenu.classList.add("hamburger")
                    hamburgerMenu.classList.remove("queryForm")

                    // convert logo to hamburgerLogo
                    document.querySelector(".logoContainer").classList.add("hamburgerLogoContainer")
                    // set hamburgerNav to be true & initialize the hamburgerMenu in state
                    this.setState({
                        hamburgerNav: true,
                        hamburgerMenuInitialized: true
                    }, () => {
                        // after the hamburger nav is rendered...
                        // add event listener for click on hamburger icon
                        const icon = document.querySelector("#hamburgerIcon")
                        console.log(icon);
                        icon.addEventListener("click", () => {
                            console.log("I was clicked");
                            this.handleHamburgerClick()
                        })
                    })

                    // Put an event listener on the SEARCH button in the hamburgerMenu
                    
                } else {
                    // if the hamburgerMenu already existed (do not need to add it to the DOM, but do need to add an event listener)
                    // convert logo to hamburgerLogo
                    console.log("I already existed!");
                    // convert logo to hamburgerLogo
                    document.querySelector(".logoContainer").classList.add("hamburgerLogoContainer")

                    const hamburgerMenu = document.querySelector(".hamburger")
                    console.log(hamburgerMenu);
                    // hamburgerMenu.classList.add("hamburgerQueryForm")
                    hamburgerMenu.classList.add("notVisible")
                    // hamburgerMenu.classList.add("hamburger")
                    hamburgerMenu.classList.remove("queryForm")
                    
                    if (!this.state.hamburgerNav) {
                        // set hamburgerNav to be true
                        this.setState({
                            hamburgerNav: true
                        }, () => {
                            // after the hamburger nav is rendered...
                            // add event listener for click on hamburger icon
                            const icon = document.querySelector("#hamburgerIcon")
                            console.log(icon);
                            icon.addEventListener("click", () => {
                            console.log("I was clicked");
                            this.handleHamburgerClick()
                             })
                         })
                        
                    }
                }
            }
        })
        
    }

    handleHamburgerClick = () => {
        console.log("I am HAMBURGER");
        
        const hamburgerMenu = document.querySelector(".hamburger")
        
        if (this.state.hamburgerMenuVisible) {
            console.log("I was open now Im closed");
            // if the hamburgerMenu is already open... (does not have "notVisible")
            // add the "notVisible" class 
            hamburgerMenu.classList.add("notVisible")
            hamburgerMenu.classList.remove("hamburgerQueryForm")

            this.setState({
                hamburgerMenuVisible: false
            })
        } else {
            console.log("I was closed now Im open");
            
         // if the hamburgerMenu is closed... (has "notVisible")
         // remove the "notVisible" class 
            hamburgerMenu.classList.add("hamburgerQueryForm")
            hamburgerMenu.classList.remove("notVisible")

            this.setState({
                hamburgerMenuVisible: true
            }, () => {
                // put an event listener on the hamburgerQueryForm
                const hamburgerSearchMenu = document.querySelector(".hamburgerQueryForm")
                console.log(hamburgerSearchMenu);
                hamburgerSearchMenu.addEventListener("submit", () => {
                    console.log("I was submitted!");
                    console.log("I was open now Im closed");
                    // The hamburgerMenu is already open... (does not have "notVisible")
                    // add the "notVisible" class 
                    hamburgerMenu.classList.add("notVisible")
                    hamburgerMenu.classList.remove("hamburgerQueryForm")
                    // inform state that the hanburger menu is no longer visible
                    this.setState({
                        hamburgerMenuVisible: false,
                        userQuery: "",
                        userChoseCollection: false,
                        selectedCollection: "Collections"
                    })
                    
                })

                
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.passClickedImageInfo !== prevProps.passClickedImageInfo) {
            const objectLength = Object.keys(this.props.passClickedImageInfo).length
            this.setState({
                clickedImageInfo: this.props.passClickedImageInfo,
                imageObjectLength: objectLength
            })
        }
    }

    handleQuery = (event) => {
        this.setState({
            userQuery: event.target.value
        })
    }

    // user clicks "collection" selector input
    // either opens or closes
    handleCollectionClick = () => {
        if (this.state.dropDownOpen) {
            this.setState({
                dropDownOpen: false
            })
        } else {
            this.setState({
                dropDownOpen: true
            })
        }
    }

    handleItemClick = (event) => {
        // to get a text representation of the data get the .data from the textNode
        const selectedItem = document.getElementById(`${event.target.id}`).firstChild.data
        this.setState({
            selectedCollection: selectedItem,
            userChoseCollection: true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // initialize the loading component (loading will be turned off when the appropriate api call returns successful/unsuccessful)
        this.props.loading("start")
        // check to see if the user selected a query
        if (this.state.userQuery) {
            // the user selected a query
            // check to see if the user selected a collection
            if (this.state.selectedCollection !== "Collections" && this.state.selectedCollection !== "" ) {
                // the user selected a collection
                // make api call to get the images associated with the query + collections (grab the collections from state)
                this.getDataQueryCollection()
            } else {
                // the user did not select a collection
                // make api call to get the images associated with just the query
                this.getDataQuery()
            }
        } else {
            // the user did not select a query
            // check to see if the user selected a collection
            if (this.state.selectedCollection) {
                // the user selected a collection
                // make api call to get the images associated with just the collections
                this.getDataCollection()
            } else {
                // the user did not select a collection
                // alert the user they need to select either a query or a collection
                alert('Please select a query/collection/query & collection')
            }
        }
    }

    getDataQuery = () => {
        axios({
            method: 'get',
            url: `${this.state.unsplashURL}/search/photos`,
            responseType: 'json',
            params: {
                client_id: this.state.unsplashKey,
                per_page: 20,
                query: this.state.userQuery,
            }
        }).then((data) => {
            this.props.userSelected(data.data.results)
            this.props.loading("stop")
        }).catch((error) => {
            if (error.response.status === 403) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                // console.log('This application is considered to be in demo mode by Unsplash, so the API currently places a limit of 50 requests per hour. You have exceeded this rate limit');
                this.props.userSelected([
                    "Error",
                    "Rate Limit Exceeded"
                ])
            } else {
                this.props.userSelected([
                    "Error",
                    "No Results"
                ])
            }
            // if (error.response) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            // }
            // console.log("erroooorrr");
            // this.props.userSelected([])
            this.props.loading("stop")
        })
    }

    getDataQueryCollection = () => {
        // grab the collection chosen by the user
        let selectedCollection = this.state.selectedCollection
        console.log(selectedCollection);
        
        // grab the ids associated with that collection
        let idsToSearch = this.state.collectionIds[`${selectedCollection}`]
        console.log(idsToSearch);
        // convert the array of ids into a string of ids (comma seperated)
        // let totalId = idsToSearch.toString()

        // iterate over the array of ids, if the current one has above a certain number of images, choose that collection
        idsToSearch.forEach((collectionId) => {
            axios({
                method: 'get',
                url: `${this.state.unsplashURL}/search/photos`,
                responseType: 'json',
                params: {
                    client_id: this.state.unsplashKey,
                    per_page: 20,
                    query: this.state.userQuery,
                    collections: collectionId
                }
            }).then((data) => {
                console.log(data.data.results);
                // check to see if there are enough results, if so use this endpoint (exit out of this forEach)

                this.props.userSelected(data.data.results)
                this.props.loading("stop")
            }).catch((error) => {
                if (error.response.status === 403) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // console.log('This application is considered to be in demo mode by Unsplash, so the API currently places a limit of 50 requests per hour. You have exceeded this rate limit');
                    this.props.userSelected([
                        "Error",
                        "Rate Limit Exceeded"
                    ])
                } else {
                    this.props.userSelected([
                        "Error",
                        "No Results"
                    ])
                }
                // console.log("erroooorrr");
                this.props.loading("stop")
            })
        })
    }

    getDataCollection = () => {
        // grab the collection chosen by the user
        let selectedCollection = this.state.selectedCollection
        // grab the ids associated with that collection
        let idsToSearch = this.state.collectionIds[`${selectedCollection}`]
        // iterate over each collection id and make an api call to grab the associated images
        let promiseArray = []
        idsToSearch.forEach((id) => {
            let promise = axios({
                method: 'get',
                url: `${this.state.unsplashURL}/collections/${id}/photos`,
                responseType: 'json',
                params: {
                    client_id: this.state.unsplashKey,
                    per_page: 1,
                }
            })
            promiseArray.push(promise)
        })

        Promise.all(promiseArray)
            .then(function (data) {
                console.log(data.status);
                let combinedIds = []
                data.forEach((imageArray) => {
                    imageArray.data.forEach((image) => {
                        combinedIds.push(image)
                    })
                })
                
                
                sendData(combinedIds)
            }).catch((error) => {
                if (error.response.status === 403) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // console.log('This application is considered to be in demo mode by Unsplash, so the API currently places a limit of 50 requests per hour. You have exceeded this rate limit');
                    this.props.userSelected([
                        "Error",
                        "Rate Limit Exceeded"
                    ])
                } else {
                    this.props.userSelected([
                        "Error",
                        "No Results"
                    ])
                }
                // if (error.response) {
                //     console.log(error.response.data);
                //     console.log(error.response.status);
                //     console.log(error.response.headers);
                // }
                // console.log("erroooorrr");
                // this.props.userSelected([])
                this.props.loading("stop")
            })

        const sendData = (data) => {
            this.props.userSelected(data)
            this.props.loading("stop")
        }
    }

    handleCloseModal = () => {
        this.setState({
            imageObjectLength: 0
        })
    }

    render() {
        return (
            <div class="header">
                <div className="flexContainer">
                    <div className="logoContainer">
                        <img src={logo} alt=""></img>
                    </div>
                    <form className="queryForm" onSubmit={this.handleSubmit}>
                        <label for="query"></label>
                        <input
                            type="text"
                            id="query"
                            className="query"
                            placeholder="Query"
                            onChange={this.handleQuery}
                            value={this.state.userQuery}
                        ></input>
                        <label for="collections"></label>
                        <div className="collection" onClick={this.handleCollectionClick}>
                            {this.state.userChoseCollection
                                ?
                                <input type="text" id="collections" className="collections" placeholder={this.state.selectedCollection}
                                    disabled
                                ></input>
                                :
                                <input type="text" id="collections" className="collections" placeholder="Collections"
                                    disabled
                                ></input>
                            }

                            {this.state.dropDownOpen
                                ?
                                <ul>
                                    {this.state.collections.map((item, index) => {
                                        return (
                                            <li onClick={this.handleItemClick}
                                                id={`listItem${index}`}>{item}</li>
                                        )
                                    })
                                    }
                                </ul>
                                :
                                null
                            }
                        </div>
                        <button>Search</button>
                    </form>

                    {this.state.hamburgerNav
                    ?
                        < div 
                        className="iconContainer"
                        id="hamburgerIcon">
                            <i class="fas fa-bars"></i>
                         </div>
                    :
                    null
                    }
                    
                </div>
                {this.state.imageObjectLength === 0
                    ?
                    null
                    :
                    <Modal
                        displayImageInfo={this.state.clickedImageInfo}
                        closeModal={this.handleCloseModal}
                    />
                }
            </div>
        )
    }
}

export default Header;