import React, { Component } from "react";
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';


class ViewProduct extends Component {
    constructor(props) {
        super(props)
        console.log(props.selectedProduct)
        //const { showModal, handleModal, selectedProduct } = props;
        //console.log(selectedProduct + '---------' + showModal + '--' + handleModal)
        this.state = {
            showModal: false,
            //selectedProduct: props.selectedProduct
        }

        // this.handleModal = this.handleModal.bind(this)
    }

    handleModal() {
        console.log('view here')
        console.log('props---' + this.props.showModal)
        console.log('state----' + this.state.showModal)
        this.setState({ showModal: !this.state.showModal })
        this.props.handleModal()
        console.log('hrllo')
    }

    render() {

        console.log(this.props)
        return (

            <Modal show={this.props.showModal} size="lg">
                <Modal.Header >
                    <Modal.Title>View Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>Title</Col>
                            <Col>{this.props.selectedProduct.title}</Col>
                        </Row>

                        <Row>
                            <Col>Brand</Col>
                            <Col>{this.props.selectedProduct.brand}</Col>
                        </Row>
                        <Row>
                            <Col>Category</Col>
                            <Col>{this.props.selectedProduct.category}</Col>
                        </Row>
                        <Row>
                            <Col>Price</Col>
                            <Col>{this.props.selectedProduct.price}</Col>
                        </Row>
                        <Row>
                            <Col>Rating</Col>
                            <Col>{this.props.selectedProduct.rating}</Col>
                        </Row>
                        <Row>
                            <Col>Stock</Col>
                            <Col>{this.props.selectedProduct.stock}</Col>
                        </Row>
                        <Row>
                            <Col>Thumbnail</Col>
                            <Col></Col>
                        </Row>
                        <Row><Col>
                            <img src={this.props.selectedProduct.thumbnail} alt={this.props.selectedProduct.title} />
                        </Col></Row>
                        <Row>
                            <Col>Images</Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.selectedProduct.images && this.props.selectedProduct.images.map((imgItem) => (
                                    <><img src={imgItem} title={this.props.selectedProduct.title} alt={this.props.selectedProduct.title} />
                                        <hr /></>
                                ))}

                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.handleModal()}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default ViewProduct 