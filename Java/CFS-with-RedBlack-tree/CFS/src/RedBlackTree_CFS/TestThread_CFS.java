package RedBlackTree_CFS;

public class TestThread_CFS extends Thread
{
	RedBlackTree_Interface tree;
	static int tasks = 0;
	int threadCount = 0;

	public TestThread_CFS(RedBlackTree_Interface treeObj, int th, int ts)
	{
		tree = treeObj;
		tasks = ts;
		threadCount = th;
	}

	@Override
	public void run()
	{

		while(true)
		{
			Node taskToEx = new Node(-1);
			synchronized (tree)
			{
				taskToEx = tree.delete();
			}
			if(taskToEx == null)
			{
				
			}
			try{
			if(taskToEx.time_executed > -1)
			{
				taskToEx = processTask(taskToEx);
				if(taskToEx.time_executed * taskToEx.getPriority() <= taskToEx.maxExecutionTime.get())
				{
					taskToEx.reset();
					//synchronized (tree)		// for seqential tree
					{
						tree.insert(taskToEx);	
					}
				}
				else{
					long end = System.currentTimeMillis();
					taskToEx.end = end - taskToEx.start;
			//		System.out.println(taskToEx.maxExecutionTime + "," +  taskToEx.end);
				}
			}
			else
				return;
			}catch(Exception ex){
				return;
			}
		}
	}

	private Node processTask(Node x)
	{
		long start = 0;
		long end = 50;  // Each run time
		
		while((start < end) && (((x.time_executed * x.getPriority()) + start) < x.maxExecutionTime.get()))
		{
			start++;
			x.execute();
		}
		x.time_executed += Math.round((float)start/x.getPriority() +0.5);

		return x;
	}
}

