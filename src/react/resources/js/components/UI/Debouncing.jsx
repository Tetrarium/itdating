import { debounce } from "../../assets/utility";

/**
 * 
 * @param {timeout} param0 
 */
function DebouncingChange ( { timeout = 500, onChange, ...props} ) {
    const handleDebouncingChange = debounce();

    return null;
}

export default DebouncingChange;