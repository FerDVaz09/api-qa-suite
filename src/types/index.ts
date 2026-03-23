export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export interface TestUser {
  username: string;
  password: string;
  expectedResult: 'success' | 'failure';
}
