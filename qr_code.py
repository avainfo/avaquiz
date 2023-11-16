# basic_qrcode.py
import qrcode
import socket

ip = socket.gethostbyname(socket.gethostname())

img = qrcode.make(ip + ":8000")
type(img)
img.save("some_file.png")