export interface OrderDetailsCardProps {
  id: string,
  result: {
    number: number,
    created_at: string,
    note: string,
    revenue: string,
    pickup: {
      date: string,
      time: string,
      point: string,
    },
    dropoff: {
      date: string,
      time: string,
      point: string,
    },

  }
}
