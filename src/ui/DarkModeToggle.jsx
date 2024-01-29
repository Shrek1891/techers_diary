import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";
import {useDarkMode} from "../context/DarkModeContext.jsx";

export const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}

export default DarkModeToggle