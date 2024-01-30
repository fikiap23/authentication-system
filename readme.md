## Installation

To run Authentication System locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/fikiap23/authentication-system.git
   cd authentication-system
   ```

### Project Structure

The project is organized into two main folders:

### Client

The client folder contains the React application.

#### Getting Started with Client

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the client development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit [http://localhost:5173](http://localhost:5173) to use the Authentication System client.

### Api

The api folder contains the Node.js and Express.js server.

API documentation is available at [api docs](https://fikiap23.github.io/authentication-system/).

#### Getting Started with Api

1. Navigate to the `api` folder:

   ```bash
   cd api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `api` folder with the following content:

   ```
    MONGODB_URI =
    CLIENT_BASE_URL = http://localhost:5173
    EMAIL = email for send verification
    EMAIL_PASS = password your email
    JWT_PUBLIC_KEY =
    JWT_PRIVATE_KEY=
   ```

   - `MONGODB_URI`: Replace with your MongoDB URI.
   - `CLIENT_BASE_URL`: Replace with the base URL of your React application.
   - `EMAIL`: Replace with your email.
   - `EMAIL_PASS`: Replace with your email password.
   - `JWT_PUBLIC_KEY`: Replace with your JWT public key.
   - `JWT_PRIVATE_KEY`: Replace with your JWT private key.

4. Start the api development server:

   ```bash
   npm run dev
   ```

5. The api server will run on [http://localhost:4000](http://localhost:4000).

6. The api documentation is available at [http://localhost:4000/docs](http://localhost:4000/docs)

### Environment

If you want use my environment, here is my .env file:

```bash
MONGODB_URI = mongodb+srv://fikiaprian23:ifunggul@cluster0.hontmqd.mongodb.net/web?retryWrites=true&w=majority

CLIENT_BASE_URL = http://localhost:5173

EMAIL = taskplus.squad@gmail.com

EMAIL_PASS = wtqm seou oiyg adxd

JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz1lKBiOrSxYLrG/CHcrv
5XIOSKe+FFpIHSB3nVn+YoHrMsps3xKVw3u8SgQxt+EcT5Ic349ESydIsTbFXvVQ
gNXo5q7Cuj2z3ACeOtiov5rnBpfWSUpTkrizx9ndb1K3dpLRgv6JAkfB4dluBLRT
K8/+LEQYehlQsGPWwMD4kkFDuVdJrhp25rynGfeUKiK0orpE0+5LwUd+k5eyux82
JRIPTETHaGXVcIDZZSKyvLlYEuN64B5Aej21MiZY8soesKLOmXsu4NWZz+jhv2us
CU7AajBEm2QORD/TJIGiPRQevJ7vayk6K8YuP+e06BV4j8MxssqwjrHszwkxudb1
gwIDAQAB
-----END PUBLIC KEY-----`

JWT_PRIVATE_KEY= `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAz1lKBiOrSxYLrG/CHcrv5XIOSKe+FFpIHSB3nVn+YoHrMsps
3xKVw3u8SgQxt+EcT5Ic349ESydIsTbFXvVQgNXo5q7Cuj2z3ACeOtiov5rnBpfW
SUpTkrizx9ndb1K3dpLRgv6JAkfB4dluBLRTK8/+LEQYehlQsGPWwMD4kkFDuVdJ
rhp25rynGfeUKiK0orpE0+5LwUd+k5eyux82JRIPTETHaGXVcIDZZSKyvLlYEuN6
4B5Aej21MiZY8soesKLOmXsu4NWZz+jhv2usCU7AajBEm2QORD/TJIGiPRQevJ7v
ayk6K8YuP+e06BV4j8MxssqwjrHszwkxudb1gwIDAQABAoIBACQj/QoK541j308D
/8Kvn5bPhXvWeQQVJGKnSRINIJDM8lDdBZLwK1hyVcRU7NGPFB8uaYfx8cZjp4Dz
+fzuJ0T9g+XJajmKDbJ4DRxWrTsQZdo5VulZYi29seBQsg74TPAG8Suy7/CMz1dt
TYbWY3TMgRH4IIgPp4fHLyRTvj/Hfg1AbpJFhEZl9nZuub/Hv0ZKliAa6y4Qv3EN
tPDIkx/j//Jf1bTqm00qsJVfCFuMNAEJa3KBKHXvuFAo9wGUoMDGtq2ZPHDnlCex
PCyGksSgyOrYltpxFn/UaVMbfRiq63sO43ffcBSio7mYrp7YpIGFVqSIlrgyIk0I
Wf/npTkCgYEA7KDs/GZGTIoQJQ0oLaSaCH/crI2b6vMV/HZImTRTejLhYx33lOvn
Y+g4IvyzAgVvPbQH4/JFFpwmcqoUx65LDIJKSs09gezB1F5KLepLuf1o8i6VxqxG
XLXztLtArYwnGFQYeYFPht//MYhXPGK5P+LUU9SRnYlCIDZ4ArBhhV0CgYEA4FK9
c0vQ4Zh7uPhpeLU8UTEZgyXqI3eTqCC8ChMN5K2+j06lObsJKYf4cTOfUdCrIUSJ
sG82hzq2DuCEsEtifVdNbwQRhnLECCezMGXWedRrEjajqiwqJ8Z7yIsTdQM360Tn
77Mlvd9Qj003Is9JuXeqcUSAUB5FdC5emf+g2F8CgYBHz7q8ConRFqE5rVmBKI/6
fltJHpyv29/TQ05a+E9RKXnPK7wEPOd3IXVP4OKufVm6HxW57r9a0j6007sEsndi
L3Q+aTT+ZgyY15ipgI5EvowH221m4sdjwXBZa+5//KWss3DOBxlMdFQtAxR+ZfOU
WNFZM4yRg6NGxWD8Z+zgnQKBgBqAzA9WMsyklmGJP/TZ/NFe6rO7BAnCs/hWPcE2
9RpCiNQnp4/FkFSO0wSU48rny4A3t8jXquqZPi9NyX+GuJE0glqOcX+gCZcpEZuz
PH7SYQAa4oVViHmAktljzR2zDqVGU9zXHqtrOfpkVhJPyVcXU1TkkgBlQzFx1Q1+
zUMjAoGBAK3nAGQ8KVfFFWcGeLko1Svzl3DnIRyBA5/Vy5ZWW4yM0V5NAoatq7BZ
jpOls+2h1gZCtuiUOmbyfSzjjf5V25JGvc0vF4+NuX8mEI7ij81ndiDmr9ULD2kh
ciUcpFtK/g8NJEn/IBfL3weQkdnaRjk2UYw6jtokBwSFj9haKeUZ
-----END RSA PRIVATE KEY-----`
```
