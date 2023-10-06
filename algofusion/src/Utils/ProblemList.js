export default async function ProblemList (str,setProblems,setShow){
    const response = await fetch(
        "http://localhost:5000/algofusion/codeforces/getproblemset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: str,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setProblems({ problems: json.problems, submissions: json.submissions });
        const arr = json.problems.slice(0, 50);
        const brr = json.submissions.slice(0, 50);
        setShow({ problems: arr, submissions: brr });
      }
      return json
}