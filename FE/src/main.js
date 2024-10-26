document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#customer-table tbody');
    const searchInput = document.getElementById('search-name');
    const searchProvince = document.getElementById('search-province');

    // Array of provinces
    const provinces = [
        { id: 'HCM', name: 'TP Hồ Chí Minh' },
        { id: 'HN', name: 'Hà Nội' },
        { id: 'DN', name: 'Đà Nẵng' },
        { id: 'BD', name: 'Bình Dương' },
        { id: 'VT', name: 'Vũng Tàu' },
        // Add more provinces as needed
    ];

    // Sample customer data
    const customers = [
        { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', province: 'TP Hồ Chí Minh', addressDetails: '123 Đường ABC' },
        { id: 2, name: 'Trần Thị B', phone: '0912345678', province: 'Hà Nội', addressDetails: '456 Đường DEF' },
        { id: 3, name: 'Lê Văn C', phone: '0923456789', province: 'Đà Nẵng', addressDetails: '789 Đường GHI' },
        // Add more sample customers if needed
    ];

    // Populate the province dropdown for searching
    provinces.forEach(province => {
        const searchOption = document.createElement('option');
        searchOption.value = province.id;
        searchOption.textContent = province.name;
        searchProvince.appendChild(searchOption);
    });

    // Function to render customer table
    function renderTable(filteredCustomers = customers) {
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

    // Filter customers based on search criteria
    function filterCustomers() {
        const searchName = searchInput.value.toLowerCase();
        const selectedProvince = searchProvince.value;

        const filteredCustomers = customers.filter(customer => {
            const matchesName = customer.name.toLowerCase().includes(searchName);
            const matchesProvince = selectedProvince ? customer.province === provinces.find(p => p.id === selectedProvince).name : true;
            return matchesName && matchesProvince;
        });

        renderTable(filteredCustomers);
    }

    // Attach event listeners for searching
    searchInput.addEventListener('input', filterCustomers);
    searchProvince.addEventListener('change', filterCustomers);

    // Render the full customer list initially
    renderTable();
});
