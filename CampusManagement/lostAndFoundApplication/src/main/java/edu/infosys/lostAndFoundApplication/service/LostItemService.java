package edu.infosys.lostAndFoundApplication.service;
import edu.infosys.lostAndFoundApplication.bean.LostItem;
import edu.infosys.lostAndFoundApplication.dao.LostItemDao;
import edu.infosys.lostAndFoundApplication.dao.LostItemRepository;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LostItemService {

    @Autowired
    private LostItemDao lostItemDao;
    
    @Autowired
	private LostItemRepository repository;
    private final LevenshteinDistance levenshtein = new LevenshteinDistance();

    public List<LostItem> keywordSearch(String keyword) {
        return repository.searchByKeyword(keyword);
    }
    
    public List<LostItem> fuzzySearch(String keyword) {
        List<LostItem> all = repository.findAll();
        return all.stream()
                .filter(l ->
                        isSimilarField(l.getItemName(), keyword) ||
                        isSimilarField(l.getColor(), keyword) ||
                        isSimilarField(l.getBrand(), keyword) ||
                        isSimilarField(l.getLocation(), keyword) ||
                        isSimilarField(l.getCategory(), keyword)
                ).collect(Collectors.toList());
    }


    private boolean isSimilarField(String field, String keyword) {
        if (field == null) return false;
        String[] tokens = field.split("\\s+"); // split by space
        for (String token : tokens) {
            int distance = levenshtein.apply(token.toLowerCase(), keyword.toLowerCase());
            if (distance <= 2) {  // allow small typo/misspelling
                return true;
            }
        }
        return false;
    }
    
    public synchronized String generateNextLostItemId() {
        Long maxId = lostItemDao.findMaxIdNumber();
        long nextId = (maxId == null) ? 1 : maxId + 1;
        return String.format("L%04d", nextId);
    }

    public LostItem addLostItem(LostItem lostItem) {
        lostItem.setLostItemId(generateNextLostItemId());
        return lostItemDao.save(lostItem);
    }

    public List<LostItem> getAllLostItems() {
        return lostItemDao.findAll();
    }



    public Optional<LostItem> getLostItemById(String id) {
        return lostItemDao.findById(id);
    }

    public void deleteLostItem(String id) {
        lostItemDao.deleteById(id);
    }

    public List<LostItem> getLostItemsByUsername(String username) {
        return lostItemDao.findByUsername(username);
    }
}