import mongoose from 'mongoose';
import { CharacterClassModel } from '../models/character-class.model';

async function seedCharacterClasses() {
    const classes = [
        {
            name: 'Novice',
            description: 'Perfect for beginners with no programming experience',
            skillTrees: ['Programming Basics', 'Logic', 'Algorithm Fundamentals'],
            difficulty: 'Beginner',
        },
        {
            name: 'Backend Engineer',
            description: 'Master server-side development and APIs',
            skillTrees: ['C#', 'Node.js', 'Java', 'Python'],
            difficulty: 'Intermediate',
        },
        {
            name: 'Frontend Engineer',
            description: 'Create beautiful and responsive user interfaces',
            skillTrees: ['React', 'Angular', 'Vue.js'],
            difficulty: 'Intermediate',
        },
        {
            name: 'Site Reliability Engineer',
            description: 'Learn to build and maintain scalable infrastructure',
            skillTrees: ['DevOps', 'Cloud Infrastructure', 'Monitoring'],
            difficulty: 'Advanced',
        },
    ];

    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-realms');

        for (const classData of classes) {
            await CharacterClassModel.create({
                ...classData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        console.log('Character classes seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding character classes:', error);
        process.exit(1);
    }
}

seedCharacterClasses();