package com.HubControl.Service;

import com.HubControl.dto.AdminDashboardDTO;

public interface AdminService {

    public AdminDashboardDTO getDashboardData();
    public int countTotalPickers();
    public int countActivePickers();
    public int countTotalManagers();
    public int countActiveManagers();
    public int countStores();
}
