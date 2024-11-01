CREATE DATABASE IF NOT EXISTS thuctap;
USE thuctap;

-- Tạo bảng Districts nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS Districts (
    DistrictID INT AUTO_INCREMENT PRIMARY KEY,
    DistrictName VARCHAR(255) NOT NULL,
    UNIQUE (DistrictName)
);

-- Tạo bảng Communes nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS Communes (
    CommuneID INT AUTO_INCREMENT PRIMARY KEY,
    CommuneName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UNIQUE (CommuneName, DistrictID),
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID)
);

-- Tạo bảng Providers nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS Providers (
    ProviderID INT AUTO_INCREMENT PRIMARY KEY,
    ProviderName VARCHAR(255) NOT NULL,
    UNIQUE (ProviderName)
);

-- Thêm dữ liệu mẫu vào bảng Providers
INSERT INTO Providers (ProviderName)
VALUES ('Viettel'), ('VinaPhone'), ('FPT'), ('MobiFone')
ON DUPLICATE KEY UPDATE ProviderName = VALUES(ProviderName);

-- Tạo bảng Users nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15),
    Address VARCHAR(255),
    CommuneID INT,
    ProviderID INT,
    DistrictID INT,
    FOREIGN KEY (CommuneID) REFERENCES Communes(CommuneID),
    FOREIGN KEY (ProviderID) REFERENCES Providers(ProviderID),
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID)
);

-- Thêm dữ liệu mẫu vào bảng Districts
INSERT INTO Districts (DistrictName)
VALUES ('Thành phố Kon Tum'), ('Huyện Đăk Hà'), ('Huyện Đăk Tô'), ('Huyện Ngọc Hồi'), ('Huyện Đăk Glei'),
       ('Huyện Sa Thầy'), ('Huyện Tu Mơ Rông'), ('Huyện Kon Rẫy'), ('Huyện Kon Plông'), ('Huyện Ia H\'Drai')
ON DUPLICATE KEY UPDATE DistrictName = VALUES(DistrictName);

-- Thêm dữ liệu mẫu vào bảng Communes
INSERT INTO Communes (CommuneName, DistrictID)
VALUES ('Xã A', 1), ('Đăk Blà', 1), ('Đăk Cấm', 1), ('Đăk Rơ Wa', 1), ('Đoàn Kết', 1),
       ('Chư Hreng', 1), ('Kroong', 1), ('Ngọk Bay', 1), ('Đăk Năng', 1), ('Đăk Mar', 2),
       ('Đăk Hring', 2), ('Đăk Ui', 2), ('Đăk La', 2), ('Đăk Pxi', 2), ('Ngok Réo', 2),
       ('Ngok Wang', 2), ('Ngok Long', 2), ('Đăk Long', 2), ('Đăk Rơ Nga', 3), ('Ngọc Tụ', 3),
       ('Đăk Trăm', 3), ('Văn Lem', 3), ('Kon Đào', 3), ('Tân Cảnh', 3), ('Diên Bình', 3),
       ('Pô Kô', 3), ('Đăk Ang', 4), ('Đăk Dục', 4), ('Đăk Nông', 4), ('Đăk Xú', 4),
       ('Sa Loong', 4), ('Đăk Kan', 4), ('Bờ Y', 4), ('Đăk Môn', 5), ('Đăk Kroong', 5),
       ('Đăk Choong', 5), ('Mường Hoong', 5), ('Ngọc Linh', 5), ('Xốp', 5), ('Đăk Pék', 5),
       ('Đăk Nhoong', 5), ('Đăk Plô', 5), ('Đăk Man', 5), ('Hơ Moong', 6), ('Mô Rai', 6),
       ('Sa Sơn', 6), ('Sa Nghĩa', 6), ('Sa Nhơn', 6), ('Sa Bình', 6), ('Ya Xiêr', 6),
       ('Ya Ly', 6), ('Rờ Kơi', 6), ('Đăk Sao', 7), ('Đăk Na', 7), ('Tu Mơ Rông', 7),
       ('Ngọc Lây', 7), ('Măng Ri', 7), ('Tê Xăng', 7), ('Văn Xuôi', 7), ('Đăk Rơ Ông', 7),
       ('Ngọc Yêu', 7), ('Đăk Tờ Kan', 7), ('Măng Bút', 7), ('Đăk Kôi', 8), ('Đăk Pne', 8),
       ('Đăk Tơ Lung', 8), ('Đăk Ruồng', 8), ('Tân Lập', 8), ('Kon Pne', 8), ('Măng Cành', 9),
       ('Đăk Tăng', 9), ('Ngok Tem', 9), ('Pờ Ê', 9), ('Măng Bút', 9), ('Đăk Ring', 9),
       ('Hiếu', 9), ('Ia Đal', 10), ('Ia Dom', 10), ('Ia Tơi', 10)
ON DUPLICATE KEY UPDATE CommuneName = VALUES(CommuneName);

-- Thêm index cho bảng Communes và Users nếu chưa tồn tại
ALTER TABLE Communes ADD INDEX (DistrictID);
ALTER TABLE Users ADD INDEX (DistrictID);
