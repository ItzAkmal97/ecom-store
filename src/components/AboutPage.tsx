import GoogleMaps from "./GoogleMaps";
const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center">About ShopSphere</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2020, ShopSphere emerged from a vision to create a curated online destination for premium beauty and fragrance enthusiasts. We believe that luxury should be accessible, which is why we carefully select high-quality products from renowned brands like Chanel, Dior, and Calvin Klein, offering them at competitive prices.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Our Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            At ShopSphere, we pride ourselves on our diverse range of carefully curated products. From everyday essentials like the Essence Mascara and Red Lipstick to luxury fragrances such as Chanel Coco Noir and Dior J'adore, our collection caters to all your beauty needs. Each product in our inventory is authentically sourced and thoroughly verified to ensure you receive only genuine items.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Our Commitment</h2>
          <p className="text-gray-700 leading-relaxed">
            Quality and customer satisfaction are at the heart of everything we do. We understand that beauty products and fragrances are personal choices, which is why we offer detailed product descriptions and competitive pricing. Our dedicated team ensures swift processing of orders and maintains strict quality control measures to deliver an exceptional shopping experience.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Shop With Confidence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine items sourced directly from authorized distributors</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Protected payment methods and encrypted transactions</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick processing and reliable shipping partners</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Connect With Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="text-gray-700">
            <p className="mb-2">Email: contact@shopsphere.com</p>
            <p className="mb-2">Customer Service: 1-800-BEAUTY-SP</p>
            <p>Hours: Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
        </div>
        <GoogleMaps />
      </div>
    </div>
  );
};

export default AboutPage;