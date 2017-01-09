package edu.vt.ece.bench;

import java.util.ArrayList;
import edu.vt.ece.locks.myPeterson;

public class MyPetSharedCounter extends Counter{

	private  ArrayList<myPeterson> lock = new ArrayList<myPeterson>();
	private static int levels;
	private static int nodes;
	
	private int[] node_id;;
	private int[][] pid;
	
	public MyPetSharedCounter(int c, myPeterson lock, int noNodes) {
		
		super(c);
		levels = (int) (Math.log(noNodes+1)/Math.log(2));
		nodes = noNodes;
		
		/* Initialize all the locks */
		for(int i=0; i<noNodes; i++){
			myPeterson lock2 = new myPeterson();
			this.lock.add(lock2);
		}

		node_id = new int[(noNodes+1)*2];		
		pid = new int[(noNodes+1)*2][levels+1];
	}
	
	@Override
	public int getAndIncrement() {
		this.treeLock(((TestThread2)Thread.currentThread()).getThreadId());
		int temp = -1;
		try {
			temp = super.getAndIncrement();
		} finally {
		this.treeUnlock(((TestThread2)Thread.currentThread()).getThreadId());
		}
		return temp;
	}
	
	public void treeLock(int threadId){
		node_id[threadId] =  threadId + nodes + 1;
		
		long x = System.currentTimeMillis();
		//System.out.println("Thread " + threadId + " entered at system time in ms - "+ x);
		for(int l = 1 ; l < levels+1; l++ ){
	 		pid[threadId][l-1] = node_id[threadId] % 2;
	 		node_id[threadId] =  node_id[threadId]/2;
	 		lock.get((node_id[threadId])-1).lock(pid[threadId][l-1]);
	 	}
		//System.out.println("Thread ID - " + threadId + "has lock");
		//Comment 1
		//System.out.println("Thread - " + threadId + "          LOCKED at node - "+ node_id[threadId] );
	 	return;
	}
	 
	 public void treeUnlock(int threadId){
	 		node_id[threadId] = 1;
	 		for(int l = levels; l > 0; l--){
	 			lock.get((node_id[threadId])-1).unlock(pid[threadId][l-1]);
	 			node_id[threadId] = 2* node_id[threadId] + pid[threadId][l-1];
		}
	 	//Comment 2
	 	//System.out.println("Thread - " + threadId + " Unlocked at  node - " + node_id[threadId] );
	    return;
	 }

}
