package com.chicagocrime.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;

import com.chicagocrime.pojo.CrimeType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chicagocrime.data.DataReader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping(value = "/")
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	private static DataReader reader = new DataReader();
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		


		return "index";
	}

	@RequestMapping(value = "crime_type", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ArrayList<CrimeType> getCrimeType() throws IOException {

		ArrayList<CrimeType> crimes = reader.readCrimeType("test");

		return crimes;
	}
}
