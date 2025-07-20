import pool from '../../config/database';
import bcrypt from 'bcrypt';
import { z } from 'zod';


const createAdminSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string()
        .min(8, { message: `Password must be at least 8 characters long` })
        .regex(/[A-Z]/, { message: `Password must contain at least one uppercase letter` })
        .regex(/[a-z]/, { message: `Password must contain at least one lowercase letter` })
        .regex(/[0-9]/, { message: `Password must contain at least one number` })
        .regex(/[^A-Za-z0-9]/, { message: `Password must contain at least one special character` }), 
    role: z.enum(['reader', 'library_admin', 'platform_admin'])
});


async function createPlatformAdminUser(username: string, email: string, password: string, role: string) {
    try {
        const inputData = { username, email, password, role };
        const validatedInputData = createAdminSchema.parse(inputData); 
        
        const { 
            username: validatedUsername, 
            email: validatedEmail, 
            password: validatedPassword, 
            role: validatedRole 
        } = validatedInputData;
      
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(validatedPassword, saltRounds);

        await pool.query('CALL insert_user($1, $2, $3, $4)', [validatedUsername, validatedEmail, hashedPassword, validatedRole]);
        console.log(`User '${validatedUsername}' with role '${validatedRole}' created successfully.`);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            console.error("Zod Validation Error:", err.issues);
            process.exit(1);
        }
        console.error(`Error executing stored procedure insert_user:`, err);
        process.exit(1);
    } finally {
        await pool.end(); 
    }
}


const args = process.argv.slice(2);
if (args.length !== 4) {
    console.log("Usage: npx ts-node src/scripts/createAdminUser.ts <username> <email> <password> <role>");
    console.log("Example: npx ts-node src/scripts/createAdminUser.ts adminUser admin@example.com StrongP@ss1 platform_admin");
    process.exit(1); 
}

createPlatformAdminUser(args[0], args[1], args[2], args[3]);