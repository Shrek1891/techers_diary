import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm.jsx";

function NewUsers() {
    return <>
        <Heading as="h1">Create a new teacher</Heading>
        <SignupForm/>
    </>;
}

export default NewUsers;
