export async function fetchJobs() {
    try {
        const response = await fetch('http://localhost:3010/jobs');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
