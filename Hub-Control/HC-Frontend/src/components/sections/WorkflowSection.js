import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { StepCard } from '../ui/Cards';

const WorkflowSection = () => (
  <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
    <div className="container mx-auto px-4">
      <SectionHeading 
        badge="The Workflow"
        title="Order Lifecycle Automation"
        subtitle="How HubControl turns chaos into a streamlined assembly line."
      />

      <div className="relative mt-20">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400 dark:from-blue-900 dark:via-blue-700 dark:to-green-900 opacity-50"></div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <StepCard number="1" title="Order Received" desc="Orders sync instantly via API from Shopify, WooCommerce, or custom apps." />
          <StepCard number="2" title="Smart Batching" desc="System groups orders by zone or product type to minimize walking distance." />
          <StepCard number="3" title="Guided Picking" desc="Picker receives optimized route on mobile app. Scans item to verify." />
          <StepCard number="4" title="Packing & QC" desc="Items moved to packing station. Secondary scan ensures 100% accuracy." />
          <StepCard number="5" title="Dispatch" desc="Label generated, rider assigned, and tracking link sent to customer." />
        </div>
      </div>
    </div>
  </section>
);

export default WorkflowSection;

// import React from 'react';
// import SectionHeading from '../ui/SectionHeading';
// import { StepCard } from '../ui/Cards';

// const WorkflowSection = () => (
//   <section id="how-it-works" className="py-24 bg-slate-50 overflow-hidden">
//     <div className="container mx-auto px-4">
//       <SectionHeading 
//         badge="The Workflow"
//         title="Order Lifecycle Automation"
//         subtitle="How HubControl turns chaos into a streamlined assembly line."
//       />

//       <div className="relative mt-20">
//         {/* Connecting Line (Desktop) */}
//         <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400"></div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//           <StepCard 
//             number="1"
//             title="Order Received"
//             desc="Orders sync instantly via API from Shopify, WooCommerce, or custom apps."
//           />
//           <StepCard 
//             number="2"
//             title="Smart Batching"
//             desc="System groups orders by zone or product type to minimize walking distance."
//           />
//           <StepCard 
//             number="3"
//             title="Guided Picking"
//             desc="Picker receives optimized route on mobile app. Scans item to verify."
//           />
//           <StepCard 
//             number="4"
//             title="Packing & QC"
//             desc="Items moved to packing station. Secondary scan ensures 100% accuracy."
//           />
//           <StepCard 
//             number="5"
//             title="Dispatch"
//             desc="Label generated, rider assigned, and tracking link sent to customer."
//           />
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default WorkflowSection;