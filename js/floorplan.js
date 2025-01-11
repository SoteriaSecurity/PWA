const jsonPath = "assets/data.json";

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("floorplan-container");
        const floorplan = document.getElementById("floorplan");

        floorplan.onload = function() {
            positionDots();
        };

        function positionDots() {
            let containerBox = container.getBoundingClientRect();
            let floorplanBox = floorplan.getBoundingClientRect();
            let width = floorplanBox.width;
            let height = floorplanBox.height;

            const existingDots = document.querySelectorAll(".overlay");
            existingDots.forEach(dot => dot.remove());

            data.cameras.forEach(camera => {
                const x = parseFloat(camera.x) * width + floorplanBox.x - containerBox.x;
                const y = parseFloat(camera.y) * height + floorplanBox.y - containerBox.y;

                const dot = document.createElement("img");
                dot.src = "https://www.soteria-security.us/PWA/assets/reddot.svg";
                dot.alt = "🔴";
                dot.classList.add("overlay");
                dot.style.left = `${x}px`;
                dot.style.top = `${y}px`;
                container.appendChild(dot);
            });
        }

        if (floorplan.complete) {
            positionDots();
        }

        window.addEventListener("resize", positionDots);
    })
    .catch(error => console.error("Error loading JSON:", error));
