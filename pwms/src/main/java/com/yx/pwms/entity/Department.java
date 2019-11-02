package com.yx.pwms.entity;

/**
 * create by: xubi
 * create time: 2019-10-24
 */
public class Department {

  private String departmentId;
  private String departmentName;
  private String departmentCharge;

  public Department(String departmentId, String departmentName, String departmentCharge) {
    this.departmentId = departmentId;
    this.departmentName = departmentName;
    this.departmentCharge = departmentCharge;
  }

  public Department() {
  }


  public String getDepartmentId() {
    return departmentId;
  }

  public void setDepartmentId(String departmentId) {
    this.departmentId = departmentId;
  }


  public String getDepartmentName() {
    return departmentName;
  }

  public void setDepartmentName(String departmentName) {
    this.departmentName = departmentName;
  }


  public String getDepartmentCharge() {
    return departmentCharge;
  }

  public void setDepartmentCharge(String departmentCharge) {
    this.departmentCharge = departmentCharge;
  }

}
