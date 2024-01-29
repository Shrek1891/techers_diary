import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import LessonsTable from "../features/lessons/LessonsTable.jsx";
import AddLessons from "../features/lessons/AddLessons.jsx";
import {LessonTableOperation} from "../features/lessons/LessonTableOperation.jsx";

export const Lessons = () => {
    return (
        <>
            <>
                <Row type="horizontal">
                    <Heading as="h1">All lessons</Heading>
                    <LessonTableOperation/>
                </Row>
                <Row>
                    {<LessonsTable/>}
                    {<AddLessons/>}
                </Row>
            </>
        </>
    )
}

export default Lessons