package edu.infosys.lostAndFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import edu.infosys.lostAndFoundApplication.bean.LostFoundItems;
import edu.infosys.lostAndFoundApplication.dao.LostFoundItemDao;
import edu.infosys.lostAndFoundApplication.service.CampusUserService;
@RestController
@RequestMapping("/lost-found/")
@CrossOrigin(origins = "http://localhost:3939")
public class LostFoundItemController {
	  @Autowired
	  private LostFoundItemDao lostFoundItemDao;
	  @Autowired
	  private CampusUserService service;
	  @GetMapping("/item")
	  public List<LostFoundItems> getAllItems(){
		  return lostFoundItemDao.findAll();
	  }
	  
	  @PostMapping("/item")
	  public void lostItemSubmission(@RequestBody LostFoundItems lostItem) {
		  lostItem.setFoundDate(null);
		  lostFoundItemDao.save(lostItem);
	  }
	  @PutMapping("/item")
	  public void foundItemSubmission(@RequestBody LostFoundItems lostItem) {
		   lostFoundItemDao.save(lostItem);
	  }
	  @GetMapping("/item/{id}")
	  public LostFoundItems getItemById(@PathVariable Long id){
		  return lostFoundItemDao.findById(id);
	  }
	  @DeleteMapping("/item/{id}")
	  public void deleteItemById(@PathVariable Long id) {
		  lostFoundItemDao.deleteById(id);
	  }
	 
	  @GetMapping("/id-gen")
		public Long itemIdGenerator() {
			return lostFoundItemDao.generateId();
		}
	  @GetMapping("/not-found")
		public List<LostFoundItems> lostItemList() {
			
			return lostFoundItemDao.lostItemList();
		}
	 
	  @GetMapping("/found")
		public List<LostFoundItems> foundItemList() {
			// TODO Auto-generated method stub
			return lostFoundItemDao.foundItemList();
		}
	 
	  @GetMapping("/lost")
	  public List<LostFoundItems> lostItemListByUser() {
	      String username = service.getUserId();
	      return lostFoundItemDao.lostItemListByUser(username);
	  }

	  @GetMapping("/lostfound")
	  public List<LostFoundItems> foundItemListByUser() {
	      String username = service.getUserId();
	      return lostFoundItemDao.foundItemListByUser(username);
	  }
	  
//	  @PatchMapping("/item/{id}/found-date")
//	  public void updateFoundDate(@PathVariable Long id, @RequestBody String foundDate) {
//	      LostFoundItems item = lostFoundItemDao.findById(id).orElse(null);
//	      if(item != null){
//	          item.setFoundDate(foundDate.replace("\"","")); // clean quotes
//	          lostFoundItemDao.save(item);
//	      }
//	  }


}