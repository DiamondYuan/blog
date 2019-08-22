---
title: 为SpringBoot应用添加可以配置的拦截器
date: 2017-07-26 14:13:34
tags:
---

````java
@Configuration
@ConditionalOnExpression("${cache.response.enabled:false}")
public class FilterRegistrationBeanConfigration {
  @Bean
  public FilterRegistrationBean filterRegistrationBean() {
    return new FilterRegistrationBean() {{
      setFilter(new OncePerRequestFilter() {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
          HttpServletResponse responseToUse = new ContentCachingResponseWrapper(response);
          filterChain.doFilter(request, responseToUse);
          ((ContentCachingResponseWrapper) responseToUse).copyBodyToResponse();
        }
      });
    }};
  }
}
````

````properties
cache.response.enabled=true
````