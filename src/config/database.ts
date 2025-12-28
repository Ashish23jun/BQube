import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
  });

  prisma.$connect()
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Prisma Client initialized');
      }
    })
    .catch((error) => {
      console.error('❌ Prisma Client failed to initialize:', error);
      process.exit(1);
    });

  export default prisma;