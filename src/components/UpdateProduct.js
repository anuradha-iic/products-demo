import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap'
// import { useParams } from 'react-router-dom'

class UpdateProduct extends Component {
    constructor() {
        super()
        // let urlParams = useParams();
        //const { productId } = match.params

        this.state = {
            categories: [],
            productId: window.location.pathname.split("/")[2],
            selectedProduct: {},
            selectedFile: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getProductCategories = this.getProductCategories.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
    }

    componentDidMount() {
        console.log("component did mount")
        this.getProductCategories();
        //console.log(this.state.productId)

        fetch('https://dummyjson.com/products/' + this.state.productId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    selectedProduct: result,
                    DataisLoaded: true
                })
            });
    }

    handleChange(e) {
        console.log("handle change")
        this.getProductCategories()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileChange(e) {
        //console.log(e.target.files[0].name)
        this.setState({ selectedFile: e.target.files[0] });
    }

    handleSubmit(e) {
        e.preventDefault()
        //console.log(this.state.selectedFile.name)
        console.log("handle submit here")
        let jsonObj = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            rating: this.state.rating,
            stock: this.state.stock,
            brand: this.state.brand,
            category: this.state.category,

        }

        if (this.state.selectedFile)
            jsonObj.thumbnail = this.state.selectedFile.name

        fetch('https://dummyjson.com/products/' + this.state.productId, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonObj)
        })
            .then(res => res.json())
            .then((result) => {

                // console.log(Object.keys(result).length)
                if (result.id)
                    window.location.href = "/"
            });
    }

    // get product categories
    getProductCategories() {
        console.log("get product categories")
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    categories: result
                })
            });
    }

    render() {
        //console.log(this.state.selectedProduct)
        //console.log(Object.keys(this.state.selectedProduct))
        return (
            <div className="container">
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    Update Product
                </div>
                <Form noValidate onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" defaultValue={this.state.selectedProduct.title}
                            onChange={this.handleChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" defaultValue={this.state.selectedProduct.description}
                            onChange={this.handleChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" defaultValue={this.state.selectedProduct.price}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="rating" defaultValue={this.state.selectedProduct.rating}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" defaultValue={this.state.selectedProduct.stock}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" defaultValue={this.state.selectedProduct.brand}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" onChange={this.handleChange} defaultValue={this.state.selectedProduct.category}>
                            {/* <option>Please Select </option> */}
                            {this.state.categories && this.state.categories.map((value) => (
                                <option value={value} key={value}>{value}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" name="thumbnail" onChange={this.onFileChange} />
                        <img src={this.state.selectedProduct.thumbnail} alt={this.state.selectedProduct.title} title={this.state.selectedProduct.title} />
                    </Form.Group>

                    <Button variant="primary" type="submit" >Update</Button>
                </Form>
            </div>
        )

    }
}
export default UpdateProduct