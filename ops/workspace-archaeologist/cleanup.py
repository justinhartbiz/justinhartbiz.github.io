#!/usr/bin/env python3
"""
Workspace Archaeologist Cleanup
===============================

Implements the cleanup recommendations from the Workspace Archaeologist.
Can delete temporary files, remove duplicates, and help archive files.

Usage:
    python cleanup.py [--mode temp|dupes|all] [--dry-run]
"""

import os
import sys
import json
import shutil
import argparse
from pathlib import Path
from datetime import datetime

# Load scan data
def load_scan_data(scan_file):
    """Load the scan data from the JSON file."""
    try:
        with open(scan_file, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading scan data: {e}")
        return None

def cleanup_temp_files(workspace_dir, dry_run=False):
    """Clean up temporary files like .DS_Store, thumbs.db, etc."""
    print("Cleaning up temporary files...")
    
    temp_patterns = [
        ".DS_Store",
        "Thumbs.db",
        "*.tmp",
        "~$*",  # Excel/Word temp files
        "*.bak",
        "__pycache__",
    ]
    
    found_files = []
    total_size = 0
    
    # Find all matching files
    for root, dirs, files in os.walk(workspace_dir):
        for pattern in temp_patterns:
            if pattern.endswith('*'):
                # Handle patterns with wildcards
                prefix = pattern[:-1]
                for file in files:
                    if file.startswith(prefix):
                        file_path = os.path.join(root, file)
                        size = os.path.getsize(file_path)
                        found_files.append((file_path, size))
                        total_size += size
            else:
                # Handle exact matches (files)
                if pattern in files:
                    file_path = os.path.join(root, pattern)
                    size = os.path.getsize(file_path)
                    found_files.append((file_path, size))
                    total_size += size
                
                # Handle exact matches (directories)
                if pattern in dirs:
                    dir_path = os.path.join(root, pattern)
                    dir_size = get_dir_size(dir_path)
                    found_files.append((dir_path, dir_size))
                    total_size += dir_size
    
    # Delete or report files
    if found_files:
        for file_path, size in found_files:
            print(f"{'Would delete' if dry_run else 'Deleting'}: {file_path} ({size / 1024:.1f} KB)")
            
            if not dry_run:
                try:
                    if os.path.isfile(file_path):
                        os.remove(file_path)
                    elif os.path.isdir(file_path):
                        shutil.rmtree(file_path)
                except Exception as e:
                    print(f"  Error deleting {file_path}: {e}")
        
        print(f"{'Would free' if dry_run else 'Freed'} {total_size / (1024 * 1024):.2f} MB from {len(found_files)} temporary files")
    else:
        print("No temporary files found.")

def remove_duplicates(scan_data, dry_run=False):
    """Remove duplicate files based on scan data."""
    print("Removing duplicate files...")
    
    if "stats" not in scan_data or "duplicates" not in scan_data["stats"]:
        print("No duplicate information found in scan data.")
        return
    
    duplicates = scan_data["stats"]["duplicates"]
    if not duplicates:
        print("No duplicates found.")
        return
    
    total_size = 0
    deleted_count = 0
    
    for hash_value, paths in duplicates.items():
        if len(paths) <= 1:
            continue
        
        # Keep the first file, delete the rest
        original = paths[0]
        for duplicate in paths[1:]:
            try:
                size = os.path.getsize(duplicate)
                total_size += size
                
                print(f"{'Would delete' if dry_run else 'Deleting'} duplicate: {duplicate}")
                print(f"  Original: {original}")
                print(f"  Size: {size / 1024:.1f} KB")
                
                if not dry_run:
                    os.remove(duplicate)
                deleted_count += 1
            except Exception as e:
                print(f"  Error processing duplicate {duplicate}: {e}")
    
    print(f"{'Would remove' if dry_run else 'Removed'} {deleted_count} duplicates, saving {total_size / (1024 * 1024):.2f} MB")

def get_dir_size(path):
    """Get the total size of a directory."""
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if os.path.exists(fp):
                total_size += os.path.getsize(fp)
    return total_size

def archive_old_files(scan_data, dry_run=False):
    """Prepare old, large files for archiving."""
    print("Preparing files for archiving...")
    
    # Create archive directory if it doesn't exist
    archive_dir = os.path.join(os.getcwd(), "archive_candidates")
    if not os.path.exists(archive_dir) and not dry_run:
        os.makedirs(archive_dir)
    
    # Create a list of archive candidates
    candidates = []
    
    # Large, old files (>1MB, >90 days old)
    for file_info in scan_data["files"]:
        if file_info["size"] > 1 * 1024 * 1024:  # Larger than 1MB
            modified_date = datetime.fromisoformat(file_info["modified"])
            if (datetime.now() - modified_date).days > 90:
                candidates.append(file_info)
    
    if not candidates:
        print("No archive candidates found.")
        return
    
    # Sort by size (largest first)
    candidates.sort(key=lambda x: x["size"], reverse=True)
    
    # Write archive report
    report_path = os.path.join(archive_dir if not dry_run else os.getcwd(), "archive_report.txt")
    with open(report_path, 'w') as f:
        f.write("Workspace Archaeologist - Archive Candidates\n")
        f.write("===========================================\n\n")
        f.write(f"Generated: {datetime.now().isoformat()}\n\n")
        
        total_size = 0
        for candidate in candidates:
            size_mb = candidate["size"] / (1024 * 1024)
            f.write(f"File: {candidate['path']}\n")
            f.write(f"Size: {size_mb:.2f} MB\n")
            f.write(f"Last Modified: {candidate['modified']}\n")
            f.write(f"Type: {candidate['type']}\n")
            f.write("\n")
            total_size += candidate["size"]
        
        f.write(f"Total Size: {total_size / (1024 * 1024):.2f} MB\n")
    
    print(f"Archive report generated at {report_path}")
    print(f"Found {len(candidates)} archive candidates totaling {total_size / (1024 * 1024):.2f} MB")

def main():
    parser = argparse.ArgumentParser(description="Workspace Archaeologist Cleanup")
    parser.add_argument("--mode", choices=["temp", "dupes", "archive", "all"], 
                        default="all", help="Cleanup mode")
    parser.add_argument("--scan-file", default="workspace_scan.json", 
                        help="Scan data file path")
    parser.add_argument("--dry-run", action="store_true", 
                        help="Show actions without making changes")
    
    args = parser.parse_args()
    
    # Load scan data for operations that need it
    scan_data = None
    if args.mode in ["dupes", "archive", "all"]:
        scan_data = load_scan_data(args.scan_file)
        if not scan_data:
            print(f"Error: Could not load scan data from {args.scan_file}")
            print("Run scan_workspace.py first to generate scan data.")
            sys.exit(1)
    
    # Get workspace directory
    workspace_dir = os.getcwd()
    
    # Run requested cleanup operations
    if args.mode in ["temp", "all"]:
        cleanup_temp_files(workspace_dir, args.dry_run)
        print()
    
    if args.mode in ["dupes", "all"] and scan_data:
        remove_duplicates(scan_data, args.dry_run)
        print()
    
    if args.mode in ["archive", "all"] and scan_data:
        archive_old_files(scan_data, args.dry_run)
        print()
    
    print("Cleanup complete!")
    if args.dry_run:
        print("This was a dry run - no files were actually modified.")

if __name__ == "__main__":
    main()