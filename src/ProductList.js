import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './grid.css'
import ReactPaginate from 'react-paginate'
import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from 'react-bootstrap'
import ViewProduct from "./components/ViewProduct";


class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            DataisLoaded: false,
            showModal: false,
            selectedProduct: {},
            searchResult: {},
            limit: 30,
            pageCount: 1,
            currentPage: 0
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    handleModal() {
        console.log("list here")

        this.setState({ showModal: !this.state.showModal })
    }

    handleShow(productId) {
        console.log(productId)
        //this.setState({ showModal: true })
        fetch('https://dummyjson.com/products/' + productId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    selectedProduct: result,
                    DataisLoaded: true
                })
            });
    }

    componentDidMount() {
        //https://jsonplaceholder.typicode.com/users
        this.handleFetch()

    }

    handlePageChange(selectedObject) {
        console.log("handle page change---" + selectedObject.selected + '---currentPage---' + this.state.currentPage)
        this.setState({ currentPage: selectedObject.selected }, function () {
            this.handleFetch()
        })

        // console.log('---currentPage---' + this.state.currentPage)

    }

    handleFetch() {
        console.log(this.state.currentPage)

        let skip = (this.state.currentPage === 0) ? 0 : (this.state.currentPage * this.state.limit)
        //console.log('limit=' + this.state.limit + "skip=" + skip)

        const URL = `https://dummyjson.com/products?skip=${skip}&limit=${this.state.limit}`
        //const URL = "https://dummyjson.com/products?limit=20&skip=40"
        //console.log(URL)
        fetch(URL)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.products,
                    DataisLoaded: true,
                    pageCount: Math.ceil(json.total / this.state.limit)
                })
            }).catch(error => console.error('Error', error));
    }

    deleteProduct(productId) {
        console.log("delete---" + productId)

        if (window.confirm("Are you sure you want to delete this product?")) {

            fetch('https://dummyjson.com/products/' + productId, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then((result) => {
                    if (result.isDeleted)
                        window.location.href = "/"
                });
        }
    }

    handleSearch(e) {
        console.log("search--" + e.target.value)
        fetch('https://dummyjson.com/products/search?q=' + e.target.value)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    items: result.products,
                    DataisLoaded: true,
                    pageCount: Math.ceil(result.total / this.state.limit)
                })
            });
    }

    render() {

        const { DataisLoaded, items, pageCount } = this.state;
        console.log(items);
        if (!DataisLoaded)
            return <div><h1> Pleses wait some time.... </h1></div>;

        return (
            <main>
                <div className="container">
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        Product List
                    </div>
                    <div className="badge bg-primary">
                        Showing {items && items.length} Products
                    </div>&nbsp;

                    {/* <Button class="bg-primary" onClick={() => this.addProduct()}>Add Product</Button> */}

                    <Link to={{ pathname: '/add' }} className="btn btn-primary">Add Product</Link>
                    <div>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                            <Form.Control onChange={this.handleSearch} type="text" name="searchText" />
                        </InputGroup></div>

                    {DataisLoaded ? (
                        <ReactPaginate
                            pageCount={pageCount}
                            pageRange={2}
                            marginPagesDisplayed={2}
                            onPageChange={this.handlePageChange}
                            containerClassName={'containerPage'}
                            previousLinkClassName={'page'}
                            breakClassName={'page'}
                            nextLinkClassName={'page'}
                            pageClassName={'page'}
                            disabledClassNae={'disabled'}
                            activeClassName={'active'}
                        />
                    ) : (
                        <div>Nothing to display</div>
                    )}

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {items.map((listValue) => (
                                <tr key={listValue.id}>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.brand}</td>
                                    <td>{listValue.category}</td>
                                    <td>{listValue.price}</td>
                                    <td>{listValue.rating}</td>
                                    <td>
                                        <img width="80" height="50" src={listValue.thumbnail} alt={listValue.id} title={listValue.title} />
                                    </td>
                                    <td>
                                        {/* <Link to={"/ProductView/" + listValue.id} className="badge badge-warning">Edit</Link>  */}
                                        {/* <a href={"/ProductView/" + listValue.id} className="btn btn-primary"
                                            onClick={this.viewProduct()}>View</a> */}

                                        {/* <button type="button" class="btn btn-primary"
                                            data-bs-toggle="modal" data-bs-target="#productView">
                                            View
                                        </button> */}
                                        <Button onClick={() => { this.handleShow(`${listValue.id}`) }} >View</Button>
                                        &nbsp;&nbsp;
                                        <Link to={{ pathname: /edit/ + `${listValue.id}` }} className="btn btn-primary">Edit</Link>
                                        &nbsp;&nbsp;
                                        <Button onClick={() => this.deleteProduct(`${listValue.id}`)}
                                            className="btn btn-primary" >Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ViewProduct selectedProduct={this.state.selectedProduct}
                    handleModal={this.handleModal} showModal={this.state.showModal} />
            </main >
        )
    }

}

export default ProductList