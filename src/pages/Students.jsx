import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import StudentsTable from "../features/students/StudentsTable.jsx";
import AddStudents from "../features/students/AddStudents.jsx";

export const Students = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All students</Heading>
            </Row>
            <Row>
                {<StudentsTable/>}
                {<AddStudents/>}
            </Row>
        </>
    )
}

export default Students