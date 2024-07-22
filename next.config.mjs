/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.glsl$/,
            loader: "webpack-glsl-loader",
        });

        return config
    },
};

export default nextConfig;