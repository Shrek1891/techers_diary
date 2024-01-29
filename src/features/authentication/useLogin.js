import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as apiLogin} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: login, isLoading, error} = useMutation({
        mutationFn: ({email, password}) => apiLogin({
            email,
            password
        }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user);
            navigate('/dashboard', {replace: true});


        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message)
        }
    })
    return {
        login,
        isLoading,
        error
    }
}
export default useLogin