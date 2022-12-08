import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../components/CartContextProvider/CartContext';
import Modal from '../../components/Modal/Modal';
import { checkAuthenticate } from '../../utilis/checkAuthenticate';
import styles from './Products.module.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);

  const { setCart } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (id, title, price) => {
    setCart((cart) => [...cart, { id, title, price }]);
  };

  const handleOpenModal = (id) => {
    fetchSingleProduct(id);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setProduct([]);
  };

  const navigate = useNavigate();

  const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!checkAuthenticate()) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [products, navigate]);

  return (
    <main className='product-page'>
      <section>
        <h1>Produkty</h1>
      </section>
      <section className={styles.products}>
        <Modal isVisible={visible} onModalClose={handleModalClose} product={product} />
        {products.map((product, index) => (
          <div className={styles.product} key={product.id}>
            <img src={product.image} alt={product.title} width='150' />
            <h3>{product.title}</h3>
            <p>{product.price} PLN</p>
            <button onClick={() => handleAddToCart(product.id, product.title, product.price)}>Dodaj do koszyka</button>
            <button onClick={() => handleOpenModal(product.id)}>Więcej szczegółów...</button>
          </div>
        ))}
      </section>
    </main>
  );
};

export { Products };