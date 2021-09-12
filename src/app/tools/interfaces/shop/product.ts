export interface Product {
  id?: string,
  title?: string;
  comments?: [];
  prix?: string;
  colors?: [string];
  images?: [{
    id: string;
    path: string;
  }];
  mesures?: {
    height?: number;
    width?: number;
    inside?: number;
  };
  weight?: string;
}
