export default async function SignupRoute(signUp) {

    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: signUp.firstName[0],
            lastName: signUp.lastName[0],
            leetcode: signUp.leetcode[0],
            codeforces: signUp.codeforces[0],
            photo: signUp.photo[0],
            username: signUp.username[0],
            password: signUp.password[0],
        }),
    });
    const json = await response.json();
    if (json.success) {
        const token = json.token;
        localStorage.setItem("AlgoFusionLoginToken", token);
    }
    return json;
}