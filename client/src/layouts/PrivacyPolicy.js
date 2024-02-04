import React, { useEffect } from 'react';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-gray-700">Privacy Policy</h1>
      
      <p className="text-white mb-6">
        Welcome to the Arts Market privacy policy. This page informs you of our policies regarding
        the collection, use, and disclosure of personal information when you use our service.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Information We Collect</h2>
      <p className="text-white mb-6">
        We collect personal information you provide to us, including but not limited to your
        name, email address, and profile information. We may also collect non-personal
        information such as browser type, device type, and usage patterns.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">How We Use Your Information</h2>
      <p className="text-white mb-6">
        We use the collected information to provide and improve our services. This includes
        personalizing content, processing transactions, and communicating with you about your
        account and our services.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Security</h2>
      <p className="text-white mb-6">
        We take reasonable measures to protect your personal information. However, please be
        aware that no method of transmission over the internet or electronic storage is
        completely secure.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Third-Party Links</h2>
      <p className="text-white mb-6">
        Our service may contain links to third-party websites. We have no control over the
        content, privacy policies, or practices of any third-party sites or services.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Changes to This Privacy Policy</h2>
      <p className="text-white mb-6">
        We may update our privacy policy from time to time. We will notify you of any changes
        by posting the new privacy policy on this page.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Contact Us</h2>
      <p className="text-white mb-6">
        If you have any questions about this privacy policy, please contact us at
        info@artsmarket.com.
      </p>
    </div>
  </div>
  )
}

export default PrivacyPolicy