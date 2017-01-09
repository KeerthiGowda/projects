package hw1;

import java.util.*;
import java.io.*;

	public class Films {

		public static void main(String[] args) throws Exception{
			
			FileRW fileIO = new FileRW();
			
			fileIO.openFileToWrite("CreateNew");
			
			int lineCount = fileIO.openFileToRead("in.txt");
			
			String[] sr = new String[lineCount];
			
			sr = fileIO.readAllLines(lineCount, "in.txt"); // Get all the line data

			FilmsList obj1 = new FilmsList();
			obj1.processEachLine(sr);
			
		}

	}

