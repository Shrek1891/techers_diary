import styled from "styled-components";
import Table from "../../ui/Table.jsx";
import {useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal.jsx";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import Menus from "../../ui/Menus.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {FaFlagCheckered} from "react-icons/fa";
import useDeleteLesson from "./useDeleteLesson.js";
import useCreateLesson from "./useCreateLesson.js";
import CreateLessonForm from "./CreateLessonForm.jsx";
import useUpdateLesson from "./useUpdateLesson.js";

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
    border-radius: 30px;
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
const IsNotStarted = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-red-700);
    margin: 0 auto;
`;

const IsFinished = styled.div`
    font-weight: 500;
    color: var(--color-green-700);
    margin: 0 auto;

`


export const LessonsRow = ({lesson}) => {
    const {isLoading: isDeleting, mutate: deleteLesson} = useDeleteLesson();
    const {createLessonMutate, isLoading: isLoadingCreate} = useCreateLesson();
    const {updateLesson, isUpdating} = useUpdateLesson();
    const navigate = useNavigate();
    const {
        id,
        course,
        student,
        date,
        time,
        status
    } = lesson;

    const handleDuplicate = () => {
        createLessonMutate({
            course,
            student: {...student},
            date,
            time,
            status: false
        })
    }
    const handleIsDone = (id) => {
        console.log(id)
        updateLesson(id)
    }
    return (
        <Table.Row>
            <Course>{course}</Course>
            <Description>{student.name}</Description>
            <Description>{date}</Description>
            <Description>{time}</Description>
            {status ? <IsFinished>Finished</IsFinished> : <IsNotStarted>Not started</IsNotStarted>}

            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id}/>
                        <Menus.List id={id}>
                            <Menus.Button icon={<FaFlagCheckered/>} onClick={() => handleIsDone(lesson.id)}>
                                Lesson has done
                            </Menus.Button>
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
                            <CreateLessonForm lessonToEdit={lesson}/>
                        </Modal.Window>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="lessons"
                                disabled={isDeleting}
                                onCloseModal={navigate}
                                onConfirm={() => {
                                    deleteLesson(id)
                                }
                                }
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>

    );


}

export default LessonsRow