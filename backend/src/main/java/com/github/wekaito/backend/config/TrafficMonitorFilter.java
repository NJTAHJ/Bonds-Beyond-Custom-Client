package com.github.wekaito.backend.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.zip.GZIPOutputStream;

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
                byte[] content = responseWrapper.getContentAsByteArray();
                long wireBytes = content.length;

                String acceptEncoding = httpRequest.getHeader("Accept-Encoding");
                String contentType = httpResponse.getContentType();

                // Calculate actual Gzip compressed wire size for JSON, JS, CSS, and HTML responses
                if (acceptEncoding != null && acceptEncoding.contains("gzip") && isCompressible(contentType) && content.length > 1024) {
                    try {
                        ByteArrayOutputStream baos = new ByteArrayOutputStream();
                        try (GZIPOutputStream gzos = new GZIPOutputStream(baos)) {
                            gzos.write(content);
                        }
                        wireBytes = baos.size();
                    } catch (Exception ignored) {
                        wireBytes = content.length;
                    }
                }
                
                statsMap.computeIfAbsent(uri, k -> new EndpointStat());
                statsMap.get(uri).count.incrementAndGet();
                statsMap.get(uri).totalBytes.addAndGet(wireBytes);
                
                responseWrapper.copyBodyToResponse();
            }
        } else {
            chain.doFilter(request, response);
        }
    }

    private boolean isCompressible(String contentType) {
        if (contentType == null) return true;
        String ct = contentType.toLowerCase();
        return ct.contains("json") || ct.contains("javascript") || ct.contains("text") || ct.contains("html") || ct.contains("css") || ct.contains("xml");
    }
}
