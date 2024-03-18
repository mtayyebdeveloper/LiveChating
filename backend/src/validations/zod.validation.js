import z from "zod";

const signupValidator = () => {
  z.object({
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

    userImage: z
      .string({ required_error: "userImage is required." })
      .default(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAZlBMVEX///8AAABVVVXp6en7+/u8vLwjIyMzMzP39/fw8PDf398qKirW1tZ9fX25ubnm5uY+Pj5cXFyurq5nZ2eoqKiLi4tDQ0OdnZ0aGhrCwsKXl5cICAhKSkqEhIRiYmITExNwcHDMzMxJQBSZAAAGMklEQVR4nO2c6ZqqMAyGZUdkk31VuP+bPDgqttAWhrap53nm/cl09LNLmiYpp9Mff/DjhWXeBxN9XoaRajU0wqFw7FZ70dpOF9SqNa1wx5tGZPBd1doQjLAgy3ygW2fV+l6cwytd5oM0VC3xB3+4s3Vq2r33VKs8nbLLlswHsaVYpjnskfmgUbqoovXsvF+cOHYu6+mQKlxT3lJnHJSJNU7USZnrS6XKdoBoISW1UKNpenVefYdS3HhW42psXQ+fwoGa0df3iLBatFFuAmt8kGNLqKRJ8GO0XQIq8Ycas59UnZNSbIaAW37cMA2oTjPyDLSphf6kK7DOU4ZNUGR+WoNexIUejJ9HAdo0g9XpYQb9M/POnxV2mx+6aJd2sDaqR3U6c4f6DirJJbZuIHUa2MA37xlq4N5z/m7uoU87yPWEmSZtno74xNWKWRL2GNJEYabp4r+eGh0utAqJ7QG9EwvTM4+lry2YVzj+C+DGfuGEts4tT0bPC/DHmj33KLY7aSWUTnfpwL30tosHHXmOah2U0NHRdjEbovPiD1CuSbbsOjLDbEebxV981qcLJCfqWumc25vLEQCy+eZy0ZCoEDGrH5bCCDXSbZ1O+JmH9epAXcAI9ciLHiVGfCd/He65wAj1O4I0XCfij0aEsFQFJDRefzWGjug0bEKD+3cIvSI6V7sqqFBGjHGi+FhJ0yIHpoCG3mPO0erjxZklJYBmwwglBJwQuo9dCmjxyBhGqMuM4H1cI7q5hTqKMrfQ2Stm/Jyc9ekCKRk623ejhBGHhkqWWCTb+GKefiyHAOosQtps3uivNgZjxQHtoBOUnNKDd9iBtc8GYEIzuohZKGP7gvKbp6MFfaF0nv9DQj+udMb2N4iCbiLvlyc2/bjCCFEKh+xr7OMybn++ODZdUjo9aHic2qX62XiSUYytA9qhJ5dmz+dtnLYrQG2fb2jm523waUIdwCX/pCQv6y2h8Blxk7w9bQgdwHVOVp84+GyhupLUnU+UwhJaKKovCAlaWEJjWMuEKl0f3mbzVK+E2sp0kvq0uupP4pVVUFpXsnHGR+cnuAHFOae7orpVr7z4ySy3QlETXagiUb/E77d0Nl9Q9vTAXRXBYAz+N3TnC2+4EOdqa/eKF9EKNxl03Ky2jh4oKM3YgVFnTZDqXVF017RvsnXZjhIMKyFUsbmG9ziHegZhXrpw5+SZsUk7+57+ajX7enxtQDvZmwOfbbm7NNB8xgDbFKpbIwvL3tj1rj46I/5Lt+9f+IiyVQQk3S4P9xI8NXWTLdVNiJb91jCHcyxXGbR2kOry+deKpHMiTktKt3rNjRiFciQem1mBZk27O4O12ISMZHDo4TRHUgFUtCNVO327PuRNWTb9cpsikcnwAcbtTO3vkeAHWDurM36J8Brd9UlNEIVYO2XRVjs/sUifWlp/PhAYlNguJODiJmqennfZJQ4GQXceNo9u3IjZpEbpOpG6Tg5ceQv+QyXA8Msf+AcD92Y67rqtxI3NmxinJj9Ek3IOfg0xQ3/gS0Kcd9//4oYvKjmC6dQ0nkt5JsySf8JTT7ys+JULx3mffUgSzXBcKIwNfXO8sjAC1clRDbWs9ZbN4eIdGedOFvpBvzTake0QytHaiGzzkrdg7gdvue27FiCSY/cI9t/zFkZwyCvdUW0vmuuhk/PeKzYCiQ/touG+KzYiOZbQT8B1avdDexOj9FIaR9x8E3oD/a+EHsqcKlj1B+/ggndpe3ALPYN7T0ejzzxlt0c4Hi2BHXyOG4PmxluHhFLxxMlYVxgE0/LFSOFsVMMZeEyAomS80bx33YJsjjl4OLJzIg+OuU0KlIp5d4n8IKmoGgNDstJe2EvA5ObuhL4ESmKfikowvshl2VPh19oYN76+Sue0m0pIhre8GycR8Yu/SiSV6gqO6Uu8guULPJ20N5nvUDyXotaUI/uFOr6YNG4q/96IWwtY/iFIYa6bcJYX3eDqh8vicIDfvoHeFnKz4VC32vBvTHbr5tf5HbtX8mJn06uD34Sl9cRT9vpZk/qi6SVVHil/83RUpoVDdwPvlyJNvuZmi580/XDtnAqZC+0l1ocgzxRcvGBjGv5ohUmSTSQTYe2rH+4/6PwDos5eVK6z6FUAAAAASUVORK5CYII="
      ),
  });
};

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
