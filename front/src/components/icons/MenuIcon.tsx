'use client'

import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import menu2 from 'react-useanimations/lib/menu2';

const MenuIcon = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    handleResize(); // Check on mount
    mediaQuery.addEventListener('change', handleResize); // For modern browsers

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <>
      <UseAnimations
        strokeColor={isLargeScreen ? 'white' : 'black'} // ou une autre couleur par défaut
        animation={menu2}
        size={36}
      />
      <span className="hidden lg:block">menu</span>
    </>
  );
};


export default MenuIcon