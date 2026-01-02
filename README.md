# FirstRepo

> A modern, well-documented project built with best practices in mind.

## Overview

FirstRepo contains the **Ohme Historical Sites Dashboard** - a professional web application for managing and visualizing historical site data across multiple countries and years. This repository demonstrates clean architecture, comprehensive documentation, and AI-assisted development workflows.

## Features

- **Interactive Data Dashboard** - View and edit historical site data in real-time
- **Data Visualization** - Beautiful charts showing year-over-year trends
- **CSV Management** - Upload, edit, and download CSV data files
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Ohme Branding** - Professional design using official Ohme brand colors
- **Comprehensive Documentation** - For both developers and AI assistants
- **Modern Development Workflows** - Built with security and best practices in mind

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - it's a single-page application!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/drdave75/FirstRepo.git
cd FirstRepo
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

### Quick Start

1. Open `index.html` in your browser
2. View the historical sites data in the left table
3. See trends visualized in the right chart
4. Click on any data cell (except Country names) to edit
5. Upload your own CSV file using the "Upload CSV" button
6. Download the current data using the "Download CSV" button
7. Save changes with the "Save Changes" button

## Project Structure

```
FirstRepo/
├── index.html           # Main HTML structure
├── styles.css           # Ohme-branded styling
├── app.js               # Application logic and data management
├── sites-data.csv       # Sample data file
├── CLAUDE.md            # AI assistant development guide
├── README.md            # This file
└── LICENSE              # License information (to be added)
```

## Usage

### Viewing Data

The dashboard displays two main sections:

**Left Section - Sites by Country Table:**
- Shows historical site counts for each country/region
- Columns represent years (2025, 2024, 2023, 2022)
- All numeric cells are editable - click to modify

**Right Section - Historical Trends:**
- Line chart showing total sites per year
- Stats cards displaying:
  - Current year total
  - Year-over-year growth
  - Growth rate percentage
  - Top performing region

### Editing Data

1. Click any numeric cell in the table
2. Type the new value
3. Press Enter or click outside the cell
4. The chart will automatically update
5. Click "Save Changes" to persist your edits

### Managing CSV Files

**Upload a CSV:**
1. Click the "Upload CSV" button
2. Select your CSV file (format: Country,2025,2024,2023,2022)
3. Data will load automatically

**Download CSV:**
1. Click "Download CSV" to export current data
2. File will be saved with today's date in the filename

### CSV Format

Your CSV file should follow this structure:

```csv
Country,2025,2024,2023,2022
UK,145,132,118,95
Europe,523,487,421,368
Ireland,34,31,28,22
```

- First row: headers (Country, followed by years)
- Subsequent rows: country name and numeric values

## Development

### Setting Up Development Environment

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: [Add test command]
5. Commit your changes: `git commit -m 'feat: add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Development Workflows

This project uses AI-assisted development with Claude. For AI assistants working on this codebase, please refer to [CLAUDE.md](./CLAUDE.md) for comprehensive guidelines.

### Running Tests

```bash
# Add test commands as project develops
```

### Building

```bash
# Add build commands as project develops
```

## Contributing

We welcome contributions! Please follow these steps:

1. Read the [CLAUDE.md](./CLAUDE.md) file if you're an AI assistant
2. Fork the repository
3. Create a feature branch
4. Make your changes following our coding standards
5. Write or update tests as needed
6. Ensure all tests pass
7. Submit a pull request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

Example: `feat(auth): add user authentication system`

## Testing

[Add testing information as project develops]

- Unit tests: [Description]
- Integration tests: [Description]
- E2E tests: [Description]

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Comprehensive guide for AI assistants
- [API Documentation](./docs/api.md) - *(To be created)*
- [Architecture Guide](./docs/architecture.md) - *(To be created)*

## Security

Security is a top priority. We follow these practices:

- Regular dependency updates
- Security-focused code reviews
- Protection against OWASP Top 10 vulnerabilities
- Input validation at system boundaries

If you discover a security vulnerability, please email [your-email@example.com] instead of using the issue tracker.

## Roadmap

- [ ] Initial project setup
- [ ] Core functionality implementation
- [ ] Comprehensive test coverage
- [ ] CI/CD pipeline setup
- [ ] Documentation completion
- [ ] First stable release

## Technology Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 with custom properties
- **Visualization:** Chart.js 4.x
- **Data Format:** CSV
- **Architecture:** Single-page application (SPA)
- **Responsive:** Mobile-first design with CSS Grid and Flexbox

## Performance

[Add performance metrics and benchmarks as project develops]

## Browser/Platform Support

The Ohme Historical Sites Dashboard works on all modern browsers:

- **Chrome/Edge:** Version 90+
- **Firefox:** Version 88+
- **Safari:** Version 14+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+

## Design Specifications

### Ohme Brand Colors

The dashboard uses official Ohme branding:

- **Primary:** `#00D9A3` (Ohme green/teal)
- **Secondary:** `#1A1A1A` (dark charcoal)
- **Accent:** `#FFFFFF` (white)
- **Background:** `#F5F5F5` (light grey)

### Layout

- Two-column layout on desktop (side by side)
- Single-column layout on mobile (stacked vertically)
- Responsive breakpoints at 1024px, 768px, and 480px

## FAQ

### General Questions

**Q: What is this project for?**
A: The Ohme Historical Sites Dashboard is a data management tool for tracking and visualizing historical site counts across different countries and years. It's designed for easy data entry, visualization, and export.

**Q: Can I use my own data?**
A: Yes! You can upload any CSV file that follows the format: first column is the category/country name, subsequent columns are years with numeric values.

**Q: How do I save my changes permanently?**
A: The "Save Changes" button currently saves to browser memory. For permanent storage, click "Download CSV" to export your data. You can then upload it again later.

**Q: Can I add more years or countries?**
A: Currently, you need to edit the CSV file directly to add more columns (years) or rows (countries), then upload it. Future versions may include in-app editing.

**Q: Is this project production-ready?**
A: Yes! The dashboard is fully functional and can be deployed to any web server or hosting service. It requires no backend infrastructure.

## Troubleshooting

### Common Issues

**Issue:** CSV file won't load
**Solution:** Ensure your CSV follows the correct format (Country,Year1,Year2,...) with comma separators and no extra spaces.

**Issue:** Chart not displaying
**Solution:** Make sure you have an internet connection to load Chart.js from the CDN. Alternatively, download Chart.js locally.

**Issue:** Edits not saving
**Solution:** Click the "Save Changes" button after editing. For permanent storage, download the CSV file.

**Issue:** Page displays incorrectly on mobile
**Solution:** Ensure your browser is up to date. The dashboard requires modern CSS features.

**Issue:** Can't edit country names
**Solution:** This is by design - only numeric values are editable to maintain data integrity.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes in each release. *(To be created)*

## License

This project is licensed under the [LICENSE_TYPE] License - see the [LICENSE](./LICENSE) file for details. *(To be created)*

## Acknowledgments

- Thanks to all contributors who help improve this project
- Built with assistance from Claude AI
- [Add other acknowledgments]

## Contact & Support

- **Issues:** [GitHub Issues](https://github.com/drdave75/FirstRepo/issues)
- **Discussions:** [GitHub Discussions](https://github.com/drdave75/FirstRepo/discussions)
- **Email:** [your-email@example.com]

## Project Status

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-TBD-blue)
![Version](https://img.shields.io/badge/version-0.1.0-green)

---

**Note:** This is an active project under development. Many sections will be expanded as the project grows. Check back regularly for updates!

**Last Updated:** 2026-01-02
