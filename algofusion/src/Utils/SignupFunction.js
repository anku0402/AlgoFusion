import SignupRoute from "./SignupRoute";

export default async function signUpFunction(evt,signUp,showComment,setShowComment){
    evt.preventDefault();
    if (signUp.password[0].length < 5) {
        setShowComment({ ...showComment, password: true });
    } else if (signUp.password[0] !== signUp.confirmPassword[0]) {
        setShowComment({ password: false, confirmPassword: true });
    } else if (
        signUp.codeforces === "" ||
        signUp.leetcode === "" ||
        signUp.firstName === "" ||
        signUp.lastName === "" ||
        signUp.username === ""
    ) {
        setShowComment({ password: false, confirmPassword: false });
        alert("Please All The Required Fields");
    } else {
        const json = await SignupRoute(signUp)
        if (json.success) {
            alert("Signed Up")
        } else {
            alert(json.message);
        }
    }
};