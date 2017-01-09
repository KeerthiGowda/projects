package RedBlackTree_CFS;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicInteger;


public class TestThread_Compare extends Thread
{
	RedBlackTree_Interface tree;
	int tasks;
	public long endTime;
	public long startTime;
	int threadCount = 0;
	volatile static AtomicInteger count = new AtomicInteger(0);

	public TestThread_Compare(RedBlackTree_Interface t, int c, int ts)
	{
		tree = t;
		threadCount = c;
		tasks = ts;
	}

	@Override
	public void run()
	{	
		Random r = new Random();
		
//		for(int i = 0; i<1000; i++)
//		{
//			Node node2 = new Node(r.nextInt(10000));
//			synchronized(tree)			// For sequenial tree
//			{
//				tree.insert(node2);
//			}
//		}
		
//		count.getAndIncrement();
//		while(count.get() != threadCount);
		
		startTime = System.currentTimeMillis();
				
				for (int i = 0; i < tasks ; i++)
				{
					Node node2 = new Node(r.nextInt(10000));
					synchronized(tree)			// For sequenial tree
					{
					if(i%9 == 0)	
						tree.insert(node2);
					else
						tree.contains(i);
					}
				}
				
				
		endTime =  System.currentTimeMillis() - startTime;
	}
}

