import {z} from 'zod'
export const userSchema= z.object({
userName:z.string().min(3,'minimum  3 string  of userName  is required '),
age:z.number().int().min(10).max(100), 
role:z.enum(['USER','ADMIN','MODERATOR']), 
dogName:z.string().min(3,'atleats put 3 words in here')
})
export  type Userinput = z.infer<typeof userSchema>