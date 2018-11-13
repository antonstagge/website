import sys
import cv2
import numpy as np
import getopt
import io


AND_MASK = [-1, 254, 252, 248, 240, 224, 192, 128]
BIT_SHIFT = [-1, 7, 6, 5, 4, 3, 2, 1]

def convert_to_array(bytes_file):
    in_memory_file = io.BytesIO()
    bytes_file.save(in_memory_file)
    data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
    img = cv2.imdecode(data, 1)
    return img

def encode(carrier, secret, n):
    hidden = np.ndarray(carrier.shape, dtype=int)

    for x in range(hidden.shape[0]):
        for y in range(hidden.shape[1]):
            for c in range(hidden.shape[2]):
                if x < secret.shape[0] and y < secret.shape[1]:
                    clean = carrier[x][y][c] & AND_MASK[n]
                    prepared = secret[x][y][c] >> BIT_SHIFT[n]
                    hidden[x][y][c] = clean | prepared
                else:
                    hidden[x][y][c] = carrier[x][y][c]
    # cv2.imwrite(output_name, hidden, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
    return hidden



def decode(hidden, n):
    extracted = np.ndarray(hidden.shape, dtype=int)
    for x in range(hidden.shape[0]):
        for y in range(hidden.shape[1]):
            for c in range(hidden.shape[2]):
                extracted[x][y][c] = (hidden[x][y][c] & 255 - AND_MASK[n]) << BIT_SHIFT[n]

    # cv2.imwrite(output_name, extracted, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
    return hidden
