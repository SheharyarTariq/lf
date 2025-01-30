export enum OrderStatus {
  Created = 'created',
  ReadyForPickup = 'ready_for_pickup',
  OutForPickup = 'out_for_pickup',
  PickedUp = 'picked_up',
  PickupIssue = 'pickup_issue',
  AtShop = 'at_shop',
  ItemsAdded = 'items_added',
  AwaitingReview = 'awaiting_review',
  PartiallyApproved = 'partially_approved',
  Approved = 'approved',
  PaymentPending = 'payment_pending',
  PaymentFailed = 'payment_failed',
  PaymentSuccessful = 'payment_successful',
  PaymentRequiresAction = 'payment_requires_action',
  Processing = 'processing',
  ReadyForDropOff = 'ready_for_drop_off',
  OutForDelivery = 'out_for_delivery',
  DeliveryIssue = 'delivery_issue',
  Delivered = 'delivered',
  Cancelled = 'cancelled'
}

export const orderByOptions = [
  {label: "Number", value: "number"},
  {label: "Pickup Date", value: "pickup_date"},
  {label: "Dropoff Date", value: "dropoff_date"},
  {label: "Created At", value: "created_at"},
  {label: "Status", value: "status"},
]

export const sortingOrderOptions = [
  {label: "Ascending", value: "asc"},
  {label: "Descending", value: "desc"},
]