import {ReactNode} from "react";

export interface ItemProps {
  categoryId: string;
  categoryName: string;
  items: {
    name: string;
    id: string;
    description: string | null;
    default_cleaning_method: string;

    price: {
      wash: number | null;
      dry_clean: number | null;
    }
    piece: number;
  }[];

  refetch: () => void;
}

export interface CreateItemProps {
  label?: string | null;
  id?: string | null;
  categoryId: string | null;
  name?: string | null;
  description?: string | null;
  pieces?: number | null;
  price?: {
    dry_cleaning?: number | null;
    washing?: number | null;
    type?: string;
  };
  default_cleaning_method?: null | string,
  refetch: () => void;
};

export interface CreateItemFormData {
  name: string,
  description: string,
  default_cleaning_method: null | string,
  price: {
    dry_cleaning?: number | null;
    washing?: number | null;
    type: string;
  };
  piece: null | number
  category_id: string | null;
};