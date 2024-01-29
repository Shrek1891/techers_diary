import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth.js";

const useUser = () => {
    const {data: user, isLoading, error} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,

    })
    return {
        user,
        isLoading,
        error,
        isAuthenticated: user?.role === 'authenticated'
    }
}

export default useUser