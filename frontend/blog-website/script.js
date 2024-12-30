document.getElementById("registrationForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    const email = event.target.email.value;

    try {
        const response = await fetch("https://your-backend-url/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        document.getElementById("responseMessage").textContent = result.message;
    } catch (error) {
        document.getElementById("responseMessage").textContent = "An error occurred. Please try again later.";
    }

    event.target.reset();
});
