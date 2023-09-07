import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user", user?.user]);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Incorrect email or password");
    },
  });

  return { login, isLoading };
};
