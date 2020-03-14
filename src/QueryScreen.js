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
        // make axios call to Unsplash api
        // go through all the collections in state and do api call to get the id's
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
                console.log(data);
                // grab the ID for each collection
                const ids = data.data.results.map((item) => {
                    return item.id
                })
                // add the current collection (key) and its associated ids array (value) to the collectionIds object 
                collectionIds[collection] = ids
                console.log(collectionIds);
            }).catch((error) => {
                console.log(error);
            })
        })
        // send the Ids to App.js so that thye can be passed to Header
        this.props.passCollectionIds(collectionIds)
        // put the object with all the collections/Ids in state
        this.setState({
            collectionIds: collectionIds
        })
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
            console.log(data.data.results);
            
            // let imagesToDisplay = data.data.results.map((item) => {
            //     return item.urls.small
            // })
            // console.log(imagesToDisplay);
            // put all the images in state (so that they can be rendered onto the page)
            // after the urls are in state, call the function that tells App.js that the user has selected the search variables (causing the Display.js to render)
            // this.setState({
            //     imageUrls: imagesToDisplay
            // }, () => {
            //     this.props.userSelected(data.data.results)
            // })

            this.props.userSelected(data.data.results)
            
        }).catch((error) => {
            console.log(error);
            this.props.userSelected({})
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
            console.log(data);
            // let imagesToDisplay = data.data.results.map((item) => {
            //     return item.urls.small
            // })
            // console.log(imagesToDisplay);
            // put all the images in state (so that they can be rendered onto the page)
            // this.setState({
            //     imageUrls: imagesToDisplay
            // }, () => {
            //     this.props.userSelected(imagesToDisplay)
            // })

            this.props.userSelected(data.data.results)

        }).catch((error) => {
            console.log(error);
            this.props.userSelected({})
        })
    }

    getDataCollection = () => {
        // console.log(this.props.userSelected());
        
        // grab the collection chosen by the user
        let selectedCollection = this.state.selectedCollection
        console.log(selectedCollection);
        // grab the ids associated with that collection
        let idsToSearch = this.state.collectionIds[`${selectedCollection}`]
        console.log(idsToSearch);

        
        // for (let x=0; x <idsToSearch.length; x++) {
        //     console.log(idsToSearch[x]);
            
        //     axios({
        //     method: 'get',
        //     url: `${this.state.unsplashURL}/${id}/photos`,
        //     responseType: 'json',
        //     params: {
        //         client_id: this.state.unsplashKey,
        //         per_page: 20,
        //         // query: this.state.userQuery,
        //         // collections: 
        //     }
        // }).then((data) => {
        //     console.log(data);
        //     // let imagesToDisplay = data.data.results.map((item) => {
        //     //     return item.urls.small
        //     // })
        //     // console.log(imagesToDisplay);
        //     // put all the images in state (so that they can be rendered onto the page)
        //     // this.setState({
        //     //     imageUrls: imagesToDisplay
        //     // }, () => {
        //     //     this.props.userSelected(imagesToDisplay)
        //     // })

        //     // let randomNumber = Math.random() * 
        //     // data

        //     // this.props.userSelected(data.data.results)

        // }).catch((error) => {
        //     console.log(error);
        // })

            // if (x === 2) {
            //     // if the data that is returned is good, exit the loop
            //     return x
            // } else {
            //     console.log(x);
                
            // }
        // }

        // axios({
        //     method: 'get',
        //     url: `${this.state.unsplashURL}/search/photos`,
        //     responseType: 'json',
        //     params: {
        //         client_id: this.state.unsplashKey,
        //         per_page: 20,
        //         query: this.state.userQuery,
        //         collections: idsToSearch
        //     }
        // }).then((data) => {
        //     console.log(data);
        //     // let imagesToDisplay = data.data.results.map((item) => {
        //     //     return item.urls.small
        //     // })
        //     // console.log(imagesToDisplay);
        //     // put all the images in state (so that they can be rendered onto the page)
        //     // this.setState({
        //     //     imageUrls: imagesToDisplay
        //     // }, () => {
        //     //     this.props.userSelected(imagesToDisplay)
        //     // })

        //     let randomNumber = Math.random() * 
        //     data

        //     // this.props.userSelected(data.data.results)

        // }).catch((error) => {
        //     console.log(error);
        // })

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

        console.log(promiseArray);
        

        Promise.all(promiseArray)
        .then(function (data) {
            //   console.log(data);
            let combinedIds = []
            data.forEach((imageArray) => {
                imageArray.data.forEach((image) => {
                    combinedIds.push(image) 
                })
            })
            console.log(combinedIds);
            
            sendData(combinedIds)
        }).catch((error) => {
            console.log(error);
            this.props.userSelected({})
        })

        const sendData = (data) => {
            this.props.userSelected(data)
        }
    }

    render() {
        return(
            <div class="queryScreen">
                <div className="wrapper flexContainer">
                    <div className="logoContainer">
                        <img src={logo}></img>
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
                                        return(
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