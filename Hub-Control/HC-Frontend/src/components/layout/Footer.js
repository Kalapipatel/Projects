import React from 'react';
import { Box } from 'lucide-react';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="container mx-auto px-4">
      {/* ... Content remains same ... */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4 text-white">
            <Box className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">HubControl</span>
          </div>
          <p className="text-sm">
            The complete operating system for modern dark stores and micro-fulfillment centers.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
            <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} HubControl Systems Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

// import React from 'react';
// import { Box } from 'lucide-react';

// const Footer = () => (
//   <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
//     <div className="container mx-auto px-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//         <div>
//           <div className="flex items-center gap-2 mb-4 text-white">
//             <Box className="w-6 h-6 text-blue-500" />
//             <span className="text-xl font-bold">HubControl</span>
//           </div>
//           <p className="text-sm">
//             The complete operating system for modern dark stores and micro-fulfillment centers.
//           </p>
//         </div>
//         <div>
//           <h4 className="text-white font-bold mb-4">Product</h4>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-blue-400">Features</a></li>
//             <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
//             <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-white font-bold mb-4">Company</h4>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-blue-400">About Us</a></li>
//             <li><a href="#" className="hover:text-blue-400">Careers</a></li>
//             <li><a href="#" className="hover:text-blue-400">Contact</a></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-white font-bold mb-4">Legal</h4>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
//             <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-slate-800 pt-8 text-center text-sm">
//         &copy; {new Date().getFullYear()} HubControl Systems Inc. All rights reserved.
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;