import styled from "styled-components";
import useUser from "./useUser.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
    const {user, isLoading} = useUser();
    if (isLoading) return <SpinnerMini/>;
    const {
        fullName, avatar
    } = user.user_metadata;

    return <StyledUserAvatar>
        <Avatar src={avatar || user.user_metadata.avatar_url || "default-user.jpg"} alt={'User avatar'}/>
        <span>{fullName || user.user_metadata.full_name}</span>
    </StyledUserAvatar>
}


export default UserAvatar;
