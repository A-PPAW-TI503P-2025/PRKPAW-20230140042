import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, User, LayoutDashboard, Calendar, BookOpen } from 'lucide-react'; // Menggunakan ikon Lucide

function DashboardPage() {
  const navigate = useNavigate();
  // State untuk menyimpan nama pengguna (simulasi data yang didapat dari token/API)
  const [userName, setUserName] = useState('Mahasiswa Awal'); 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    // Simulasikan pengambilan data nama pengguna dari token atau API
    // Untuk saat ini, kita gunakan nilai default
    // const fetchedUserName = localStorage.getItem('userName') || 'Pengguna Aktif';
    // setUserName(fetchedUserName);

    // Update waktu setiap menit
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 60000); 

    return () => clearInterval(timer);
  }, []);

  // Fungsi Logout (Implementasi Poin 3)
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  // Data untuk Kartu Informasi (Simulasi Data Akademik)
  const academicData = [
    { icon: <BookOpen className="h-6 w-6 text-indigo-500" />, title: "Mata Kuliah Diambil", value: "8 SKS", color: "bg-indigo-50" },
    { icon: <Calendar className="h-6 w-6 text-green-500" />, title: "Jadwal Minggu Ini", value: "12 Pertemuan", color: "bg-green-50" },
    { icon: <User className="h-6 w-6 text-amber-500" />, title: "IPK Sementara", value: "3.75", color: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* --- HEADER DASHBOARD --- */}
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Dashboard Akademik
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
             <div className="flex items-center space-x-1 p-2 rounded-full bg-white shadow-sm border">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{currentTime} WIB</span>
             </div>
             {/* Tombol Logout di pojok kanan atas */}
             <button
                onClick={handleLogout}
                className="flex items-center space-x-2 py-2 px-4 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
          </div>
        </header>
        
        {/* --- SECTION SELAMAT DATANG --- */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl shadow-lg mb-10 transform transition duration-300 hover:scale-[1.01]">
            <h2 className="text-xl font-medium mb-1 opacity-80">Selamat Datang Kembali,</h2>
            <h3 className="text-4xl font-bold mb-4 animate-fadeIn">{userName}</h3>
            <p className="text-blue-200">
              Akses cepat ringkasan informasi akademik Anda di sini.
            </p>
        </div>

        {/* --- SECTION KARTU INFORMASI (STATS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {academicData.map((item, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl shadow-lg ${item.color} border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                {item.icon}
                <span className="text-xs font-semibold text-gray-500">{item.title}</span>
              </div>
              <p className="text-4xl font-extrabold text-gray-900">
                {item.value}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Aksi Cepat &gt;
              </p>
            </div>
          ))}
        </div>
        
        {/* --- KONTEN TAMBAHAN (Opsional) --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">Pemberitahuan Penting</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>Batas Akhir pengisian KRS adalah tanggal 25 Nov 2025.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
              <span>Pengumuman Beasiswa Genap 2025 telah dirilis.</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

// Tambahkan beberapa keyframe animasi dasar (misalnya di file CSS global Anda atau menggunakan style object)
// Contoh untuk 'animate-fadeIn'
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}
*/

export default DashboardPage;