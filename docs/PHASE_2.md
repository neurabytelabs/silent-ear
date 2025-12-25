# SILENT-EAR: Faz 2 - Rust ile Makine Öğrenmesi (Burn)

## Durum Analizi
Faz 1 başarıyla tamamlandı.
- [x] Veri Seti (IMS) indirildi ve işlendi.
- [x] Rust DSP motoru (`silent-ear`) yazıldı.
- [x] 2156 dosyalık ham veri saniyeler içinde işlenip RMS zaman serisine dönüştürüldü.
- [x] `bearing_health_plot.png` ile arıza anı görselleştirildi (Bearing 3 ve 4'te yükseliş bekleniyor).

## Faz 2 Hedefi: Akıllı Karar Mekanizması
Sadece RMS hesaplamak yetmez. Cihazın "Ben bozuluyorum!" diyebilmesi için bir eşik değerini (Threshold) veya anomaliyi kendi kendine öğrenmesi gerekir. Bunu **Python/PyTorch kullanmadan**, saf Rust ile yapacağız.

### Strateji: İstatistiksel Anomali Tespiti (Statistical Process Control)
Karmaşık bir Sinir Ağına (Neural Network) girmeden önce, endüstride en çok kullanılan ve en hafif yöntem olan "Hareketli Ortalama ve Standart Sapma" (Bollinger Bands mantığı) ile başlayacağız. Eğer veri, kendi belirlediği "Normal" aralığının (Mean + 3*StdDev) dışına çıkarsa, alarm verecek.

### Adımlar
1.  **Training Mode:** İlk 500 dosyanın (sağlıklı dönem) istatistiklerini öğren.
2.  **Inference Mode:** Gelen yeni veriyi bu istatistiklerle karşılaştır.
3.  **Alarm:** `RMS > Mean + 3 * StdDev` ise "CRITICAL" uyarısı ver.

Bunu `src/lib.rs` içine bir modül olarak ekleyelim ve `main.rs` içinde kullanalım.
