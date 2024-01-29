import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createStudent} from "../../services/apiStudenst.js";

const useCreateStudent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: createStudentMutate, isLoading} = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            toast.success("Student created!");
            queryClient.invalidateQueries(["students"]);
            navigate("/students");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return {
        createStudentMutate,
        isLoading
    }
}

export default useCreateStudent