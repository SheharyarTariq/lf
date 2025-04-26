export interface CreatePostcodeProps {
  areaId: string | null;
  refetch: () => void;
};

export interface UpdatePostcodeProps {
  is_active: boolean;
  id: string;
  refetch: Function;
};