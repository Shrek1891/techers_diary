import {useQuery} from "@tanstack/react-query";
import {getCoursesName} from "../../services/apiStudenst.js";

const useGetNameCourses = () => {
    let coursesName = [];
    const {data: namesCourses, error, isLoading} = useQuery({
        queryKey: ["getCoursesName"],
        queryFn: getCoursesName,
    });
    for (let name in namesCourses) {
        coursesName.push(namesCourses[name].name)
    }
    return {
        coursesName,
        isLoading,
        error
    }
}


export default useGetNameCourses