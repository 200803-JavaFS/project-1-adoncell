package com.revature.daos;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.models.Reimb;
import com.revature.models.ReimbDTO;
import com.revature.utils.HibernateUtil;

public class ReimbDAO implements IReimbDAO {
	
	@Override
	public boolean insert(ReimbDTO r) {
		Session ses = HibernateUtil.getSession();
		Transaction tx = ses.beginTransaction();
		
		try {
			ses.save(r);
			tx.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean update(ReimbDTO r) {
		Session ses = HibernateUtil.getSession();
		Transaction tx = ses.beginTransaction();
		
		try {
			ses.merge(r);
			tx.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public Reimb findById(int id) {
		Session ses = HibernateUtil.getSession();
		Reimb r = ses.get(Reimb.class, id);
		return r;
	}

	@Override
	public List<Reimb> findByStatus(int statusId) {
		Session ses = HibernateUtil.getSession();
		List<Reimb> list = ses.createQuery("FROM Reimb WHERE statusId = " + statusId, Reimb.class).list();
		return list;
	}
	
	@Override
	public List<Reimb> findAll() {
		Session ses = HibernateUtil.getSession();
		List<Reimb> list = ses.createQuery("FROM Reimb", Reimb.class).list();
		return list;
	}
	
}
