package com.revature.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.revature.models.LoginDTO;

public class LoginService {
	
	private static final Logger log = LogManager.getLogger(LoginService.class);
	private static UserService us = new UserService();
	
	public boolean login(LoginDTO l) {
		
		String username = l.username;
		String password = l.password;
		
		StringBuilder sb = new StringBuilder();
		sb.append(password.hashCode());
		String hashed = sb.toString();
		
		if (us.findByLoginInfo(username, hashed) != null) {
			log.info("Logging in user: " + username);
			return true;
		} else {
			return false;
		}
		
	}

}
