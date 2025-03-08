export interface PostcodeProps {
  areaId: string;
  areaName: string;
  service_availabilities: {
    postcode: string; id: string; is_active: boolean;
  }[];
  refetch: () => void;
}

export interface CreatePostcodeProps {
  areaId: string | null;
  refetch: () => void;
};

export interface UpdatePostcodeProps {
  is_active: boolean;
  id: string;
  refetch: Function;
};