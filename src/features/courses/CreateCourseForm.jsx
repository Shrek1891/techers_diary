import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import {Textarea} from "../../ui/Textarea.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Button from "../../ui/Button.jsx";
import useCreateCourse from "./useCreateCourse.js";
import useEditCourse from "./useEditCourse.js";

export const CreateCourseForm = ({courseToEdit = {}, onClose}) => {
    const {id: editId, ...editVelues} = courseToEdit;
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
    const {createCourseMutate, isLoading} = useCreateCourse();
    const {editCourse, isEditing} = useEditCourse();
    const isWorking = isLoading || isEditing;

    const onSubmit = (data) => {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) {
            editCourse({newCourseData: {...data, image}, id: editId}, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                }
            });
        } else
            createCourseMutate({...data, image},
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
                label="Courses name"
            >
                <Input
                    type="text"
                    id="name"
                    placeholder="Courses name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required"
                    })}
                />
            </FormRow>
            <FormRow
                orientation="vertical"
                error={errors?.regularPrice?.message}
                label="Regular price"
            >
                <Input type="number"
                       disabled={isWorking}
                       id="regularPrice"
                       {...register("regularPrice", {
                           required: "This field is required",
                           min: 1,
                           message: "Must be more than 0"
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
                >{isEditSession ? "Edit course" : "Add course"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCourseForm