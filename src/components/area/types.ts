export interface AreaProps {
  name: string,
  id: number,
  service_availabilities: [],
  slot_availabilities: {
    weekday: string
    slots: {
      slot: string
      id: string
      is_active: boolean
    }[]
  }[],

}

export interface CreateAreaProps {
  name: string | null;
  id: string | null;
  refetch: () => void;
  dailogLabel: string | null;
};