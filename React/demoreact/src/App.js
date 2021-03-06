import React, { Component } from "react";
import Category from "./Category";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import Form1 from "./Form1";
import Form2 from "./Form2";

class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };
  componentDidMount() {
    this.getProducts();
  }
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart!", 2);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " deleted from cart!", 2);
  };
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  changeCategory = (category) => {
    this.setState({ currentCategory: category });
    this.getProducts(category.id);
  };

  render() {
    let infoProduct = {
      title: "Product List",
    };
    let infoCategory = {
      title: "Category List",
    };
    let infoNavi = {
      title: "Navi",
    };
    return (
      <Container>
        <Navi
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
          info={infoNavi}
        />
        <Row>
          <Col xs="3">
            <Category
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={infoCategory}
            />
          </Col>
          <Col xs="9">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <ProductList
                    {...props}
                    addToCart={this.addToCart}
                    products={this.state.products}
                    currentCategory={this.state.currentCategory}
                    info={infoProduct}
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={(props) => (
                  <CartList
                    {...props}
                    removeFromCart={this.removeFromCart}
                    cart={this.state.cart}
                  />
                )}
              />
              <Route exact path="/form1" component={Form1} />
              <Route exact path="/form2" component={Form2} />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
