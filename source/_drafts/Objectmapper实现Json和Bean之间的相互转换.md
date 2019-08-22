### Objectmapper实现Json和Bean之间的相互转换



```java
  @GetMapping(path = "{id}")
  @ApiOperation(value = "根据订单ID获取订单信息", notes = "根据订单ID获取订单信息", produces = "application/json")
  public ResultWrapper<SurgeryOrder> getById(
    @ApiParam(value = "ID号", required = true) @PathVariable(value = "id") Integer id
  ) throws GenericException, IllegalArgumentException {
    try {
      System.out.println(surgeryOrderMapper.getById(id).getMedicalRecordPictures());
      return new ResultWrapper<>(surgeryOrderMapper.getById(id));
    } catch (Exception e) {
      throw new GenericException("2298001", e.getMessage());
    }
  }
```

![](https://ws2.sinaimg.cn/large/006tNc79gy1fiiwp75imdj315o15oqca.jpg)