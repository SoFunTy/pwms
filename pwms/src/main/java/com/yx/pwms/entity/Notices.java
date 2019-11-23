package com.yx.pwms.entity;

import java.sql.Date;

/**
 * create by: xubi
 * create time: 2019-10-24
 */
public class Notices {

  private long noticesId;
  private java.sql.Date noticesDate;
  private String notices;
  private String state;

  public Notices() {
  }

  public Notices(long noticesId, Date noticesDate, String notices, String state) {
    this.noticesId = noticesId;
    this.noticesDate = noticesDate;
    this.notices = notices;
    this.state = state;
  }


  public long getNoticesId() {
    return noticesId;
  }

  public void setNoticesId(long noticesId) {
    this.noticesId = noticesId;
  }


  public java.sql.Date getNoticesDate() {
    return noticesDate;
  }

  public void setNoticesDate(java.sql.Date noticesDate) {
    this.noticesDate = noticesDate;
  }


  public String getNotices() {
    return notices;
  }

  public void setNotices(String notices) {
    this.notices = notices;
  }


  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

}
