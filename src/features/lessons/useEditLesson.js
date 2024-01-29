import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createLesson} from "../../services/apiLessons.js";

const useEditLesson = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: editLesson, isLoading: isEditing} = useMutation({
        mutationFn: ({newLessonData, id}) => createLesson(newLessonData, id),
        onSuccess: () => {
            toast.success("Lesson updated!");
            queryClient.invalidateQueries({
                queryKey: ["lessons"],
            });
            navigate("/lessons");
        },
        onError: (error) => {
            toast.error(error.message);
        }

    })

    return {editLesson, isEditing}
}

export default useEditLesson