import Select from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

export const SortBy = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";
    const HandleChange = (value) => {
        searchParams.set("sortBy", value.target.value);
        setSearchParams(searchParams);
    }
    return (
        <Select
            options={options}
            type="white"
            onChange={HandleChange}
            value={sortBy}
        />
    )
}

export default SortBy