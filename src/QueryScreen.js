import React, { Component } from "react";
import logo from './assets/amphibian-chameleon.png';
import axios from 'axios';

class QueryScreen extends Component {
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
            imageUrls: []
        };
    }

    componentDidMount() {
        let collectionIds = {}
        // go through all the collections in state and make API call to Unsplash API to get the collection id's
        this.state.collections.forEach((collection) => {
            axios({
                method: 'get',
                url: `${this.state.unsplashURL}/search/collections`,
                responseType: 'json',
                params: {
                    client_id: this.state.unsplashKey,
                    per_page: 20,
                    query: collection
                }
            }).then((data) => {
                // grab the ID for each collection
                const ids = data.data.results.map((item) => {
                    return item.id
                })
                // add the current collection (key) and its associated IDs array (value) to the collectionIds object 
                collectionIds[collection] = ids
            }).catch((error) => {
                console.log(error);
            })
        })
        // send the IDs to App.js so that they can be passed to Header
        // this will be used in Header.js
        this.props.passCollectionIds(collectionIds)
        // put the object with all the collections/Ids in state
        this.setState({
            collectionIds: collectionIds
        })
    }

    // As the user types into the query text input, this function grabs the value of the input and stores it in state
    handleQuery = (event) => {
        this.setState({
            userQuery: event.target.value
        })
    }

    // When the user clicks the "collection" selector input, this function either opens or closes the collection drop-down menu
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

    // When the user clicks on an item in the collection list, this function grabs the text of that item
    handleItemClick = (event) => {
        // to get a text representation of the data in the collection item, get the .data from the textNode
        const selectedItem = document.getElementById(`${event.target.id}`).firstChild.data
        this.setState({
            selectedCollection: selectedItem,
            userChoseCollection: true
        })
    }

    // This function determines which type of API call will get made, based on the user query/collection selection
    handleSubmit = (event) => {
        event.preventDefault();
        // initialize the loading component (loading will be turned off when the appropriate api call returns successful/unsuccessful)
        this.props.loading("start")
        // check to see if the user selected a query
        if (this.state.userQuery) {
            // the user selected a query
            // check to see if the user selected a collection
            if (this.state.selectedCollection) {
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
                alert('Please select 1. A query or collection OR 2. A query and a collection')
            }
        }
    }

    // The user selected just a query
    getDataQuery = () => {
        // this.props.loading("start")
        axios({
            method: 'get',
            url: `${this.state.unsplashURL}/search/photos`,
            responseType: 'json',
            params: {
                client_id: this.state.unsplashKey,
                per_page: 31,
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
            
            // console.log(error);
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            // if (error.response.status === 403) {
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     alert("This application is considered to be in demo mode by Unsplash, so the API currently places a limit of 50 requests per hour. You have exceeded this rate limit.")
            // }
            this.props.loading("stop")
        })
    }

    // The user selected a query + collection
    getDataQueryCollection = () => {
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
            console.log(data);
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
            // console.log(error);
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

    // The user selected just a collection
    getDataCollection = () => {
        // grab the collection chosen by the user
        let selectedCollection = this.state.selectedCollection
        console.log(selectedCollection);
        // grab the ids associated with that collection
        let idsToSearch = this.state.collectionIds[`${selectedCollection}`]
        console.log(idsToSearch);

        // iterate over each collection id and make an api call to grab the associated images
        let promiseArray = []
        // let combinedIds = []
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
                let combinedIds = []
                data.forEach((imageArray) => {
                    imageArray.data.forEach((image) => {
                        combinedIds.push(image)
                    })
                })
                console.log(combinedIds);
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

                // console.log(error);
                // if (error.response) {
                //     console.log(error.response.data);
                //     console.log(error.response.status);
                //     console.log(error.response.headers);
                // }
                // console.log("erroooorrr");
                // this.props.userSelected({})
                this.props.loading("stop")
            })

        const sendData = (data) => {
            console.log("erroooorrr");
            this.props.userSelected(data)
            this.props.loading("stop")
        }
    }

    render() {
        return (
            <div class="queryScreen">
                <div className="wrapper flexContainer">
                    <div className="logoContainer">
                        <img src={logo} alt="Logo"></img>
                    </div>
                    <h1>image <span>search</span></h1>
                    <form className="queryForm" onSubmit={this.handleSubmit}>
                        <label for="query"></label>
                        <input
                            type="text"
                            id="query"
                            placeholder="Query"
                            onChange={this.handleQuery}
                            value={this.state.userQuery}
                        ></input>
                        <label for="collections"></label>
                        <div 
                        className="collection" 
                        onClick={this.handleCollectionClick}>
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
            </div>
        )
    }
}

export default QueryScreen;