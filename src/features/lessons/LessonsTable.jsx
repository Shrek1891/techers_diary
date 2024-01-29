import styled from "styled-components";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Empty from "../../ui/Empty.jsx";
import useLessons from "./useLessons.js";
import LessonsRow from "./LessonsRow.jsx";

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const LessonsTable = () => {

    const {lessons, isLoading, error} = useLessons();
    if (isLoading) return <Spinner/>;
    if (!lessons.length) {
        return <Empty resourceName="courses"></Empty>
    }
    return (
        <Menus>
            <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 1fr ">
                <Table.Header>
                    <Cell>Lesson</Cell>
                    <Cell>Student</Cell>
                    <Cell>Date</Cell>
                    <Cell>Time</Cell>
                    <Cell>Status</Cell>
                    <Cell></Cell>
                </Table.Header>
                <Table.Body
                    data={lessons}
                    render={(lesson) => (
                        <LessonsRow
                            key={lesson.id}
                            lesson={lesson}
                        />
                    )}

                />
            </Table>
        </Menus>
    )
}

export default LessonsTable