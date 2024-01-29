import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import {useForm} from "react-hook-form";
import Spinner from "../../ui/Spinner.jsx";
import useGetStudentName from "./useGetStudentName.js";
import styled from "styled-components";
import useCreateLesson from "./useCreateLesson.js";
import toast from "react-hot-toast";
import useEditLesson from "./useEditLesson.js";

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) =>
            props.type === "white"
                    ? "var(--color-grey-100)"
                    : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const StyledOption = styled.option`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) =>
            props.type === "white"
                    ? "var(--color-grey-100)"
                    : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);

`


export const CreateLessonForm = ({lessonToEdit = {}, onClose}) => {
    const {id: editId, ...editVelues} = lessonToEdit;
    const {editLesson, isEditing} = useEditLesson();
    const isEditSession = Boolean(editId);
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
    } = useForm({

        defaultValues: isEditSession ? editVelues : {},
    });
    const {errors} = formState;
    const {students, isLoading: isLoadingName} = useGetStudentName();
    const {createLessonMutate, isLoading} = useCreateLesson();
    const isWorking = isLoading || isEditing || isLoadingName;
    if (isLoading) {
        return <Spinner/>
    }
    console.log(lessonToEdit)
    const onError = (error) => {
        error.message ? toast.error(error.message) :
            toast.error("Input all fields");

    }

    const onSubmit = (data) => {
        if (students.length === 0) {
            return;
        }

        if (isEditSession) {
            editLesson({newLessonData: {...data}, id: editId}, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                }
            })
        } else {

            if (data.student === "") {
                data.student = JSON.stringify(students[0]);
            }


            createLessonMutate(data,
                {
                    onSuccess: () => {
                        reset();
                        onClose?.();
                    }
                });


        }


    }
    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onClose ? "modal" : "form"}
        >
            <FormRow
                orientation="vertical"
                error={errors?.student?.message}
                label="student"
            >
                {!isEditSession ?
                    <StyledSelect
                        {...register("student")}
                        defaultValue={students[0]}
                    >
                        {students.map((student) =>
                            <StyledOption
                                key={student.id}
                                value={JSON.stringify(student)}
                            >
                                {student.name}
                            </StyledOption>)
                        }

                    </StyledSelect> : <div>{lessonToEdit?.student.name}</div>}
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.name?.message}
                label="Lesson date"
            >
                <Input
                    type="date"
                    id="date"
                    placeholder="Date"
                    disabled={isWorking}
                    {...register("date", {
                        required: "This field is required"
                    })}
                />
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.regularPrice?.message}
                label="lesson time"
            >
                <Input type="time"
                       disabled={isWorking}
                       id="time"
                       {...register("time", {
                           required: "This field is required",
                       })}/>
            </FormRow>


            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onClose?.()}

                >
                    Cancel
                </Button>
                <Button disabled={isLoading}
                >{isEditSession ? "Edit course" : "Add course"}</Button>
            </FormRow>
        </Form>
    )
}

export default CreateLessonForm