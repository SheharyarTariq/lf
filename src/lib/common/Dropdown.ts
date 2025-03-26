import React from "react";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;

type GetPostCodes = {
  setOpenDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  id: number;
}
type GetTimeSlots = {
  setOpenTimeDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  id: number;
}

type GetAllPostCodes = {
  toggle: boolean;
  setOpenDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  data: {
    result: Array<{
      id: string;
    }>;
  }
  setIsOpenAllPostcodeDropdowns: React.Dispatch<React.SetStateAction<boolean>>;
}

type GetAllCategory = {
  setOpenDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  data: {
    result: Array<{
      id: string;
    }>;
  }
  setOpenAllDropdowns: React.Dispatch<React.SetStateAction<boolean>>;
}

type GetAllTimeSlots = {
  toggle: boolean;
  setOpenTimeDropdowns: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
  data: {
    result: Array<{
      id: string;
    }>;
  }
  setIsOpenAllTimeSlotDropdowns: React.Dispatch<React.SetStateAction<boolean>>;
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

export const handleGetAllPostCodesOpen = ({
                                            data,
                                            setIsOpenAllPostcodeDropdowns,
                                            setOpenDropdowns,
                                            toggle
                                          }: GetAllPostCodes) => {
  {
    toggle && setIsOpenAllPostcodeDropdowns((prevState) => !prevState);
  }
  data.result.map(({id}: { id: string }) =>
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: false,
    })),
  );
};
export const handleGetAllPostCodesClose = ({
                                             data,
                                             setIsOpenAllPostcodeDropdowns,
                                             setOpenDropdowns,
                                             toggle
                                           }: GetAllPostCodes) => {
  {
    toggle &&
    setIsOpenAllPostcodeDropdowns((prevState) => !prevState);
  }
  data.result.map(({id}) =>
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [id]: true,
    })),
  );
};

export const handleGetAllTimeSlotsOpen = ({
                                            data,
                                            setIsOpenAllTimeSlotDropdowns,
                                            setOpenTimeDropdowns,
                                            toggle = false
                                          }: GetAllTimeSlots) => {
  {
    toggle && setIsOpenAllTimeSlotDropdowns((prevState) => !prevState);
  }
  data.result.map(({id}: { id: string }) =>
    setOpenTimeDropdowns((prevState) => ({
      ...prevState,
      [id]: false,
    })),
  );
};

export const handleGetAllTimeSlotsClose = ({
                                             data,
                                             setIsOpenAllTimeSlotDropdowns,
                                             setOpenTimeDropdowns, toggle = false
                                           }: GetAllTimeSlots) => {

  {
    toggle &&
    setIsOpenAllTimeSlotDropdowns((prevState) => !prevState);
  }
  data.result.map(({id}) =>
    setOpenTimeDropdowns((prevState) => ({
      ...prevState,
      [id]: true,
    })),
  );
};
