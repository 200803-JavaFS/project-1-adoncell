package com.revature.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.Reimb;
import com.revature.models.ReimbDTO;
import com.revature.services.ReimbService;

public class ReimbController {

	private static ReimbService rs = new ReimbService();
	private static ObjectMapper om = new ObjectMapper();
	
	public void getReimbById(HttpServletResponse res, int id) throws IOException {
		Reimb r = rs.findById(id);
		if (r == null) {
			res.setStatus(204);
		} else {
			res.setStatus(200);
			String json = om.writeValueAsString(r);
			res.getWriter().println(json);
		}
	}
	
	public void getAllReimb(HttpServletResponse res) throws IOException {
		List<Reimb> all = rs.findAll();
		res.getWriter().println(om.writeValueAsString(all));
		res.setStatus(200);
	}
	
	public void addReimb(HttpServletRequest req, HttpServletResponse res) throws IOException {
		BufferedReader reader = req.getReader();
		
		StringBuilder s = new StringBuilder();
		
		String line = reader.readLine();
		
		while(line != null) {
			s.append(line);
			line = reader.readLine();
		}
		
		String body = new String(s);
		
		System.out.println(body);
		
		ReimbDTO r = om.readValue(body, ReimbDTO.class);
		
		System.out.println(r);
		
		if (rs.insert(r)) {
			res.setStatus(201);
			res.getWriter().println("Reimbursement was created");
		} else {
			res.setStatus(403);
		}
		
	}
	
	public void getReimbByStatus(HttpServletResponse res, int statusId) throws IOException {
		List<Reimb> list = rs.findByStatus(statusId);
		res.getWriter().println(om.writeValueAsString(list));
		res.setStatus(200);
	}
	
	public void update(HttpServletRequest req, HttpServletResponse res) throws IOException {
		BufferedReader reader = req.getReader();
		
		StringBuilder s = new StringBuilder();
		
		String line = reader.readLine();
		
		while(line != null) {
			s.append(line);
			line = reader.readLine();
		}
		
		String body = new String(s);
		
		System.out.println(body);
		
		ReimbDTO r = om.readValue(body, ReimbDTO.class);
		
		System.out.println(r);
		
		if (rs.update(r)) {
			res.setStatus(201);
			res.getWriter().println("Reimbursement was created");
		} else {
			res.setStatus(403);
		}
		
	}
	
}
