package com.github.wekaito.backend.controllers;

import com.github.wekaito.backend.config.TrafficMonitorFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/traffic")
public class AdminTrafficController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getTrafficStats() {
        List<Map<String, Object>> result = new ArrayList<>();
        
        TrafficMonitorFilter.getStatsMap().forEach((uri, stat) -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("uri", uri);
            entry.put("count", stat.count.get());
            entry.put("bytes", stat.totalBytes.get());
            result.add(entry);
        });
        
        result.sort((a, b) -> Long.compare((Long) b.get("bytes"), (Long) a.get("bytes")));
        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearTrafficStats() {
        TrafficMonitorFilter.clearStats();
        return ResponseEntity.ok().build();
    }
}
