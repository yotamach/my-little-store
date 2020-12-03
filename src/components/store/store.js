import React, {Component} from 'react'
import "./store.scss";
import {Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
  }
  
  getProductItem = (product) => {
    let disabledBtn = this
      .props
      .itemsInCart
      .filter(cartItem => product._id === cartItem._id);
    disabledBtn = disabledBtn.length > 0;
    return (
      <Card className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={product.image}
            title="Contemplative Reptile"/>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {product.itemName}
            </Typography>
          </CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {product.price}$
          </Typography>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            disabled={disabledBtn}
            onClick={() => this.addToCart(product)}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    )
  };

  getProducts = () => {
    const {
      items = []
    } = this.state;
    return items.map(product => <Grid key={product.itemName} className="productItem" item xs={6} sm={4}>
      <Paper className="item-paper">{this.getProductItem(product)}</Paper>
    </Grid>);
  }

  addToCart = (product) => {
    this
      .props
      .onAddToCart(product);
  }

  search = (text) => {
    console.log(text);
    const {items} = this.props;
    if(!text) {
      this.setState({items});
    }
    else{
      const filteredItems = items.filter(product => product.itemName.includes(text))
      console.log(filteredItems);
      this.setState({items: filteredItems});
    }
  };


  render() {
    return (
      <Card variant="outlined" className="stock-card">
        <Typography className="title" color="textPrimary" gutterBottom variant="h5" component="h2">
          Products list
        </Typography>
        <TextField onKeyUp={(e) => this.search(e.target.value)} className="search" id="standard-basic" label="Search product..." />
        <CardContent>
          {this.getProducts()}
        </CardContent>
      </Card>
    )
  }
}
