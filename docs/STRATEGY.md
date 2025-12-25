# SILENT-EAR: Endüstriyel Kestirimci Bakım Projesi (Conatus Ajan #37)

## 1. Stratejik Temel
**Karar Tarihi:** 26 Aralık 2025
**Statü:** ONAYLANDI (Conatus Strategy Board)
**Niş:** Edge AI / Endüstriyel IoT
**Teknoloji Çekirdeği:** Rust, Gömülü Sistemler, DSP (Dijital Sinyal İşleme)

## 2. Yönetici Özeti
Fabrika ortamlarındaki motor ve dönen ekipmanların (rulman, fan, pompa) ses ve titreşim verilerini yerel (on-device) olarak analiz eden, buluta bağımlı olmayan, Rust tabanlı bir yapay zeka ajanıdır. Amacı, plansız duruşları (downtime) önleyerek fabrikanın operasyonel "Conatus"unu korumaktır.

## 3. Yol Haritası (Roadmap)

### FAZ 1: Simülasyon ve Prototip (Hafta 1-2)
- [ ] **Veri Temini:** NASA Bearing Dataset veya IMS Bearing Data'nın indirilmesi ve temizlenmesi.
- [ ] **DSP Motoru (Rust):** Ham ses verisinden öznitelik çıkaran (FFT, RMS, Kurtosis) Rust kütüphanesinin yazılması.
- [ ] **Model Eğitimi:** Basit bir Anomali Tespit modelinin (Isolation Forest veya Autoencoder) eğitilmesi.
- [ ] **PC Demosu:** Laptop mikrofonu ile çalışan, basit bir fanın sesini analiz eden CLI uygulaması.

### FAZ 2: Gömülü Sistem Entegrasyonu (Hafta 3-6)
- [ ] **Donanım Seçimi:** Raspberry Pi 4/5 veya NVIDIA Jetson Nano + Piezo sensörler.
- [ ] **Cross-Compilation:** Rust kodunun ARM mimarisi için derlenmesi.
- [ ] **Gerçek Zamanlı İşleme:** Veri akışını (stream) gecikmesiz işleyen asenkron (Tokio) yapının kurulması.

### FAZ 3: Saha Testi ve Ürünleştirme (Ay 2+)
- [ ] **Pilot Kurulum:** Dost bir atölye veya sanayi ortamında test.
- [ ] **Dashboard:** Basit, yerel ağda çalışan bir web arayüzü (Rust/Actix veya Leptos).
- [ ] **Kutu Tasarımı:** Endüstriyel koruma standartlarına uygun (IP67) kutu tasarımı (3D baskı prototip).

## 4. Teknik Stack (Mustafa Saraç Core)
- **Dil:** Rust (Kesinlikle. Python yok.)
- **Matematik/DSP:** `ndarray`, `rustfft`
- **ML/AI:** `burn` veya `linfa` (Rust-native ML)
- **Runtime:** `Tokio` (Asenkron)
- **Veri Tabanı:** `Sled` (Gömülü, pure Rust DB)

## 5. Risk Analizi (The Critic)
- **Donanım Gürültüsü:** Fabrika ortamı çok gürültülü. Arka plan sesini filtrelemek (Noise Cancellation) zor olabilir.
- **Sensör Montajı:** Sensörün motora nasıl yapıştırılacağı kritik. Kötü montaj = Kötü veri.
- **Maliyet:** Donanım maliyeti $100'ı geçerse pazar daralabilir.

---
*Bu belge Conatus Strateji Kurulu tarafından oluşturulmuştur.*
