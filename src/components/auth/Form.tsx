import useFormFields from "~/hooks/useFormFields";
import type {
  IFormField,
  IFormFieldsVariables,
} from "~/types/app";
import FormFields from "../formFields/FormFields";
import { Pages, Routes } from "~/constants/enums";
import Link from "next/link";
import { useCallback } from "react";
import { signIn,  useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormValidations from "~/hooks/useFormValidations";
import toast from "react-hot-toast";
import {
  ILogin,
} from "~/validation/auth";


const Form = ({ slug }:IFormFieldsVariables) => {
  const { getFormFields } = useFormFields({ slug });

  const session = useSession();
  const renderButtonText = (): string | null => {
    switch (slug) {
      case Pages.LOGIN:
        return "Login";
      case Pages.SIGNUP:
        return "Create account";
      case Pages.FORGOT_PASSWORD:
        return "Continue";
      case Pages.VERIFY_ACCOUNT:
        return "Resend Verification Email";
      case Pages.RESET_PASSWORD:
        return "Change Password";
      case Pages.ENTER_OTP:
        return "Confirm";
      default:
        return null;
    }
  };
 

  
  const router = useRouter();
  const { getValidationSchema } = useFormValidations({ slug });
  const DEFAULT_VALUES: any = {};
  for (const field of getFormFields()) {
    DEFAULT_VALUES[field.name] = "";
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(getValidationSchema()),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });


  const onSubmit = useCallback(
    async (data: any) => {
      switch (slug) {
        case Pages.LOGIN:
          try {
            const res = await signIn("credentials", {
              ...(data as ILogin),
              redirect: false,
            });
            if (res?.ok) {
              reset();
              router.replace(`${Routes.ROOT}`);
            } else {
              const err = JSON.parse(res?.error as string)
              toast.error(err.error_description)
            }
          } catch (error: any) {
            console.log(error)
            toast.error(error);
          }
          break;
        default:
          break;
      }
    },
    [router]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
       
        {getFormFields().map((field: IFormField) => (
          <div key={field.name} className="mb-3">
            <FormFields {...field} control={control} errors={errors} />
          </div>
        ))}

        {slug === Pages.LOGIN && (
          <div className="mb-2 mt-6 flex items-center justify-between">
            <FormFields
              type="checkbox"
              name="remember"
              aria-describedby="remember"
              id="remember"
              label="Remember me"
              control={control}
              errors={errors}
            />
            <Link
              href={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}
        {renderButtonText() && (
          <button
            className={`primary-btn mt-8 h-10 rounded-[26px] ${
              isSubmitting ? "bg-slate-400 dark:bg-slate-600" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              renderButtonText()
            )}
          </button>
        )}

  
      </form>
   
    </div>
  );
};

export default Form;
