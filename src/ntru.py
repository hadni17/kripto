from fracModulo import extEuclidPoly,modPoly,multPoly,reModulo,addPoly,cenPoly, trim
import numpy as np

N=11
p=3
q=32

f=[-1,1,1,0,-1,0,1,0,0,1,-1]
g=[-1,0,1,1,0,1,0,0,-1,0,-1]


print("==== Bob generates public key =====")
print("Values used:")
print(" N=",N)
print(" p=",p)
print(" q=",q)
print("========")
print("\nBob picks two polynomials (g and f):")


#f=[-1,0,1,1,-1,0,-1]
#g=[0,-1,-1,0,1,0,1]

d=2

print("f(x)= ",f)
print("g(x)= ",g)



D=[0]*(N+1)
D[0]=-1
D[N]=1


print("\n====Now we determine F_p and F_q ===")
[gcd_f,s_f,t_f]=extEuclidPoly(f,D)

f_p=modPoly(s_f,p)
f_q=modPoly(s_f,q)
print("F_p:",f_p)
print("F_q:",f_q)

x=multPoly(f_q,g)
h=reModulo(x,D,q)

print("\n====And finally h====")
print("f_q x g: ",x)
print("H (Bob's Public Key): ",h)

print("\n====Let's encrypt====")
msg=[1,0,1,0,1,0,0,1,1]
randPol=[-1,-1,1,1]

# ini pesan
# text = ("vakekok")
# ascii_values = []
# for character in text:
#     ascii_values.append(ord(character))
# print("pesan =", ascii_values)

plain = "toni"
# Loop for
input_arr = np.unpackbits(np.frombuffer(bytes(plain, 'utf-8'), dtype=np.uint8))
message = np.trim_zeros(list(input_arr), 'b')
print(message)
print(bytearray(np.packbits(message)).decode().strip("\x00"))



print("Alice's Message:\t",msg)
print("Random:\t\t\t",randPol)
e_tilda=addPoly(multPoly(multPoly([p],randPol),h),msg)
e=reModulo(e_tilda,D,q)

print("Encrypted message:\t",e)

print("\n====Let's decrypt====")

tmp=reModulo(multPoly(f,e),D,q)
centered=cenPoly(tmp,q)
m1=multPoly(f_p,centered)
tmp=reModulo(m1,D,p)

print("Decrypted message:\t",trim(tmp))
