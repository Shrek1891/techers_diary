import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createCourse} from "../../services/apiCourses.js";

const useEditCourse = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: editCourse, isLoading: isEditing} = useMutation({
        mutationFn: ({newCourseData, id}) => createCourse(newCourseData, id),
        onSuccess: () => {
            toast.success("Course updated!");
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            navigate("/courses");
        },
        onError: (error) => {
            toast.error(error.message);
        }

    })
    return {
        editCourse,
        isEditing
    }
}

export default useEditCourse