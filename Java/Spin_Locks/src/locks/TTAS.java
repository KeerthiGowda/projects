package locks;

import java.util.concurrent.atomic.*;
import bench.*;

public class TTAS implements Lock {
	
	private static AtomicBoolean state = new AtomicBoolean(false); 

	@Override
	public void Lock() {
		while(true){
			while(state.get()){}
			if(!state.getAndSet(true))
				return;
		}
	}

	@Override
	public void Unlock() {
		state.set(false);
	}
	
	
}
