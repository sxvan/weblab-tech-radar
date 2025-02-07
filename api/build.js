import { build } from 'esbuild';

build({
    entryPoints: ['./src/index.ts'], // Entry point (your TypeScript file)
    bundle: true, // Bundle all your modules
    outfile: './dist/index.js', // Output file for the bundled JavaScript
    platform: 'node', // Target environment is Node.js
    target: 'node16', // Set the target JavaScript version
    format: 'esm',
    sourcemap: true, // Optional: Generate source maps for debugging
    external: ['@prisma/client', '@apollo/server', 'graphql', 'graphql-scalars', 'reflect-metadata', 'type-graphql', 'jsonwebtoken', 'bcryptjs'], // Optional: Exclude specific modules from being bundled (like Prisma)
}).catch(() => process.exit(1));

build({
    entryPoints: ['./src/seed.ts'], // Entry point (your TypeScript file)
    bundle: true, // Bundle all your modules
    outfile: './dist/seed.js', // Output file for the bundled JavaScript
    platform: 'node', // Target environment is Node.js
    target: 'node16', // Set the target JavaScript version
    format: 'esm',
    sourcemap: true, // Optional: Generate source maps for debugging
    external: ['@prisma/client', '@apollo/server', 'graphql', 'graphql-scalars', 'reflect-metadata', 'type-graphql', 'jsonwebtoken', 'bcryptjs'], // Optional: Exclude specific modules from being bundled (like Prisma)
}).catch(() => process.exit(1));
