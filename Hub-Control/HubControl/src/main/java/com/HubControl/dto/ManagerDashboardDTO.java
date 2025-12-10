package com.HubControl.dto;

import java.util.List;

public class ManagerDashboardDTO {
    private String managerName;
    private List<StoreUnderManagementDTO> stores;
    private StoreDashboardDTO stats;


    public String getManagerName() {
        return managerName;
    }
    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
    public List<StoreUnderManagementDTO> getStores() {
        return stores;
    }
    public void setStores(List<StoreUnderManagementDTO> stores) {
        this.stores = stores;
    }
    public StoreDashboardDTO getStats() {
        return stats;
    }
    public void setStats(StoreDashboardDTO stats) {
        this.stats = stats;
    }

    public ManagerDashboardDTO(){}

    public ManagerDashboardDTO(String managerName, List<StoreUnderManagementDTO> stores, StoreDashboardDTO stats) {
        this.managerName = managerName;
        this.stores = stores;
        this.stats = stats;
    }


}
