import {useEffect, useRef} from "react";

const useOutsideClick = (handleClose, listenCapturing = true) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {

                handleClose();
            }

        }
        document.addEventListener("click", handleClick, listenCapturing);
        return () => {
            document.removeEventListener("click", handleClick, listenCapturing)
        }
    }, [handleClose, listenCapturing]);

    return ref;

}

export default useOutsideClick;