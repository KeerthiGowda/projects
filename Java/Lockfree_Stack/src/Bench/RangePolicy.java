package Bench;

public class RangePolicy {
	
	int range = 0;
	int min_elements = 0;
	int max_elements = 0;
	int success = 0;
	int timeout = 0;
	
	public RangePolicy(int max){
		max_elements = max;
		range = max_elements-1;
	}
	
	public int getRange(){
		return range;
	}
	
	public void recordEliminationSuccess(){
		success++;
		if(range < max_elements)
			range++;
	}
	
	public void recordEliminationTimeout(){
		timeout++;
		if(range > 2)
			range--;
	}
}
