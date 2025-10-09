package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostAndFoundApplication.bean.LostFoundItem;

public interface LostFoundItemRepository extends JpaRepository<LostFoundItem, Long> {

    @Query("SELECT max(itemId) from LostFoundItem")
    public Long findMaxId();

    @Query("SELECT a from LostFoundItem a where foundDate is null")
    public List<LostFoundItem> lostItemList();

    @Query("SELECT a from LostFoundItem a where foundDate is not null")
    public List<LostFoundItem> foundItemList();

    @Query("SELECT a from LostFoundItem a where foundDate is null and username = ?1")
    public List<LostFoundItem> lostItemListByUser(String username);

    @Query("SELECT a from LostFoundItem a where foundDate is not null and username = ?1")
    public List<LostFoundItem> foundItemListByUser(String username);
}