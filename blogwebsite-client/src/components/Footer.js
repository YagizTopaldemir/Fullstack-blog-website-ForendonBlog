import React from 'react'
import { useLocation } from 'react-router-dom';


export default function Footer() {
  const location = useLocation();


  const isBlogPage = location.pathname.startsWith('/blog/');
  return (
    <footer class={isBlogPage ?  "bg-[#1D1D1D]  shadow p-4 " : "bg-[#1D1D1D] rounded-lg shadow m-4 dark:bg-gray-800"}>
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Forendon™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Hakkımızda</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Lisanslar</a>
        </li>
        <li>
            <a href="#" class="hover:underline">İletişim</a>
        </li>
    </ul>
    </div>
</footer>
  )
}
