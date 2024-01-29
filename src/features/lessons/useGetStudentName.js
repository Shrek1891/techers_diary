import {useQuery} from "@tanstack/react-query";
import {getNameStudents} from "../../services/apiLessons.js";

const useGetStudentName = () => {
    const students = [];
    const {data, error, isLoading} = useQuery({
        queryKey: ["studentsName"],
        queryFn: getNameStudents,
    });
    for (let student in data) {
        students.push({name: data[student].name, id: data[student].id})
    }
    return {students, isLoading, error}
}

export default useGetStudentName