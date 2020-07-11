package com.capstone.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.model.Customer;
import com.capstone.backend.model.Order;
import com.capstone.backend.model.Payment;
import com.capstone.backend.repository.CustomerRepository;
import com.capstone.backend.repository.OrderRepository;
import com.capstone.backend.repository.PaymentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path= "/pay")
public class PaymentController {

	@Autowired
	PaymentRepository payRepo;
	
	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	CustomerRepository customerRepo;
	
	
	@PostMapping("/savePay")
	public Payment savePayment(@RequestBody Payment payment) {
		return payRepo.save(payment);
	}
	
	@PostMapping("/saveOrder")
	public Order saveOrder(@RequestBody Order order) {
		return orderRepo.save(order);
	}
	
	
	@PostMapping("/updateCustomer")
	public Customer updateCustomerDetails(@RequestBody Customer customer) {
		return customerRepo.save(customer);
	}
	

}
