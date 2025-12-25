import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

def plot_bearing_health():
    # CSV dosyasını oku
    df = pd.read_csv('bearing_rms_results.csv')
    
    # Tarih formatını düzelt (Dosya isimleri: YYYY.MM.DD.HH.MM.SS)
    # Örnek: 2003.10.22.12.06.24 -> 2003-10-22 12:06:24
    df['Timestamp'] = pd.to_datetime(df['Timestamp'], format='%Y.%m.%d.%H.%M.%S')
    
    # Grafiği hazırla
    plt.figure(figsize=(15, 10))
    
    # 4 Rulman için alt grafikler (Subplots)
    bearings = [
        ('Bearing 1', ['B1_X', 'B1_Y']),
        ('Bearing 2', ['B2_X', 'B2_Y']),
        ('Bearing 3', ['B3_X', 'B3_Y']),
        ('Bearing 4', ['B4_X', 'B4_Y'])
    ]
    
    for i, (name, cols) in enumerate(bearings, 1):
        plt.subplot(2, 2, i)
        for col in cols:
            plt.plot(df['Timestamp'], df[col], label=col, linewidth=1)
        
        plt.title(name)
        plt.xlabel('Date')
        plt.ylabel('RMS Vibration (g)')
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m-%d'))
    
    plt.tight_layout()
    plt.savefig('bearing_health_plot.png', dpi=300)
    print("Graph saved to bearing_health_plot.png")

if __name__ == "__main__":
    plot_bearing_health()
