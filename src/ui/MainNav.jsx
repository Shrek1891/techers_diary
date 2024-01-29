import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {PiChalkboardTeacherFill, PiStudentFill} from "react-icons/pi";
import {MdGolfCourse, MdPlayLesson} from "react-icons/md";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5.8rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.8rem;
        box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
        border-radius: 10px;
    }

    /* This works because react-router places the active class on the active NavLink */

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        cursor: pointer;
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav() {
    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink to="/lessons">
                        <MdPlayLesson/>
                        <span>Lessons</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/courses">
                        <MdGolfCourse/>
                        <span>Courses</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/students">
                        <PiStudentFill/>
                        <span>Students</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/users">
                        <PiChalkboardTeacherFill/>
                        <span>Teachers</span>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
