// Add this function with your other functions
async function addWarehouse(lat, lng) {
    try {
        // Get city name from coordinates using Nominatim
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        // Extract city name from the response
        let cityName = data.address.city || 
                      data.address.town || 
                      data.address.village || 
                      data.address.suburb ||
                      'Unknown Location';

        const warehouse = {
            id: Date.now(),
            name: `${cityName} Warehouse`,
            lat: lat,
            lng: lng,
            cityName: cityName,
            active: true
        };

        // Store in localStorage
        const existingWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
        existingWarehouses.push(warehouse);
        localStorage.setItem('warehouses', JSON.stringify(existingWarehouses));
        
        return warehouse;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
}

// Add warehouse marker click handler
map.on('click', async function(e) {
    if (currentMode === 'warehouse') {
        try {
            const warehouse = await addWarehouse(e.latlng.lat, e.latlng.lng);
            addWarehouseMarker(warehouse);
            alert(`Warehouse added in ${warehouse.cityName}`);
        } catch (error) {
            alert('Failed to add warehouse');
        }
    }
}); 