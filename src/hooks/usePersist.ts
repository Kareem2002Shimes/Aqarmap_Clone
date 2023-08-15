import { useState, useEffect } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState<boolean>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("persist") as string)) ||
      false
  );
  const [email, setEmail] = useState<string>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("email") as string)) ||
      ""
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  return { persist, setPersist, setEmail, email };
};
export default usePersist;
