export type ServiceType = 'followers' | 'likes' | 'comments' | 'views';

export interface Package {
  id: string;
  service: ServiceType;
  quantity: number;
  price: number;
  label: string;
  popular?: boolean;
  bestValue?: boolean;
  perks: string[];
}

export interface CartItem {
  pkg: Package;
  qty: number;
}
