package com.github.wekaito.backend.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class TrafficMonitorFilter implements Filter {

    public static class EndpointStat {
        public final AtomicLong count = new AtomicLong(0);
        public final AtomicLong totalBytes = new AtomicLong(0);
    }

    private static final Map<String, EndpointStat> statsMap = new ConcurrentHashMap<>();

    public static Map<String, EndpointStat> getStatsMap() {
        return statsMap;
    }

    public static void clearStats() {
        statsMap.clear();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        if (request instanceof HttpServletRequest httpRequest && response instanceof HttpServletResponse httpResponse) {
            ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(httpResponse);
            
            try {
                chain.doFilter(request, responseWrapper);
            } finally {
                String uri = httpRequest.getRequestURI();
                long bytes = responseWrapper.getContentSize();
                
                statsMap.computeIfAbsent(uri, k -> new EndpointStat());
                statsMap.get(uri).count.incrementAndGet();
                statsMap.get(uri).totalBytes.addAndGet(bytes);
                
                responseWrapper.copyBodyToResponse();
            }
        } else {
            chain.doFilter(request, response);
        }
    }
}
