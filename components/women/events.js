// Function to show the booking form modal
function bookEvent(eventName) {
    console.log(`Booking event: ${eventName}`); // Debugging log to ensure the function is called

    // Create modal structure for form
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Book Event: ${eventName}</h2>
            <form id="bookingForm">
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Enter your name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" required>

                <label for="phone">Phone Number:</label>
                <input type="text" id="phone" placeholder="Enter your phone number" maxlength="10" required>

                <button type="submit">Submit Booking</button>
                <button type="button" class="close-btn">Close</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close the modal
    modal.querySelector('.close-btn').addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userPhone = document.getElementById('phone').value;

        // Validate phone number
        if (!/^\d{10}$/.test(userPhone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Create booking details
        const bookingDetails = {
            event: eventName,
            name: userName,
            email: userEmail,
            phone: userPhone,
            date: new Date().toLocaleString()
        };

        // Save booking details to local storage
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(bookingDetails);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        alert(`Thank you, ${userName}! Your booking for "${eventName}" was successful.`);

        // Close the modal after booking
        document.body.removeChild(modal);
    });
}
