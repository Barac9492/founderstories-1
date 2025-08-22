const { seedDatabase } = require('../src/ai/flows/seed-database.ts');

async function runSeeder() {
  try {
    console.log('Starting database seeding...');
    const result = await seedDatabase();
    console.log('✅ Database seeded successfully!');
    console.log(`📊 Results:`, result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

runSeeder();