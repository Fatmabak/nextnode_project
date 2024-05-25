/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: "http://localhost:3001/api",
    SECRET: "secret",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:"pk_test_51PCP7KEvRfUd88XhE6dpE5kk7DTt5BkwWDNuinfCELBo6YpbWrkmCXgYzTDSEc4qqQvmcHKZNOMO5SvJwjD4qFHY00mUQhFkRm",
    STRIPE_SECRET_KEY:"sk_test_51PCP7KEvRfUd88Xhh3T7iGQ2P2NGsBhLnuTOtd59M7K5V9KbBOLg5C7C2RwcA0amhOl5LdmNdK53An6CqU09ipib00kAnjSJG4",
    NEXT_PUBLIC_URL:"http://localhost:3000"
  },
};
module.exports = nextConfig;
