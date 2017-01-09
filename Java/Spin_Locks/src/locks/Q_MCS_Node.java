package locks;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

public class Q_MCS_Node {

	public AtomicBoolean locked = new AtomicBoolean();
	public AtomicReference<Q_MCS_Node> next = new AtomicReference<Q_MCS_Node>();
			
	public Q_MCS_Node(){
		locked.set(false);
		next.set(null);
	}
}
