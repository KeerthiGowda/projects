package RedBlackTree_CFS;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public class Node 
{
	public final static int RED = 0;
	public final static int BLACK = 1;
	public final static int NO_FLAG = 0;
	public final static int MARKED = 1;
	public final static int LOCAL_AREA = 2;

	AtomicInteger flag = new AtomicInteger(NO_FLAG);
	public int time_executed = -1, color = BLACK;
	private int priority = 1;
	Node left;
	Node right;
	Node parent;
	public int id = 0;
	public long start = 0;
	public long end = 0;
	AtomicInteger maxExecutionTime;

	Node(int key) 
	{
		this.maxExecutionTime = new AtomicInteger(100);
		this.flag.set(NO_FLAG);
		this.time_executed = key;
 		if (key != -1)
		{
			this.color = RED;
			this.left = new Node(-1);
			this.right = new Node(-1);
		}
		else
		{
			this.color = BLACK;
			this.left = null;
			this.right = null;
		}
	} 
	
	public void execute()
	{
	}

	public void reset()
	{
		this.color = RED;
		this.flag.set(NO_FLAG);
		this.left = new Node(-1);
		this.right = new Node(-1);
	}
	
	public void setMaxRunTime(int time)
	{
		this.maxExecutionTime.set(time);
	}
	
	public void setPriority(int p)
	{
		this.priority = p;
	}
	
	public int getPriority()
	{
		return priority;
	}
	
}
