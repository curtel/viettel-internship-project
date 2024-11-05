package com.example.service;

import com.example.MySQLConnection;
import com.example.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

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
    public List<String> findByDistrict(Long districtID, Long communeID) {
        List<String> results = new ArrayList<>();
        MySQLConnection.findByDistric(districtID, communeID);
        return results;
    }
}