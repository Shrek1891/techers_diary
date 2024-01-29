import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

export const LessonTableOperation = () => {
    return (
        <TableOperations>
            <Filter
                filterField="filter"
                options={[
                    {value: "all", label: "All"},
                    {value: "checked-out", label: "finished"},
                    {value: "checked-in", label: "dont finished"},
                    {value: "today", label: "today"},
                ]}
            />

            <SortBy
                options={[
                    {value: "startDate-desc", label: "Sort by date (recent first)"},
                    {value: "startDate-asc", label: "Sort by date (earlier first)"},
                ]}
            />
        </TableOperations>
    );
}