export interface AreaProps {
  name: string,
  id: number,
}

export interface CreateAreaProps {
  name?: string;
  id?: string | null;
  refetch: () => void;
  dailogLabel?: string | null;
};