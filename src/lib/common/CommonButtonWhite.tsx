import React, {ReactNode} from 'react';
import {Button} from "@material-tailwind/react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const CommonButtonWhite: React.FC<Props> = ({children, onClick}) => {
  return (
    <Button variant="text" color="blue-gray" size="sm" onClick={onClick}>
      {children}
    </Button>
  );
}

export default CommonButtonWhite;