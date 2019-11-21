package com.yx.pwms.entity;

import java.util.Date;

public class Wages {
    private Integer wagesId;

    private String employeeId;

    private Date releaseTime;

    private Double basePay;

    private Double postWage;

    private Double jxw;

    private Double allowance;

    private Double bouns;

    private Double penalty;

    private Double eInsurance;

    private Double iInsurance;

    private Double uInsurance;

    private Double wInsurance;

    private Double mInsurance;

    private Double housingFund;

    private Double iitFeelsCold;

    private Double wageDeductedTax;

    public Wages() {
    }

    public Wages(Integer wagesId, String employeeId, Date releaseTime, Double basePay, Double postWage, Double jxw, Double allowance, Double bouns, Double penalty, Double eInsurance, Double iInsurance, Double uInsurance, Double wInsurance, Double mInsurance, Double housingFund, Double iitFeelsCold, Double wageDeductedTax) {
        this.wagesId = wagesId;
        this.employeeId = employeeId;
        this.releaseTime = releaseTime;
        this.basePay = basePay;
        this.postWage = postWage;
        this.jxw = jxw;
        this.allowance = allowance;
        this.bouns = bouns;
        this.penalty = penalty;
        this.eInsurance = eInsurance;
        this.iInsurance = iInsurance;
        this.uInsurance = uInsurance;
        this.wInsurance = wInsurance;
        this.mInsurance = mInsurance;
        this.housingFund = housingFund;
        this.iitFeelsCold = iitFeelsCold;
        this.wageDeductedTax = wageDeductedTax;
    }

    public Integer getWagesId() {
        return wagesId;
    }

    public void setWagesId(Integer wagesId) {
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

    public Double getBasePay() {
        return basePay;
    }

    public void setBasePay(Double basePay) {
        this.basePay = basePay;
    }

    public Double getPostWage() {
        return postWage;
    }

    public void setPostWage(Double postWage) {
        this.postWage = postWage;
    }

    public Double getJxw() {
        return jxw;
    }

    public void setJxw(Double jxw) {
        this.jxw = jxw;
    }

    public Double getAllowance() {
        return allowance;
    }

    public void setAllowance(Double allowance) {
        this.allowance = allowance;
    }

    public Double getBouns() {
        return bouns;
    }

    public void setBouns(Double bouns) {
        this.bouns = bouns;
    }

    public Double getPenalty() {
        return penalty;
    }

    public void setPenalty(Double penalty) {
        this.penalty = penalty;
    }

    public Double geteInsurance() {
        return eInsurance;
    }

    public void seteInsurance(Double eInsurance) {
        this.eInsurance = eInsurance;
    }

    public Double getiInsurance() {
        return iInsurance;
    }

    public void setiInsurance(Double iInsurance) {
        this.iInsurance = iInsurance;
    }

    public Double getuInsurance() {
        return uInsurance;
    }

    public void setuInsurance(Double uInsurance) {
        this.uInsurance = uInsurance;
    }

    public Double getwInsurance() {
        return wInsurance;
    }

    public void setwInsurance(Double wInsurance) {
        this.wInsurance = wInsurance;
    }

    public Double getmInsurance() {
        return mInsurance;
    }

    public void setmInsurance(Double mInsurance) {
        this.mInsurance = mInsurance;
    }

    public Double getHousingFund() {
        return housingFund;
    }

    public void setHousingFund(Double housingFund) {
        this.housingFund = housingFund;
    }

    public Double getIitFeelsCold() {
        return iitFeelsCold;
    }

    public void setIitFeelsCold(Double iitFeelsCold) {
        this.iitFeelsCold = iitFeelsCold;
    }

    public Double getWageDeductedTax() {
        return wageDeductedTax;
    }

    public void setWageDeductedTax(Double wageDeductedTax) {
        this.wageDeductedTax = wageDeductedTax;
    }
}