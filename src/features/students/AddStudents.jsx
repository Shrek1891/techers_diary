import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import CreateCourseForm from "../courses/CreateCourseForm.jsx";
import styled from "styled-components";
import CreateStudentsForm from "./CreateStudentsForm.jsx";

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AddStudents = () => {
    return (
        <Cell>
            <Modal>
                <Modal.Open opens="student-form">
                    <Button>Add new student</Button>
                </Modal.Open>
                <Modal.Window name="student-form">
                    <CreateStudentsForm/>
                </Modal.Window>
            </Modal>
        </Cell>
    )
}

export default AddStudents