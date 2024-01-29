import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createLesson} from "../../services/apiLessons.js";

const useCreateLesson = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: createLessonMutate, isLoading} = useMutation({
        mutationFn: (data) => createLesson(data),
        onSuccess: () => {
            toast.success("Lesson created!");
            queryClient.invalidateQueries(["lessons"]);
            navigate("/lessons");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return {
        createLessonMutate,
        isLoading
    }

}

export default useCreateLesson