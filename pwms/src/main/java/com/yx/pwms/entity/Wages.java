package com.yx.pwms.entity;


import java.sql.Date;

public class Wages {

  private Long wagesId;
  private String employeeId;
  private java.sql.Date releaseTime;
  private double persion;
  private double eInsurance;
  private double iInsurance;
  private double fund;
  private double subsidy;
  private double oAdd;
  private double oBuckle;
  private double total;

  public Wages() {
  }

  public Wages(Long wagesId, String employeeId, Date releaseTime, double persion, double eInsurance, double iInsurance, double fund, double subsidy, double oAdd, double oBuckle, double total) {
    this.wagesId = wagesId;
    this.employeeId = employeeId;
    this.releaseTime = releaseTime;
    this.persion = persion;
    this.eInsurance = eInsurance;
    this.iInsurance = iInsurance;
    this.fund = fund;
    this.subsidy = subsidy;
    this.oAdd = oAdd;
    this.oBuckle = oBuckle;
    this.total = total;
  }

  public Long getWagesId() {
    return wagesId;
  }

  public void setWagesId(Long wagesId) {
    this.wagesId = wagesId;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public Date getReleaseTime() {
    return releaseTime;
  }

  public void setReleaseTime(Date releaseTime) {
    this.releaseTime = releaseTime;
  }

  public double getPersion() {
    return persion;
  }

  public void setPersion(double persion) {
    this.persion = persion;
  }

  public double geteInsurance() {
    return eInsurance;
  }

  public void seteInsurance(double eInsurance) {
    this.eInsurance = eInsurance;
  }

  public double getiInsurance() {
    return iInsurance;
  }

  public void setiInsurance(double iInsurance) {
    this.iInsurance = iInsurance;
  }

  public double getFund() {
    return fund;
  }

  public void setFund(double fund) {
    this.fund = fund;
  }

  public double getSubsidy() {
    return subsidy;
  }

  public void setSubsidy(double subsidy) {
    this.subsidy = subsidy;
  }

  public double getoAdd() {
    return oAdd;
  }

  public void setoAdd(double oAdd) {
    this.oAdd = oAdd;
  }

  public double getoBuckle() {
    return oBuckle;
  }

  public void setoBuckle(double oBuckle) {
    this.oBuckle = oBuckle;
  }

  public double getTotal() {
    return total;
  }

  public void setTotal(double total) {
    this.total = total;
  }
}
