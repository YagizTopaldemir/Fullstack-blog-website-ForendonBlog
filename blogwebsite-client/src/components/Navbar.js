'use client'

import { useContext, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import {
  PencilSquareIcon,
  UserGroupIcon,
  SparklesIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  GlobeAltIcon,
  CakeIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  NewspaperIcon,
  BeakerIcon 
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.js';



const products = [
    { name: 'Teknoloji', description: 'Teknolojideki son trendler ve yenilikler', href: '/kategori/teknoloji', icon: SparklesIcon },
    { name: 'Seyahat', description: 'Yeni yerler ve kültürler keşfedin', href: '/kategori/seyahat', icon: GlobeAltIcon },
    { name: 'Yemek', description: 'Lezzetli tarifler ve yemek incelemeleri', href: '/kategori/yemek', icon: CakeIcon },
    { name: 'Sağlık', description: 'Sağlıklı bir yaşam tarzı için öneriler', href: '/kategori/sağlık', icon: UserGroupIcon },
    { name: 'Finans', description: 'Paranızı yönetme ipuçları', href: '/kategori/finans', icon: CurrencyDollarIcon },
    { name: 'Eğitim', description: 'Öğrenme ve gelişim kaynakları', href: '/kategori/eğitim', icon: AcademicCapIcon },
    { name: 'Haberler', description: 'Son haberlerle güncel kalın', href: '/kategori/haberler', icon: NewspaperIcon },
    { name: 'Bilim', description: 'Bilimsel gelişmeler ve araştırmalar', href: '/kategori/bilim', icon: BeakerIcon   },
  ];
const callsToAction = [
  { name: '', href: '/kategori/finans', icon: CurrencyDollarIcon },
  { name: '', href: '/kategori/haberler', icon: NewspaperIcon },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();
  const location = useLocation(); 
  const {currentUser} = useContext(AuthContext)
  const {logout} = useContext(AuthContext)


  const isBlogPage = location.pathname.startsWith('/blog/');

  const handlelogout = () => {
    logout()
    console.log("handlelogout")
};

  
  return (
    <header className={isBlogPage ? "bg-[#1D1D1D]  p-3" : "bg-[#1D1D1D] w-screen shadow "}>
      <nav aria-label="Global" className="mx-auto flex  w-[95%]  items-center justify-between p-8  lg:px-8">
        <div className="flex xl:flex-1  flex-row item-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <a className="-m-1.5 p-1.5" >
            <img
              alt=""
              src={require("../assetes/nexarapng.png")}
              className="h-[50px] w-auto"
            />
         
          </a>
          <div className="text-white flex items-center text-xl">Forendon<span className='font-bold text-green-600'>BLOG</span></div>
        </div>
        <div className="flex xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Ana menüyü aç</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden xl:flex xl:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-l font-bold leading-6 text-white hover:text-green-500">
              Kategori
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-[#1D1D1D] shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-500  group-hover:bg-green-500">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-green-500  group-hover:text-gray-300" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-white">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-[#1D1D1D]">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-gray-600"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a href="/ara" className="text-sm leading-6 text-white hover:text-green-500 text-l font-bold">
            Ara
          </a>
          <a href="/iletisim" className="text-sm leading-6 text-white hover:text-green-500 text-l font-bold">
            İletişim
          </a>
          <a href="/sirkethakkinda" className="text-sm leading-6 text-white hover:text-green-500 text-l font-bold">
            Şirket Hakkında
          </a>
        </PopoverGroup>
        <div className="hidden xl:flex xl:flex-1 xl:justify-end">
          
          {currentUser ?
          ( <div className="flex items-center gap-2 flex-row">
        
            <img className="w-11 h-11 rounded-[50%]  object-cover" src={currentUser.img ? currentUser?.img : "https://i.pinimg.com/564x/74/d7/b0/74d7b05c3476e062ca7c26452ffb22cb.jpg"  }  />
           
           <h3 className='flex text-white'>{currentUser?.username}</h3> 
           <button 
           onClick={() => navigate("/profil")}
             className= "text-white bg-green-600 transition duration-300 ease-in-out hover:bg-green-900 px-4 py-2 rounded"
           >
            Profil
           </button>
           <button 
           onClick={handlelogout}
             className=" text-white bg-green-600 transition duration-300 ease-in-out hover:bg-green-900 px-4 py-2 rounded"
           >
             Çıkış Yap 
           </button>
         </div>
         ) 
         :
          ( 
          <a href="/girisyap" className="text-sm leading-6 text-white hover:text-green-500 text-l font-bold">
          Giriş Yap  
          </a>
           ) 
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="xl:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#1D1D1D] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Forendon</span>
              <img
                alt=""
                src={require("../assetes/nexarapng.png")}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Menüyü Kapat</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y bg-[#1D1D1D]">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-700">
                    Kategori
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="/ara"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                >
                  Ara
                </a>
                <a
                  href="/iletisim"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                >
                  İletişim
                </a>
                <a
                  href="/sirkethakkinda"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                >
                  Şirket Hakkında
                </a>
              </div>
              <div className="py-6">
                {currentUser ?
                (             
               <div className="flex gap-3 items-center">
              <img className="w-11 h-11 rounded-[50%]" src={currentUser.img ? currentUser?.img : "https://i.pinimg.com/564x/74/d7/b0/74d7b05c3476e062ca7c26452ffb22cb.jpg"  }  />
              <h3 className='flex text-white'>{currentUser?.username}</h3> 
              <button 
           onClick={() => navigate("/profil")}
             className= "text-white bg-green-600 transition duration-300 ease-in-out hover:bg-green-900 px-4 py-2 rounded"
           >
            Profil
           </button>
               <button  
                   onClick={handlelogout}
               className=" text-white bg-green-600 transition duration-300 ease-in-out hover:bg-green-900 px-4 py-2 rounded"
              >
               Çıkış Yap
              </button>
               </div>
               )  :
               (  <a 
               onClick={() => navigate("/girisyap")}
               className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-700">
                  Giriş Yap</a> 
               )
                 }

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
