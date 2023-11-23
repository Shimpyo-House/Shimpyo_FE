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
  photoURL?: string;
};

export type ResponseProductsData = {
  productId: string;
  category: string;
  productName: string;
  address: string;
  favorites: boolean;
  starAvg: number;
  image: string;
  price: number;
};
export type ResponseProducts = {
  code: number;
  message: string;
  data: ResponseProductsData[];
};

export type RequestOrders = {
  memberId: string;
  productId: string;
  checkInTime: string;
  checkOutTime: string;
  payMethod: string;
  totalAmount: number;
};

export type RequestProductDetail = {
  productId: number;
  startDate: string;
  endDate: string;
};

export type ResponseCartsData = {
  productId: number;
  productName: string;
  images: string;
  rooms: ResponseCartRoomData[];
};

export type ResponseCartRoomData = {
  roomId: number;
  roomName: string;
  price: number;
  desc: string;
  standard: number;
  capacity: number;
  checkIn: string;
  checkOut: string;
};
