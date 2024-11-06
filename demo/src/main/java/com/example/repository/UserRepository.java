package com.example.repository;



public interface UserRepository {
    void insertData( String userName, String phoneNumber, String address, Long communeID, Long providerID, Long districtID);
    void updateData(int userID, String userName, String phoneNumber, String address, Long communeID, Long providerID, Long districtID);
    void deleteData(int userID);
    void findByDistrict(Long districtID, Long communeID);
}
