document.addEventListener('DOMContentLoaded', function() {
    const airQualityElement = document.getElementById('air-quality');

    // Fetch current air quality data
    fetch('https://api.example.com/airquality/current')
        .then(response => response.json())
        .then(data => {
            airQualityElement.innerHTML = `
                <p>Location: ${data.location}</p>
                <p>PM2.5: ${data.pm25} µg/m³</p>
                <p>PM10: ${data.pm10} µg/m³</p>
                <p>O3: ${data.o3} µg/m³</p>
            `;
        })
        .catch(error => {
            airQualityElement.innerHTML = '<p>Error loading data. Please try again later.</p>';
            console.error('Error fetching air quality data:', error);
        });

    // Fetch historical air quality data for chart
    fetch('https://api.example.com/airquality/historical')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('airQualityChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.dates,
                    datasets: [{
                        label: 'PM2.5',
                        data: data.pm25,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }, {
                        label: 'PM10',
                        data: data.pm10,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }, {
                        label: 'O3',
                        data: data.o3,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching historical data:', error);
        });
});