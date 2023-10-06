export default async function loginRoute(loginUser,login,navigate) {
    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: loginUser.username[0],
            password: loginUser.password[0],
        }),
    });
    const json = await response.json();
    if (json.success) {
        const token = json.token;
        localStorage.setItem("AlgoFusionLoginToken", token);
        login({
            username: json.user.username,
            firstName: json.user.firstName,
            lastName: json.user.lastName,
            leetcodeHandle: json.user.leetcode,
            codeforcesHandle: json.user.codeforces
        });
        navigate("/");
    } else {
        alert(json.message);
    }
}