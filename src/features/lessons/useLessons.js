import {useQuery} from "@tanstack/react-query";
import {getLessons} from "../../services/apiLessons.js";
import {useSearchParams} from "react-router-dom";

const useLessons = () => {
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("filter");
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const {data: lessons, error, isLoading} = useQuery({
        queryKey: ["lessons", filterValue, sortByRaw],
        queryFn: () => getLessons({filter: filterValue, sortBy: sortByRaw}),
    });
    return {
        lessons,
        isLoading,
        error,

    }
}

export default useLessons