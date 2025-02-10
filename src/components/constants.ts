export const handlingOptions = [
  {label: "Fold", value: "fold",},
  {label: "Hang", value: "hang"},
]

export enum handlingOption {
  fold = "Fold",
  hang = "Hang",
}

export const cleaningMethods = [
  {label: "Dry Clean", value: "dry_clean",},
  {label: "Wash", value: "wash"},
]

export enum cleaningMethod {
  wash = "Wash",
  dry_clean = "Dry Clean",
}

export const points = [
  {label: "In Person", value: "in_person",},
  // {label: "Wash", value: "wash"},
]

export enum point {
  in_person = "In Person",
  // dry_clean = "Dry Clean",
}