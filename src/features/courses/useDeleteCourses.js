import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {deleteCourse} from "../../services/apiCourses.js";

const useDeleteCourses = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoading, mutate} = useMutation({
        mutationFn: (id) => deleteCourse(id),
        onSuccess: () => {
            toast.success("Course deleted");
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            navigate("/courses");

        },
        onError: (error) => {
            return toast.error(error.message);
        }
    })
    return {isLoading, mutate};
}

export default useDeleteCourses