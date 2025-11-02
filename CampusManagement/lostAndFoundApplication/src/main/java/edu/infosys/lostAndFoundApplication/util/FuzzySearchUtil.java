package edu.infosys.lostAndFoundApplication.util;

import org.apache.commons.text.similarity.JaroWinklerSimilarity;
import org.apache.commons.text.similarity.LevenshteinDistance;

public class FuzzySearchUtil {

    private static final JaroWinklerSimilarity JARO = new JaroWinklerSimilarity();
    private static final LevenshteinDistance LEV = new LevenshteinDistance();

    /**
     * Returns true if the field should be considered a match for query.
     * Strategy:
     *  - null-safe
     *  - exact contains / token prefix
     *  - Jaro-Winkler similarity check (threshold)
     *  - normalized Levenshtein similarity check (threshold)
     */
    public static boolean isFuzzyMatch(String field, String query, double threshold) {
        if (field == null || query == null) return false;

        String f = field.trim().toLowerCase();
        String q = query.trim().toLowerCase();

        if (f.isEmpty() || q.isEmpty()) return false;

        if (f.contains(q)) return true;
        String[] tokens = f.split("\\s+|[_\\-.,/]");

        for (String token : tokens) {
            if (token.startsWith(q)) return true;
            Double jaroScore = JARO.apply(token, q);
            if (jaroScore != null && jaroScore >= threshold) return true;

            Integer dist = LEV.apply(token, q);
            if (dist != null) {
                int maxLen = Math.max(token.length(), q.length());
                if (maxLen > 0) {
                    double levSim = 1.0 - ((double) dist / maxLen);
                    if (levSim >= threshold) return true;
                }
            }
        }

        return false;
    }

    public static boolean isFuzzyMatch(String field, String query) {
        return isFuzzyMatch(field, query, 0.72);
    }
}
