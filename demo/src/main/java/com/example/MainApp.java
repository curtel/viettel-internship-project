package com.example;

import com.example.service.UserService;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Scanner;

public class MainApp {
    public static void main(String[] args) {

        Connection conn = MySQLConnection.getConnection();

        // If the connection is successful, you can call other methods
        if (conn != null) {
            
            // Make sure to close the connection after you are done
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Unable to connect to the database.");
        }

        Scanner scanner = new Scanner(System.in);
        UserService userService = new UserService();

        while (true) {
            System.out.println("\nChọn thao tác bạn muốn thực hiện:");
            System.out.println("1. Thêm người dùng");
            System.out.println("2. Cập nhật người dùng");
            System.out.println("3. Xóa người dùng");
            System.out.println("4. Tìm kiếm theo quận");
            System.out.println("5. Thoát");
            
            System.out.print("\nNhập lệnh: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    // Lấy dữ liệu từ người dùng và thêm dữ liệu vào cơ sở dữ liệu
                        System.out.print("Nhập UserName: ");
                        String userName = scanner.nextLine(); // Read UserName
                        System.out.print("Nhập PhoneNumber: ");
                        String phoneNumber = scanner.nextLine(); // Read PhoneNumber
                        System.out.print("Nhập Address: ");
                        String address = scanner.nextLine(); // Read Address
                        System.out.print("Nhập DistrictID: ");
                        Long districtID = scanner.nextLong(); // Read DistrictID
                        System.out.print("Nhập CommuneID: ");
                        Long communeID = scanner.nextLong(); // Read CommuneID
                        System.out.print("Nhập ProviderID: ");
                        Long providerID = scanner.nextLong(); // Read ProviderID
                        
        
        // Call the insert method
                        userService.insertData(userName, phoneNumber, address, communeID, providerID, districtID);
                        break;

                case 2:
                    // Cập nhật dữ liệu người dùng
                    System.out.print("Nhập UserID cần cập nhật: ");
                    int userID = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("Nhập UserName mới: ");
                    userName = scanner.nextLine();
                    System.out.print("Nhập PhoneNumber mới: ");
                    phoneNumber = scanner.nextLine();
                    System.out.print("Nhập Address mới: ");
                    address = scanner.nextLine();
                    System.out.print("Nhập DistrictID mới: ");
                    districtID = scanner.nextLong();
                    System.out.print("Nhập CommuneID mới: ");
                    communeID = scanner.nextLong();
                    System.out.print("Nhập ProviderID mới: ");
                    providerID = scanner.nextLong();
                    

                    userService.updateData(userID, userName, phoneNumber, address, communeID, providerID, districtID);
                    break;

                case 3:
                    // Xóa người dùng
                    System.out.print("Nhập UserID cần xóa: ");
                    userID = scanner.nextInt();
                    userService.deleteData(userID);
                    break;

                case 4:
                    // Tìm kiếm người dùng theo quận và xã
                    System.out.print("Nhập DistrictID để tìm kiếm: ");
                    districtID = scanner.nextLong();
                    System.out.print("Nhập CommuneID (hoặc nhập -1 nếu không muốn lọc theo CommuneID): ");
                    communeID = scanner.nextLong();
                    if (communeID == -1) {
                        communeID = null;
                    }
                    userService.findByDistrict(districtID, communeID);
                    break;

                case 5:
                    System.out.println("Thoát chương trình.");
                    scanner.close();
                    System.exit(0);

                default:
                    System.out.println("Lựa chọn không hợp lệ.");
                    break;
            }
        }
    }
}
