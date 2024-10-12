import React, { useEffect } from 'react';

export default function AboutCompanyPage() {

    useEffect(() => {
        document.title = 'ForendonBlog | Hakkımızda';
        window.scrollTo(0, 0);
      }, []);


    return (
        <div className="bg-gray-100 text-gray-800 py-10 px-6 flex items-center">
        <div className="container mx-auto flex  justify-center items-center flex-col">
        
          <div className="text-center mb-10">
            <h1 className="text-4xl  font-bold mb-4">Forendon<span className='text-green-600'>BLOG</span></h1>
            <p className="text-lg text-gray-600">
            En iyi yazılım çözümlerini sunmaya kendini adamış tutkulu bir ekibiz.
            </p>
          </div>
  
   
  
      
          <div className="grid w-[80%] gap-8 text-center">
       
            <div className="bg-white  p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img
                src={require("../assetes/yagi.jpg")}
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Yağız Topaldemir</h3>
              <p className="text-gray-500">CEO & Founder</p>
            </div>
  
          
          </div>
  
     
          <div className="mt-10  w-[80%] flex text-center  justify-center items-center flex-col ">
            <h2 className="text-2xl font-bold mb-4">Hakkımızda</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
            Forendon, 2024 yılında Yağız Topaldemir tarafından kurulan yenilikçi bir teknoloji şirketidir. Blog, web sitesi, uygulama ve oyun geliştirme gibi birçok farklı alanda hizmet veren Forendon, teknolojinin sunduğu tüm fırsatları kullanarak kullanıcılarına en iyi deneyimi sunmayı hedeflemektedir.

Vizyonumuz, kullanıcılarımızın hayatını kolaylaştıran, eğlendiren ve bilgilendiren dijital çözümler üretmektir. Sunduğumuz her projede, kalite, işlevsellik ve yenilikçi düşünceyi ön planda tutuyoruz. Ekibimiz, yazılım geliştirme, tasarım ve dijital içerik üretimi alanlarında uzmanlaşmış profesyonellerden oluşmaktadır.

Forendon, geleceği inşa eden dijital projelerle sürekli büyümeyi ve dünya çapında bir marka olmayı amaçlamaktadır. Hem bireysel hem de kurumsal çözümler sunarak, müşterilerimizin ihtiyaçlarına odaklanıyor ve en etkili dijital deneyimleri yaratıyoruz.

Her gün daha iyiye ulaşma hedefiyle çalışıyor, dijital dünyada fark yaratan projeler geliştirmeye devam ediyoruz.
            </p>
          </div>
        </div>
      </div>
    );
}
