import React, { useContext } from 'react';
import { CartContext } from '../CartContextProvider/CartContext';
import styles from './Cart.module.scss';
import ShoppingBag from '../../assets/img/shopping-bag.svg';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  // ! TODO: Array MDN <--

  const cartTotalPrice = Number(cartItems.reduce((accu, currItem) => accu + currItem.price, 0).toFixed(2));

  return (
    <Link to='/order' className={styles['cart-link']}>
      <aside className={styles.cart}>
        <div>{cartTotalPrice} EUR</div>
        <div className={styles['cart-wrapper']}>
          <span className={styles['cart-items']}>{cartItems.length}</span>
          <img style={{ height: '30px' }} src={ShoppingBag} alt='shopping bag' />
        </div>
      </aside>
    </Link>
  );
};

export { Cart };
