export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartType = Pick<ProductType, 'id' | 'title' | 'price'>;

export type OrderCartType = {
  id: number;
  items: CartType[];
  amount: number;
  total: number;
};

export type UserType = {
  email: string;
  password: string;
};

export type AuthenticationType = {
  isAuthenticated: boolean;
  user: UserType | null;
  authenticate: (data: UserType) => void;
  logout: () => void;
};

export type CartContextType = {
  clearCart: () => void;
  cartItems: CartType[];
  addItemToCart: (data: CartType) => void;
  cartTotalPrice: number;
  removeItemFromCart: (data: CartType) => void;
};
