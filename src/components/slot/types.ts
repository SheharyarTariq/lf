export interface SlotProps {
  areaName: string;
  loading: boolean;
  slot_availabilities: {
    weekday: string; slots: {
      availability_id: string
      slot: string
      is_active: boolean
    }[];
  }[]
  refetch: () => void;
}