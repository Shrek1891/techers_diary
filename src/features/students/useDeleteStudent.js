import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {deleteStudent} from "../../services/apiStudenst.js";

const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoading, mutate} = useMutation({
        mutationFn: (id) => deleteStudent(id),
        onSuccess: () => {
            toast.success("Student deleted");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
            navigate("/students");

        },
        onError: (error) => {
            return toast.error(error.message);
        }
    })
    return {isLoading, mutate};
}

export default useDeleteStudent