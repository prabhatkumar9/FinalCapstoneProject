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


@Entity
@Table(name="customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinTable(	name = "customer_user", 
				joinColumns = @JoinColumn(name = "customer_id"), 
				inverseJoinColumns = @JoinColumn(name = "user_id"))
	private User user;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "customer_orderdetails", 
				joinColumns = @JoinColumn(name = "customer_id"), 
				inverseJoinColumns = @JoinColumn(name = "orderdetails_id"))
	private Set<Order> orders = new HashSet<>();
	
	public Customer() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Order> getOrders() {
		return orders;
	}

	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	

}
