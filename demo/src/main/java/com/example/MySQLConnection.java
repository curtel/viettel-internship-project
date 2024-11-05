package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MySQLConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/tt";
    private static final String USER = "root";
    private static final String PASSWORD = "cong1234";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Tải driver MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
            // Tạo kết nối
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Kết nối thành công!");
        } catch (ClassNotFoundException e) {
            System.out.println("Driver không tìm thấy: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Lỗi kết nối: " + e.getMessage());
        }
        return connection;
    }

    public static void insertData(String UserName, String PhoneNumber, String Address, Long CommuneID, Long ProviderID, Long DistrictID) {
        String sql = "INSERT INTO Users (UserName, PhoneNumber, Address, CommuneID, ProviderID, DistrictID) VALUES (?, ?, ?, ?, ?, ?)";
    
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            
            // Thiết lập giá trị cho các tham số, bỏ qua UserID vì nó tự động tăng
            preparedStatement.setString(1, UserName);
            preparedStatement.setString(2, PhoneNumber);
            preparedStatement.setString(3, Address);
            preparedStatement.setObject(4, CommuneID);
            preparedStatement.setObject(5, ProviderID);
            preparedStatement.setObject(6, DistrictID);
            
            // Thực thi câu lệnh
            int rowsInserted = preparedStatement.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("Thêm dữ liệu thành công!");
            }
        } catch (SQLException e) {
            System.out.println("Lỗi khi kết nối hoặc thêm dữ liệu: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void updateData(int UserID, String UserName, String PhoneNumber, String Address, Long CommuneID, Long ProviderID, Long DistrictID) {
        String sql = "UPDATE Users SET UserName = ?, PhoneNumber = ?, Address = ?, CommuneID = ?, ProviderID = ?, DistrictID = ? WHERE UserID = ?";
    
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            
            // Thiết lập giá trị mới cho các cột
            preparedStatement.setString(1, UserName);
            preparedStatement.setString(2, PhoneNumber);
            preparedStatement.setString(3, Address);
            preparedStatement.setObject(4, CommuneID);
            preparedStatement.setObject(5, ProviderID);
            preparedStatement.setObject(6, DistrictID);
            preparedStatement.setInt(7, UserID); // UserID xác định hàng cần cập nhật
            
            // Thực thi câu lệnh
            int rowsUpdated = preparedStatement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Cập nhật dữ liệu thành công!");
            } else {
                System.out.println("Không tìm thấy bản ghi nào với ID = " + UserID);
            }
        } catch (SQLException e) {
            System.out.println("Lỗi khi kết nối hoặc cập nhật dữ liệu: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void deleteData(int UserID) {
        String sql = "DELETE FROM Users WHERE UserID = ?";
    
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            
            
            preparedStatement.setInt(1, UserID); // UserID xác định hàng cần cập nhật
            
            // Thực thi câu lệnh
            int rowsDeleted = preparedStatement.executeUpdate();
        if (rowsDeleted > 0) {
            System.out.println("Xóa dữ liệu thành công!");
        } else {
            System.out.println("Không tìm thấy bản ghi nào với UserID = " + UserID);
        }
    } catch (SQLException e) {
        System.out.println("Lỗi khi kết nối hoặc xóa dữ liệu: " + e.getMessage());
        e.printStackTrace();
    }
    }

    public static void findByDistric(Long DistrictID, Long CommuneID){
        String sql = "SELECT * FROM Users WHERE DistrictID = ?";
        if (CommuneID != null){
            sql += " AND CommuneID = ?";
        }

        try (Connection connection = getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql)){
                preparedStatement.setLong(1, DistrictID);
                if (CommuneID != null){
                    preparedStatement.setLong(2, CommuneID);
                }

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                // Giả sử bảng Users có các cột tương ứng với User model
                int userID = resultSet.getInt("UserID");
                String userName = resultSet.getString("UserName");
                String phoneNumber = resultSet.getString("PhoneNumber");
                String address = resultSet.getString("Address");
                Long communeID = resultSet.getLong("CommuneID");
                Long providerID = resultSet.getLong("ProviderID");
                Long districtID = resultSet.getLong("DistrictID");

                System.out.println("UserID: " + userID + ", UserName: " + userName + 
                                   ", PhoneNumber: " + phoneNumber + ", Address: " + address +
                                   ", CommuneID: " + communeID + ", ProviderID: " + providerID +
                                   ", DistrictID: " + districtID);
                }
            }
    }catch (SQLException e) {
        System.out.println("Lỗi khi kết nối hoặc tìm kiếm dữ liệu: " + e.getMessage());
        e.printStackTrace();
    }
}

    public static void main(String[] args) {
        Connection conn = getConnection();
        // Thực hiện các thao tác với cơ sở dữ liệu ở đây
        // ...
        
        try {
            if (conn != null) {
                conn.close(); // Đảm bảo đóng kết nối sau khi sử dụng
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
