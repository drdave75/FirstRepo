---
name: ohme-data-updater
description: Updates the Ohme Historical Sites Dashboard with new country data, year columns, and global totals. Use when modifying CSV data, adding countries, changing years, or updating site counts.
---

# Ohme Data Updater Skill

## Overview

This skill ensures that updates to the Ohme Historical Sites Dashboard are done correctly and completely, maintaining data consistency across all files.

## When to Use

Invoke this skill when:
- Updating site counts for countries
- Adding or removing countries from the dashboard
- Adding or removing year columns
- Changing the global totals in the Historical Trends chart
- User provides new data to be displayed

## Update Process

### 1. Update the CSV File

**File:** `sites-data.csv`

- Maintain format: `Country,2025,2024` (or whatever years are needed)
- Use comma separators with no spaces around commas
- Use actual numbers (no commas in large numbers: `162000` not `162,000`)
- Countries should be listed one per row
- First row must be the header with year columns

**Example:**
```csv
Country,2025,2024
UK,162000,143209
France,4180,978
Germany,657,72
```

### 2. Update JavaScript Global Totals

**File:** `app.js`

Update the `globalTotals` object in **TWO places**:

**Location 1 - renderChart() method (around line 141):**
```javascript
const globalTotals = {
    '2024': 149000,
    '2025': 175420
};
```

**Location 2 - updateStats() method (around line 239):**
```javascript
const globalTotals = {
    '2024': 149000,
    '2025': 175420
};
```

**Important:** These must match! Update both locations with the same values.

**To calculate totals:** Sum all country values for each year from the CSV.

### 3. Update Sample Data Fallback

**File:** `app.js` - useSampleData() method (around line 57)

Update the fallback data to match the CSV:
```javascript
this.data = [
    { Country: 'UK', '2025': '162000', '2024': '143209' },
    { Country: 'France', '2025': '4180', '2024': '978' },
    // ... etc
];
```

### 4. Verify Calculations

Always double-check:
- Sum all 2025 values from CSV = globalTotals['2025']
- Sum all 2024 values from CSV = globalTotals['2024']
- If adding more years, add them to globalTotals

### 5. Update Documentation (if structure changes)

**File:** `README.md`

Update if:
- Year columns change (line 88, 111, 123)
- CSV format changes significantly
- New features are added

## Ohme Branding Requirements

Always maintain these brand colors:
- **Primary:** `#00D9A3` (Ohme green/teal)
- **Secondary:** `#1A1A1A` (dark charcoal)
- **Accent:** `#FFFFFF` (white)
- **Background:** `#F5F5F5` (light grey)

## Testing Checklist

After making updates:
- [ ] CSV file has correct format
- [ ] All country data is present
- [ ] globalTotals updated in both locations
- [ ] Totals match sum of country data
- [ ] Sample data matches CSV
- [ ] README updated if needed
- [ ] Commit with clear message using conventional commits format

## Commit Message Format

Use conventional commits:
```
feat: update data with [description]
```

Example:
```
feat: update data with Q1 2025 site counts

- UK: 162,000 sites (+18,791)
- France: 4,180 sites (+3,202)
- Updated global totals: 175,420 (2025), 149,000 (2024)
```

## Common Pitfalls

❌ **Don't:** Use commas in numbers in CSV (162,000)
✅ **Do:** Use plain numbers (162000)

❌ **Don't:** Update only one globalTotals location
✅ **Do:** Update both renderChart() and updateStats()

❌ **Don't:** Forget to update sample data fallback
✅ **Do:** Keep useSampleData() in sync with CSV

❌ **Don't:** Guess at global totals
✅ **Do:** Calculate by summing CSV values

## Related Files

- `sites-data.csv` - Primary data source
- `app.js` - Application logic (3 update points)
- `README.md` - Documentation (update if structure changes)
- `CLAUDE.md` - Project conventions reference
