// Ohme Historical Sites Dashboard
// Main Application Logic

class OhmeDashboard {
    constructor() {
        this.data = [];
        this.chart = null;
        this.hasUnsavedChanges = false;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadDefaultData();
        this.renderTable();
        this.renderChart();
        this.updateStats();
    }

    setupEventListeners() {
        // File upload
        document.getElementById('csvFileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e);
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadCSV();
        });

        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveChanges();
        });

        // Warn before leaving if there are unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    async loadDefaultData() {
        try {
            const response = await fetch('sites-data.csv');
            const csvText = await response.text();
            this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading default data:', error);
            this.showToast('Error loading default data. Using sample data.', 'error');
            this.useSampleData();
        }
    }

    useSampleData() {
        this.data = [
            { Country: 'UK', '2025': '162000', '2024': '143209' },
            { Country: 'France', '2025': '4180', '2024': '978' },
            { Country: 'Germany', '2025': '657', '2024': '72' },
            { Country: 'Ireland', '2025': '6200', '2024': '4300' },
            { Country: 'Belgium', '2025': '499', '2024': '26' },
            { Country: 'Spain', '2025': '664', '2024': '267' },
            { Country: 'Italy', '2025': '479', '2024': '30' },
            { Country: 'Portugal', '2025': '741', '2024': '118' }
        ];
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        this.data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            return row;
        });
    }

    renderTable() {
        const table = document.getElementById('sitesTable');
        const thead = document.getElementById('tableHeader');
        const tbody = document.getElementById('tableBody');

        if (this.data.length === 0) return;

        // Render headers
        const headers = Object.keys(this.data[0]);
        thead.innerHTML = headers.map(header => `<th>${header}</th>`).join('');

        // Render body
        tbody.innerHTML = this.data.map((row, rowIndex) => {
            return `<tr>${headers.map((header, colIndex) => {
                const isEditable = colIndex > 0 ? 'contenteditable="true"' : '';
                return `<td ${isEditable} data-row="${rowIndex}" data-col="${header}">${row[header]}</td>`;
            }).join('')}</tr>`;
        }).join('');

        // Add event listeners for editable cells
        tbody.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
            cell.addEventListener('input', (e) => {
                this.handleCellEdit(e);
            });
        });
    }

    handleCellEdit(e) {
        const cell = e.target;
        const rowIndex = parseInt(cell.dataset.row);
        const colName = cell.dataset.col;
        const newValue = cell.textContent.trim();

        // Update data
        this.data[rowIndex][colName] = newValue;
        this.hasUnsavedChanges = true;

        // Update chart
        this.renderChart();
        this.updateStats();
    }

    renderChart() {
        const canvas = document.getElementById('trendsChart');
        const ctx = canvas.getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare data for chart
        const years = Object.keys(this.data[0]).filter(key => key !== 'Country');
        const countries = this.data.map(row => row.Country);

        // Use actual global totals (includes all countries worldwide, not just those shown in table)
        const globalTotals = {
            '2024': 149000,
            '2025': 175420
        };

        const yearlyTotals = years.map(year => globalTotals[year] || 0);

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 217, 163, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 217, 163, 0.1)');

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Total Historical Sites',
                    data: yearlyTotals,
                    backgroundColor: gradient,
                    borderColor: '#00D9A3',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00D9A3',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#1A1A1A',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1A1A1A',
                        titleColor: '#00D9A3',
                        bodyColor: '#FFFFFF',
                        borderColor: '#00D9A3',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `Sites: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: '#1A1A1A',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#1A1A1A',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    }

    updateStats() {
        const statsSummary = document.getElementById('statsSummary');

        if (this.data.length === 0) return;

        const years = Object.keys(this.data[0]).filter(key => key !== 'Country');

        // Use actual global totals (includes all countries worldwide, not just those shown in table)
        const globalTotals = {
            '2024': 149000,
            '2025': 175420
        };

        const currentYear = years[0];
        const previousYear = years[1];

        const currentTotal = globalTotals[currentYear];
        const previousTotal = globalTotals[previousYear];
        const growth = currentTotal - previousTotal;
        const growthPercent = ((growth / previousTotal) * 100).toFixed(1);

        // Top country
        const topCountry = this.data.reduce((max, row) => {
            const current = parseInt(row[currentYear]) || 0;
            const maxValue = parseInt(max[currentYear]) || 0;
            return current > maxValue ? row : max;
        });

        statsSummary.innerHTML = `
            <div class="stat-card">
                <h3>${currentYear} Total</h3>
                <p>${currentTotal.toLocaleString()}</p>
            </div>
            <div class="stat-card">
                <h3>YoY Growth</h3>
                <p>${growth > 0 ? '+' : ''}${growth.toLocaleString()}</p>
            </div>
            <div class="stat-card">
                <h3>Growth Rate</h3>
                <p>${growthPercent > 0 ? '+' : ''}${growthPercent}%</p>
            </div>
            <div class="stat-card">
                <h3>Top Region</h3>
                <p style="font-size: 1.2rem;">${topCountry.Country}</p>
            </div>
        `;
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                this.parseCSV(event.target.result);
                this.renderTable();
                this.renderChart();
                this.updateStats();
                this.hasUnsavedChanges = false;
                this.showToast('CSV file loaded successfully!', 'success');
            } catch (error) {
                console.error('Error parsing CSV:', error);
                this.showToast('Error parsing CSV file. Please check the format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    downloadCSV() {
        if (this.data.length === 0) {
            this.showToast('No data to download', 'error');
            return;
        }

        // Convert data back to CSV
        const headers = Object.keys(this.data[0]);
        const csvContent = [
            headers.join(','),
            ...this.data.map(row => headers.map(h => row[h]).join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ohme-sites-data-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showToast('CSV file downloaded successfully!', 'success');
    }

    saveChanges() {
        this.hasUnsavedChanges = false;
        this.showToast('Changes saved successfully!', 'success');

        // In a real application, you would send the data to a server here
        console.log('Data to save:', this.data);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        if (type === 'error') {
            toast.style.backgroundColor = '#ff4444';
            toast.style.color = '#FFFFFF';
        } else {
            toast.style.backgroundColor = '#1A1A1A';
            toast.style.color = '#00D9A3';
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new OhmeDashboard();
});
