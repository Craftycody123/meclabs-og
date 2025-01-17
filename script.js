document.addEventListener("DOMContentLoaded", () => {
    const registerEvent = (eventName) => {
        alert(`You have successfully registered for ${eventName}!`);
    };

    const events = [
        { title: "Excel", date: "2025-01-24" },
        { title: "Excel", date: "2025-01-25" },
        { title: "Excel", date: "2025-01-26" },
        { title: "Tech Conference", date: "2025-01-15" },
        { title: "Treasure Hunt", date: "2025-01-10" },
    ];

    let currentYear = 2025;
    let currentMonth = 0; // January

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendar = (year, month) => {
        const calendarContainer = document.getElementById("calendar-container");
        calendarContainer.innerHTML = ""; // Clear previous calendar

        // Create header with navigation
        const header = document.createElement("div");
        header.classList.add("calendar-header");

        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.addEventListener("click", () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.addEventListener("click", () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentYear, currentMonth);
        });

        const monthYear = document.createElement("span");
        monthYear.textContent = `${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`;

        header.appendChild(prevButton);
        header.appendChild(monthYear);
        header.appendChild(nextButton);
        calendarContainer.appendChild(header);

        // Create calendar table
        const table = document.createElement("table");
        table.classList.add("calendar-table");

        // Add table header for days of the week
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add table body for days of the month
        const tbody = document.createElement("tbody");
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = new Date(year, month, 1).getDay();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.classList.add("empty");
                } else if (date > daysInMonth) {
                    cell.classList.add("empty");
                } else {
                    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                    cell.textContent = date;

                    // Highlight event days and display events
                    const event = events.find(event => event.date === fullDate);
                    if (event) {
                        cell.classList.add("event-day");

                        const eventText = document.createElement("div");
                        eventText.textContent = event.title;
                        eventText.classList.add("event-text");
                        cell.appendChild(eventText);

                        // Show full event details on click
                        cell.addEventListener("click", () => {
                            alert(`Event: ${event.title}\nDate: ${fullDate}`);
                        });
                    }

                    date++;
                }

                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        calendarContainer.appendChild(table);
    };

    renderCalendar(currentYear, currentMonth);
});
