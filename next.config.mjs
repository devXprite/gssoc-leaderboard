/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    // cors
    async headers(){
        return [
            {
                source: "/api/(.*)",
                headers: [
                    {
                      key: "Access-Control-Allow-Origin",
                      value: "*", // Set your origin
                    },
                    {
                      key: "Access-Control-Allow-Methods",
                      value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                      key: "Access-Control-Allow-Headers",
                      value: "Content-Type, Authorization",
                    },
                  ],
            }
        ]
    }
};

export default nextConfig;
