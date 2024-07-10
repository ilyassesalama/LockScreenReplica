import subprocess
import os

def run_ps_command():
    result = subprocess.run(['ps'], capture_output=True, text=True)
    return result.stdout

def find_electron_app(ps_output):
    for line in ps_output.split('\n'):
        if 'Electron.app' in line and 'node_modules' in line:
            return line.strip()
    return None

def extract_app_path(electron_line):
    parts = electron_line.split()
    for part in parts:
        if 'node_modules' in part and 'Electron.app' in part:
            # Split the path and find the index of 'node_modules'
            path_parts = part.split(os.path.sep)
            node_modules_index = path_parts.index('node_modules')
            # Join the path parts up to, but not including, 'node_modules'
            return os.path.sep.join(path_parts[:node_modules_index])
    return None

def scan_directory(directory, target_word):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')  # Don't scan node_modules folder
        if 'detector.py' in files:
            files.remove('detector.py') # Don't scan the detector itself
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', errors='ignore') as f:
                    content = f.read()
                    if target_word in content:
                        return file_path
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
    return None

def main():
    ps_output = run_ps_command()
    electron_line = find_electron_app(ps_output)
    
    if not electron_line:
        print("No Electron app found running.")
        return
    
    app_path = extract_app_path(electron_line)
    
    if not app_path:
        print("Couldn't extract app path from the Electron process.")
        return
    
    print(f"Scanning directory: {app_path}")
    
    found_file = scan_directory(app_path, 'nosleep')
    if found_file:
        print(f"The word 'nosleep' was found in the file: {found_file}")
    else:
        print("The word 'nosleep' was not found in any file in the app directory.")

if __name__ == "__main__":
    main()