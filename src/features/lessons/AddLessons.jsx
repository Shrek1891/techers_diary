import styled from "styled-components";
import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import CreateLessonForm from "./CreateLessonForm.jsx";

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AddLessons = () => {
    return (
        <Cell>
            <Modal>
                <Modal.Open opens="lesson-form">
                    <Button>Add new lesson</Button>
                </Modal.Open>
                <Modal.Window name="lesson-form">
                    <CreateLessonForm/>
                </Modal.Window>
            </Modal>
        </Cell>
    )
}

export default AddLessons