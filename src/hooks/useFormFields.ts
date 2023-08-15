import type { IFormField, IFormFieldsVariables } from "~/types/app";
import { Pages } from "../constants/enums";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const loginFields = (): IFormField[] => [
    {
      label: "username",
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      autoFocus: true,
    },
    {
      label: "password",
      name: "password",
      placeholder: "••••••••",
      type: "password",
    },
  ];




  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();

  
      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
