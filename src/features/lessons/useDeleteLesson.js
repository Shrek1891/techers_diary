import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {deleteLesson} from "../../services/apiLessons.js";

const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoading, mutate} = useMutation({
        mutationFn: (id) => deleteLesson(id),
        onSuccess: () => {
            toast.success("Lesson deleted");
            queryClient.invalidateQueries({
                queryKey: ["lessons"],
            });
            navigate("/lessons");

        },
        onError: (error) => {
            return toast.error(error.message);
        }
    })
    return {isLoading, mutate};
}

export default useDeleteLesson