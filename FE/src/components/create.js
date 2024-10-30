const create = (provinces, districts, communes) => {
    
    const form = document.getElementById('customer-form');
    const tableBody = document.querySelector('#customer-table tbody');
    const addCustomerSection = document.getElementById('add-customer');
    const addButton = document.getElementById('add-btn');

    const customers = [];

    // Hiển thị hoặc ẩn form thêm khách hàng khi nhấn nút
    addButton.addEventListener('click', () => {
        addCustomerSection.style.display = addCustomerSection.style.display === 'none' ? 'block' : 'none';
    });

    // Điền dữ liệu vào dropdown tỉnh
    const provinceSelect = document.getElementById('province');
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });

    // Khi chọn tỉnh, điền lại danh sách huyện tương ứng
    const districtSelect = document.getElementById('district');
    const communeSelect = document.getElementById('commune');

    provinceSelect.addEventListener('change', () => {
        const selectedProvinceId = provinceSelect.value;
        console.log("Selected Province ID:", selectedProvinceId);
        
        // Xóa các lựa chọn cũ trong dropdown huyện và xã
        districtSelect.innerHTML = '<option value="">Chọn Huyện</option>';
        communeSelect.innerHTML = '<option value="">Chọn Xã</option>';

        // Thêm các lựa chọn huyện mới dựa trên tỉnh đã chọn
        districts.forEach(district => {
            if (district.provinceId === selectedProvinceId) {
                const option = document.createElement('option');
                option.value = district.id;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            }
        });
    });

    // Khi chọn huyện, điền lại danh sách xã tương ứng
    districtSelect.addEventListener('change', () => {
        const selectedDistrictId = districtSelect.value;
        console.log("Selected District ID:", selectedDistrictId);
        
        // Xóa các lựa chọn cũ trong dropdown xã
        communeSelect.innerHTML = '<option value="">Chọn Xã</option>';

        // Thêm các lựa chọn xã mới dựa trên huyện đã chọn
        communes.forEach(commune => {
            if (commune.districtId === selectedDistrictId) {
                const option = document.createElement('option');
                option.value = commune.id;
                option.textContent = commune.name;
                communeSelect.appendChild(option);
            }
        });
    });

    // Thêm khách hàng mới
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const districtId = document.getElementById('district').value;
        const communeId = document.getElementById('commune').value;
        const addressDetails = document.getElementById('addressDetails').value;

        // Lấy tên tỉnh, huyện, xã từ id
        const provinceName = provinces.find(province => province.id === provinceId).name || '';
        const districtName = districts.find(district => district.id === districtId)?.name || '';
        const communeName = communes.find(commune => commune.id === communeId)?.name || '';
        
        const newCustomer = {
            id: Date.now(),
            name,
            phone,
            province: provinceName,
            district: districtName,
            commune: communeName,
            addressDetails
        };
        
        customers.push(newCustomer); // Thêm khách hàng mới
        renderTable(customers); // Cập nhật bảng
        form.reset(); // Xóa dữ liệu form
        addCustomerSection.style.display = 'none'; // Ẩn form sau khi thêm
    });

    // Hàm để hiển thị bảng khách hàng
    function renderTable(filteredCustomers) {
        tableBody.innerHTML = '';
        filteredCustomers.forEach((customer) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.province}</td>
                <td>${customer.district}</td>
                <td>${customer.commune}</td>
                <td>${customer.addressDetails}</td>
            `;
            tableBody.appendChild(row);
        });
    }
};

// Export hàm create để sử dụng trong main.js
export default create;
