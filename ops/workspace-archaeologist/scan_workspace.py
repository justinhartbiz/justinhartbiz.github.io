#!/usr/bin/env python3
"""
Workspace Archaeologist Scanner
===============================

Scans the workspace to generate the data for the Workspace Archaeologist dashboard.
Analyzes file sizes, types, dates, and detects duplicates.

Usage:
    python scan_workspace.py [--output output.json] [--dir workspace_path]
"""

import os
import sys
import json
import hashlib
import argparse
from datetime import datetime
from pathlib import Path
from collections import defaultdict, Counter
import time

# File types to analyze
FILE_TYPES = {
    "md": "Markdown",
    "html": "HTML",
    "js": "JavaScript",
    "py": "Python",
    "css": "CSS",
    "json": "JSON",
    "txt": "Text",
    "csv": "CSV",
    "xlsx": "Excel",
    "docx": "Word",
    "pdf": "PDF",
    "jpg": "Image",
    "jpeg": "Image",
    "png": "Image",
    "gif": "Image",
    "svg": "Image",
    "mp4": "Video",
    "mov": "Video",
    "webm": "Video",
    "mp3": "Audio",
    "wav": "Audio",
}

# Directories to exclude
EXCLUDE_DIRS = [
    "node_modules",
    ".git",
    "venv",
    "__pycache__",
    ".next",
    ".DS_Store",
    ".vscode",
]

def get_file_hash(file_path, block_size=65536):
    """Generate a hash for the file contents."""
    try:
        hasher = hashlib.md5()
        with open(file_path, 'rb') as f:
            buf = f.read(block_size)
            while len(buf) > 0:
                hasher.update(buf)
                buf = f.read(block_size)
        return hasher.hexdigest()
    except Exception as e:
        print(f"Error hashing {file_path}: {e}")
        return None

def get_file_info(file_path):
    """Get information about a file."""
    path = Path(file_path)
    stat = path.stat()
    
    try:
        last_modified = datetime.fromtimestamp(stat.st_mtime)
        created = datetime.fromtimestamp(stat.st_ctime)
        
        # Only hash files smaller than 10MB to avoid performance issues
        file_hash = get_file_hash(file_path) if stat.st_size < 10 * 1024 * 1024 else None
        
        return {
            "path": str(path),
            "name": path.name,
            "extension": path.suffix.lower()[1:] if path.suffix else "",
            "type": FILE_TYPES.get(path.suffix.lower()[1:], "Other"),
            "size": stat.st_size,
            "created": created.isoformat(),
            "modified": last_modified.isoformat(),
            "hash": file_hash,
        }
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def scan_directory(directory):
    """Scan a directory and return information about all files."""
    print(f"Scanning {directory}...")
    start_time = time.time()
    
    file_info = []
    file_hashes = defaultdict(list)
    stats = {
        "total_files": 0,
        "total_size": 0,
        "by_type": Counter(),
        "by_extension": Counter(),
        "large_files": [],
        "recent_files": [],
        "old_files": [],
    }
    
    for root, dirs, files in os.walk(directory):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            file_path = os.path.join(root, file)
            info = get_file_info(file_path)
            
            if info:
                file_info.append(info)
                stats["total_files"] += 1
                stats["total_size"] += info["size"]
                stats["by_type"][info["type"]] += 1
                stats["by_extension"][info["extension"]] += 1
                
                # Track large files (>1MB)
                if info["size"] > 1024 * 1024:
                    stats["large_files"].append(info["path"])
                
                # Track recent files (last 7 days)
                modified_date = datetime.fromisoformat(info["modified"])
                if (datetime.now() - modified_date).days < 7:
                    stats["recent_files"].append(info["path"])
                
                # Track old files (>180 days)
                if (datetime.now() - modified_date).days > 180:
                    stats["old_files"].append(info["path"])
                
                # Track file hashes for duplicate detection
                if info["hash"]:
                    file_hashes[info["hash"]].append(info["path"])
    
    # Find duplicates
    duplicates = {hash_: paths for hash_, paths in file_hashes.items() if len(paths) > 1}
    stats["duplicates"] = duplicates
    stats["duplicate_count"] = len(duplicates)
    
    # Calculate duplicate space waste
    duplicate_waste = 0
    for hash_, paths in duplicates.items():
        # Find the size of one of the duplicates
        for info in file_info:
            if info["path"] == paths[0]:
                # Multiply by the number of duplicate copies (original excluded)
                duplicate_waste += info["size"] * (len(paths) - 1)
                break
    
    stats["duplicate_waste"] = duplicate_waste
    
    # Calculate directory sizes
    dir_sizes = defaultdict(int)
    for info in file_info:
        path = Path(info["path"])
        for parent in path.parents:
            dir_sizes[str(parent)] += info["size"]
    
    stats["directory_sizes"] = dict(sorted(dir_sizes.items(), key=lambda x: x[1], reverse=True))
    
    # Get top-level directory stats
    top_dirs = {}
    for path, size in dir_sizes.items():
        parts = path.split(os.sep)
        if len(parts) > 1 and parts[-1] not in EXCLUDE_DIRS:
            # This assumes the workspace path is the starting directory
            relative_path = os.path.relpath(path, directory)
            if os.sep not in relative_path:
                top_dirs[relative_path] = size
    
    stats["top_level_dirs"] = dict(sorted(top_dirs.items(), key=lambda x: x[1], reverse=True))
    
    elapsed_time = time.time() - start_time
    print(f"Scan completed in {elapsed_time:.2f} seconds.")
    print(f"Found {stats['total_files']} files totaling {stats['total_size'] / (1024 * 1024):.2f} MB")
    print(f"Identified {stats['duplicate_count']} duplicate file groups wasting {stats['duplicate_waste'] / (1024 * 1024):.2f} MB")
    
    return {
        "files": file_info,
        "stats": stats,
        "scan_time": datetime.now().isoformat(),
        "elapsed_time": elapsed_time,
    }

def main():
    parser = argparse.ArgumentParser(description="Workspace Archaeologist Scanner")
    parser.add_argument("--output", help="Output JSON file path", default="workspace_scan.json")
    parser.add_argument("--dir", help="Directory to scan", default=os.getcwd())
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.dir):
        print(f"Error: {args.dir} is not a valid directory.")
        sys.exit(1)
    
    scan_data = scan_directory(args.dir)
    
    with open(args.output, 'w') as f:
        json.dump(scan_data, f, indent=2)
    
    print(f"Scan results saved to {args.output}")

if __name__ == "__main__":
    main()