import { Pages } from "~/constants/enums";
import Form from "./Form";
import type { IFormFieldsVariables } from "~/types/app";
import { useEffect, useState } from "react";


const Auth = ({ slug  }:IFormFieldsVariables) => {
  const [resend, setResend] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      resend > 0 && setResend((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [resend]);
  const renderTitle = (): string | null => {
    switch (slug) {
      case Pages.LOGIN:
        return "Welcome back";
      case Pages.SIGNUP:
        return "Create an account";
      case Pages.FORGOT_PASSWORD:
        return "Forgot your password?";
      case Pages.VERIFY_ACCOUNT:
        return "Please Verify your email";
      case Pages.RESET_PASSWORD:
        return "Reset Password";
      case Pages.ENTER_OTP:
        return "Enter verification code";
      default:
        return null;
    }
  };
  const renderDesc = (): string | null => {
    switch (slug) {
      case Pages.FORGOT_PASSWORD:
        return "Please enter your email here to reset password";
      case Pages.VERIFY_ACCOUNT:
        return "You're almost there! We sent an email to";
      case Pages.RESET_PASSWORD:
        return "Enter 4 digit OTP sent to your email address";
      case Pages.ENTER_OTP:
        return "OTP code was sent to";
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col md:w-[300px] lg:w-[350px]">
      <h3 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 dark:border-slate-200/5 dark:text-white sm:text-4xl">
        {renderTitle()}
      </h3>
    
      <Form slug={slug}  />
    </div>
  );
};

export default Auth;
