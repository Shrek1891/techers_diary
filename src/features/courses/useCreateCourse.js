import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createCourse} from "../../services/apiCourses.js";

const useCreateCourse = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: createCourseMutate, isLoading} = useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            toast.success("Course created!");
            queryClient.invalidateQueries(["courses"]);
            navigate("/courses");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return {
        createCourseMutate,
        isLoading
    }
}

export default useCreateCourse