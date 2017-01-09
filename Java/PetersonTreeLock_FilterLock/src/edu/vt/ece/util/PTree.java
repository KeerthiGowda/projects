package edu.vt.ece.util;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import edu.vt.ece.bench.Counter;
import edu.vt.ece.bench.SharedCounter;
import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.ThreadId;
import edu.vt.ece.locks.*;

/**
 * 
 * @author Mohamed M. Saad
 */
public class PTree<T extends Comparable<T>> implements Lock{
	private T data;
	private PTree<T> right;
	private PTree<T> left;
	
	private AtomicBoolean flag[] = new AtomicBoolean[2];
	private AtomicInteger victim;

	public PTree(T root) {

		this.data = root;
		
		flag[0] = new AtomicBoolean();
		flag[1] = new AtomicBoolean();
		victim = new AtomicInteger();
	}
	
	@Override
	public void lock() {
		int i = ((ThreadId)Thread.currentThread()).getThreadId();
		int j = 1-i;
		flag[i].set(true);
		victim.set(i);
		while(flag[j].get() && victim.get() == i);
//			System.out.println("Thread " + i + " waiting");
	}

	@Override
	public void unlock() {
		int i = ((ThreadId)Thread.currentThread()).getThreadId();
		flag[i].set(false);
	}
	

	public T getData() {
		return data;
	}

	public PTree<T> getRightChild(){
		return right;
	}

	public PTree<T> getLeftChild(){
		return left;
	}

	public void add(T node){
		if(data.compareTo(node)<0){
			if(right==null)
				right = new PTree<T>(node);
			else
				right.add(node);
		}
		else{
			if(left==null)
				left = new PTree<T>(node);
			else
				left.add(node);
		}
	}
	
	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		PTree<Integer> PTree = new PTree<Integer>(4);
		PTree.add(2);
		PTree.add(6);
		//PTree.add(1);
		//PTree.add(3);
		//PTree.add(5);
		//PTree.add(7);
		/*
 	 	PTree now should be like that
                   4
               2        6
             1   3    5   7
		 */
		
		
		
//		final Counter counter = new SharedCounter(0, (Lock)Class.forName("edu.vt.ece.locks." + "Peterson").newInstance());
		
		
	//		new TestThread(counter).start();
		
		
		
		
		
		// print left branch from the root till the left-most leaf
		PTree<Integer> itr = PTree;
		do{
			System.out.println(itr.getData());
		}while((itr = itr.getLeftChild())!=null);
		// print right branch from the root till the right-most leaf
		itr = PTree;
		do{
			System.out.println(itr.getData());
		}while((itr = itr.getRightChild())!=null);
	}
} 