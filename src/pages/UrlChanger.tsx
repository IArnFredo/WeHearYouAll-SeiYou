import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router";
import { userContext } from "../provider/User"

const UrlChanger:React.FC = () => {
    const user = useContext(userContext);
    if (user) {
        return <Redirect to="/welcome" />;
    }
    return(
        <div>

        </div>
    )
}

export default React.memo(UrlChanger);