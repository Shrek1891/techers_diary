import {useMutation} from "@tanstack/react-query";
import {signup as apiSignup} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

const useSignup = () => {
    const {mutate: signup, isLoading, error} = useMutation({
        mutationFn: apiSignup,
        onSuccess: (user) => {
            toast.success("Account created")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {
        signup,
        isLoading,
        error
    }
}

export default useSignup