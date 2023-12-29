import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { WidgetTypes } from "../Athentication/Athentication";

function PasswordReset({ callback }) {
    const [ params, setParams ] = useState({
        email: '',
        token: '',
    })

    const navigate = useNavigate();

    const [ urlSearchParams ] = useSearchParams();

    const { token } = useParams();
    const { email } = Object.fromEntries(urlSearchParams);

    useEffect(() => {
        // callback({
        //     token,
        //     email,
        // });
        navigate('/login', {
            state: {
                widgetType: WidgetTypes.PASSWORD_CHANGE,
                token,
                email,
            }
        } )
    }, []);

    return null;
}

export default PasswordReset;