package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import edu.infosys.lostAndFoundApplication.bean.LostFoundItem;

public interface LostFoundItemDao {
    public void save(LostFoundItem item);
    public List<LostFoundItem> findAll();
    public Long generateId();
    public List<LostFoundItem> lostItemList();
    public List<LostFoundItem> foundItemList();
    public LostFoundItem findById(Long id);
    public void deleteById(Long id);
    public List<LostFoundItem> lostItemListByUser(String username);
    public List<LostFoundItem> foundItemListByUser(String username);
}