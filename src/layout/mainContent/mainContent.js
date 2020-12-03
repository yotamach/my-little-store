import React, {Component, Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '../../components/shopping-cart/shopping-cart';
import Store from '../../components/store/store';
import {withStyles} from '@material-ui/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    display: 'flex',
    padding: '3px',
    textAlign: 'center',
    color: '#ffffff'
  }
});

class mainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: {
        cartItems: [],
        totalPrice: 0,
        paid: false
      },
      stock: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/products")
      .then(response => {
        this.setState({
          ...this.state,
          stock: [...response.data.products]
        });
      });

      axios
      .get("http://localhost:3001/cart/create")
      .then(response => {
        this.setState({
          ...this.state,
          cart: {
            _id: response.data.cart._id,
            cartItems: response.data.cart.cartItems,
            totalPrice: response.data.cart.totalPrice,
            paid: response.data.cart.paid
          }
        });
      });

  }

  removeFromCart = (product) => {
    const {cart} = this.state;
    const updatedCartItems = cart
      .cartItems
      .filter(item => item._id !== product._id)
    this.setState({
      ...this.state,
      cart: {
        ...cart,
        cartItems: [...updatedCartItems],
        totalPrice: cart.totalPrice -= product.price
      }
    });
  }

  addToCart = (product) => {
    const {cart} = this.state;
    this.setState({
      ...this.state,
      cart: {
        ...cart,
        cartItems: [
          ...cart.cartItems,
          product
        ],
        totalPrice: cart.totalPrice += product.price
      }
    });
  }

  render() {
    const {classes} = this.props;
    const {stock, cart} = this.state;
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Store itemsInCart={cart.cartItems} items={stock} onAddToCart={this.addToCart}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ShoppingCart key={cart} cart={cart} onRemoveFromCart={this.removeFromCart}/>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(mainContent);