package com.revature.daos;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.models.User;
import com.revature.utils.HibernateUtil;

public class UserDAO implements IUserDAO {

	public UserDAO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public boolean update (User u) {
		Session ses = HibernateUtil.getSession();
		Transaction tx = ses.beginTransaction();
		
		try {
			ses.merge(u);
			tx.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public User findById(int id) {
		Session ses = HibernateUtil.getSession();
		User u = ses.get(User.class, id);
		return u;
	}
	
	@Override
	public User findByUsername(String username) {
		Session ses = HibernateUtil.getSession();
		User u = ses.createQuery("FROM User WHERE username = '" + username + "'", User.class).uniqueResult();
		return u;
	}
	
	@Override
	public User validUser(String username, String password) {
		Session ses = HibernateUtil.getSession();
		
		User u = findByUsername(username);
		User p = ses.createQuery("FROM User WHERE password = '" + password + "'", User.class).uniqueResult();
		
		if (u == p) {
			return u;
		} else {
			return null;
		}
		
	}
	
	@Override
	public List<User> findAll() {
		Session ses = HibernateUtil.getSession();
		List<User> list = ses.createQuery("FROM User", User.class).list();
		return list;
	}
	
	@Override
	public List<User> findByRole(int roleId) {
		Session ses = HibernateUtil.getSession();
		List<User> list = ses.createQuery("From User WHERE role = " + roleId, User.class).list();
		return list;
	}

}
