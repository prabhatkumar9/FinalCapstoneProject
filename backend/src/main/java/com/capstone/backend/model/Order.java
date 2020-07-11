package com.capstone.backend.model;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Entity
@Table(name="orderdetails")
public class Order{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	@Size(max = 20)
	private String name;

	
	@Size(max = 50)
	private String address;

	
	@Size(max = 10)
	private Long number;

	
	@Size(max = 20)
	private String orderDate;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinTable(	name = "orderdetails_payment", 
	joinColumns = @JoinColumn(name = "orderdetails_id"), 
	inverseJoinColumns = @JoinColumn(name = "payment_id"))
	private Payment payment;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "orderdetails_customer", 
	joinColumns = @JoinColumn(name = "orderdetails_id"), 
	inverseJoinColumns = @JoinColumn(name = "product_id"))
	private Set<Product> products = new HashSet<>();


	public Order() {

	}

	public Order(String name, String address,Long number) {
		this.name = name;
		this.number = number;
		this.address = address;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public Long getNumber() {
		return number;
	}


	public void setNumber(Long number) {
		this.number = number;
	}


	public String getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}


	public Set<Product> getProducts() {
		return products;
	}


	public void setProducts(Set<Product> products) {
		this.products = products;
	}



}
