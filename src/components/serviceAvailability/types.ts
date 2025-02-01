export interface ServiceAvailabilityProps {
  areaId: string;
  areaName: string;
  service_availabilities: {
    postcode: string; id: string; is_active: boolean;
  }[];
  refetch: () => void;
}

export interface CreateServiceAvailabilityProps {
  areaId: string | null;
  refetch: () => void;
};