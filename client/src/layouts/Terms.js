import React, { useEffect } from 'react';

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-gray-700">Terms & Conditions</h1>
      
      <p className="text-white mb-6">
        Welcome to the Arts Market. By accessing and using our platform, you agree to comply with
        and be bound by the following terms and conditions.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">User Responsibilities</h2>
      <p className="text-white mb-6">
        Users are responsible for maintaining the confidentiality of their account information,
        including passwords. You agree to notify us immediately of any unauthorized use of
        your account.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Prohibited Conduct</h2>
      <p className="text-white mb-6">
        Users are prohibited from engaging in any conduct that may disrupt the normal functioning
        of the platform, including but not limited to hacking, data scraping, or spreading
        malicious software.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Intellectual Property</h2>
      <p className="text-white mb-6">
        All content on the Arts Market platform, including but not limited to text, images, and
        artwork, is the intellectual property of the respective users. Users retain ownership
        of their content.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Payment and Transactions</h2>
      <p className="text-white mb-6">
        Transactions on the platform are subject to our payment policies. Users are responsible
        for providing accurate and up-to-date payment information.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Termination of Accounts</h2>
      <p className="text-white mb-6">
        We reserve the right to terminate user accounts that violate our terms and conditions
        without prior notice.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Changes to Terms & Conditions</h2>
      <p className="text-white mb-6">
        We may update our terms and conditions from time to time. Users will be notified of any
        changes, and continued use of the platform constitutes acceptance of the modified terms.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Contact Us</h2>
      <p className="text-white mb-6">
        If you have any questions about these terms and conditions, please contact us at
        legal@artsmarket.com.
      </p>
    </div>
  </div>
  )
}

export default Terms