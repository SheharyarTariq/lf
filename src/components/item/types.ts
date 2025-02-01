export interface ItemProps {
  categoryId: string;
  categoryName: string;
  // default_handling_option: string;
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
