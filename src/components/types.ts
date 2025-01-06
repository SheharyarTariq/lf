export interface CreateItemProps {
    label: string | null;
    id: string | null;
    categoryId: string | null;
    name: string | null;
    description: string | null;
    washing_price: number | null;
    pieces: number | null;
    is_dry_cleanable: boolean | null | number;
    is_washable: boolean | null | number;
    dry_cleaning_price: number | null;
    refetch: () => void;
};

export interface CreateItemFormData {
    name: string,
    description: string,
    washing_price: null | number,
    dry_cleaning_price: null | number,
    piece: null | number
};