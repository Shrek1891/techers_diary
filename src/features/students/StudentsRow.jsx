import styled from "styled-components";
import Modal from "../../ui/Modal.jsx";
import Menus from "../../ui/Menus.jsx";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import {useNavigate} from "react-router-dom";
import useDeleteStudent from "./useDeleteStudent.js";
import Spinner from "../../ui/Spinner.jsx";
import CreateStudentsForm from "./CreateStudentsForm.jsx";
import useCreateStudent from "./useCreateStudent.js";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
    margin: 0 auto;
    border-radius: 50%;
`;

const Course = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    margin: 0 auto;
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Description = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-grey-600);
    margin: 0 auto;
`;

export const StudentsRow = ({student}) => {
    const navigate = useNavigate();
    const {image, name, description, contact, course, id: studentId} = student;
    const {isLoading: isDeleting, mutate: deleteCourse} = useDeleteStudent();
    const {createStudentMutate, isLoading: isLoadingCreate} = useCreateStudent();

    const handleDuplicate = () => {
        createStudentMutate({
            name: "Copy of course: " + name,
            contact,
            image,
            description,
            course,

        })

    }
    if (isDeleting) {
        return <Spinner/>
    }

    return (
        <Table.Row>
            <Img src={image}/>
            <Description>{name}</Description>
            <Description>{contact}</Description>
            <Description>{description}</Description>
            <Course>{course}</Course>
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={studentId}/>
                        <Menus.List id={studentId}>
                            <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate}>
                                Duplicate
                            </Menus.Button>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                        <Modal.Window name="edit">
                            <CreateStudentsForm studentToEdit={student}/>
                        </Modal.Window>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="student"
                                disabled={isDeleting}
                                onCloseModal={navigate}
                                onConfirm={() => {
                                    deleteCourse(studentId);
                                }
                                }
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    )
}

export default StudentsRow