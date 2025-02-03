export interface OrderListProps {
  id: string,
  number: number,
  status: string,
  created_at: string,
  note: string,
  user: {
    full_name: string,
    email: string,
  }
  pickup: {
    date: string, time: string, point: string
  },
  dropoff: {
    date: string, time: string, point: string
  },
}
