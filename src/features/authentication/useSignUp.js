import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

const useSignUp = () => {
  const {
    mutate: signUp,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
  });
  console.log(error);

  return { signUp, isLoading };
};

export default useSignUp;
