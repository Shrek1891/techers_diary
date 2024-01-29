import {useQuery} from "@tanstack/react-query";
import {getCourses} from "../../services/apiCourses.js";

const useCourses = () => {
    const {data: courses, error, isLoading} = useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
    });
    return {
        courses,
        isLoading,
        error
    }
}

export default useCourses