import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './grid.css'
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import ViewProduct from "./components/ViewProduct";


class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            DataisLoaded: false,
            showModal: false,
            selectedProduct: {}
        }
    }

    handleModal() {
        console.log("list here")

        this.setState({ showModal: !this.state.showModal })
    }

    handleShow(productId) {
        console.log(productId)
        this.setState({ showModal: true })
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
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.products,
                    DataisLoaded: true
                })
            })
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

    render() {

        const { DataisLoaded, items } = this.state;
        //console.log(items);
        if (!DataisLoaded)
            return <div><h1> Pleses wait some time.... </h1></div>;

        return (
            <main>
                <div className="container">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        Product List
                    </div>
                    <div class="badge bg-primary">
                        Showing {items && items.length} Products
                    </div>&nbsp;

                    {/* <Button class="bg-primary" onClick={() => this.addProduct()}>Add Product</Button> */}

                    <Link to={{ pathname: '/add' }} className="btn btn-primary">Add Product</Link>

                    <table class="table table-striped">
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