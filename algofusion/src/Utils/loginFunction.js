import loginRoute from "./loginRoute";

export default async function loginFunction(evt,login,loginUser,navigate) {
    evt.preventDefault();
    if (loginUser.username === "") {
        alert("Please Enter Username to Continue");
    } else {
        loginRoute(loginUser,login,navigate)
    }
}