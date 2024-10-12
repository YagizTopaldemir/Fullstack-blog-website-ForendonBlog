import React, { useEffect } from 'react';


export default function SayfaBulunamadi() {
  useEffect(() => {
    document.title = 'NexaraBlog | 404 Page';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-[#f9faf9] px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <img  src={require("../assetes/nexarapng.png")} alt="Logo" className="mb-4 w-24 h-auto mx-auto" />
          <p className="text-base font-semibold text-green-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sayfa bulunamadı</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Üzgünüz, aradığınız sayfayı bulamadık.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ana sayfaya dön
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Destek ile iletişime geç <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
