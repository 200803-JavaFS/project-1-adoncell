package com.revature.daos;

import java.util.List;

import com.revature.models.Reimb;
import com.revature.models.ReimbDTO;

public interface IReimbDAO {

	public boolean insert(ReimbDTO r);

	public boolean update(ReimbDTO r);

	public Reimb findById(int id);

	public List<Reimb> findByStatus(int statusId);

	public List<Reimb> findAll();

}
