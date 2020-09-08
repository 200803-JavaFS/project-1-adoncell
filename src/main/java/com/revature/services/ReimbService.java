package com.revature.services;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.revature.daos.IReimbDAO;
import com.revature.daos.ReimbDAO;
import com.revature.models.Reimb;
import com.revature.models.ReimbDTO;

public class ReimbService {
	
	private static final Logger log = LogManager.getLogger(ReimbService.class);
	private static IReimbDAO ir = new ReimbDAO();
	
	public boolean insert(ReimbDTO r) {
		log.info("Inserting new reimbursement to ers_reimbursement: " + r);
		return ir.insert(r);
	}
	
	public boolean update(ReimbDTO r) {
		log.info("Updating reimbursement from ers_reimburesment to: " + r);
		return ir.update(r);
	}
	
	public Reimb findById(int id) {
		log.info("Returning reimbursement from ers_reimbursement with id: " + id);
		return ir.findById(id);
	}
	
	public List<Reimb> findByStatus(int statusId) {
		log.info("Returning all reimbursements from ers_reimbursement with status: " + statusId);
		return ir.findByStatus(statusId);
	}
	
	public List<Reimb> findAll() {
		log.info("Returning all reimbursements from ers_reimbursement");
		return ir.findAll();
	}

}
