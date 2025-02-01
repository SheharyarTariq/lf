export interface SlotProps {
  areaId: string;
  areaName: string;
  slot_availabilities: {
    weekday: string; slots: {
      availability_id: string
      slot: string
      is_active: boolean
    }[];
  }[]
  refetch: () => void;
}