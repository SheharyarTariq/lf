export interface AreaProps {
  name: string,
  id: number,

  post_codes:
    {
      id: string
      postcode: string
      is_active: boolean
    }[],
  slot_availabilities: {
    weekday: string
    slots: {
      slot: string
      availability_id: string
      is_active: boolean
    }[]
  }[],

}

export interface CreateAreaProps {
  name?: string;
  id?: string | null;
  refetch: () => void;
  dailogLabel?: string | null;
};