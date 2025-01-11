

// const ctx=document.getElementById('chrt').getContext('2d');
// const dataPoints = [];
//         const labels = [];
//         for (let i = 0; i < 18; i++) {
//             dataPoints.push(Math.random() * 100);  // Random value between 0 and 100
//             labels.push(i.toString());  // Sample at equal intervals
//         }

//         // Chart.js configuration
//         const chart = new Chart(ctx, {
//             type: 'line',  // Line chart
//             data: {
//                 labels: labels,  // Time interval labels on the x-axis
//                 datasets: [{
//                     label: 'Real-Time Data',
//                     data: dataPoints,  // Random data points
//                     borderColor: '#FF69B4',  // Sassy pink color for the line
//                     backgroundColor: 'rgba(255, 105, 180, 0.2)',  // Light pink fill
//                     pointBackgroundColor: '#FF69B4',  // Pink points
//                     fill: true,  // Fill the area under the line
//                     tension: 0.4,  // Smooth curve
//                     borderWidth: 3,
//                     pointRadius: 6,
//                     pointHoverRadius: 8,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Spectral Graph',
//                         font: {
//                             size: 24,
//                             weight: 'bold',
//                         },
//                         color: '#FF69B4',
//                         padding: 20,
//                     },
//                     tooltip: {
//                         backgroundColor: 'rgba(255, 105, 180, 0.7)',
//                         titleColor: '#FFFFFF',
//                         bodyColor: '#FFFFFF',
//                         borderColor: '#FF69B4',
//                         borderWidth: 1,
//                     }
//                 },
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Time (seconds)',
//                             color: '#FFFFFF',
//                             font: {
//                                 size: 16,
//                                 weight: 'bold',
//                             },
//                         },
//                         ticks: {
//                             color: '#FFFFFF',
//                             font: {
//                                 size: 14,
//                             }
//                         },
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Data Points',
//                             color: '#FFFFFF',
//                             font: {
//                                 size: 16,
//                                 weight: 'bold',
//                             },
//                         },
//                         ticks: {
//                             color: '#FFFFFF',
//                             font: {
//                                 size: 14,
//                             },
//                             suggestedMin: 0,
//                             suggestedMax: 100,
//                         },
//                     }
//                 },
//                 animation: {
//                     duration: 1000,  // 1-second animation
//                     easing: 'easeInOutQuad',
//                 }
//             }
//         });


const socket=new WebSocket("ws://localhost:8765");
socket.onopen=()=>{
    console.log('connection established');
};
socket.onmessage=(event)=>{
    // const el=document.getElementById("spectro");
    // const dat=JSON.parse(JSON.parse(event.data));
    // console.log(dat.data);
    // el.textContent=dat.data.join(" ");
    const labels = [
        "A, 410 nm",
        "B, 435 nm",
        "C, 460 nm",
        "D, 485 nm",
        "E, 510 nm",
        "F, 535 nm",
        "G, 560 nm",
        "H, 585 nm",
        "R, 610 nm",
        "S, 645 nm",
        "I, 680 nm",
        "J, 705 nm",
        "T, 730 nm",
        "U, 760 nm",
        "V, 810 nm",
        "W, 860 nm",
        "K, 900 nm",
        "L, 940 nm"
    ]
    const ctx=document.getElementById("chrt").getContext("2d");
    const chart=new Chart(ctx,{
        type: 'line',  // Line chart
        data: {
            labels: labels,  // Time interval labels on the x-axis
            datasets: [{
                label: 'Real-Time Data',
                data: JSON.parse(JSON.parse(event.data)).data,  // Random data points
                borderColor: '#FF69B4',  // Sassy pink color for the line
                backgroundColor: 'rgba(255, 105, 180, 0.2)',  // Light pink fill
                pointBackgroundColor: '#FF69B4',  // Pink points
                fill: true,  // Fill the area under the line
                tension: 0.4,  // Smooth curve
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Spectral Graph',
                    font: {
                        size: 24,
                        weight: 'bold',
                    },
                    color: '#FF69B4',
                    padding: 20,
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 105, 180, 0.7)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#FF69B4',
                    borderWidth: 1,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'wavelength',
                        color: '#FFFFFF',
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'absorbance',
                        color: '#FFFFFF',
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                    },
                }
            },
            animation: {
                duration: 1000,  // 1-second animation
                easing: 'easeInOutQuad',
            }
        }
    }

    );
};
socket.onerror=(error)=>{
    console.log(error);
};
socket.onclose=()=>{
    console.log('closed');
};