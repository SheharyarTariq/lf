export interface CategoryProps {
  name: string;
  description: string | null;
  id: number;
  category_handling_options: [] | null;
  items: [];
  is_hangable: boolean;
  is_foldable: boolean;
  position: number;
  default_handling_option: "hang" | "fold";
}


export interface CreateCategoryProps {
  name?: string;
  position?: number | null;
  id?: string | number | null;
  refetch: () => void;
  dailogLabel?: string | null;
  description?: string | null;
  is_hangable?: boolean | null;
  is_foldable?: boolean | null;
  default_handling_option?: string | null;
};

export interface CreateCategoryFormData {
  inputValue?: string | null;
  descriptions?: string | null;
  position?: number | null;
  hang?: boolean | null;
  fold?: boolean | null;
  default_handling_option?: string | null;
};

export interface CreateCategoryFormDataProps {
  name: string | null;
  description?: string | null;
  position?: number | null;
  is_hangable?: boolean | null;
  is_foldable?: boolean | null;
  default_handling_option: string | null;
};