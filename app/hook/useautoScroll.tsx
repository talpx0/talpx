'use client'
import { useEffect } from "react";

const useAutoScroll =()=> {
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 150) {
          // Scroll to (100vh - 56px)
          window.scrollTo(0, window.innerHeight - 56);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  }

export default useAutoScroll