import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './grid.css'
import { Link } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'

class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            DataisLoaded: false,
            show: false,
            selectedProduct: {}
        }


    }

    handleShow(productId) {
        console.log(productId)
        this.setState({ show: true })
        fetch('https://dummyjson.com/products/' + productId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    selectedProduct: result,
                    DataisLoaded: true
                })
            });
    }

    handleModal() {
        this.setState({ show: !this.state.show })
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
                        Showing {items.length} Products
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Modal show={this.state.show} onHide={() => { this.handleModal() }} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>View Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>Title</Col>
                                    <Col>{this.state.selectedProduct.title}</Col>
                                </Row>
                                <Row>
                                    <Col>Brand</Col>
                                    <Col>{this.state.selectedProduct.brand}</Col>
                                </Row>
                                <Row>
                                    <Col>Category</Col>
                                    <Col>{this.state.selectedProduct.category}</Col>
                                </Row>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>{this.state.selectedProduct.price}</Col>
                                </Row>
                                <Row>
                                    <Col>Rating</Col>
                                    <Col>{this.state.selectedProduct.rating}</Col>
                                </Row>
                                <Row>
                                    <Col>Stock</Col>
                                    <Col>{this.state.selectedProduct.stock}</Col>
                                </Row>
                                <Row>
                                    <Col>Thumbnail</Col>
                                    <Col></Col>
                                </Row>
                                <Row><Col>
                                    <img src={this.state.selectedProduct.thumbnail} alt={this.state.selectedProduct.title} />
                                </Col></Row>
                                <Row>
                                    <Col>Images</Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.selectedProduct.images && this.state.selectedProduct.images.map((imgItem) => (
                                            <><img src={imgItem} title={this.state.selectedProduct.title} alt={this.state.selectedProduct.title} />
                                                <hr /></>
                                        ))}

                                    </Col>
                                </Row>
                            </Container>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.handleModal() }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </main >
        )
    }

}

export default ProductList