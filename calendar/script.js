const monthYearDisplay = document.getElementById('month-year');
const calendarGrid = document.getElementById('calendar-grid');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

function renderCalendar(date) {
    // Clear previous calendar days
    calendarGrid.innerHTML = '';

    // Get first day of the month and number of days in the current month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Get the current day
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth();

    // Display current month and year
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYearDisplay.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    // Render blank spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendarGrid.appendChild(emptyDay);
    }

    // Render each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Event Listeners for Next and Previous Buttons
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Render initial calendar on page load
renderCalendar(currentDate);

