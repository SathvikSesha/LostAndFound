package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import edu.infosys.lostAndFoundApplication.bean.LostFoundItems;

public interface LostFoundItemDao {
    public void save(LostFoundItems item);
    public List<LostFoundItems> findAll();
    public Long generateId();
    public List<LostFoundItems> lostItemList();
    public List<LostFoundItems> foundItemList();
    public LostFoundItems findById(Long id);
    public void deleteById(Long id);
    public List<LostFoundItems> lostItemListByUser(String username);
    public List<LostFoundItems> foundItemListByUser(String username);
}