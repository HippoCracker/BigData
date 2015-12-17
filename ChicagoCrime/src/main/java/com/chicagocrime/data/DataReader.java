package com.chicagocrime.data;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import com.chicagocrime.pojo.CrimeType;

public class DataReader {

	public ArrayList<CrimeType> readCrimeType(String dir) {
		ArrayList<CrimeType> typeList = null;
	    try{
//	      BufferedReader reader = new BufferedReader(new FileReader("/home/hduser/results/" + dir));
				BufferedReader reader = new BufferedReader(new FileReader("/Users/zongzesheng/Desktop/" + dir));
				String line = "";
				typeList = new ArrayList<CrimeType>();
	      while (true){
	        line = reader.readLine();
					if (line == null) break;
					String[] items = line.split("\t");
					CrimeType crimeType = new CrimeType();
					crimeType.setName(items[0]);
					crimeType.setNumber(Integer.parseInt(items[1]));
					typeList.add(crimeType);
	      }
	    }catch(Exception e){
				e.getStackTrace();
	    }
	    return typeList;
	  }
}
