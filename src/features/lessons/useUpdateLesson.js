import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {updateLessonByStatus} from "../../services/apiLessons.js";

const useUpdateLesson = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: updateLesson, isLoading: isUpdating} = useMutation({
        mutationFn: (id) => updateLessonByStatus(id),
        onSuccess: () => {
            toast.success("Lesson updated");
            queryClient.invalidateQueries({
                queryKey: ["lessons"],
            });
            navigate("/lessons");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return {updateLesson, isUpdating}
}

export default useUpdateLesson