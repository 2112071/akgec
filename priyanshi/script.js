document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const userConfirmation = document.getElementById('userConfirmation');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const employeeGrid = document.getElementById('employeeGrid');
  
    // Register User and POST API Request
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      // Send POST request to register the user
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          name,
          email
        });
  
        // Display confirmation message
        userName.textContent = response.data.name;
        userEmail.textContent = response.data.email;
        userConfirmation.style.display = 'block'; // Show user registration confirmation
  
        // Reset the form
        registerForm.reset();
      } catch (error) {
        console.error('Error registering user:', error);
      }
    });
  
    // Get Employee List and GET API Request
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const employees = response.data;
  
        // Display employees in grid
        employeeGrid.innerHTML = '';
        employees.forEach(employee => {
          const employeeCard = document.createElement('div');
          employeeCard.className = 'employee-card';
          employeeCard.innerHTML = `
            <h3>${employee.name}</h3>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Company:</strong> ${employee.company.name}</p>
          `;
          employeeGrid.appendChild(employeeCard);
        });
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };
  
    // Fetch employee list when the page loads
    fetchEmployees();
  });