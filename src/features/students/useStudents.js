import {useQuery} from "@tanstack/react-query";
import {getStudents} from "../../services/apiStudenst.js";

const useStudents = () => {
    const {data: students, error, isLoading} = useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    });
    return {
        students,
        isLoading,
        error
    }
}

export default useStudents