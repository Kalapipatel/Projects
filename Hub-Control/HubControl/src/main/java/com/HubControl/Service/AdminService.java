package com.HubControl.Service;

import com.HubControl.Entity.Product;
import com.HubControl.Entity.Store;
import com.HubControl.Entity.User;
import com.HubControl.dto.*;

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

    // NEW Product Methods
    Product addProduct(ProductRequest request);
    List<Product> getAllProducts();
    List<Product> searchProducts(String keyword); // Search
    Product updateProduct(int productId, ProductRequest request);
    void deleteProduct(int productId);
}
