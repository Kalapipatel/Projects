package com.HubControl.Service;

import com.HubControl.Repo.StoreRepository;
import com.HubControl.Repo.UserRepository;
import com.HubControl.dto.AdminDashboardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StoreRepository storeRepo;

    @Autowired
    private OrderService orderService;

    @Override
    public int countTotalPickers(){ return userRepo.countTotalPickers(); }

    @Override
    public int countActivePickers(){ return userRepo.countActivePickers(); }

    @Override
    public int countTotalManagers(){ return userRepo.countTotalManagers(); }

    @Override
    public int countActiveManagers(){ return userRepo.countActiveManagers(); }

    @Override
    public int countStores(){ return storeRepo.countTotalStores(); }

    @Override
    public AdminDashboardDTO getDashboardData(){
        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalRevenue(558431);

        Map<String, Integer> orderStats = orderService.getCountOrdersByStatus();

        dto.setPendingOrders(orderStats.get("PENDING"));
        dto.setProcessingOrders(orderStats.get("PROCESSING"));
        dto.setCompletedOrders(orderStats.get("COMPLETED"));

        dto.setStores(countStores());
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
}
