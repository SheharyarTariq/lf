import * as yup from "yup";

export const schema = yup.object().shape({
  postcode: yup
    .string()
    .required("Postcode is required")
    .matches(
      /^[A-Za-z]{1,2}[0-9][0-9A-Za-z]? ?[0-9][A-Za-z]{2}$/,
      "Invalid postcode format"
    ),
});