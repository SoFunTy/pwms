package com.yx.pwms.entity;


import java.sql.Date;

public class Wages {

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

  public Wages(String employeeId, Date releaseTime, double persion, double eInsurance, double iInsurance, double fund, double subsidy, double oAdd, double oBuckle, double total) {
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


  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }


  public java.sql.Date getReleaseTime() {
    return releaseTime;
  }

  public void setReleaseTime(java.sql.Date releaseTime) {
    this.releaseTime = releaseTime;
  }


  public double getPersion() {
    return persion;
  }

  public void setPersion(double persion) {
    this.persion = persion;
  }


  public double getEInsurance() {
    return eInsurance;
  }

  public void setEInsurance(double eInsurance) {
    this.eInsurance = eInsurance;
  }


  public double getIInsurance() {
    return iInsurance;
  }

  public void setIInsurance(double iInsurance) {
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


  public double getOAdd() {
    return oAdd;
  }

  public void setOAdd(double oAdd) {
    this.oAdd = oAdd;
  }


  public double getOBuckle() {
    return oBuckle;
  }

  public void setOBuckle(double oBuckle) {
    this.oBuckle = oBuckle;
  }


  public double getTotal() {
    return total;
  }

  public void setTotal(double total) {
    this.total = total;
  }

}
