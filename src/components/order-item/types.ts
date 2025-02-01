export interface OrderDetailsCardProps {
  id: string | null,
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

export interface OrderItems {
  id: string,
  name: string,
  quantity: number,
  cleaning_method: string | null,
  price_per_unit: string | null,
  total_price: string,
  is_approved: boolean | null,
  is_open_item: boolean,
  handling_option: string | null,
  piece: string | null
}

