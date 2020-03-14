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
            imageObjectLength: 0
        };
    }

    componentDidMount() {   
        console.log(this.props.passCollectionIds);
        
        this.setState({
            collectionIds: this.props.passCollectionIds
        })
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.passClickedImageInfo);
        if (this.props.passClickedImageInfo !== prevProps.passClickedImageInfo) {
            console.log(`I was different`);
            const objectLength = Object.keys(this.props.passClickedImageInfo).length
            console.log(objectLength);

            

            this.setState({
                clickedImageInfo: this.props.passClickedImageInfo, 
                imageObjectLength: objectLength
            })
        } 
    }

    handleQuery = (event) => {
        // console.log(event.target.value);
        this.setState({
            userQuery: event.target.value
        })
    }

    // user clicks "collection" selector input
    // either opens or closes
    handleCollectionClick = () => {
        console.log(`I clicked this`);
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
        console.log(event.target.className);
        console.log(event.target.id)
        // to get a text representation of the data get the .data from the textNode
        const selectedItem = document.getElementById(`${event.target.id}`).firstChild.data
        console.log(selectedItem);
        this.setState({
            selectedCollection: selectedItem,
            userChoseCollection: true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        // check to see if the user selected a query
        if (this.state.userQuery) {
            // the user selected a query
            // check to see if the user selected a collection
            if (this.state.selectedCollection) {
                console.log('I picked query and collection');

                // the user selected a collection
                // make api call to get the images associated with the query + collections (grab the collections from state)
                this.getDataQueryCollection()
                // console.log(...this.state.collectionIds.Nature);

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

        }).catch((error) => {
            console.log(error);
        })
    }

    getDataQueryCollection = () => {
        // console.log(this.state.selectedCollection);
        // grab the collection chosen by the user
        let selectedCollection = this.state.selectedCollection
        console.log(selectedCollection);
        // grab the ids associated with that collection
        let idsToSearch = this.state.collectionIds[`${selectedCollection}`]
        console.log(idsToSearch);
        // convert the array of ids into a string of ids (comma seperated)
        let totalId = idsToSearch.toString()
        console.log(totalId);

        axios({
            method: 'get',
            url: `${this.state.unsplashURL}/search/photos`,
            responseType: 'json',
            params: {
                client_id: this.state.unsplashKey,
                per_page: 20,
                query: this.state.userQuery,
                collections: totalId
            }
        }).then((data) => {
            this.props.userSelected(data.data.results)
        }).catch((error) => {
            console.log(error);
            this.props.userSelected({})
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

        console.log(promiseArray);


        Promise.all(promiseArray)
            .then(function (data) {
                let combinedIds = []
                data.forEach((imageArray) => {
                    imageArray.data.forEach((image) => {
                        combinedIds.push(image)
                    })
                })
                sendData(combinedIds)
            }).catch((error) => {
                console.log(error);
                this.props.userSelected({})
            })

        const sendData = (data) => {
            this.props.userSelected(data)
        }
    }

    handleCloseModal = () => {
        console.log('CLOOOSSSINNNG');
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