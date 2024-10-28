const create = (provinces) => {
    const form = document.getElementById('customer-form');
    const tableBody = document.querySelector('#customer-table tbody');
    const addCustomerSection = document.getElementById('add-customer');
    const addButton = document.getElementById('add-btn');

    const customers = [];

    // Toggle visibility of the add customer form
    addButton.addEventListener('click', () => {
        addCustomerSection.style.display = addCustomerSection.style.display === 'none' ? 'block' : 'none';
    });

    // Populate province dropdown in the form
    const provinceSelect = document.getElementById('province');
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });

    // Add new customer
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const addressDetails = document.getElementById('addressDetails').value;

        // Get province name from id
        const provinceName = provinces.find(province => province.id === provinceId).name;
        const newCustomer = { id: Date.now(), name, phone, province: provinceName, addressDetails };
        
        customers.push(newCustomer); // Add to customers list
        renderTable(customers); // Refresh table
        form.reset(); // Reset form fields
        addCustomerSection.style.display = 'none'; // Hide the form after adding
    });

    // Function to render the customer table
    function renderTable(filteredCustomers) {
        tableBody.innerHTML = '';
        filteredCustomers.forEach((customer) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.province}</td>
                <td>${customer.addressDetails}</td>
            `;
            tableBody.appendChild(row);
        });
    }
};

// Export the create function to be used in main.js
export default create;
