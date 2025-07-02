import Image from "next/image";

export default function Home() {
  // Test comment for husky and lint-staged
  const websiteTitle = "Welcome to My Test Website"; // intentionally bad spacing
  const description = "This is a test website to verify husky and lint-staged formatting"; // missing spaces

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{websiteTitle}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </header>

        <main className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              We are a company dedicated to creating amazing web experiences. Our team consists of
              passionate developers who love clean code.
            </p>
            <Image src="/next.svg" alt="Company logo" width={150} height={30} className="mx-auto" />
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Web Development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Mobile App Development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                UI/UX Design
              </li>
            </ul>
          </section>

          <section className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">contact@testwebsite.com</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600">123 Test Street, Web City</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center mt-12">
          <p className="text-gray-500">© 2024 Test Website. All rights reserved.</p>

          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Terms of Service
            </a>

            <a href="#" className="text-blue-500 hover:text-blue-700">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
