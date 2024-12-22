import React from 'react';
import {Typography} from "@material-tailwind/react";


type Props = {
    classes?: string,
    data: string | React.ReactNode,
    colspan?: number,
    textColor?: string,
    noBold?: boolean,

}

export const TableData: React.FC<Props> = ({classes, data, colspan, textColor, noBold}) => {

    return (
        <td colSpan={colspan} className={`${classes}`}>
            <Typography
                variant="small"
                color={textColor && 'red' || 'blue-gray'}
                className={noBold && 'text-blue-gray-600' || "font-bold "}
            >
                {data}
            </Typography>
        </td>
    );
}

