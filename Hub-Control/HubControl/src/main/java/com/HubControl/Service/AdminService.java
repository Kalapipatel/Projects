package com.HubControl.Service;

import com.HubControl.Entity.Store;
import com.HubControl.Entity.User;
import com.HubControl.dto.AdminDashboardDTO;
import com.HubControl.dto.AssignStoreRequest;
import com.HubControl.dto.StoreRequest;
import com.HubControl.dto.UserRequest;

import java.util.List;

public interface AdminService {

    public AdminDashboardDTO getDashboardData();
    public int countTotalPickers();
    public int countActivePickers();
    public int countTotalManagers();
    public int countActiveManagers();
    public int countActiveStores();
    public int countTotalStores();

    public Store addStore(StoreRequest request);
    public List<Store> getAllStores();
    public Store updateStore(int storeId, StoreRequest request);
    public void deleteStore(int storeId);

    User addUser(UserRequest request);
    List<User> getAllUsers();
    User updateUser(int userId, UserRequest request);
    void deleteUser(int userId);

    void assignStoresToUser(AssignStoreRequest request);
}
