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

export interface CategoryProps {
    name: string;
    description: string | null;
    id: number;
    category_handling_options: [] | null;
    items: [];
}

export interface ItemProps {
    categoryId: string;
    categoryName: string;
    items: {
        name: string;
        id: string;
        description: string | null;
        dry_cleaning_price: number | null;
        washing_price: number | null;
    }[];

    refetch: () => void;
}

export interface ServiceAvailabilityProps {
    areaId: string;
    areaName: string;
    service_availabilities: {
        postcode: string; id: string; is_active: boolean;
    }[];
    refetch: () => void;
}

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

export interface OrderItems {
    id: string,
    name: string,
    quantity: number,
    cleaning_method: string | null,
    price_per_unit: string | null,
    total_price: string,
    is_approved: boolean | null,
    is_open_item: boolean,
}