# basic_qrcode.py

import segno
import socket

ip = socket.gethostbyname(socket.gethostname())



qrcode = segno.make_qr(ip + ":8000")
qrcode.save("basic_qrcode.png")