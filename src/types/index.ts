export type RequestSignup = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type RequestSignin = {
  email: string;
  password: string;
};

export type RequestMembers = {
  password?: string;
  passwordConfirm?: string;
  photoUrl?: string;
};

export type ResponseProductsData = {
  images: any;
  productId: string;
  capacity: number;
  category: string;
  productName: string;
  address: string;
  favorites: boolean;
  starAvg: number;
  image: string;
  price: number;
};

export type DataType = {
  pageCount: number;
  productResponses: ResponseProductsData[];
};

export type ResponseProducts = {
  code: number;
  message: string;
  data: DataType;
};

export type RequestOrders = {
  memberId: string;
  productId: string;
  checkInTime: string;
  checkOutTime: string;
  payMethod: string;
  totalAmount: number;
};

export type Room = {
  roomId: number;
  roomName: string;
  price: string;
  description: string;
  standard: number;
  capacity: number;
  checkIn: string;
  checkOut: string;
  reserved: boolean;
};

export type PostRoomToCart = {
  roomId: number;
  roomName: string;
  price: number;
  desc: string;
  standard: number;
  checkIn: string;
  checkOut: string;
  reserved: boolean;
  startDate: string;
  endDate: string;
};

export type RequestProductDetail = {
  productId: string;
  category: string;
  address: string;
  productName: string;
  description: string;
  favorites: boolean;
  starAvg: number;
  images: string[];
  rooms: Room[];
  startDate: string;
  endDate: string;
};

export type ResponseCartData = {
  cartId: number;
  productId: number;
  productName: string;
  image: string;
  roomId: number;
  roomName: string;
  price: number;
  desc: string;
  standard: number;
  capacity: number;
  startDate: string;
  endDate: string;
  checkIn: string;
  checkOut: string;
  reserved: boolean;
};

export interface RoomData {
  roomId: number;
  startDate: string;
  endDate: string;
}

export interface AllReservationData {
  roomId: number;
  productName: string;
  roomName: string;
  standard: number;
  max: number;
  startDate: string;
  endDate: string;
  checkIn: string;
  checkOut: string;
  visitorName: string | null;
  visitorPhone: string | null;
  price: number;
}
export type CartRequest = {
  roomId: number;
  productId: string;
  productName: string;
  images: string[];
  price: number;
  desc: string;
  standard: number;
  capacity: number;
  startDate: string;
  endDate: string;
};

export type CartItem = {
  roomId: number;
  startDate: string;
  endDate: string;
};
