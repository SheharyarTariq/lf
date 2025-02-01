import React from "react";

type GetPostCodes = {
  setOpenDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  id: number;
}
type GetTimeSlots = {
  setOpenTimeDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  id: number;
}

type GetAllPostCodes = {
  setOpenDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  data: {
    result: Array<{
      id: string;
    }>;
  }
  setOpenAllDropdowns: React.Dispatch<React.SetStateAction<boolean>>;
}

type GetAllTimeSlots = {
  setOpenTimeDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  data: {
    result: Array<{
      id: string;
    }>;
  }
  setOpenAllTimeSlotDropdowns: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleGetPostCodes = ({id, setOpenDropdowns}: GetPostCodes) => {
  setOpenDropdowns((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
};

export const handleGetTimeSlots = ({id, setOpenTimeDropdowns}: GetTimeSlots) => {
  setOpenTimeDropdowns((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
};

export const handleGetAllPostCodesOpen = ({data, setOpenAllDropdowns, setOpenDropdowns}: GetAllPostCodes) => {
  setOpenAllDropdowns((prevState) => !prevState);
  data.result.map(({id}: { id: string }) =>
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: false,
    })),
  );
};
export const handleGetAllPostCodesClose = ({data, setOpenAllDropdowns, setOpenDropdowns,}: GetAllPostCodes) => {
  setOpenAllDropdowns((prevState) => !prevState);
  data.result.map(({id}) =>
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: true,
    })),
  );
};

export const handleGetAllTimeSlotsOpen = ({
                                            data,
                                            setOpenAllTimeSlotDropdowns,
                                            setOpenTimeDropdowns
                                          }: GetAllTimeSlots) => {
  setOpenAllTimeSlotDropdowns((prevState) => !prevState);
  data.result.map(({id}: { id: string }) =>
    setOpenTimeDropdowns((prevState) => ({
      ...prevState,
      [id]: false,
    })),
  );
};
export const handleGetAllTimeSlotsClose = ({
                                             data,
                                             setOpenAllTimeSlotDropdowns,
                                             setOpenTimeDropdowns
                                           }: GetAllTimeSlots) => {
  setOpenAllTimeSlotDropdowns((prevState) => !prevState);
  data.result.map(({id}) =>
    setOpenTimeDropdowns((prevState) => ({
      ...prevState,
      [id]: true,
    })),
  );
};