package com.capstone.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.model.Product;
import com.capstone.backend.service.ProductService;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path= "/product")
public class ProductController {	

	@Autowired
	private ProductService productservice ;

	@GetMapping("/get")
	public List<Product> getProducts(){
		return productservice.getProducts();
	}

	@PostMapping("/add")
	public Product AddNewProduct(@RequestBody Product product) {
		return productservice.AddNewProduct(product);
	}

	@GetMapping("/get/{pid}")
	public Product getProductById(@PathVariable("pid") Long productId){
		return productservice.getProductbyId(productId);
	}

	@PutMapping("/update")
	public Product updateProduct(@RequestBody Product product) {
		return productservice.updateProduct(product);	
	}

	@DeleteMapping("/delete/{pid}")
	public String deleteProduct(@PathVariable("pid") Long productId) {
		return  productservice.deleteProduct(productId);

	}

}
