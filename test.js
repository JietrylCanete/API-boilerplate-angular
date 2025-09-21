const axios = require('axios');

async function runTests() {
    try {
        const dep = await axios.post('http://localhost:4000/departments', { name: 'TestDept' });
        console.log('Created department:', dep.data);

        const all = await axios.get('http://localhost:4000/departments');
        console.log('All departments:', all.data);

        await axios.put(`http://localhost:4000/departments/${dep.data.id}`, { description: 'Updated' });
        console.log('Updated department');

        await axios.delete(`http://localhost:4000/departments/${dep.data.id}`);
        console.log('Deleted department');

    } catch (err) {
        console.error('Test failed:', err.response ? err.response.data : err.message);
    }
}

runTests();
