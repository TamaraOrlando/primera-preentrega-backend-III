import { mockingService } from '../services/mocking.js';

const getMockingPets = async (req, res) => {
    try {
        const pets = await mockingService.generatePets(10);
        res.send({ status: 'success', payload: pets });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al generar mascotas.' });
    }
};

const getMockingUsers = async (req, res) => {
    try { 
        const users = await mockingService.generateUsers(50);
        res.send({ status: 'success', payload: users });

    } catch (error) { 
        res.status(500).send({ status: 'error', message: 'Error al generar usuarios.' });
    }
};



const generateData = async (req, res) => {
    try { 
        const { users, pets } = req.query;
    
        if (users && isNaN(users)) {
            return res.status(400).send({ status: 'error', error: 'Invalid number of users' });
        }
    
        if (pets && isNaN(pets)) {
            return res.status(400).send({ status: 'error', error: 'Invalid number of pets' });
        }
    
    
        await mockingService.generateData(req, res);

    } catch (error) { 
        res.status(500).send({ status: 'error', message: 'Error al generar data.' });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData,
};

