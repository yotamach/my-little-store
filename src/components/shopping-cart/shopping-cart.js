import React, {Fragment} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';import axios from 'axios';
import "./shopping-cart.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShoppingCart(props) {
  const classes = useStyles();
  const [open,
    setOpen] = React.useState({status: false,title: null, message: null, severity: null});

  const handleClose = () => {
    setOpen({status: false,title: null, message: null, severity: null});
  };

  const getProducts = () => {
    const {
      cart = {}
    } = props;
    return cart.cartItems
      ? cart
        .cartItems
        .map(item => (
          <ListItem key={item.itemName}>
            <ListItemAvatar>
              <Avatar>
                <LocalMallIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.itemName} secondary={item.price}/>
            <Button size="small" onClick={() => removeFromCart(item)}>Remove</Button>
          </ListItem>
        ))
      : null;
  }

  const removeFromCart = (product) => {
    props.onRemoveFromCart(product);
  }

  const checkOut = () => {
    const {
      cart = {}
    } = props;
    axios
      .post("http://localhost:3001/cart/update", {
      ...cart,
      paid: true
    })
      .then(response => {
        setOpen({status: true,title: 'Success', message: 'Payment passed successfuly! Thank you!', severity: 'success'});
      })
      .catch(err => {
        setOpen({status: true,title: 'Error', message: 'Payment was filed!', severity: 'error'});
      });
  }

  return (
    <Fragment>
      <Card variant="outlined" className="shopping-cart">
        <CardContent>
          <Typography color="textPrimary" gutterBottom variant="h5" component="h2">
            Shopping cart
          </Typography>
        </CardContent>
        <CardContent>
          <List className="iist">
            {getProducts()}
          </List>
        </CardContent>
        <Typography color="textPrimary" gutterBottom variant="h5" component="h5">
          Total price: {props.cart.totalPrice}$
        </Typography>
        <CardActions>
          <Button size="small" onClick={() => checkOut()}>Check out</Button>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open.status}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open.status}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{open.title}</h2>
            <p id="transition-modal-description">{open.message}</p>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  )
}