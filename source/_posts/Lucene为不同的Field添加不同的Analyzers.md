---
title: 'Lucene为不同的Field添加不同的Analyzers'
date: 2017-06-04 10:00:30
tags: 
- Luecne
categories:
- 个人总结
---

## Lucene为不同的Field添加不同的Analyzers

可以利用Lucene自带PerFieldAnalyzerWrapper。

````java
Analyzer defaultAnalyzer = new PinyinAnalyzer();
Map<String,Analyzer> fieldAnalyzers = new HashMap<>();
//Defines an analyzer to use for the specified field.
fieldAnalyzers.put("name",new StandardAnalyzer());
fieldAnalyzers.put("fieldName",new SmartChineseAnalyzer());
PerFieldAnalyzerWrapper analyzerWrapper = new PerFieldAnalyzerWrapper(defaultAnalyzer,fieldAnalyzers);
````

但是这样创建了以后就不能动态修改了，在早期的Lucene版本中PerFieldAnalyzerWrappers是自带addAnalyzer的方法的，在最新版本fieldAnalyzers的权限变成了private final。不过没关系，可以用反射的方法来获取fieldAnalyzers。

````java
private PerFieldAnalyzerWrapper analyzerWrapper;

  PerFieldAnalyzerWrapper getAnalyzerWrapper() {
    if (analyzerWrapper == null) {
      analyzerWrapper = new PerFieldAnalyzerWrapper(new PinyinAnalyzer());
    }
    return analyzerWrapper;
  }


  void addNewAnalyzer(String fieldName, Analyzer analyzer) {
    PerFieldAnalyzerWrapper wrapper = getAnalyzerWrapper();
    Map<String, Analyzer> map = new HashMap<>();
    try {
      Field field = PerFieldAnalyzerWrapper.class.getDeclaredField("fieldAnalyzers");
      field.setAccessible(true);
      if (!field.get(wrapper).equals(new HashMap<>())) {
        map = (Map<String, Analyzer>) field.get(wrapper);
      }
      map.put(fieldName, analyzer);
    } catch (Exception e) {
      e.printStackTrace();
    }
    analyzerWrapper = new PerFieldAnalyzerWrapper(new PinyinAnalyzer(), map);
  }
````

