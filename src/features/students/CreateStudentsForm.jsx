import {useForm} from "react-hook-form";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import {Textarea} from "../../ui/Textarea.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Button from "../../ui/Button.jsx";
import useGetNameCourses from "./useGetNameCourses.js";
import Spinner from "../../ui/Spinner.jsx";
import toast from "react-hot-toast";
import styled from "styled-components";
import useCreateStudent from "./useCreateStudent.js";
import useEditStudent from "./useEditStudent.js";


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

export const CreateStudentsForm = ({studentToEdit = {}, onClose}) => {
    const {coursesName, isLoading: isLoadingName} = useGetNameCourses();
    const {id: editId, ...editVelues} = studentToEdit;
    const isEditSession = Boolean(editId);
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
        Controller,
    } = useForm({
        defaultValues: isEditSession ? editVelues : {},
    });
    const {errors} = formState;
    const {createStudentMutate, isLoading} = useCreateStudent();
    const {editStudent, isEditing} = useEditStudent();
    if (isLoadingName || isLoading) {
        return <Spinner>Loading...</Spinner>;
    }


    const isWorking = false;


    const onSubmit = (data) => {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) {
            editStudent({newStudentData: {...data, image}, id: editId}, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                }
            });
        } else
            createStudentMutate({...data, image},
                {
                    onSuccess: () => {
                        reset();
                        onClose?.();
                    }
                });

    }


    const onError = (error) => {
        error.message ? toast.error(error.message) :
            toast.error("Input all fields");
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onClose ? "modal" : "form"}
        >
            <FormRow
                orientation="vertical"
                error={errors?.name?.message}
                label="Students name"
            >
                <Input
                    type="text"
                    id="name"
                    placeholder="Students name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required"
                    })}
                />
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.contact?.message}
                label="contact"
            >
                <Input type="text"
                       disabled={isWorking}
                       id="contact"
                       {...register("contact", {
                           required: "This field is required",
                       })}/>
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.description?.message}
                label="description"
            >

                <Textarea type="number" id="description" defaultValue="" {...register("description", {
                    required: "This field is required"
                })}/>
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.course?.message}
                label="course"
            >
                <StyledSelect
                    {...register("course")}
                >
                    {coursesName.map((course) =>
                        <StyledOption
                            key={course}
                            value={course}
                        >
                            {course}
                        </StyledOption>)
                    }

                </StyledSelect>
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.image?.message}
                label="Course`s photo"
            >
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    type="file"
                    {...register("image", {
                        required: isEditSession ? false : "This field is required"
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
                >{isEditSession ? "Edit student" : "Add student"}</Button>
            </FormRow>
        </Form>
    );

}

export default CreateStudentsForm