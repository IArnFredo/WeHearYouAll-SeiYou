import { userContext, useUserInit } from "./User";

const UserContextProvider: React.FC = (props) => {
    const { auth } = useUserInit();
    return (
        <userContext.Provider value={auth!}>
            {props.children}
        </userContext.Provider>
    )
}


export default UserContextProvider;