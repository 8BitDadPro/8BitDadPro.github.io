import os

poem_dir = 'poems'
files = [f for f in os.listdir(poem_dir) if f.endswith('.txt') and f[:10].count('-') == 2]
files.sort(reverse=True)

with open('poem_list.js', 'w') as out_file:
    out_file.write("const poemFiles = [\n")
    out_file.writelines([f'  "poems/{f}",\n' for f in files])
    out_file.write("];\n")

print("✅ poem_list.js generated.")
