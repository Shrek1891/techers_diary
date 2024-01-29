import styled from "styled-components";
import useCourses from "../courses/useCourses.js";
import Spinner from "../../ui/Spinner.jsx";
import Empty from "../../ui/Empty.jsx";
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import useStudents from "./useStudents.js";
import StudentsRow from "./StudentsRow.jsx";

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


export const StudentsTable = () => {
    const {courses, isLoading, error} = useCourses();
    const {students, isLoading: isLoadingStudents, error: errorStudents} = useStudents();
    if (isLoading || isLoadingStudents) return <Spinner/>;
    if (!students.length) {
        return <Empty resourceName="students"></Empty>
    }
    return (
        <Menus>
            <Table columns="1fr 0.5fr 1fr 0.6fr 1fr 0.2fr">
                <Table.Header>
                    <div></div>
                    <Cell>Name</Cell>
                    <Cell>Contact</Cell>
                    <Cell>Description</Cell>
                    <Cell>Course</Cell>
                    <Cell></Cell>
                </Table.Header>
                <Table.Body
                    data={students}
                    render={(student) => (
                        <StudentsRow
                            key={student.id}
                            student={student}
                        />
                    )}

                />
            </Table>
        </Menus>

    );
}

export default StudentsTable