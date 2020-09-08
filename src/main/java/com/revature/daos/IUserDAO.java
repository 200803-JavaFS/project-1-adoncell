package com.revature.daos;

import java.util.List;

import com.revature.models.User;

public interface IUserDAO {

	public boolean update(User u);

	public User findById(int id);

	public User findByUsername(String username);

	public User validUser(String username, String password);

	public List<User> findAll();

	public List<User> findByRole(int roleId);

}
