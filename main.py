import math, random
from pyscript import window, document
from pyodide.ffi import create_proxy

# === AREA EDIT PIN GEMBOK ===
PIN = "1410"   # PIN / kata sandi gembok (huruf besar-kecil, spasi, / - . , diabaikan)
# === AKHIR AREA EDIT ===


# ---------- Validasi PIN gembok (dipanggil dari script.js) ----------
def _norm(s):
    s = str(s).lower()
    for ch in " /-.,":
        s = s.replace(ch, "")
    return s

def check_pin(value):
    return _norm(value) == _norm(PIN)

window.pyCheckPin = create_proxy(check_pin)


# ---------- Animasi hati merah menyala: garis partikel lalu berdetak ----------
cv = document.getElementById("heartCanvas")      # Slide 1
ctx = cv.getContext("2d")
fcv = document.getElementById("finalCanvas")     # penutup Slide 5
fctx = fcv.getContext("2d")
W, H = cv.width, cv.height
N = 170

pts = []
for i in range(N):
    t = i / N * 2 * math.pi
    x = 16 * math.sin(t) ** 3
    y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
    pts.append((x, y))

sparks = []
for _ in range(60):
    px, py = random.choice(pts)
    r = math.sqrt(random.random()) * 0.85
    sparks.append((px * r, py * r, random.random() * 6.28))


def draw_heart(c, el):
    """Gambar hati pada canvas c; el = detik sejak animasi dimulai."""
    c.clearRect(0, 0, W, H)
    prog = min(1, el / 3.2)
    ph = (el * 1.15) % 1
    beat = 1
    if prog >= 1:
        beat = 1 + 0.09 * math.exp(-9 * ph) + 0.05 * math.exp(-9 * abs(ph - 0.3))
    sc = 9.6 * beat
    cx, cy = W / 2, H / 2 + 8
    c.shadowColor = "#ff1744"
    c.shadowBlur = 16
    c.fillStyle = "#ff1744"
    n = int(prog * N)
    for k, a in ((1, 1), (0.72, 0.5), (0.45, 0.3)):
        if k < 1 and prog < 1:
            continue
        c.globalAlpha = a
        for i in range(n):
            x, y = pts[i]
            c.beginPath()
            c.arc(cx + x * sc * k, cy + y * sc * k, 2.3 + math.sin(el * 4 + i) * 0.6, 0, 6.283)
            c.fill()
    if prog >= 1:
        c.fillStyle = "#ffd6e0"
        for x, y, p in sparks:
            c.globalAlpha = 0.3 + 0.7 * abs(math.sin(el * 2 + p))
            c.beginPath()
            c.arc(cx + x * sc, cy + y * sc, 1.6, 0, 6.283)
            c.fill()
    c.globalAlpha = 1


start = window.performance.now()
s1 = document.getElementById("s1")

def frame(now):
    if s1.classList.contains("active"):
        draw_heart(ctx, (now - start) / 1000)
    fs = window.finalStart            # diisi script.js saat penutup muncul
    if fs:
        draw_heart(fctx, (now - fs) / 1000)
    window.requestAnimationFrame(loop)

loop = create_proxy(frame)
window.requestAnimationFrame(loop)
window.onPythonReady()   # beri tahu script.js: loading selesai