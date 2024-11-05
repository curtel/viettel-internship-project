package com.example.model;

import javax.persistence.GenerationType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int UserID;
    
    @Column(nullable = false, length = 50)
    private String UserName;

    @Column(nullable = false, unique = true, length = 15) // Độ dài tối đa cho số điện thoại
    private String PhoneNumber;

    @Column(nullable = false, length = 255) // Độ dài tối đa cho địa chỉ
    private String Address;

    @Column(name = "commune_id") // Tên cột trong cơ sở dữ liệu
    private Long CommuneID;

    @Column(name = "provider_id") // Tên cột trong cơ sở dữ liệu
    private Long ProviderID;

    @Column(name = "district_id") // Tên cột trong cơ sở dữ liệu
    private Long DistrictID;

    // Getter and Setter for UserID
    public int getUserID() {
        return UserID;
    }

    public void setUserID(int userID) {
        this.UserID = userID;
    }

    // Getter and Setter for UserName
    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        this.UserName = userName;
    }

    // Getter and Setter for PhoneNumber
    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.PhoneNumber = phoneNumber;
    }

    // Getter and Setter for Address
    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        this.Address = address;
    }

    // Getter and Setter for CommuneID
    public Long getCommuneID() {
        return CommuneID;
    }

    public void setCommuneID(Long communeID) {
        this.CommuneID = communeID;
    }

    // Getter and Setter for ProviderID
    public Long getProviderID() {
        return ProviderID;
    }

    public void setProviderID(Long providerID) {
        this.ProviderID = providerID;
    }

    // Getter and Setter for DistrictID
    public Long getDistrictID() {
        return DistrictID;
    }

    public void setDistrictID(Long districtID) {
        this.DistrictID = districtID;
    }
}
