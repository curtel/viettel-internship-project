import create from './components/create.js';

// Dữ liệu các tỉnh/thành phố
const provinces = [
    { id: 'HCM', name: 'TP Hồ Chí Minh' },
    { id: 'HN', name: 'Hà Nội' },
    { id: 'DN', name: 'Đà Nẵng' },
    { id: 'BD', name: 'Bình Dương' },
    { id: 'VT', name: 'Vũng Tàu' },
];

// Dữ liệu các quận/huyện
const districts = [
    { id: 'HCM1', provinceId: 'HCM', name: 'Quận 1' },
    { id: 'HN1', provinceId: 'HN', name: 'Quận Ba Đình' },
    { id: 'DN1', provinceId: 'DN', name: 'Quận Hải Châu' },
    { id: 'BD1', provinceId: 'BD', name: 'Thị xã Bến Cát' },
    { id: 'VT1', provinceId: 'VT', name: 'Thành phố Vũng Tàu' },
];

// Dữ liệu các xã/phường
const communes = [
    { id: 'HCM1-1', districtId: 'HCM1', name: 'Phường Bến Nghé' },
    { id: 'HN1-1', districtId: 'HN1', name: 'Phường Điện Biên' },
    { id: 'DN1-1', districtId: 'DN1', name: 'Phường Thạch Thang' },
    { id: 'BD1-1', districtId: 'BD1', name: 'Phường Mỹ Phước' },
    { id: 'VT1-1', districtId: 'VT1', name: 'Phường 1' },
];

document.addEventListener('DOMContentLoaded', () => {
    // Lấy phần tử dropdown của Tìm kiếm
    const tableBody = document.querySelector('#customer-table tbody');
    const searchInput = document.getElementById('search-name');
    const searchProvince = document.getElementById('search-province');
    const searchDistrict = document.getElementById('search-district');
    const searchCommune = document.getElementById('search-commune');
    const form = document.getElementById('customer-form');

    // Mảng mẫu dữ liệu khách hàng
    const customers = [
        { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', province: 'TP Hồ Chí Minh', district: 'Quận 1', commune: 'Phường Bến Nghé', addressDetails: '123 Đường ABC' },
        { id: 2, name: 'Trần Thị B', phone: '0912345678', province: 'Hà Nội', addressDetails: '456 Đường DEF' },
        { id: 3, name: 'Lê Văn C', phone: '0923456789', province: 'Đà Nẵng', addressDetails: '789 Đường GHI' },
        { id: 4, name: 'Phạm Thị D', phone: '0934567890', province: 'Bình Dương', addressDetails: '321 Đường JKL' },
        { id: 5, name: 'Đặng Văn E', phone: '0945678901', province: 'Vũng Tàu', addressDetails: '654 Đường MNO' },
    ];

    // Thêm danh sách tỉnh vào dropdown Tìm kiếm
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.name;
        searchProvince.appendChild(option);
    });

    // Hàm cập nhật danh sách huyện dựa trên tỉnh đã chọn
    function populateDistricts(provinceId) {
        searchDistrict.innerHTML = '<option value="">Chọn huyện</option>'; // Xóa các tùy chọn hiện có
        const filteredDistricts = districts.filter(district => district.provinceId === provinceId);
        filteredDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.name;
            searchDistrict.appendChild(option);
        });
    }
    
    // Hàm cập nhật danh sách xã dựa trên huyện đã chọn
    function populateCommunes(districtId) {
        searchCommune.innerHTML = '<option value="">Chọn xã</option>'; // Xóa các tùy chọn hiện có
        const filteredCommunes = communes.filter(commune => commune.districtId === districtId);
        filteredCommunes.forEach(commune => {
            const option = document.createElement('option');
            option.value = commune.id;
            option.textContent = commune.name;
            searchCommune.appendChild(option);
        });
    }

     // Lắng nghe sự kiện khi chọn tỉnh
     searchProvince.addEventListener('change', (event) => {
        const selectedProvince = event.target.value;
        populateDistricts(selectedProvince);
        searchCommune.innerHTML = '<option value="">Chọn xã</option>'; // Đặt lại các tùy chọn của danh sách xã
    });

    // Lắng nghe sự kiện khi chọn huyện
    searchDistrict.addEventListener('change', (event) => {
        const selectedDistrict = event.target.value;
        populateCommunes(selectedDistrict);
    });

    function renderTable(filteredCustomers = customers) {
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
                <td> 
                    <button class="edit-btn" data-id="${customer.id}">Sửa</button>
                    <button class="delete-btn" data-id="${customer.id}">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    }

    function handleEdit(event) {
        const customerId = event.target.getAttribute('data-id');
        const customer = customers.find(cust => cust.id == customerId);

        if (customer) {
            document.getElementById('name').value = customer.name;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('province').value = provinces.find(province => province.name === customer.province).id;
            document.getElementById('district').value = districts.find(district => district.name === customer.district).id;
            document.getElementById('commune').value = communes.find(commune => commune.name === customer.commune).id;
            document.getElementById('addressDetails').value = customer.addressDetails;

            document.getElementById('add-customer').style.display = 'block';

            form.removeEventListener('submit', addCustomer);
            form.addEventListener('submit', function updateCustomer(event) {
                event.preventDefault();
                customer.name = document.getElementById('name').value;
                customer.phone = document.getElementById('phone').value;
                customer.province = provinces.find(province => province.id === document.getElementById('province').value).name;
                customer.district = districts.find(district => district.id === document.getElementById('district').value).name;
                customer.commune = communes.find(commune => commune.id === document.getElementById('commune').value).name;
                customer.addressDetails = document.getElementById('addressDetails').value;

                renderTable(customers);
                form.reset();
                document.getElementById('add-customer').style.display = 'none';

                form.removeEventListener('submit', updateCustomer);
                form.addEventListener('submit', addCustomer);
            });
        }
    }

    function handleDelete(event) {
        const customerId = event.target.getAttribute('data-id');
        const index = customers.findIndex(cust => cust.id == customerId);

        if (index > -1) {
            customers.splice(index, 1);
            renderTable(customers);
        }
    }

    function addCustomer(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const districtId = document.getElementById('district').value;
        const communeId = document.getElementById('commune').value;
        const addressDetails = document.getElementById('addressDetails').value;

        const provinceName = provinces.find(province => province.id === provinceId).name;
        const districtName = districts.find(district => district.id === districtId).name;
        const communeName = communes.find(commune => commune.id === communeId).name;
        
        const newCustomer = { id: Date.now(), name, phone, province: provinceName, district: districtName, commune: communeName, addressDetails };

        customers.push(newCustomer);
        renderTable(customers);
        form.reset();
        document.getElementById('add-customer').style.display = 'none';
    }

    form.addEventListener('submit', addCustomer);

    function filterCustomers() {
        const searchName = searchInput.value.toLowerCase();
        const selectedProvince = searchProvince.value;
        const selectedDistrict = searchDistrict.value;
        const selectedCommune = searchCommune.value;

        const filteredCustomers = customers.filter(customer => {
            const matchesName = customer.name.toLowerCase().includes(searchName);
            const matchesProvince = selectedProvince ? customer.province === provinces.find(p => p.id === selectedProvince).name : true;
            const matchesDistrict = selectedDistrict ? customer.district === districts.find(p => p.id === selectedDistrict).name : true;
            const matchesCommune = selectedCommune ? customer.commune === communes.find(p => p.id === selectedCommune).name : true;
            return matchesName && matchesProvince && matchesDistrict && matchesCommune;
        });

        renderTable(filteredCustomers);
    }

    searchInput.addEventListener('input', filterCustomers);
    searchProvince.addEventListener('change', filterCustomers);
    searchDistrict.addEventListener('change', filterCustomers);
    searchCommune.addEventListener('change', filterCustomers);

    renderTable();
    create(provinces, districts, communes);
});
