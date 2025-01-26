import * as yup from "yup";

export const areaSchema = yup.object().shape({
  name: yup.string().trim().required("Area name is required")
});