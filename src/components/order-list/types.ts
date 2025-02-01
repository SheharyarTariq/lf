export interface OrderListProps {
  id: string,
  number: number,
  status: string,
  created_at: string,
  note: string,
  pickup: {
    date: string, start_time: string, end_time: string, point: string
  },
  dropoff: {
    date: string, start_time: string, end_time: string, point: string
  }
}
