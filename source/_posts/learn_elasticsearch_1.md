---
title: Elasticsearch 入门教程（1） 安装 Elasticsearch 与 Kibana
date: 2018-03-26 23:37:37
tags:
- Elasticsearch
- java
---

本文基于版本 6.1.1

Elasticsearch 是基于 Lucene 的开源搜索引擎。封装了底层 Lucene 的接口并且提供了 REST API 的接口。开箱即用。

## 使用 docker 安装

用 docker-compose 部署最为方便。把下面的内容保存到 docker-compose.yaml 中，然后执行 `docker-compose up -d` 就可以启动容器。

```yaml
version: '2'
services:
  elasticsearch:
    image: registry.cn-hongkong.aliyuncs.com/yfd-ci/es-docker-image:v2018037
    container_name: elasticsearch
    hostname: elasticsearch
    restart: always
    networks:
      - elk
    environment:
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms1024m -Xmx1024m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata1:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
      - 9300:9300
  kibana:
    image: registry.cn-hongkong.aliyuncs.com/yfd-ci/kibana-docker-image:v20180327-2
    container_name: kibana
    networks:
      - elk
    depends_on:
      - elasticsearch
    environment:
      SERVER_NAME: kibana
      ELASTICSEARCH_URL: http://elasticsearch:9200
    ports:
      - 5601:5601
volumes:
  esdata1:
    driver: local
networks:
  elk:
    driver: bridge
```


构建镜像的 Dockerfile 分别 如下

```
FROM docker.elastic.co/kibana/kibana-oss:6.1.1
```

```dockerfile
FROM docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.1

RUN cd /usr/share/elasticsearch/ && \
    ./bin/elasticsearch-plugin install  https://github.com/medcl/elasticsearch-analysis-pinyin/releases/download/v6.1.1/elasticsearch-analysis-pinyin-6.1.1.zip && \
    ./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.1.1/elasticsearch-analysis-ik-6.1.1.zip \
    && mv /usr/share/elasticsearch/plugins/analysis-ik/ /usr/share/elasticsearch/plugins/ik/
```

如果运行成功，那么 es 会在本地的9200端口运行。用 curl 请求9200端口，可以获取当前集群的名称，版本等信息。

```shell
curl localhost:9200
{
  "name" : "OFyyM08",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "tEBFzeLWT5uuCas17Z0Waw",
  "version" : {
    "number" : "6.1.1",
    "build_hash" : "bd92e7f",
    "build_date" : "2017-12-17T20:23:25.338Z",
    "build_snapshot" : false,
    "lucene_version" : "7.1.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```



访问 localhost:5601 就可以看到 Kibana 的页面了

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fprfc2bautj31kw0zkn6j.jpg)





## 注意点

### max virtual memory areas vm.max*map*count [65530] is too low

如果执行失败 出现 `max virtual memory areas vm.max*map*count [65530] is too low` 的错误。需要执行下面的命令。

```shell
sudo sysctl -w vm.max_map_count=262144
```