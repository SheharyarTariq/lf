export interface SlotProps {
  areaId: string;
  areaName: string;
  slot_availabilities: {
    weekday: string; slots: {
      id: string
      slot: string
      is_active: boolean
    }[];
  }[]
  refetch: () => void;
}