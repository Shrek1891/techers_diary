import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import useSignup from "./useSignup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();
    const {signup, isLoading} = useSignup();
    const onSubmit = ({fullName, email, password}) => {
        signup({
            fullName,
            email,
            password
        }, {
            onSettled: () => reset(),
        })
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    disabled={isLoading}
                    type="text"
                    id="fullName"
                    {...register("fullName", {required: "Full name is required"})} />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    disabled={isLoading}
                    type="email"
                    id="email"
                    {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address"
                            }
                        })}/>
            </FormRow>

            <FormRow label="Password (min 6 characters)" error={errors?.password?.message}>
                <Input
                    disabled={isLoading}
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: 6,

                    })}/>
            </FormRow>

            <FormRow label="Repeat password"
                     error={errors?.passwordConfirm?.message}
            >
                <Input type="password" id="passwordConfirm"
                       disabled={isLoading}
                       {...register("passwordConfirm",
                           {
                               required: "Password is required",
                               minLength: 6,
                               validate: (val) => getValues().password === val || "Passwords don't match"
                           })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" onClick={reset}>
                    Cancel
                </Button>
                <Button>Create new teacher</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
