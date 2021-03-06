package com.yx.pwms.entity;


import java.sql.Date;

public class RewardAndPunishment {

  private long serialNumber;
  private String employeeId;
  private java.sql.Date recodingTime;
  private String information;
  private double reward;
  private double punishment;

  public RewardAndPunishment() {
  }

  public RewardAndPunishment(long serialNumber, String employeeId, Date recodingTime, String information, double reward, double punishment) {
    this.serialNumber = serialNumber;
    this.employeeId = employeeId;
    this.recodingTime = recodingTime;
    this.information = information;
    this.reward = reward;
    this.punishment = punishment;
  }


  public long getSerialNumber() {
    return serialNumber;
  }

  public void setSerialNumber(long serialNumber) {
    this.serialNumber = serialNumber;
  }


  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }


  public java.sql.Date getRecodingTime() {
    return recodingTime;
  }

  public void setRecodingTime(java.sql.Date recodingTime) {
    this.recodingTime = recodingTime;
  }


  public String getInformation() {
    return information;
  }

  public void setInformation(String information) {
    this.information = information;
  }


  public double getReward() {
    return reward;
  }

  public void setReward(double reward) {
    this.reward = reward;
  }


  public double getPunishment() {
    return punishment;
  }

  public void setPunishment(double punishment) {
    this.punishment = punishment;
  }

}
