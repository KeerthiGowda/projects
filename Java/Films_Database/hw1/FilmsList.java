package hw1;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.*;

/* Class used to store the 
 * database of a movie
 */
public class FilmsList {
	
	public
		String title;
		String director;
		String releasedDate; // make this Date class
		String watched;		// Make this bool
		
		ArrayList<FilmsList> arrayList = new ArrayList<FilmsList>();
	
	/* Check if the movie title and director combo is already in list */
	boolean checkIfAlreadyInList(String t, String dr){
		
		FilmsList temp = new FilmsList();
		for(int i=0; i< arrayList.size(); i++){
			temp = arrayList.get(i);
			if(temp.director.equals(dr)){
				if(temp.title.equals(t))
					return true;
			}
		}
		return false;
	}
	
	void processEachLine(String[] sr)throws Exception{
		
		int lineCount = sr.length;
		String line;
		String[] wordInLine = new String[20];
		String[] formattedWordInLine = new String[5];
		FileRW file = new FileRW();
		
		/*Read the current line. Split it to words and process */
		for(int currentLine=0 ; currentLine<lineCount; currentLine++){
			line = sr[currentLine];
			wordInLine = line.split(" ");
			
			//for(int i=0;i<formattedWordInLine.length; i++)
				formattedWordInLine = null;
			
			formattedWordInLine = formatData(wordInLine);
			
			if(formattedWordInLine != null) {// If there is an empty line in between the file
			
				if(checkForValidInputs(formattedWordInLine)){
					
					switch(formattedWordInLine[0]){
						
						case "CLEAR" :
								arrayList.clear();
								file.openFileToWrite("CLEAR: OK");
							break;
						
						case "LOAD" :
							int csvLineCount= 0;							
					            csvLineCount = file.openFileToRead(formattedWordInLine[1]);
					            if(csvLineCount != 0){
						            String[] csvAllLinesAsArray = new String[csvLineCount];
						            csvAllLinesAsArray = file.readAllLines(csvLineCount, formattedWordInLine[1]);
						            formatAndAddCSV(csvAllLinesAsArray);
						            int temp_counter = 0;
						            for(int i=0;i<csvLineCount; i++){
						            	if(csvAllLinesAsArray[i].trim().isEmpty())
						            		temp_counter++;
						            }
						            file.openFileToWrite("LOAD: OK " + (csvLineCount-temp_counter));
					            }
	
							break;
							
						case "STORE" :
							 arrayListToCSV(formattedWordInLine[1]);
							 file.openFileToWrite("STORE: OK " + arrayList.size());
							
							break;
							
						case "ADD" :
								if(checkIfAlreadyInList(formattedWordInLine[1], formattedWordInLine[2])) // title, director, arraylist
									file.openFileToWrite("ADD: ERROR DUPLICATE_ENTRY");
								
								else{
									FilmsList newFilm = new FilmsList();
								
									newFilm.title = formattedWordInLine[1];
									newFilm.director = formattedWordInLine[2];
									newFilm.releasedDate = formattedWordInLine[3];
									newFilm.watched = formattedWordInLine[4];
									arrayList.add(newFilm);
									
									/* write to file out.txt */
									file.openFileToWrite("ADD: OK " + newFilm.title + " " + newFilm.director);
								}
								
							break;
						
						case "SHOW" :
								int counter = 0;
								for (int i = 0; i < arrayList.size(); i++) {
									FilmsList temp = new FilmsList();
									temp = arrayList.get(i);
									if(temp.watched.equals("false"))  {counter++;}
								}
								
								file.openFileToWrite(formattedWordInLine[0]+ ": OK " + counter);
								
								for (int i = 0; i < arrayList.size(); i++) {
									FilmsList temp = new FilmsList();
									temp = arrayList.get(i);
									if(temp.watched.equals("false")){
										if(temp.title.startsWith("\"")){		// If the title or director has "", then display without ""
												if((temp.director.startsWith("\"")))
													file.openFileToWrite(temp.title.substring(1,temp.title.length()-1) + "," +
															temp.director.substring(1,temp.director.length()-1) + "," + temp.releasedDate );
												else 
													file.openFileToWrite(temp.title.substring(1,temp.title.length()-1) + "," + temp.director + "," + temp.releasedDate);
										}
										else if((temp.director.startsWith("\"")))
											file.openFileToWrite(temp.title + "," + temp.director.substring(1,temp.director.length()-1) + "," + temp.releasedDate);
										else
											file.openFileToWrite(temp.title + "," + temp.director + "," + temp.releasedDate);	
									}
								}
							break;
							
						case "UPDATE" :
								boolean breakAgain = false;
								/* Update the move with watched / not watched if the third index is true / false */ 
								if(formattedWordInLine[3].equals("true") || formattedWordInLine[3].equals("false")){
									for (int i = 0; i < arrayList.size(); i++) {
										FilmsList temp = new FilmsList();
										temp = arrayList.get(i);
										if(temp.director.equals(formattedWordInLine[2]) && temp.title.equals(formattedWordInLine[1])){
											arrayList.get(i).watched = formattedWordInLine[3];
											file.openFileToWrite("UPDATE: OK "+ temp.title + " " + temp.director);	
											breakAgain = true;
											break;
										}							
									}
									if(!breakAgain){
										file.openFileToWrite("UPDATE: ERROR FILM_NOT_FOUND");		
										break;
									}
									else
										break;
										
								}
								else if(formattedWordInLine[4]!= null){ // Update the director and title
									for (int i = 0; i < arrayList.size(); i++) {
										FilmsList temp = new FilmsList();
										temp = arrayList.get(i);
										if(temp.title.equals(formattedWordInLine[3]) && temp.director.equals(formattedWordInLine[4])){
											file.openFileToWrite("UPDATE: ERROR DUPLICATE_ENTRY");
											breakAgain = true;
											break;
										}
									}
									/* Break out if duplicate entry */
									if(breakAgain) {
										break;
									}
									
									/* If not duplicate entry, replace the existing content */
									for (int i = 0; i < arrayList.size(); i++) {
										FilmsList temp = new FilmsList();
										temp = arrayList.get(i);
										if(temp.title.equals(formattedWordInLine[1]) && temp.director.equals(formattedWordInLine[2])){
											arrayList.get(i).title = formattedWordInLine[3];
											arrayList.get(i).director = formattedWordInLine[4];
											file.openFileToWrite("UPDATE: OK " + formattedWordInLine[3] + " " + formattedWordInLine[4]);
											breakAgain = true;
											break;
										}
									}
									if(breakAgain)
										break;
									else{
											file.openFileToWrite("UPDATE: ERROR FILM_NOT_FOUND");	
	
											break;
										}
								}
								else{
									for (int i = 0; i < arrayList.size(); i++) {
										FilmsList temp = new FilmsList();
										temp = arrayList.get(i);
										if(temp.director.equals(formattedWordInLine[2]) && temp.title.equals(formattedWordInLine[1])){
											arrayList.get(i).releasedDate = formattedWordInLine[3];
											file.openFileToWrite("UPDATE: OK "+ temp.title + " " + temp.director);
											breakAgain = true;
											break;
										}							
									}
									if(!breakAgain){
										file.openFileToWrite("UPDATE: ERROR FILM_NOT_FOUND");		
										break;
									}
									else
										break;
								}
							
						case "SEARCH" :
							int matchedCount = 0;
							for (int i = 0; i < arrayList.size(); i++) {
								if(arrayList.get(i).director.contains(formattedWordInLine[1]) || 
										arrayList.get(i).title.contains(formattedWordInLine[1])){
									matchedCount++;
								}
							}
							file.openFileToWrite("SEARCH: OK " + matchedCount);
							if(matchedCount != 0){
								for (int i = 0; i < arrayList.size(); i++) {
									if(arrayList.get(i).director.contains(formattedWordInLine[1]) || 
											arrayList.get(i).title.contains(formattedWordInLine[1])){
										if(arrayList.get(i).title.startsWith("\"")){		// Output with CSV format
											if((arrayList.get(i).director.startsWith("\"")))
												file.openFileToWrite(arrayList.get(i).title.substring(1,arrayList.get(i).title.length()-1) + "," + arrayList.get(i).director.substring(1,arrayList.get(i).director.length()-1) 
														+ "," +arrayList.get(i).releasedDate + "," +  arrayList.get(i).watched);
											else 
												file.openFileToWrite( arrayList.get(i).title.substring(1,arrayList.get(i).title.length()-1) + "," +  arrayList.get(i).director +
														"," + arrayList.get(i).releasedDate + "," + arrayList.get(i).watched);
										}
										else if((arrayList.get(i).director.startsWith("\"")))
											file.openFileToWrite(arrayList.get(i).title + "," + arrayList.get(i).director.substring(1,arrayList.get(i).director.length()-1) + "," + arrayList.get(i).releasedDate + "," + arrayList.get(i).watched );
										else
											file.openFileToWrite(arrayList.get(i).title + "," + arrayList.get(i).director + "," + arrayList.get(i).releasedDate + "," + arrayList.get(i).watched );
			
									}
								}	
							}
							break;
							
						default:
							file.openFileToWrite(formattedWordInLine[0] + ": ERROR UNKNOWN_COMMAND");
							break;
					}
				}
			}
		}
	}
	
	String[] formatData(String[] sr)throws Exception{
		
		FileRW file = new FileRW();
		String[] formatted = new String[5];
		int index = 0;
		try{
			for(int i=0 ; i<sr.length; i++){
				int k=1;
				if(sr[i].startsWith("\"")){					// Find the start of quotes
					int j=0;
					while(! sr[i+(j++)].endsWith("\""));	// Search till the end of quotes
					
					for(k=1; k<j; k++){						// Concatinate all the strings
						sr[i] = sr[i] + " " + sr[i+k];	
					}
					//sr[i] = sr[i].substring(1, sr[i].length()-1); // remove the quotes from 1st and last position
				}
				formatted[index++]= sr[i];   				// Assign to a formatted string
				i = i+k-1;
			}
		}
		catch(Exception e){
			file.openFileToWrite(sr[0]+ ": ERROR WRONG_ARGUMENT_COUNT");
			return null;
		}
		return formatted;
	}
	
	boolean checkForValidInputs(String[] sr)throws Exception{
		
		FileRW file = new FileRW();
		try{
			switch(sr[0]){
			
			case "LOAD":
				if(sr[2] == null){
					if(sr[1].endsWith(".csv")){
						return true;
					}
					else{
						file.openFileToWrite("LOAD: ERROR FILE_NOT_FOUND");
						return false;
					}
				}
				else {
					file.openFileToWrite("LOAD: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
						
			case "STORE":
				if(sr[2] == null){
					if(sr[1].endsWith(".csv")){
						return true;
					}
					else{
						file.openFileToWrite("STORE: ERROR FILE_NOT_FOUND");
						return false;
					}
				}
				else {
					file.openFileToWrite("STORE: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
			
			case "CLEAR":
				if(sr[1]== null)
					return true;
				else{
					file.openFileToWrite("CLEAR: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
				
			case "ADD":
				if(sr[4] != null){
					if(checkDate(sr[3])){
						switch (sr[4]){
						case "true":
							return true;
						case "false":
							return true;
						default:
							file.openFileToWrite("ADD: ERROR NOT_BOOL");
							return false;
						}
					}
					else{
						file.openFileToWrite("ADD: ERROR INVALID_DATE");
						return false;
					}
				}
				else {
					file.openFileToWrite("ADD: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
		
			case "SHOW":
				if(sr[1] == null)
					return true;
				else{
					file.openFileToWrite("SHOW: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
			
			case "UPDATE":
				if(sr[4] == null){
					switch (sr[3]){
					case "true":
						return true;
					case "false":
						return true;
					default:
						if(checkDate(sr[3])){
							return true;
						}
						else{
							file.openFileToWrite("UPDATE: ERROR INVALID_DATE_OR_BOOL");
							return false;
						}
					
					}
				}
				else if(sr[4] != null){
					return true;
				}
				else{
					file.openFileToWrite("UPDATE: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
				
			case "SEARCH":
				if((sr[1] != null) && (sr[2] == null)){
					return true;
				}
				else{
					file.openFileToWrite("SEARCH: ERROR WRONG_ARGUMENT_COUNT");
					return false;
				}
			case "":
					return false;
					
				
			default:
				file.openFileToWrite(sr[0] + ": ERROR UNKNOWN_COMMAND");
			}
			return false;
		}
		catch(Exception e){
			file.openFileToWrite(sr[0] + ": ERROR WRONG_ARGUMENT_COUNT");
			return false;
		}
	}
	
	boolean checkDate(String s){
		try {
		    SimpleDateFormat sdf1 = new SimpleDateFormat("M/d/yyyy");
		    Date dateFormat1 = sdf1.parse(s);
		    //String test = sdf.format(date); 
		    if (s.equals(sdf1.format(dateFormat1))) {
		        return true;
		    }
		    SimpleDateFormat sdf2 = new SimpleDateFormat("MM/d/yyyy");
		    Date dateFormat2 = sdf2.parse(s);
		    //String test2 = sdf2.format(dateFormat2); 
		    if (s.equals(sdf2.format(dateFormat2))) {
		        return true;
		    }
		    SimpleDateFormat sdf3 = new SimpleDateFormat("M/dd/yyyy");
		    Date dateFormat3 = sdf3.parse(s);
		    
		    //String test = sdf.format(date); 
		    if (s.equals(sdf3.format(dateFormat3))) {
		        return true;
		    }
		    SimpleDateFormat sdf4 = new SimpleDateFormat("MM/dd/yyyy");
		    Date dateFormat4 = sdf4.parse(s);
		    String test4 = sdf4.format(dateFormat4); 
		    if (s.equals(sdf4.format(dateFormat4))) {
		        return true;
		    }
		    		    	
		} catch (Exception ex) {	
		    return false;
		}
		return false;
	}
	
	void formatAndAddCSV(String[] sr) throws Exception{
		
		String[] wordsInLine = new String[sr.length];

		arrayList.clear();

		for(int i=0 ; i<sr.length ; i++){
			if(!sr[i].trim().isEmpty()){
				wordsInLine = sr[i].split(",");
				addFromCSV(wordsInLine);
			}
		}
	}
	
	void addFromCSV(String[] formattedWordInLine) throws Exception{
		FileRW file = new FileRW();
			FilmsList newFilm = new FilmsList();
			
			try{
			newFilm.title = formattedWordInLine[1];
			newFilm.director = formattedWordInLine[2];
			newFilm.releasedDate = formattedWordInLine[0];
			newFilm.watched = formattedWordInLine[3];
			arrayList.add(newFilm);
			}
			catch(Exception e){
				file.openFileToWrite("LOAD: ERROR FILE_NOT_FORMATTED");
			}
	}
	
	void arrayListToCSV(String fileName) throws Exception{
	
		FileRW file = new FileRW();
		file.storeDatabase("", false, fileName);
		for(int i=0 ; i< arrayList.size(); i++){
			if(arrayList.get(i).title.startsWith("\"")){		// If the title or director has "", then display without "" in the csv file
				if((arrayList.get(i).director.startsWith("\"")))
					file.storeDatabase(arrayList.get(i).releasedDate + "," + arrayList.get(i).title.substring(1,arrayList.get(i).title.length()-1) + "," +
							arrayList.get(i).director.substring(1,arrayList.get(i).director.length()-1) + "," + arrayList.get(i).watched + "\n", true, fileName);
				else 
					file.storeDatabase(arrayList.get(i).releasedDate + "," + arrayList.get(i).title.substring(1,arrayList.get(i).title.length()-1) + "," + arrayList.get(i).director + "," + arrayList.get(i).watched + "\n", true, fileName);
			}
			else if((arrayList.get(i).director.startsWith("\"")))
				file.storeDatabase(arrayList.get(i).releasedDate + "," + arrayList.get(i).title + "," + arrayList.get(i).director.substring(1,arrayList.get(i).director.length()-1) + "," + arrayList.get(i).watched + "\n", true, fileName);
			else
				file.storeDatabase(arrayList.get(i).releasedDate + "," + arrayList.get(i).title + "," + arrayList.get(i).director + "," + arrayList.get(i).watched + "\n", true, fileName);
			
		}
		
	}
		
}



