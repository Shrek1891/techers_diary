import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/apiAuth.js";

const useUpdateUser = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (data) => {
            toast.success("user updated!");
            //queryClient.setQueryData(["user"], data);
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            navigate("/accounts");
        },
        onError: (error) => {
            toast.error(error.message);
        }

    })
    return {
        updateUser,
        isUpdating
    }
}


export default useUpdateUser