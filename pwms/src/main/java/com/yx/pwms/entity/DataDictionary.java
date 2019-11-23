package com.yx.pwms.entity;


public class DataDictionary {

  private long dicId;
  private String dicNote;
  private String dicValue;
  private String dicRelation;

  public DataDictionary() {
  }

  public DataDictionary(long dicId, String dicNote, String dicValue, String dicRelation) {
    this.dicId = dicId;
    this.dicNote = dicNote;
    this.dicValue = dicValue;
    this.dicRelation = dicRelation;
  }

  public DataDictionary(long dicId, String dicNote, String dicValue) {
    this.dicId = dicId;
    this.dicNote = dicNote;
    this.dicValue = dicValue;
  }

  public DataDictionary(String dicNote, String dicValue, String dicRelation) {
    this.dicNote = dicNote;
    this.dicValue = dicValue;
    this.dicRelation = dicRelation;
  }

  public DataDictionary(String dicNote, String dicValue) {
    this.dicNote = dicNote;
    this.dicValue = dicValue;
  }


  public long getDicId() {
    return dicId;
  }

  public void setDicId(long dicId) {
    this.dicId = dicId;
  }


  public String getDicNote() {
    return dicNote;
  }

  public void setDicNote(String dicNote) {
    this.dicNote = dicNote;
  }


  public String getDicValue() {
    return dicValue;
  }

  public void setDicValue(String dicValue) {
    this.dicValue = dicValue;
  }


  public String getDicRelation() {
    return dicRelation;
  }

  public void setDicRelation(String dicRelation) {
    this.dicRelation = dicRelation;
  }

}
