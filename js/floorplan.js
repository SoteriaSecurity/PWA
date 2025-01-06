const jsonPath = "https://www.soteria-security.us/PWA/assets/data.json";

document.addEventListener('DOMContentLoaded', () => {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("floorplan-container");
            const floorplan = document.getElementById("floorplan");

            function positionDots() {
                const containerBox = container.getBoundingClientRect();
                const floorplanBox = floorplan.getBoundingClientRect();
                const width = floorplanBox.width;
                const height = floorplanBox.height;

                const existingDots = document.querySelectorAll(".overlay");
                existingDots.forEach(dot => dot.remove());

                data.cameras.forEach(camera => {
                    const x = parseFloat(camera.x) * width + floorplanBox.x - containerBox.x;
                    const y = parseFloat(camera.y) * height + floorplanBox.y - containerBox.y;

                    const dot = document.createElement("img");
                    dot.src = "https://www.soteria-security.us/PWA/assets/reddot.svg";
                    dot.classList.add("overlay");
                    dot.style.left = `${x}px`;
                    dot.style.top = `${y}px`;
                    container.appendChild(dot);
                });
            }

            positionDots();
            window.addEventListener("resize", positionDots);
        })
        .catch(error => console.error("Error loading JSON:", error));
});