import { type IFormField } from "~/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

interface Props extends IFormField {
  errors: FieldErrors<any>;
  control: Control<any, any>;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  control,
  errors,
}: Props) => {
  return (
    <>
      <label htmlFor={name} className="label-filed">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            className={`input-field ${
              errors[name]
                ? "hover:ring-red-400 focus:ring-red-500 dark:hover:ring-red-400 dark:focus:ring-red-500"
                : ""
            }`}
            type={type}
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            name={name}
            id={name}
          />
        )}
      />
      <p
        className={`mt-4 text-center text-sm text-accent ${
          errors[name] ? "text-red-500" : ""
        }`}
      >
        {errors[name] && (errors[name]?.message as string)}
      </p>
    </>
  );
};

export default TextField;
