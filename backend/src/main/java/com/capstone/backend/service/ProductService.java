package com.capstone.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.model.Product;
import com.capstone.backend.repository.ProductRepository;




@Service
public class ProductService {

	@Autowired
	ProductRepository productrepo;
	
	public List<Product> getProducts(){
		System.out.println("thi is working");
		return productrepo.findAll();
	}
	
	public Product AddNewProduct(Product product) {
		 return productrepo.save(product);
	}

	public Product getProductbyId(long productId){
		return productrepo.findById(productId).orElse(null);
	}
	
	
	public String deleteProduct(long pid) {
		 productrepo.deleteById(pid);
		 return "deleted";
	}
	
//	public Product updateProduct(Product product) {
//		return productrepo.save(product);
//	}
	
	
	public Product updateProduct(Product product) {
		// new Object of product created and get values through argument product
		Product updatedProduct = productrepo.findById(product.getProductid()).orElse(null);
		updatedProduct.setProductname(product.getProductname());
		updatedProduct.setPrice(product.getPrice());
		updatedProduct.setDescription(product.getDescription());
		updatedProduct.setStock(product.getStock());
		updatedProduct.setListed(product.getListed());
		return productrepo.save(updatedProduct);
	}
}
