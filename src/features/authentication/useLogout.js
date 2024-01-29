import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as apiLogout} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: apiLogout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', {replace: true});
        },
        onError: (error) => {
            console.log(error);
        }

    })
    return {
        logout,
        isLoading
    }

}
export default Logout