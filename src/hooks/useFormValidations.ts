import type { IFormFieldsVariables } from "../types/app";
import * as z from "zod";
import { Pages } from "../constants/enums";
import {
  loginSchema,
} from "~/validation/auth";

const useFormValidations = (props: IFormFieldsVariables) => {
  const { slug } = props;

  const getValidationSchema = () => {
    switch (slug) {
      case Pages.LOGIN:
        return loginSchema;
      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
