import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Spinner from "../../ui/Spinner.jsx";
import useCourses from "./useCourses.js";
import CourseRow from "./CourseRow.jsx";
import Empty from "../../ui/Empty.jsx";
import styled from "styled-components";

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CoursesTable = () => {
    const {courses, isLoading, error} = useCourses();
    if (isLoading) return <Spinner/>;
    if (!courses.length) {
        return <Empty resourceName="courses"></Empty>
    }

    return (
        <Menus>
            <Table columns="2fr 1.8fr 2.2fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <Cell>Course</Cell>
                    <Cell>Description</Cell>
                    <Cell>Price</Cell>
                    <Cell></Cell>
                </Table.Header>
                <Table.Body
                    data={courses}
                    render={(course) => (
                        <CourseRow
                            key={course.id}
                            course={course}
                        />
                    )}

                />
            </Table>
        </Menus>

    );
}

export default CoursesTable