import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './grid.css'

class ProductList extends Component {

    constructor(props) {
        super(props)
        //const [products, setProducts] = useState([])
        this.state = {
            items: []
        }

    }

    componentDidMount() {
        //https://jsonplaceholder.typicode.com/users
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.products
                })
            })
    }

    render() {
        //console.log(this.state.items.products) undefined
        const { items } = this.state;
        //console.log(items)
        //console.log(items.products);
        return (
            <main>
                <div class="container">
                    <div class="badge bg-primary">Product List</div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Image</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }

}

export default ProductList