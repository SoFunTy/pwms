package com.yx.pwms.entity;
/**
 * create by: xubi
 * create time: 2019-10-24
 */
public class Positions {

  private String positionId;
  private Department departmentId;
  private String positionName;
  private double positionBasePay;

  public Positions() {
  }

  public Positions(String positionId, Department departmentId,  String positionName, double positionBasePay) {
    this.positionId = positionId;
    this.departmentId = departmentId;
    this.positionName = positionName;
    this.positionBasePay = positionBasePay;
  }

  public String getPositionId() {
    return positionId;
  }

  public void setPositionId(String positionId) {
    this.positionId = positionId;
  }

  public Department getDepartmentId() {
    return departmentId;
  }

  public void setDepartmentId(Department departmentId) {
    this.departmentId = departmentId;
  }

  public String getPositionName() {
    return positionName;
  }

  public void setPositionName(String positionName) {
    this.positionName = positionName;
  }

  public double getPositionBasePay() {
    return positionBasePay;
  }

  public void setPositionBasePay(double positionBasePay) {
    this.positionBasePay = positionBasePay;
  }
}
