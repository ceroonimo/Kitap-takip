import { useState, useEffect } from 'react'

function App() {
  const [kitaplar, setKitaplar] = useState(() => {
    const saved = localStorage.getItem("kitaplar");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ ad: "", yazar: "", tur: "", sayfa: "" });
  const [duzenlemeId, setDuzenlemeId] = useState(null);

  useEffect(() => {
    localStorage.setItem("kitaplar", JSON.stringify(kitaplar));
  }, [kitaplar]);

  const formDoldur = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const kitapEkleVeyaGuncelle = (e) => {
    e.preventDefault();
    if (!form.ad || !form.yazar) return alert("Lütfen gerekli alanları doldurun!");

    if (duzenlemeId) {
      setKitaplar(kitaplar.map(k => k.id === duzenlemeId ? { ...form, id: duzenlemeId } : k));
      setDuzenlemeId(null);
    } else {
      setKitaplar([...kitaplar, { ...form, id: Date.now() }]);
    }
    setForm({ ad: "", yazar: "", tur: "", sayfa: "" });
  };

  const sil = (id) => setKitaplar(kitaplar.filter(k => k.id !== id));

  const duzenle = (k) => {
    setForm(k);
    setDuzenlemeId(k.id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Üst Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 text-center shadow-lg mb-10">
        <h1 className="text-4xl font-bold">📚 Kitap Takip</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* Form Alanı */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-10 border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-purple-700 font-bold text-xl">
            <span>{duzenlemeId ? "📝 Kitabı Düzenle" : "➕ Yeni Kitap Ekle"}</span>
          </div>
          <form onSubmit={kitapEkleVeyaGuncelle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Kitap Adı *</label>
              <input name="ad" value={form.ad} onChange={formDoldur} className="w-full border rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-purple-200" placeholder="Örn: Nutuk" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Yazar *</label>
              <input name="yazar" value={form.yazar} onChange={formDoldur} className="w-full border rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-purple-200" placeholder="Örn: Atatürk" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Tür</label>
              <input name="tur" value={form.tur} onChange={formDoldur} className="w-full border rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-purple-200" placeholder="Örn: Tarih" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sayfa Sayısı</label>
              <input type="number" name="sayfa" value={form.sayfa} onChange={formDoldur} className="w-full border rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-purple-200" placeholder="Örn: 600" />
            </div>
            <button className="md:col-span-2 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all shadow-lg">
              {duzenlemeId ? "Değişiklikleri Kaydet" : "Kitaplığına Ekle"}
            </button>
          </form>
        </div>

        {/* Liste Alanı */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">📖 Kitap Listesi</h2>
        <div className="grid grid-cols-1 gap-4">
          {kitaplar.map(k => (
            <div key={k.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-all group">
              <div>
                <h4 className="text-xl font-bold text-indigo-900 mb-1">{k.ad}</h4>
                <div className="text-gray-500 space-y-1 text-sm">
                  <p className="flex items-center gap-2">✍️ {k.yazar}</p>
                  <p className="flex items-center gap-2">🏷️ {k.tur || "Belirtilmemiş"}</p>
                  <p className="flex items-center gap-2">📄 {k.sayfa || "0"} Sayfa</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => duzenle(k)} className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition-all">Düzenle</button>
                <button onClick={() => sil(k.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all">Sil</button>
              </div>
            </div>
          ))}
          {kitaplar.length === 0 && <p className="text-center text-gray-400 py-10">Kitaplığın henüz boş...</p>}
        </div>
      </div>
    </div>
  )
}

export default App