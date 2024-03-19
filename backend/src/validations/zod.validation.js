import z from "zod";

const signupValidator = z.object({
  name: z
    .string({ required_error: "username is required." })
    .trim()
    .min(3, { message: "username must be at least of 3 characters." })
    .max(200, { message: "username must not be more than 200 characters." }),

  phone: z
    .string({ required_error: "PhoneNumber is required." })
    .trim()
    .min(11, { message: "PhoneNumber must be at least of 11 characters." })
    .max(20, { message: "PhoneNumber must not be more than 20 characters." }),

  password: z
    .string({ required_error: "password is required." })
    .trim()
    .min(8, { message: "password must be at least of 8 characters." }),

  email: z
    .string({ required_error: "email is required." })
    .email()
    .trim()
    .min(5, { message: "email must be at least of 5 characters." })
    .max(200, { message: "email must not be more than  200 characters." }),

  userImage: z.string({ required_error: "userImage is required." }),
});

const loginValidator = z.object({
  phone: z
    .string({ required_error: "PhoneNumber is required." })
    .trim()
    .min(11, { message: "PhoneNumber must be at least of 11 characters." })
    .max(20, { message: "PhoneNumber must not be more than 20 characters." }),

  password: z
    .string({ required_error: "password is required." })
    .trim()
    .min(10, { message: "password must be at least of 8 characters." }),
});

export { signupValidator, loginValidator };
