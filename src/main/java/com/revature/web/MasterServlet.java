package com.revature.web;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.controllers.LoginController;
import com.revature.controllers.ReimbController;
import com.revature.controllers.UserController;
import com.revature.models.LoginDTO;
import com.revature.models.User;
import com.revature.models.UserRole;
import com.revature.services.UserService;

public class MasterServlet extends HttpServlet {

	private static ReimbController rc = new ReimbController();
	private static LoginController lc = new LoginController();
	private static UserService us = new UserService();
	private static UserController uc = new UserController();

	public MasterServlet() {
		super();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("application/json");
		res.setStatus(404);

		final String URI = req.getRequestURI().replace("/project1/", "");

		String[] portions = URI.split("/");

		System.out.println(Arrays.toString(portions));

		try {
			switch (portions[0]) {

			case "login":
				lc.login(req, res);
				break;

			case "success":
				if (req.getSession(false) != null && (boolean) req.getSession().getAttribute("loggedin")) {
					LoginDTO l = (LoginDTO) req.getSession().getAttribute("user");

					System.out.println("Username: " + l.username);

					User u = us.findByUsername(l.username);
					UserRole ur = u.getRole();
					System.out.println(ur);
					if (req.getMethod().equals("GET")) {
						uc.setRole(req, res, u);
					}
				}
				break;

			case "reimbursements":
				if (req.getMethod().equals("GET")) {

					if (portions.length == 2) {
						int id = Integer.parseInt(portions[1]);
						rc.getReimbById(res, id);
					} else {
						rc.getAllReimb(res);
					}
				}
				break;

			case "logout":
				lc.logout(req, res);
				break;
				
			}
			
		} catch (NumberFormatException e) {
			e.printStackTrace();
			res.getWriter().print("The id you provided is not an integer");
			res.setStatus(400);
		}

	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doGet(req, res);
	}

}
