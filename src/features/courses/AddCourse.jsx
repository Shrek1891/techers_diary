import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import CreateCourseForm from "./CreateCourseForm.jsx";
import styled from "styled-components";

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AddCourse = () => {
    return (
        <Cell>
            <Modal>
                <Modal.Open opens="course-form">
                    <Button>Add new course</Button>
                </Modal.Open>
                <Modal.Window name="course-form">
                    <CreateCourseForm/>
                </Modal.Window>
            </Modal>
        </Cell>
    )
}

export default AddCourse