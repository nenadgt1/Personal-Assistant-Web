// Conversion units for different categories
const conversionUnits = {
    speed: {
        'Meters per second (m/s)': 1,
        'Kilometers per hour (km/h)': 3.6,
        'Miles per hour (mph)': 2.237
    },
    length: {
        'Meters (m)': 1,
        'Kilometers (km)': 0.001,
        'Centimeters (cm)': 100,
        'Inches (in)': 39.37,
        'Feet (ft)': 3.281,
        'Miles (mi)': 0.000621371
    },
    weight: {
        'Kilograms (kg)': 1,
        'Grams (g)': 1000,
        'Pounds (lb)': 2.205,
        'Ounces (oz)': 35.274
    },
    temperature: {
        'Celsius (°C)': 'celsius',
        'Fahrenheit (°F)': 'fahrenheit',
        'Kelvin (K)': 'kelvin'
    },
    currency: {
        'USD (Dollar)': 1,    // Placeholder values
        'EUR (Euro)': 0.85,   // To be updated with actual API
        'GBP (Pound)': 0.75
    },
    crypto: {
        'Bitcoin (BTC)': 0.000034,  // Placeholder values
        'Ethereum (ETH)': 0.00052,  // To be updated with actual API
        'Dogecoin (DOGE)': 13.73
    }
};

// Function to populate unit selectors based on selected conversion type
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const conversionTypeSelector = document.getElementById('conversion-type');

function populateUnitSelectors(conversionType) {
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    const units = conversionUnits[conversionType];
    for (const unit in units) {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    }
}

// Populate default (speed) units on load
populateUnitSelectors('speed');

// Event listener for changing the conversion type
conversionTypeSelector.addEventListener('change', (event) => {
    populateUnitSelectors(event.target.value);
});

// Convert Button Event Listener
document.getElementById('convert-button').addEventListener('click', () => {
    const conversionType = document.getElementById('conversion-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const decimalPlaces = parseInt(document.getElementById('decimal-places').value);
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;

    let result = 0;

    if (conversionType === 'temperature') {
        result = convertTemperature(inputValue, fromUnitValue, toUnitValue);
    } else {
        const fromFactor = conversionUnits[conversionType][fromUnitValue];
        const toFactor = conversionUnits[conversionType][toUnitValue];
        result = (inputValue * (toFactor / fromFactor));
    }

    document.getElementById('conversion-result').textContent = `Result: ${result.toFixed(decimalPlaces)}`;
});

// Function for temperature conversion
function convertTemperature(value, from, to) {
    if (from === to) return value;

    let result;
    if (from === 'Celsius (°C)') {
        if (to === 'Fahrenheit (°F)') result = (value * 9/5) + 32;
        else if (to === 'Kelvin (K)') result = value + 273.15;
    } else if (from === 'Fahrenheit (°F)') {
        if (to === 'Celsius (°C)') result = (value - 32) * 5/9;
        else if (to === 'Kelvin (K)') result = (value - 32) * 5/9 + 273.15;
    } else if (from === 'Kelvin (K)') {
        if (to === 'Celsius (°C)') result = value - 273.15;
        else if (to === 'Fahrenheit (°F)') result = (value - 273.15) * 9/5 + 32;
    }
    return result;
}
