import Table from "../../ui/Table.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import Modal from "../../ui/Modal.jsx";
import Menus from "../../ui/Menus.jsx";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useDeleteCourses from "./useDeleteCourses.js";
import useCreateCourse from "./useCreateCourse.js";
import CreateCourseForm from "./CreateCourseForm.jsx";

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

export const CourseRow = ({course}) => {
    const navigate = useNavigate();
    const {isLoading: isDeleting, mutate: deleteCourse} = useDeleteCourses();
    const {createCourseMutate, isLoading: isLoadingCreate} = useCreateCourse();
    const handleDuplicate = () => {
        createCourseMutate({
            name: "Copy of course: " + course.name,
            regularPrice: course.regularPrice,
            image: course.image,
            description: course.description
        })
    }
    const {
        id: courseId,
        name,
        regularPrice,
        image,
        description,
    } = course;
    return (
        <Table.Row>
            <Img src={image}/>
            <Course>{name}</Course>
            <Description>{description}</Description>
            <Price>{formatCurrency(regularPrice)}</Price>
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={courseId}/>
                        <Menus.List id={courseId}>
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
                            <CreateCourseForm courseToEdit={course}/>
                        </Modal.Window>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="courses"
                                disabled={isDeleting}
                                onCloseModal={navigate}
                                onConfirm={() => {
                                    deleteCourse(courseId)
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

export default CourseRow