@echo off
set ADMIN_EMAIL=malaika
set ADMIN_PASSWORD=malaika1970
set DATABASE_URL=postgresql://postgres:password@localhost:5432/fixpoint
cd /d F:\car repiring services\4carweb-main\45carweb-main
npx prisma db seed