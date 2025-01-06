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

export interface CategoryProps {
    name: string;
    description: string | null;
    id: number;
    category_handling_options: [] | null;
    items: [];
    is_dry_cleanable: boolean;
    is_washable: boolean
    is_hangable: boolean;
    is_foldable: boolean;
    default_cleaning_method: "wash" | "dry_clean";
    default_handling_option: "hang" | "fold";
}


export interface CreateCategoryProps {
    name: string | null;
    id: string | number | null;
    refetch: () => void;
    dailogLabel: string | null;
    description: string | null;
    is_hangable: boolean | null;
    is_foldable: boolean | null;
    is_dry_cleanable: boolean | null;
    is_washable: boolean | null;
    default_cleaning_method: string | null;
    default_handling_option: string | null;
};

export interface CreateCategoryFormData {
    inputValue: string;
    descriptions: string;
    hang: boolean;
    fold: boolean;
    wash: boolean;
    dry_clean: boolean;
    defaultCleanMethod: string | null;
    defaultHandlingOption: string | null;
};

export interface ItemProps {
    categoryId: string;
    categoryName: string;
    is_dry_cleanable: boolean,
    is_washable: boolean,
    items: {
        name: string;
        id: string;
        description: string | null;
        price: {
            wash: number | null;
            dry_clean: number | null;
        }
        piece: number;
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

export interface CreateServiceAvailabilityProps {
    areaId: string | null;
    refetch: () => void;
};

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