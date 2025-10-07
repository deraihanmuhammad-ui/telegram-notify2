README - Telegram Notify Server (Local)
-------------------------------------

1) Persiapan
- Pastikan Node.js terpasang (versi 14+).

2) Setup
- Salin file .env.example jadi .env dan isi BOT_TOKEN & CHAT_ID yang benar.
  $ cp .env.example .env
  (lalu edit .env)

3) Install dependencies
  $ npm install

4) Jalankan server
  $ npm start
  Server akan berjalan di http://localhost:3000

5) Uji dari browser (client)
- Buka file TOOLS_HACKING_GAME_server.html (diletakkan di folder yang sama atau di web server)
- Pastikan di file HTML variable SERVER_URL = "http://localhost:3000"
- Isi form -> klik Kirim Notifikasi. Server akan meneruskan pesan ke Telegram.

Catatan keamanan:
- Simpan BOT_TOKEN di server (.env), jangan taruh token di file HTML publik.
- Jika ingin host publik, gunakan HTTPS dan atur CORS sesuai domain.
