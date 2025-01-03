'use client'
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"; // Yeni import
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface HeaderProps { 
  onSearch?: (searchTerm: string) => void;

}

export default function Header({ onSearch }: HeaderProps) {
  const router = useRouter();
  const { data: session } = useSession()

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan tema tercihini al
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <>
    <ToastContainer
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme={darkMode ? "dark" : "light"}
     />
    <header className="flex justify-between items-center py-8 mb-10 w-full h-[100px]">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-12">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 w-[158px] h-[36px]">
        <Image
          src="/images/Union.svg"
          alt="Theme toggle"
          width={36}
          height={36}
          className="text-gray-600 dark:brightness-0 dark:invert"
  />
          <span className="font-semibold text-xl"> <span className="font-light">Meta</span>Blog</span>
        </Link>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-10 py-[6px] font-work-sans text-[#3B3C4A] dark:text-white ">
          <Link href="/" className=" hover:text-gray-900 dark:hover:text-[#4B6BFB]">
            Home
          </Link>
          <Link href="/blog" className=" hover:text-gray-900 dark:hover:text-[#4B6BFB]">
            Blog
          </Link>
          <Link href="/single-post" className=" hover:text-gray-900 dark:hover:text-[#4B6BFB]">
            Single Post
          </Link>
          <Link href="/pages" className=" hover:text-gray-900 dark:hover:text-[#4B6BFB]">
            Pages
          </Link>
          <Link href="/contact" className=" hover:text-gray-900 dark:hover:text-[#4B6BFB]">
            Contact
          </Link>
        </nav>
      

      {/* Search and Theme Toggle */}
      <div className="flex items-center space-x-4 gap-10">
        {/* Search Bar */}
        <div className="relative md:block hidden">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-5 pr-4 py-2 w-[166px] h-[36px] border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#242535] border-none dark:text-[#A1A1AA] [&::-webkit-search-cancel-button]:hidden"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-[#52525B]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
        onClick={toggleDarkMode}
          className="rounded-full hover:bg-gray-100 !ml-0 md:block hidden"
          aria-label="Toggle theme"
        >
          <Image
            src={darkMode ? "/images/SwichDarkMode.svg" : "/images/Swich.svg"}
            alt="Theme toggle"
            width={48}
            height={28}
            className="text-gray-600"
          />
        </button>
        {/* Auth Buttons */}
       {session ? (
         <div className="flex items-center gap-4">
           <Image
             src={session.user?.image || "/images/default-avatar.png"}
             alt="User avatar"
             width={32}
             height={32}
             className="rounded-full"
           />
           <button
             onClick={() => {
              signOut({ redirect: false }).then(() => {
                
                router.push('/api/auth/logout'); // Auth logout sayfasına yönlendir
              });
            }}
             className="flex items-center gap-2 hover:text-gray-600"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
             </svg>
             <span>Çıkış</span>
           </button>
         </div>
       ) : (
         <button
         onClick={() => router.push('/api/auth/login')}
           className="flex items-center gap-2 hover:text-gray-600"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
           </svg>
           <span>Giriş</span>
         </button>
       )}
      </div>
      
    </header>
    </>
  );
}