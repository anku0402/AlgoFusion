export default async function LoginToken(login,navigate,next='/'){
    const token = localStorage.getItem("AlgoFusionLoginToken")
    const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token
        }),
    });
    const json = await response.json();
    if (json.success) {
        login({
            username: json.user.username,
            firstName: json.user.firstName,
            lastName: json.user.lastName,
            leetcodeHandle: json.user.leetcode,
            codeforcesHandle: json.user.codeforces
        });
        navigate(next);
    } else {
        localStorage.removeItem("AlgoFusionLoginToken");
        navigate('/signin')
    }
}