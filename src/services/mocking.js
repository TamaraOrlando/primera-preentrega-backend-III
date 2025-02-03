import { faker } from '@faker-js/faker';
import { createHash } from '../utils/index.js';
import { usersService, petsService } from './index.js';




const generatePets = async (num) => {
    try {
        const pets = [];
        for (let i = 0; i < num; i++) {
            const pet = {
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                birthDate: faker.date.past(),
                adopted: false,
            };
            pets.push(pet);
        }

        // Opcion para guardar en la base de datos:
        // await petsService.create(pets); 

        return pets;

    } catch (error) {
        throw new Error("Error al generar mascotas.")
    }
};


const generateUsers = async (num) => {
    try { 
        const users = [];
        for (let i = 0; i < num; i++) {
            const password = await createHash('coder123');
    
            const role = Math.random() > 0.5 ? 'admin' : 'user';
    
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: password,
                role: role,
                pets: [],
            };
            users.push(user);
        }
        // Opcion para guardar en la base de datos:
        //  await usersService.create(users);
    
        return users;

    } catch (error) { 
        throw new Error("Error al generar usuarios.")
    }
};



const generateData = async (req, res) => {
    try { 
        const { users, pets } = req.query;
    
        if (!users && !pets) {
            return res.status(400).send({ status: 'error', message: 'No users or pets count provided' });
        }

        let usersCreated = [];
        let petsCreated = [];

        if (users) {
            usersCreated = await generateUsers(parseInt(users));
            await usersService.create(usersCreated); 
        }

        if (pets) {
            petsCreated = await generatePets(parseInt(pets));
            await petsService.create(petsCreated);  
        }

    
        res.send({
            status: 'success',
            message: 'Data generada y guardada en DB',
            usersCreated: usersCreated.length,
            petsCreated: petsCreated.length,
        });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al generar data' })
    }
};



export const mockingService = {
    generatePets,
    generateUsers,
    generateData,
};
