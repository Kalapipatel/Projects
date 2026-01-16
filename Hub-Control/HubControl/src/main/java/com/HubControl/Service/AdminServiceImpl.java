package com.HubControl.Service;

import com.HubControl.Entity.*;
import com.HubControl.Repo.*;
import com.HubControl.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cache.annotation.CacheEvict;
//import org.springframework.cache.annotation.Cacheable;
//import org.springframework.cache.annotation.Caching;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StoreRepository storeRepo;

    @Autowired
    private OrderService orderService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public int countTotalPickers(){ return userRepo.countTotalPickers(); }

    @Override
    public int countActivePickers(){ return userRepo.countActivePickers(); }

    @Override
    public int countTotalManagers(){ return userRepo.countTotalManagers(); }

    @Override
    public int countActiveManagers(){ return userRepo.countActiveManagers(); }

    @Override
    public int countActiveStores(){return storeRepo.countActiveStores(); }

    @Override
    public int countTotalStores(){ return storeRepo.countTotalStores(); }

    @Override
//    @Cacheable(value = "adminDashboard")
    public AdminDashboardDTO getDashboardData(){
        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalRevenue(558431);

        Map<String, Integer> orderStats = orderService.getCountOrdersByStatus();

        dto.setPendingOrders(orderStats.get("PENDING"));
        dto.setProcessingOrders(orderStats.get("PROCESSING"));
        dto.setCompletedOrders(orderStats.get("COMPLETED"));

        dto.setActiveStores(countActiveStores());
        dto.setTotalStores(countTotalStores());
        dto.setActiveManagers(countActiveManagers());
        dto.setTotalManagers(countTotalManagers());
        dto.setActivePickers(countActivePickers());
        dto.setTotalPickers(countTotalPickers());

        List<Integer> weeklyReport = new ArrayList<>();
        weeklyReport.add(3000);
        weeklyReport.add(4000);
        weeklyReport.add(5160);
        weeklyReport.add(2700);
        weeklyReport.add(6000);
        weeklyReport.add(1500);
        weeklyReport.add(4750);

        dto.setWeeklyData(weeklyReport);

        return dto;
    }

    // Store Management  --------------------------
    @Override
    // When adding a store, we MUST clear the 'stores' list cache so the new store appears.
    // We also clear 'adminDashboard' because the store counts on the dashboard have changed.
//    @Caching(evict = {
//            @CacheEvict(value = "stores", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public Store addStore(StoreRequest request) {
        Store store = new Store();
        store.setStoreName(request.getStoreName());
        store.setAddress(request.getAddress());
        store.setPincode(request.getPincode());
        store.setStatus(request.isStatus());

        return storeRepo.save(store);
    }

    @Override
//    @Cacheable(cacheNames = "stores")
    public List<Store> getAllStores() {
        return storeRepo.findAll();
    }

    @Override
    // If you had a method getStoreById(id), you could use @CachePut(value="store", key="#storeId") here.
    // But since we are affecting the main List, we must evict the list to ensure data consistency.
//    @Caching(evict = {
//            @CacheEvict(value = "stores", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public Store updateStore(int storeId, StoreRequest request) {
        Optional<Store> optionalStore = storeRepo.findById(storeId);

        if (optionalStore.isPresent()) {
            Store store = optionalStore.get();
            store.setStoreName(request.getStoreName());
            store.setAddress(request.getAddress());
            store.setPincode(request.getPincode());
            store.setStatus(request.isStatus());

            return storeRepo.save(store);
        } else {
            throw new RuntimeException("Store not found with ID: " + storeId);
        }
    }

    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "stores", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public void deleteStore(int storeId) {
        // Note: In a real production system with foreign keys,
        // you might need to handle related data (orders/inventory) before deleting.
        // For now, we perform a standard delete.
        if(storeRepo.existsById(storeId)) {
            storeRepo.deleteById(storeId);
        } else {
            throw new RuntimeException("Store not found with ID: " + storeId);
        }
    }

    // User Management  --------------------------
    @Override
//    @CacheEvict(value = {"storePickers", "storeDashboard", "managerDashboard"}, allEntries = true)
    public User addUser(UserRequest request) {
        User user = new User();
        mapRequestToUser(request, user);
        return userRepo.save(user);
    }

    @Override
//    @Cacheable(cacheNames = "users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "users", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public User updateUser(int userId, UserRequest request) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        mapRequestToUser(request, user);
        return userRepo.save(user);
    }

    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "users", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public void deleteUser(int userId) {
        if(userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    // Helper method to avoid duplication
    private void mapRequestToUser(UserRequest request, User user) {
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setActive(request.isActive());

        // Only update password if provided (simple check)
        // Hash the password before setting it
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            // Encode the raw password
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            user.setHashedPassword(encodedPassword);
        }

        // Fetch and set Role
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + request.getRoleId()));
        user.setRole(role);
    }


    // Mapping btw User and Store --------------
    @Override
    public void assignStoresToUser(AssignStoreRequest request) {
        // 1. Fetch the User
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Fetch all Stores by IDs
        List<Store> storesList = storeRepo.findAllById(request.getStoreIds());
        Set<Store> storesSet = new HashSet<>(storesList);

        // 3. Update the relationship
        // This replaces the old mapping with the new one completely
        user.setStores(storesSet);

        // 4. Save User (cascades the update to the join table)
        userRepo.save(user);
    }

    // Product Manement
    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "products", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true) // Product counts changed
//    })
    public Product addProduct(ProductRequest request) {
        Product product = new Product();
        mapRequestToProduct(request, product);
        return productRepository.save(product);
    }

    @Override
//    @Cacheable(cacheNames = "products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> searchProducts(String keyword) {
        // Search by Name OR SKU
        return productRepository.findByProductNameContainingIgnoreCaseOrSkuContainingIgnoreCase(keyword, keyword);
    }

    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "products", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public Product updateProduct(int productId, ProductRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        mapRequestToProduct(request, product);
        return productRepository.save(product);
    }

    @Override
//    @Caching(evict = {
//            @CacheEvict(value = "products", allEntries = true),
//            @CacheEvict(value = "adminDashboard", allEntries = true)
//    })
    public void deleteProduct(int productId) {
        if(productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
    }

    private void mapRequestToProduct(ProductRequest request, Product product) {
        product.setSku(request.getSku());
        product.setProductName(request.getProductName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());

        if (request.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(request.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        }
    }
}
