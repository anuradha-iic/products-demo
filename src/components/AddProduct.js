import React, { Component } from "react";
import { Button, Form, Col } from 'react-bootstrap'

class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            validated: false,
            setValidated: false,
            selectedFile: null
        }

        this.getProductCategories = this.getProductCategories.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
    }

    componentDidMount() {
        this.getProductCategories()
    }

    handleChange(e) {

        this.getProductCategories()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileChange(e) {
        this.setState({ selectedFile: e.target.files[0] });
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("handle submit here")
        console.warn(this.state)

        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.setState({
            setValidated: true
        })

        // const formData = new FormData(e.currentTarget);
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        console.log(this.state.selectedFile + '----->' + this.state.selectedFile.name)
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                rating: this.state.rating,
                stock: this.state.stock,
                brand: this.state.brand,
                category: this.state.category
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.id) {
                    //redirect to product list view
                    window.location.href = "/"
                }
            });
    }

    addProduct() {
        console.log("add here")
        console.warn(this.state.brand)
        //console.warn(title, description)
    }

    // get product categories
    getProductCategories() {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    categories: result
                })
            });
    }

    render() {
        //console.log(this.state.categories)
        return (
            <div className="container">
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    Add Product
                </div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" as={Col} controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" required
                            onChange={this.handleChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required
                            onChange={this.handleChange} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" required onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="rating" required onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" required onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" required onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" onChange={this.handleChange}>
                            <option>Please Select </option>
                            {this.state.categories.map((value) => (
                                <option value={value} key={value}>{value}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" required name="file" onChange={this.onFileChange} />
                    </Form.Group>
                    {/* onClick={this.addProduct} */}
                    <Button variant="primary" type="submit" >Submit</Button>
                </Form>
            </div>
        )
    }
}

export default AddProduct