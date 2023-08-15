import { type IFormField } from "~/types/app";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import usePersist from "~/hooks/usePersist";

interface Props extends IFormField {
  errors: FieldErrors<any>;
  control: Control<any, any>;
}
const Checkbox = ({ label, name, disabled, control }: Props) => {
  const { setPersist, persist } = usePersist();
  const handleToggle = () => setPersist((prev: boolean) => !prev);
  return (
    <>
      <label htmlFor={name} className="label cursor-pointer gap-3 p-0 ">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type="checkbox"
              disabled={disabled}
              {...field}
              name={name}
              id={name}
              onChange={handleToggle}
              checked={persist}
              className="checkbox-primary checkbox h-5 w-5 rounded-md"
            />
          )}
        />

        <span className="label-text text-accent">{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
