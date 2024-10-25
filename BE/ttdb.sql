CREATE DATABASE IF NOT EXISTS thuctap;

USE thuctap;

-- Tạo bảng Districts
CREATE TABLE IF NOT EXISTS Districts (
    DistrictID INT AUTO_INCREMENT PRIMARY KEY,
    DistrictName VARCHAR(255) NOT NULL,
    UNIQUE (DistrictName)
);

-- Tạo bảng Communes
CREATE TABLE IF NOT EXISTS Communes (
    CommuneID INT AUTO_INCREMENT PRIMARY KEY,
    CommuneName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UNIQUE (CommuneName, DistrictID),
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID)
);

-- Tạo bảng Providers
CREATE TABLE IF NOT EXISTS Providers (
    ProviderID INT AUTO_INCREMENT PRIMARY KEY,
    ProviderName VARCHAR(255) NOT NULL,
    UNIQUE (ProviderName)
);

-- Thêm dữ liệu mẫu vào bảng Providers
INSERT INTO Providers (ProviderName) VALUES
('Viettel'),
('VinaPhone'),
('FPT'),
('MobiFone')
ON DUPLICATE KEY UPDATE ProviderID = LAST_INSERT_ID(ProviderID);

-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15),
    CommuneID INT,
    ProviderID INT,
    FOREIGN KEY (CommuneID) REFERENCES Communes(CommuneID),
    FOREIGN KEY (ProviderID) REFERENCES Providers(ProviderID)
);

-- Thêm dữ liệu mẫu vào bảng Districts
INSERT INTO Districts (DistrictName) VALUES
('Thành phố Kon Tum'),
('Huyện Đăk Hà'),
('Huyện Đăk Tô'),
('Huyện Ngọc Hồi'),
('Huyện Đăk Glei'),
('Huyện Sa Thầy'),
('Huyện Tu Mơ Rông'),
('Huyện Kon Rẫy'),
('Huyện Kon Plông'),
('Huyện Ia H\'Drai')
ON DUPLICATE KEY UPDATE DistrictID = LAST_INSERT_ID(DistrictID);

-- Thêm dữ liệu mẫu vào bảng Communes
INSERT INTO Communes (CommuneName, DistrictID) VALUES ('Xã A', 1)
ON DUPLICATE KEY UPDATE CommuneID = LAST_INSERT_ID(CommuneID);

-- Thêm index cho bảng Communes và Users
ALTER TABLE Communes ADD INDEX (DistrictID);
-- Thêm dữ liệu mẫu vào bảng Users
INSERT INTO Users (UserName, PhoneNumber, CommuneID, ProviderID) VALUES
('Nguyen Van A', '0123456789', 1, 1),
('Tran Thi B', '0987654321', 1, 2),
('Le Van C', '0369874512', 1, 3),
('Pham Thi D', '0998877665', 1, 4);
-- Huyện Thành phố Kon Tum
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Blà', 1), ('Đăk Cấm', 1), ('Đăk Rơ Wa', 1), ('Đoàn Kết', 1), 
('Chư Hreng', 1), ('Kroong', 1), ('Ngọk Bay', 1), ('Đăk Năng', 1);

-- Huyện Đăk Hà
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Mar', 2), ('Đăk Hring', 2), ('Đăk Ui', 2), ('Đăk La', 2), 
('Đăk Pxi', 2), ('Ngok Réo', 2), ('Ngok Wang', 2), ('Ngok Long', 2), ('Đăk Long', 2);

-- Huyện Đăk Tô
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Rơ Nga', 3), ('Ngọc Tụ', 3), ('Đăk Trăm', 3), ('Văn Lem', 3), 
('Kon Đào', 3), ('Tân Cảnh', 3), ('Diên Bình', 3), ('Pô Kô', 3);

-- Huyện Ngọc Hồi
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Ang', 4), ('Đăk Dục', 4), ('Đăk Nông', 4), ('Đăk Xú', 4), 
('Sa Loong', 4), ('Đăk Kan', 4), ('Bờ Y', 4);

-- Huyện Đăk Glei
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Môn', 5), ('Đăk Kroong', 5), ('Đăk Choong', 5), ('Mường Hoong', 5), 
('Ngọc Linh', 5), ('Xốp', 5), ('Đăk Pék', 5), ('Đăk Nhoong', 5), ('Đăk Plô', 5), ('Đăk Man', 5);

-- Huyện Sa Thầy
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Hơ Moong', 6), ('Mô Rai', 6), ('Sa Sơn', 6), ('Sa Nghĩa', 6), 
('Sa Nhơn', 6), ('Sa Bình', 6), ('Ya Xiêr', 6), ('Ya Ly', 6), ('Rờ Kơi', 6);

-- Huyện Tu Mơ Rông
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Sao', 7), ('Đăk Na', 7), ('Tu Mơ Rông', 7), ('Ngọc Lây', 7), 
('Măng Ri', 7), ('Tê Xăng', 7), ('Văn Xuôi', 7), ('Đăk Rơ Ông', 7), ('Ngọc Yêu', 7), ('Đăk Tờ Kan', 7), ('Măng Bút', 7);

-- Huyện Kon Rẫy
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Đăk Kôi', 8), ('Đăk Pne', 8), ('Đăk Tơ Lung', 8), ('Đăk Ruồng', 8), 
('Tân Lập', 8), ('Kon Pne', 8);

-- Huyện Kon Plông
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Măng Cành', 9), ('Đăk Tăng', 9), ('Ngok Tem', 9), ('Pờ Ê', 9), 
('Măng Bút', 9), ('Đăk Ring', 9), ('Hiếu', 9);

-- Huyện Ia H'Drai
INSERT INTO Communes (CommuneName, DistrictID) VALUES 
('Ia Đal', 10), ('Ia Dom', 10), ('Ia Tơi', 10);
-- Thêm index cho bảng Users
ALTER TABLE Users ADD INDEX (CommuneID);
ALTER TABLE Users ADD INDEX (ProviderID);