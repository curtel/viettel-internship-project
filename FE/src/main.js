import create from './components/create.js';

// Dữ liệu các tỉnh/thành phố
const provinces = [
    { id: 'KT', name: 'Kon Tum' },

];

// Dữ liệu các quận/huyện
const districts = [
    { id: 'KT1', provinceId: 'KT', name: 'Thành phố Kon Tum' },
    { id: 'KT2', provinceId: 'KT', name: 'Huyện Đăk Hà' },
    { id: 'KT3', provinceId: 'KT', name: 'Huyện Đăk Tô' },
    
];

// Dữ liệu các xã/phường
const communes = [
    { id: 'KT1-1', districtId: 'KT1', name: 'Xã Đăk Blà' },
    { id: 'KT2-1', districtId: 'KT2', name: 'Xã Đăk Hring' },
    { id: 'KT3-1', districtId: 'KT3', name: 'Xã Kon Đào' },
    
];

// Dữ liệu các nhà cung cấp
const providers = [
    { id: 'V', name: 'Viettel' },
    { id: 'VP', name: 'VinaPhone' },
    { id: 'FPT', name: 'FPT' },
    { id: 'MF', name: 'MobiFone' },
];

document.addEventListener('DOMContentLoaded', () => {
    // Lấy phần tử dropdown của Tìm kiếm
    const tableBody = document.querySelector('#customer-table tbody');
    const searchInput = document.getElementById('search-name');
    const searchProvince = document.getElementById('search-province');
    const searchDistrict = document.getElementById('search-district');
    const searchCommune = document.getElementById('search-commune');
    const searchProvider = document.getElementById('search-provider');
    const form = document.getElementById('customer-form');

    // Mảng mẫu dữ liệu khách hàng
    const customers = [
        { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', province: 'Kon Tum', district: 'Thành phố Kon Tum', commune: 'Xã Đăk Blà', addressDetails: '1 Đường A', provider: 'Viettel' },
        { id: 2, name: 'Trần Thị B', phone: '0912345678', province: 'Kon Tum', district: 'Huyện Đăk Hà', commune: 'Xã Đăk Hring', addressDetails: '2 Đường B', provider: 'VinaPhone' },
        { id: 3, name: 'Lê Văn C', phone: '0923456789', province: 'Kon Tum', district: 'Huyện Đăk Tô', commune: 'Xã Kon Đào', addressDetails: '3 Đường C', provider: 'FPT' },
        
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

    // Thêm danh sách nhà cung cấp vào dropdown Tìm kiếm
    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider.id;
        option.textContent = provider.name;
        searchProvider.appendChild(option);
    });

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

    // Lắng nghe sự kiện khi chọn nhà cung cấp
    searchProvider.addEventListener('change', (event) => {
        const selectedProvider = event.target.value;
        populateCommunes(selectedProvider);
    });

    // Hàm hiển thị bảng khách hàng
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
                <td>${customer.provider}</td>
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

    // Lắng nghe sự kiện khi chọn tỉnh trong modal
    document.getElementById('edit-province').addEventListener('change', (event) => {
        const selectedProvince = event.target.value;
        populateDistrictsForEdit(selectedProvince);
        document.getElementById('edit-commune').innerHTML = '<option value="">Chọn xã</option>'; // Reset danh sách xã
    });

    // Lắng nghe sự kiện khi chọn huyện trong modal
    document.getElementById('edit-district').addEventListener('change', (event) => {
        const selectedDistrict = event.target.value;
        populateCommunesForEdit(selectedDistrict);
    });

    // Hàm cập nhật danh sách huyện dựa trên tỉnh đã chọn cho modal
    function populateDistrictsForEdit(selectedProvince) {
        const provinceId = provinces.find(province => province.name === selectedProvince).id;
        const editDistrictDropdown = document.getElementById('edit-district');
        editDistrictDropdown.innerHTML = '<option value="">Chọn huyện</option>'; // Reset danh sách huyện
        const filteredDistricts = districts.filter(district => district.provinceId === provinceId);
        filteredDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.name;
            editDistrictDropdown.appendChild(option);
        });
    }

    // Hàm cập nhật danh sách xã dựa trên huyện đã chọn cho modal
    function populateCommunesForEdit(selectedDistrict) {
        const districtId = districts.find(district => district.id === selectedDistrict).id; // Sửa dòng này
        const editCommuneDropdown = document.getElementById('edit-commune');
        editCommuneDropdown.innerHTML = '<option value="">Chọn xã</option>'; // Reset danh sách xã
        const filteredCommunes = communes.filter(commune => commune.districtId === districtId);
        filteredCommunes.forEach(commune => {
            const option = document.createElement('option');
            option.value = commune.id;
            option.textContent = commune.name;
            editCommuneDropdown.appendChild(option);
        });
    }

    // Hàm sửa
    function handleEdit(event) {
        
        const customerId = event.target.getAttribute('data-id');
        const customer = customers.find(cust => cust.id == customerId);
        
        if (customer) {
            
            // Điền dữ liệu vào modal
            document.getElementById('edit-name').value = customer.name;
            document.getElementById('edit-phone').value = customer.phone;

            document.getElementById('edit-customer-form').dataset.id = customerId;

            // Cập nhật dropdown tỉnh
            document.getElementById('edit-province').innerHTML = '<option value="">Chọn tỉnh</option>'; 
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.id;
                option.textContent = province.name;
                if (province.name === customer.province) {
                    option.selected = true; // Chọn tỉnh hiện tại
                }
                document.getElementById('edit-province').appendChild(option);
            });

            // Cập nhật dropdown huyện dựa trên tỉnh đã chọn
            populateDistrictsForEdit(customer.province);

            // Cập nhật dropdown xã dựa trên huyện đã chọn
            const selectedDistrict = districts.find(district => district.name === customer.district).id; 
            populateCommunesForEdit(selectedDistrict);

            // Cập nhật dropdown nhà cung cấp
            document.getElementById('edit-provider').innerHTML = '<option value="">Chọn nhà cung cấp</option>'; 
            providers.forEach(provider => {
                const option = document.createElement('option');
                option.value = provider.id;
                option.textContent = provider.name;
                if (provider.name === customer.provider) {
                    option.selected = true; // Chọn nhà cung cấp hiện tại
                }
                document.getElementById('edit-provider').appendChild(option);
            });

            document.getElementById('edit-addressDetails').value = customer.addressDetails;

            // Hiện modal
            document.getElementById('edit-modal').style.display = 'block';
        }
        
    }

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        // Gọi renderTable để hiển thị bảng khách hàng ban đầu
        renderTable(customers);
   
    
    // Cập nhật biểu mẫu chỉnh sửa
    document.getElementById('edit-customer-form').addEventListener('submit', function updateCustomer(event) {
        event.preventDefault();
        const customerId = event.target.dataset.id; // Lưu id của khách hàng
        const customer = customers.find(cust => cust.id == customerId);
        if (!validateForm_edit()) {
            return; // Dừng lại nếu form không hợp lệ
        }
        
        if (customer) {
            customer.name = document.getElementById('edit-name').value;
            customer.phone = document.getElementById('edit-phone').value;
            customer.province = provinces.find(province => province.id === document.getElementById('edit-province').value).name;
            customer.district = districts.find(district => district.id === document.getElementById('edit-district').value).name;
            customer.commune = communes.find(commune => commune.id === document.getElementById('edit-commune').value).name;
            customer.provider = providers.find(provider => provider.id === document.getElementById('edit-provider').value).name;
            customer.addressDetails = document.getElementById('edit-addressDetails').value;
    
            renderTable(customers);
            document.getElementById('edit-modal').style.display = 'none';
            document.getElementById('close-modal').addEventListener('click', () => {
                const editModal = document.getElementById('edit-modal');
                editModal.style.display = 'none'; 
            });
        }
    });

    const modal = document.getElementById('edit-modal');

    const closeModalButton1 = document.getElementById('close-modal');{
        closeModalButton1.addEventListener('click', () => {
            modal.style.display='none';
        })
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    //Hàm xóa
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
        if (!validateForm()) {
            return; // Nếu không hợp lệ, dừng lại
        }
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const districtId = document.getElementById('district').value;
        const communeId = document.getElementById('commune').value;
        const providerId = document.getElementById('provider').value;
        const addressDetails = document.getElementById('addressDetails').value;

        const provinceName = provinces.find(province => province.id === provinceId).name;
        const districtName = districts.find(district => district.id === districtId).name;
        const communeName = communes.find(commune => commune.id === communeId).name;
        const providerName = providers.find(provider => provider.id === providerId).name;
        
        const newCustomer = { id: Date.now(), name, phone, province: provinceName, district: districtName, commune: communeName, addressDetails, provider: providerName };

        customers.push(newCustomer);
        renderTable(customers);
        form.reset();
        document.getElementById('add-customer').style.display = 'none';
    }

    form.addEventListener('submit', addCustomer);

    function validateForm() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const provinceId = document.getElementById('province').value;
        const districtId = document.getElementById('district').value;
        const communeId = document.getElementById('commune').value;
        const addressDetails = document.getElementById('addressDetails').value;
        const providerId = document.getElementById('provider').value;
    
        if (!name || !phone || !provinceId || !districtId || !communeId || !addressDetails || !providerId) {
            alert("Bạn cần nhập đầy đủ thông tin");
            return false; 
        }
        
        return true;
    }

    function validateForm_edit() {
        const name = document.getElementById('edit-name').value;
        const phone = document.getElementById('edit-phone').value;
        const provinceId = document.getElementById('edit-province').value;
        const districtId = document.getElementById('edit-district').value;
        const communeId = document.getElementById('edit-commune').value;
        const addressDetails = document.getElementById('edit-addressDetails').value;
        const providerId = document.getElementById('edit-provider').value;
    
        if (!name || !phone || !provinceId || !districtId || !communeId || !addressDetails || !providerId) {
            alert("Bạn cần nhập đầy đủ thông tin");
            return false; 
        }
        
        return true;
    }

    //Hiển thị kết quả sau khi lọc
    function filterCustomers() {
        const searchName = searchInput.value.toLowerCase();
        const selectedProvince = searchProvince.value;
        const selectedDistrict = searchDistrict.value;
        const selectedCommune = searchCommune.value;
        const selectedProvider = searchProvider.value;

        const filteredCustomers = customers.filter(customer => {
            const matchesName = customer.name.toLowerCase().includes(searchName);
            const matchesProvince = selectedProvince ? customer.province === provinces.find(p => p.id === selectedProvince).name : true;
            const matchesDistrict = selectedDistrict ? customer.district === districts.find(p => p.id === selectedDistrict).name : true;
            const matchesCommune = selectedCommune ? customer.commune === communes.find(p => p.id === selectedCommune).name : true;
            const matchesProvider = selectedProvider ? customer.provider === providers.find(p => p.id === selectedProvider).name : true;
            return matchesName && matchesProvince && matchesDistrict && matchesCommune && matchesProvider;
        });

        renderTable(filteredCustomers);
    }

    searchInput.addEventListener('input', filterCustomers);
    searchProvince.addEventListener('change', filterCustomers);
    searchDistrict.addEventListener('change', filterCustomers);
    searchCommune.addEventListener('change', filterCustomers);
    searchProvider.addEventListener('change', filterCustomers);

    renderTable();

    create(provinces, districts, communes, providers);
});
