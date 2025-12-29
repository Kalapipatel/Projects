package com.HubControl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean; // Import this
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class HubControlApplication {

	public static void main(String[] args) {

		SpringApplication.run(HubControlApplication.class, args);

	}

//	// Add this temporary bean
//	@Bean
//	public CommandLineRunner run() {
//		return args -> {
//			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//			String rawPassword = "12345";
//			String encodedPassword = encoder.encode(rawPassword);
//			System.out.println("==========================================");
//			System.out.println("GENERATED HASH FOR '12345':");
//			System.out.println(encodedPassword);
//			System.out.println("==========================================");
//		};
//	}
}
