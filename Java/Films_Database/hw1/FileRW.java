package hw1;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Stream;

public class FileRW {
	
	int openFileToRead(String fileName)throws Exception{
		if(!openFile(fileName))
			return 0;
		BufferedReader fr = new BufferedReader( new FileReader(fileName));
		String a = new String();
		int lineCount=0;
		while( fr.readLine() != null){ 
			lineCount++;
		}
		return lineCount;
	}
	
	String[] readAllLines(int lineCount, String fileName) throws Exception{
		if(!openFile(fileName))
			return null;
		BufferedReader fr = new BufferedReader( new FileReader(fileName));
		String a = new String();
		String[] sr = new String[1];
		String[] temp = new String[lineCount]; 
		int i=0;
		while( (a = fr.readLine()) != null){ 
			sr = a.split("\n"); 	// Read every line as a string and place it to array
			temp[i++] = sr[0];
		}
		return temp;
	}
	
	
	void openFileToWrite(String a)throws Exception{
		if(a.equals("CreateNew")){
			FileWriter fw = new FileWriter("out.txt", false);
		}
		else{
			FileWriter fw = new FileWriter("out.txt", true);
			fw.write(a);
			fw.write("\r\n");
			fw.flush();
			fw.close();
		}
	}
	
	void storeDatabase(String a, boolean dontRewrite, String fileName)throws Exception{
		FileWriter fw = new FileWriter(fileName, dontRewrite);
		fw.write(a);
		if(dontRewrite)
			//fw.write("\r\n");
		fw.flush();
		fw.close();
	}
	
	boolean openFile(String fileName)throws Exception{
		try{
			BufferedReader fr = new BufferedReader( new FileReader(fileName));
			return true;
		}
		catch(IOException e){
			openFileToWrite("LOAD: ERROR FILE_NOT_FOUND");
			return false;
		}
		
	}

}
