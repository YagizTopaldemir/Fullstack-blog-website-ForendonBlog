import React, { useEffect, useState } from 'react';

export default function ContactPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:forendon@endon.com?subject=İletişim Formu: ${firstName} ${lastName}&body=İsim: ${firstName}%0D%0AŞoyisim: ${lastName}%0D%0AE-posta: ${email}%0D%0ATelefon: ${phone}%0D%0AMesaj: ${message}`;
        window.location.href = mailtoLink;
    };

    useEffect(() => {
        document.title = 'ForendonBlog | İletişim';
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#f9fafb] p-5">
          
            <div className="lg:w-1/2 p-10 bg-[#1D1D1D] text-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-white">İletişime Geçin</h1>
                <p className="mb-6">Her türlü soru ve öneriniz için bizimle iletişime geçebilirsiniz.</p>

                <h2 className="text-2xl font-semibold text-white mb-2 mt-4">Telefon</h2>
                <p className='text-[#fcfcfcaf]'>+90 (0533) 435 6543</p>

                <h2 className="text-2xl font-semibold text-white mb-2 mt-4">E-posta</h2>
                <p className='text-[#fcfcfcaf]'>forendon@endon.com</p>
                <p className='text-[#fcfcfcaf]'>yagiztopaldemir00@gmail.com</p>

                <h2 className="text-2xl font-semibold text-white mb-2 mt-4">Adres</h2>
                <p className='text-[#fcfcfcaf]'>Adana/seyhan</p>
                <p className='text-[#fcfcfcaf]'>01150 Seyhan/Adana</p>
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1626908.0636293797!2d34.363283407195425!3d37.21080225012148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f4026736d83%3A0xfe54dda8f6597217!2sAdana!5e0!3m2!1str!2str!4v1728142782507!5m2!1str!2str"
                    width="100%"
                    height="250"
                    className="border-0 rounded-lg mt-2 bg-white"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

           
            <div className="lg:w-1/2 p-10">
                <h1 className="text-4xl font-bold mb-4">Bize Ulaşın</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">İsim</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Soyisim</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Telefon Numarası</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Mesaj</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[#1D1D1D] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Gönder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
