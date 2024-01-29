import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {createStudent} from "../../services/apiStudenst.js";

const useEditStudent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: editStudent, isLoading: isEditing} = useMutation({
        mutationFn: ({newStudentData, id}) => createStudent(newStudentData, id),
        onSuccess: () => {
            toast.success("Student Info updated!");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
            navigate("/students");
        },
        onError: (error) => {
            toast.error(error.message);
        }

    })
    return {
        editStudent,
        isEditing
    }
}

export default useEditStudent