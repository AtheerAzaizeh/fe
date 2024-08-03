document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const userType = document.querySelector('input[name="userType"]:checked').value;

    const data = { email, password, userType };

    try {
      const response = await fetch('http://localhost:3010/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("Response received:", result);

      if (response.ok) {
        alert(result.message);
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('user_id', result.user_id);

        console.log("User type:", result.userType);

        if (result.userType === 'jobSeeker') {
          console.log("Redirecting to jobseekerhmpg.html");
          window.location.href = "jobseekerhmpg.html";
        } else if (result.userType === 'employeeSeeker') {
          console.log("Redirecting to employeeseekerhmpg.html");
          window.location.href = "employeeseekerhmpg.html";
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
});
