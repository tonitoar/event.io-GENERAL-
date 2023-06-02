import { useContext } from "react";
import { userContext } from "../contexts/user.context";

export default function AccountPage () {
    const {user} = useContext(userContext)
    console.log(user)

    if (!user) {
        return <div>Loading...</div>; //! muestra otro contenido apropiado mientras se carga el usuario
      }

    return (
        <div>account page for {user.username} </div>
    );
}