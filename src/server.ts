  import app from './app';
  import prisma from './config/database';

  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  const startServer = async () => {
    try {
      await prisma.$connect();
      console.log('✅ Database connected successfully');

      const server = app.listen(PORT, () => {
        console.log('\n🚀 =====================================');
        console.log(`   Server running in ${NODE_ENV} mode`);
        console.log(`   URL: http://localhost:${PORT}`);
        console.log(`   Health: http://localhost:${PORT}/health`);
        console.log(`   API: http://localhost:${PORT}/api`);
        console.log('=====================================\n');
      });

      server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`❌ Port ${PORT} is already in use`);
        } else {
          console.error('❌ Server error:', error);
        }
        process.exit(1);
      });

      server.timeout = 120000; // 2 minutes

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      await prisma.$disconnect();
      process.exit(1);
    }
  };


  const gracefulShutdown = async (signal: string) => {
    console.log(`\n⏳ ${signal} received. Shutting down gracefully...`);

    try {
      await prisma.$disconnect();
      console.log('✅ Database disconnected');

      setTimeout(() => {
        console.log('✅ Server shut down complete');
        process.exit(0);
      }, 5000);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  process.on('uncaughtException', (error: Error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
  });

  process.on('unhandledRejection', (reason: any) => {
    console.error('❌ Unhandled Rejection:', reason);
    gracefulShutdown('unhandledRejection');
  });

  startServer();