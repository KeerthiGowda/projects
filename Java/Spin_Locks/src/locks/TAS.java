package locks;

import java.util.concurrent.atomic.AtomicBoolean;

public class TAS implements Lock{

	private static AtomicBoolean state = new AtomicBoolean(false); 

	@Override
	public void Lock() {
		while(true){
			while(state.getAndSet(true)){}
				return;
		}
	}

	@Override
	public void Unlock() {
		state.set(false);
	}
}
