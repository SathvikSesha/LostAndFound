package edu.infosys.lostAndFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostAndFoundApplication.bean.LostFoundItems;

public interface LostFoundItemRepository extends JpaRepository<LostFoundItems, Long> {

    @Query("SELECT max(itemId) from LostFoundItems")
    public Long findMaxId();

    @Query("SELECT a from LostFoundItems a where foundDate is null")
    public List<LostFoundItems> lostItemList();

    @Query("SELECT a from LostFoundItems a where foundDate is not null")
    public List<LostFoundItems> foundItemList();

    @Query("SELECT a from LostFoundItems a where foundDate is null and username = ?1")
    public List<LostFoundItems> lostItemListByUser(String username);

    @Query("SELECT a from LostFoundItems a where foundDate is not null and username = ?1")
    public List<LostFoundItems> foundItemListByUser(String username);
}