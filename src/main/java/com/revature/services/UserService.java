package com.revature.services;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.revature.daos.IUserDAO;
import com.revature.daos.UserDAO;
import com.revature.models.User;

public class UserService {
	
	private static final Logger log = LogManager.getLogger(UserService.class);
	private static IUserDAO iu = new UserDAO();
	
	public boolean update(User u) {
		log.info("Updating user (" + u + ") from ers_users");
		return iu.update(u);
	}
	
	public User findById(int id) {
		log.info("Returning user from ers_users with id: " + id);
		return iu.findById(id);
	}

	public User findByUsername(String username) {
		log.info("Returning user from ers_users with username: " + username);
		return iu.findByUsername(username);
	}
	
	public User findByLoginInfo(String username, String password) {
		log.info("Returning user from ers_users with username of " + username + " and password of " + password);
		return iu.validUser(username, password);
	}
	
	public List<User> findAll() {
		log.info("Returning all users from ers_users");
		return iu.findAll();
	}
	
	public List<User> findByRole(int roleId) {
		log.info("Returning all users from ers_users with role ID: " + roleId);
		return iu.findByRole(roleId);
	}
	
}
