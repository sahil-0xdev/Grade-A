"""
Validation Service using Pandas for Grade A
Parses CSV and Excel student datasets, checks ranges, unique IDs, and missing values.
"""
import io
import pandas as pd
from typing import Dict, Any, List

REQUIRED_COLS_MAP = {
    'student_id': ['student_id', 'student id', 'studentid', 'id'],
    'student_name': ['student_name', 'student name', 'name', 'student'],
    'attendance': ['attendance', 'attendance_pct', 'attendance percentage', 'attendance%'],
    'assignments': ['assignments', 'assignment_completion', 'assignment completion', 'assignments%'],
    'test1': ['test1', 'test 1', 'test_1', 'unit_test_1'],
    'test2': ['test2', 'test 2', 'test_2', 'midterm', 'midterm_exam'],
    'test3': ['test3', 'test 3', 'test_3', 'final', 'unit_test_2']
}

def normalize_column_name(col_name: str) -> str:
    cleaned = str(col_name).strip().lower().replace('-', '_').replace(' ', '_')
    for standard_col, variants in REQUIRED_COLS_MAP.items():
        if cleaned in [v.replace(' ', '_') for v in variants]:
            return standard_col
    return cleaned

def parse_and_validate_file(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    errors: List[str] = []
    warnings: List[str] = []

    try:
        if filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(file_bytes))
        else:
            # Assume CSV
            df = pd.read_csv(io.BytesIO(file_bytes))
    except Exception as e:
        return {
            'valid': False,
            'errors': [f'Failed to read spreadsheet file: {str(e)}'],
            'warnings': [],
            'preview': [],
            'records': [],
            'total_rows': 0
        }

    if df.empty:
        return {
            'valid': False,
            'errors': ['The uploaded spreadsheet is empty.'],
            'warnings': [],
            'preview': [],
            'records': [],
            'total_rows': 0
        }

    # Normalize column names
    col_mapping = {col: normalize_column_name(col) for col in df.columns}
    df.rename(columns=col_mapping, inplace=True)

    # Check student_id
    if 'student_id' not in df.columns:
        errors.append("Missing required column for Student Identifier ('student_id' or 'id').")

    # Check attendance & assignments
    if 'attendance' not in df.columns and 'classes_attended' not in df.columns:
        errors.append("Missing attendance column ('attendance' percentage or 'classes_attended').")

    if errors:
        return {
            'valid': False,
            'errors': errors,
            'warnings': warnings,
            'preview': [],
            'records': [],
            'total_rows': len(df)
        }

    # Check duplicate student IDs
    if 'student_id' in df.columns:
        duplicates = df[df.duplicated(subset=['student_id'], keep=False)]
        if not duplicates.empty:
            dup_ids = duplicates['student_id'].unique().tolist()
            errors.append(f"Duplicate Student IDs detected: {', '.join(map(str, dup_ids[:5]))}")

    valid_records = []

    for idx, row in df.iterrows():
        row_num = idx + 2 # 1-based index including header
        s_id = str(row.get('student_id', '')).strip()
        s_name = str(row.get('student_name', s_id)).strip() if pd.notna(row.get('student_name')) else f"Student {s_id}"
        cls_name = str(row.get('class', 'General')).strip() if pd.notna(row.get('class')) else 'General'
        section = str(row.get('section', 'A')).strip() if pd.notna(row.get('section')) else 'A'

        # Attendance parsing
        att_raw = row.get('attendance')
        if pd.isna(att_raw):
            if pd.notna(row.get('classes_attended')) and pd.notna(row.get('total_classes')):
                try:
                    cls_att = float(row.get('classes_attended'))
                    tot_cls = float(row.get('total_classes'))
                    att_pct = round((cls_att / tot_cls) * 100, 1) if tot_cls > 0 else 0.0
                except (ValueError, ZeroDivisionError):
                    att_pct = None
            else:
                att_pct = None
                warnings.append(f"Row {row_num} ({s_name}): Missing attendance data.")
        else:
            try:
                att_pct = float(att_raw)
                if att_pct < 0 or att_pct > 100:
                    errors.append(f"Row {row_num}: Attendance {att_pct}% out of range (0-100).")
            except ValueError:
                errors.append(f"Row {row_num}: Invalid numeric attendance '{att_raw}'.")
                att_pct = None

        # Assignments parsing
        asg_raw = row.get('assignments')
        if pd.isna(asg_raw):
            if pd.notna(row.get('assignments_submitted')) and pd.notna(row.get('total_assignments')):
                try:
                    asg_sub = float(row.get('assignments_submitted'))
                    tot_asg = float(row.get('total_assignments'))
                    asg_pct = round((asg_sub / tot_asg) * 100, 1) if tot_asg > 0 else 0.0
                except (ValueError, ZeroDivisionError):
                    asg_pct = None
            else:
                asg_pct = None
                warnings.append(f"Row {row_num} ({s_name}): Missing assignment completion data.")
        else:
            try:
                asg_pct = float(asg_raw)
                if asg_pct < 0 or asg_pct > 100:
                    errors.append(f"Row {row_num}: Assignment completion {asg_pct}% out of range (0-100).")
            except ValueError:
                errors.append(f"Row {row_num}: Invalid numeric assignments '{asg_raw}'.")
                asg_pct = None

        # Test marks parsing
        t1 = float(row['test1']) if pd.notna(row.get('test1')) and str(row.get('test1')).replace('.','',1).isdigit() else None
        t2 = float(row['test2']) if pd.notna(row.get('test2')) and str(row.get('test2')).replace('.','',1).isdigit() else None
        t3 = float(row['test3']) if pd.notna(row.get('test3')) and str(row.get('test3')).replace('.','',1).isdigit() else None

        marks_list = [m for m in [t1, t2, t3] if m is not None]
        avg_marks = round(sum(marks_list) / len(marks_list), 1) if marks_list else None

        valid_records.append({
            'studentId': s_id,
            'name': s_name,
            'className': cls_name,
            'section': section,
            'attendancePct': att_pct,
            'assignmentsPct': asg_pct,
            'averageMarks': avg_marks,
            'test1': t1,
            'test2': t2,
            'test3': t3,
            'hasMissingData': att_pct is None or asg_pct is None or avg_marks is None
        })

    is_valid = len(errors) == 0

    return {
        'valid': is_valid,
        'errors': errors,
        'warnings': warnings,
        'preview': valid_records[:5],
        'records': valid_records if is_valid else [],
        'total_rows': len(df)
    }
