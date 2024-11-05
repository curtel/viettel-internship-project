const create = (provinces, districts, communes, providers) => {
    const form = document.getElementById('customer-form');
    const tableBody = document.querySelector('#customer-table tbody');
    const addButton = document.getElementById('add-btn');
    const modal = document.getElementById('customer-modal');
    const closeModalButton = document.getElementById('close-modalC');
    const submitButton = document.getElementById('submit-button'); // Nút submit

    // Hiển thị modal khi nhấn nút "Thêm Khách Hàng"
    addButton.addEventListener('click', () => {
        modal.style.display = 'block';
        submitButton.textContent = 'Thêm Khách Hàng'; // Đặt lại văn bản nút khi mở modal
    });

    // Ẩn modal khi nhấn vào nút đóng
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Đóng modal nếu nhấn vào bên ngoài nội dung modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Thêm dữ liệu khách hàng khi gửi form và ẩn modal
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Thu thập dữ liệu form và thêm khách hàng mới
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const districtId = document.getElementById('district').value;
        const communeId = document.getElementById('commune').value;
        const providerId = document.getElementById('provider').value;
        const addressDetails = document.getElementById('addressDetails').value;

        const provinceName = provinces.find(province => province.id === provinceId)?.name || '';
        const districtName = districts.find(district => district.id === districtId)?.name || '';
        const communeName = communes.find(commune => commune.id === communeId)?.name || '';
        const providerName = providers.find(provider => provider.id === providerId)?.name || '';

        const newCustomer = {
            id: Date.now(),
            name,
            phone,
            province: provinceName,
            district: districtName,
            commune: communeName,
            provider: providerName,
            addressDetails
        };

        customers.push(newCustomer); // Thêm khách hàng mới
        renderTable(customers);      // Cập nhật bảng
        form.reset();                // Xóa dữ liệu trong form

        modal.style.display = 'none'; // Ẩn modal sau khi gửi
    });

    // Đổi văn bản nút thành "Lưu" khi tất cả trường đều có giá trị
    form.addEventListener('input', () => {
        const isFormFilled = form.checkValidity();
        submitButton.textContent = isFormFilled ? 'Lưu' : 'Thêm Khách Hàng';
    });

    // Điền dropdown tỉnh
    const provinceSelect = document.getElementById('province');
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });

    // Điền dropdown huyện khi chọn tỉnh
    const districtSelect = document.getElementById('district');
    const communeSelect = document.getElementById('commune');
    provinceSelect.addEventListener('change', () => {
        const selectedProvinceId = provinceSelect.value;
        districtSelect.innerHTML = '<option value="">Chọn Huyện</option>';
        communeSelect.innerHTML = '<option value="">Chọn Xã</option>';

        districts.forEach(district => {
            if (district.provinceId === selectedProvinceId) {
                const option = document.createElement('option');
                option.value = district.id;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            }
        });
    });

    // Điền dropdown xã khi chọn huyện
    districtSelect.addEventListener('change', () => {
        const selectedDistrictId = districtSelect.value;
        communeSelect.innerHTML = '<option value="">Chọn Xã</option>';

        communes.forEach(commune => {
            if (commune.districtId === selectedDistrictId) {
                const option = document.createElement('option');
                option.value = commune.id;
                option.textContent = commune.name;
                communeSelect.appendChild(option);
            }
        });
    });
    // Điền dropdown nhà cung cấp
    const providerSelect = document.getElementById('provider');
    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider.id;
        option.textContent = provider.name;
        providerSelect.appendChild(option);
    });

    // Hàm cập nhật bảng khách hàng
    function renderTable(customers) {
        tableBody.innerHTML = '';
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.province}</td>
                <td>${customer.district}</td>
                <td>${customer.commune}</td>
                <td>${customer.addressDetails}</td>
                <td>${customer.provider}</td>
            `;
            tableBody.appendChild(row);
        });
    }
};

// Xuất hàm create
export default create;
