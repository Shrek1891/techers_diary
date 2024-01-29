import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import CoursesTable from "../features/courses/CoursesTable.jsx";
import AddCourse from "../features/courses/AddCourse.jsx";

export const Courses = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All courses</Heading>
            </Row>
            <Row>
                {<CoursesTable/>}
                {<AddCourse/>}
            </Row>
        </>
    )
}

export default Courses