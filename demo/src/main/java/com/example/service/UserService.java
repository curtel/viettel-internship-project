package com.example.service;

import com.example.MySQLConnection;
import com.example.repository.UserRepository;


public class UserService implements UserRepository {

    @Override
    public void insertData(String userName, String phoneNumber, String address, Long communeID, Long providerID, Long districtID) {
        MySQLConnection.insertData( userName, phoneNumber, address, communeID, providerID, districtID);
    }

    @Override
    public void updateData(int userID, String userName, String phoneNumber, String address, Long communeID, Long providerID, Long districtID) {
        MySQLConnection.updateData(userID, userName, phoneNumber, address, communeID, providerID, districtID);
    }

    @Override
    public void deleteData(int userID) {
        MySQLConnection.deleteData(userID);
    }

    @Override
    public void findByDistrict(Long districtID, Long communeID) {
        MySQLConnection.findByDistric(districtID, communeID);
    }
}