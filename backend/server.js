const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const carsRouter = require('./routes/cars');
app.use('/api/cars', carsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Serve HTML for home page
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

// Serve HTML for all car-related routes
// Using multiple route patterns to catch all possibilities
app.get('/:brand', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1/:param2', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1/:param2/:param3', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1/:param2/:param3/:param4', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1/:param2/:param3/:param4/:param5', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

app.get('/:brand/:param1/:param2/:param3/:param4/:param5/:param6', (req, res) => {
    const filePath = path.join(__dirname, '..', 'car-analyzer-table.html');
    res.sendFile(filePath);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET http://localhost:${PORT}/api/cars - Get all cars`);
    console.log(`   GET http://localhost:${PORT}/api/cars/stats - Get statistics`);
    console.log(`   GET http://localhost:${PORT}/api/cars/filters - Get filter options`);
    console.log(`   GET http://localhost:${PORT}/api/cars/search - Search with filters`);
    console.log(`   GET http://localhost:${PORT}/health - Health check`);
});