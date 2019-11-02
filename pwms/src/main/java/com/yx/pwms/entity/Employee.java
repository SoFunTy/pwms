package com.yx.pwms.entity;


import java.sql.Date;

public class Employee {

  private String employeeId;
  private String email;
  private String epassword;
  private Positions positionId;
  private String oinTime;
  private String employeeName;
  private DataDictionary sex;
  private long age;
  private DataDictionary nattional;
  private DataDictionary natives01;
  private DataDictionary natives02;
  private DataDictionary pol;
  private String brith;
  private String idNumber;
  private DataDictionary education;
  private String university;
  private String major;
  private DataDictionary homeAddress1;
  private DataDictionary homeAddress2;
  private DataDictionary homeAddress3;
  private String homeNote;
  private String phone;
  private DataDictionary marriage;
  private DataDictionary health;
  private DataDictionary bloodType;
  private String note;
  private DataDictionary permission;
  private DataDictionary elock;
  private long headIcon;

  public Employee() {
  }

  public Employee(String employeeId, String email, String epassword, Positions positionId, String oinTime, String employeeName, DataDictionary sex, long age, DataDictionary nattional, DataDictionary natives01, DataDictionary natives02, DataDictionary pol, String brith, String idNumber, DataDictionary education, String university, String major, DataDictionary homeAddress1, DataDictionary homeAddress2, DataDictionary homeAddress3, String homeNote, String phone, DataDictionary marriage, DataDictionary health, DataDictionary bloodType, String note, DataDictionary permission, DataDictionary elock, long headIcon) {
    this.employeeId = employeeId;
    this.email = email;
    this.epassword = epassword;
    this.positionId = positionId;
    this.oinTime = oinTime;
    this.employeeName = employeeName;
    this.sex = sex;
    this.age = age;
    this.nattional = nattional;
    this.natives01 = natives01;
    this.natives02 = natives02;
    this.pol = pol;
    this.brith = brith;
    this.idNumber = idNumber;
    this.education = education;
    this.university = university;
    this.major = major;
    this.homeAddress1 = homeAddress1;
    this.homeAddress2 = homeAddress2;
    this.homeAddress3 = homeAddress3;
    this.homeNote = homeNote;
    this.phone = phone;
    this.marriage = marriage;
    this.health = health;
    this.bloodType = bloodType;
    this.note = note;
    this.permission = permission;
    this.elock = elock;
    this.headIcon = headIcon;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEpassword() {
    return epassword;
  }

  public void setEpassword(String epassword) {
    this.epassword = epassword;
  }

  public Positions getPositionId() {
    return positionId;
  }

  public void setPositionId(Positions positionId) {
    this.positionId = positionId;
  }

  public String getOinTime() {
    return oinTime;
  }

  public void setOinTime(String oinTime) {
    this.oinTime = oinTime;
  }

  public String getEmployeeName() {
    return employeeName;
  }

  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
  }

  public DataDictionary getSex() {
    return sex;
  }

  public void setSex(DataDictionary sex) {
    this.sex = sex;
  }

  public long getAge() {
    return age;
  }

  public void setAge(long age) {
    this.age = age;
  }

  public DataDictionary getNattional() {
    return nattional;
  }

  public void setNattional(DataDictionary nattional) {
    this.nattional = nattional;
  }

  public DataDictionary getNatives01() {
    return natives01;
  }

  public void setNatives01(DataDictionary natives01) {
    this.natives01 = natives01;
  }

  public DataDictionary getNatives02() {
    return natives02;
  }

  public void setNatives02(DataDictionary natives02) {
    this.natives02 = natives02;
  }

  public DataDictionary getPol() {
    return pol;
  }

  public void setPol(DataDictionary pol) {
    this.pol = pol;
  }

  public String getBrith() {
    return brith;
  }

  public void setBrith(String brith) {
    this.brith = brith;
  }

  public String getIdNumber() {
    return idNumber;
  }

  public void setIdNumber(String idNumber) {
    this.idNumber = idNumber;
  }

  public DataDictionary getEducation() {
    return education;
  }

  public void setEducation(DataDictionary education) {
    this.education = education;
  }

  public String getUniversity() {
    return university;
  }

  public void setUniversity(String university) {
    this.university = university;
  }

  public String getMajor() {
    return major;
  }

  public void setMajor(String major) {
    this.major = major;
  }

  public DataDictionary getHomeAddress1() {
    return homeAddress1;
  }

  public void setHomeAddress1(DataDictionary homeAddress1) {
    this.homeAddress1 = homeAddress1;
  }

  public DataDictionary getHomeAddress2() {
    return homeAddress2;
  }

  public void setHomeAddress2(DataDictionary homeAddress2) {
    this.homeAddress2 = homeAddress2;
  }

  public DataDictionary getHomeAddress3() {
    return homeAddress3;
  }

  public void setHomeAddress3(DataDictionary homeAddress3) {
    this.homeAddress3 = homeAddress3;
  }

  public String getHomeNote() {
    return homeNote;
  }

  public void setHomeNote(String homeNote) {
    this.homeNote = homeNote;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public DataDictionary getMarriage() {
    return marriage;
  }

  public void setMarriage(DataDictionary marriage) {
    this.marriage = marriage;
  }

  public DataDictionary getHealth() {
    return health;
  }

  public void setHealth(DataDictionary health) {
    this.health = health;
  }

  public DataDictionary getBloodType() {
    return bloodType;
  }

  public void setBloodType(DataDictionary bloodType) {
    this.bloodType = bloodType;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  public DataDictionary getPermission() {
    return permission;
  }

  public void setPermission(DataDictionary permission) {
    this.permission = permission;
  }

  public DataDictionary getElock() {
    return elock;
  }

  public void setElock(DataDictionary elock) {
    this.elock = elock;
  }

  public long getHeadIcon() {
    return headIcon;
  }

  public void setHeadIcon(long headIcon) {
    this.headIcon = headIcon;
  }
}
