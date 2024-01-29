import {getCourseById} from "../../services/apiLessons.js";
import {useQuery} from "@tanstack/react-query";

const useGetCourseById = (id) => {
    const {data: courseById, isLoading, error} = useQuery({
        queryKey: ["courseNameById"],
        queryFn: () => getCourseById(id),
    })

    return {courseById, isLoading, error}
}

export default useGetCourseById